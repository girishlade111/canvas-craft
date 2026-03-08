/**
 * Railway Deployment Engine
 * Pipeline: component tree → code generator → deploy via Railway API (GraphQL).
 */

import type { PageSchema } from '@/types/builder';
import { generateReactProject } from '@/engine/codegen';

export interface RailwayDeployConfig {
  projectName: string;
  token: string;
  projectId?: string;
  serviceId?: string;
}

export interface RailwayDeployResult {
  success: boolean;
  url?: string;
  deployId?: string;
  error?: string;
}

export type RailwayDeployStatus = 'idle' | 'generating' | 'uploading' | 'building' | 'deployed' | 'error';

/**
 * Generate project files from the builder schema with Railway config.
 */
export const generateRailwayFiles = (schema: PageSchema): Record<string, string> => {
  const files = generateReactProject(schema);
  // Add Railway-specific nixpacks config
  files['nixpacks.toml'] = `[phases.setup]
nixPkgs = ['nodejs_20']

[phases.build]
cmds = ['npm install', 'npm run build']

[start]
cmd = 'npx serve dist -s -l $PORT'
`;
  files['railway.json'] = JSON.stringify({
    "$schema": "https://railway.app/railway.schema.json",
    "build": { "builder": "NIXPACKS" },
    "deploy": { "restartPolicyType": "ON_FAILURE", "restartPolicyMaxRetries": 10 }
  }, null, 2);
  return files;
};

/**
 * Deploy to Railway via their GraphQL API.
 */
export const deployToRailway = async (
  schema: PageSchema,
  config: RailwayDeployConfig,
  onStatusChange?: (status: RailwayDeployStatus) => void
): Promise<RailwayDeployResult> => {
  const RAILWAY_API = 'https://backboard.railway.app/graphql/v2';
  const headers = {
    Authorization: `Bearer ${config.token}`,
    'Content-Type': 'application/json',
  };

  try {
    onStatusChange?.('generating');
    const files = generateRailwayFiles(schema);

    onStatusChange?.('uploading');

    let projectId = config.projectId;
    let serviceId = config.serviceId;

    // Create project if needed
    if (!projectId) {
      const createProjectRes = await fetch(RAILWAY_API, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `mutation { projectCreate(input: { name: "${config.projectName}" }) { id } }`,
        }),
      });

      if (!createProjectRes.ok) {
        onStatusChange?.('error');
        return { success: false, error: 'Failed to create Railway project' };
      }

      const projectData = await createProjectRes.json();
      projectId = projectData?.data?.projectCreate?.id;
      if (!projectId) {
        onStatusChange?.('error');
        return { success: false, error: projectData?.errors?.[0]?.message || 'Failed to create project' };
      }
    }

    // Create service if needed
    if (!serviceId) {
      const createServiceRes = await fetch(RAILWAY_API, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `mutation { serviceCreate(input: { projectId: "${projectId}", name: "${config.projectName}-web" }) { id } }`,
        }),
      });

      if (!createServiceRes.ok) {
        onStatusChange?.('error');
        return { success: false, error: 'Failed to create Railway service' };
      }

      const serviceData = await createServiceRes.json();
      serviceId = serviceData?.data?.serviceCreate?.id;
    }

    onStatusChange?.('building');

    // Trigger deployment via template deploy (GitHub-free approach)
    const deployRes = await fetch(RAILWAY_API, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: `mutation {
          deploymentTriggerCreate(input: {
            projectId: "${projectId}",
            serviceId: "${serviceId}",
            environmentId: null
          }) { id }
        }`,
      }),
    });

    if (!deployRes.ok) {
      const errText = await deployRes.text();
      onStatusChange?.('error');
      return { success: false, error: `Deploy trigger failed: ${errText}` };
    }

    onStatusChange?.('deployed');

    // Get deployment URL
    const urlRes = await fetch(RAILWAY_API, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: `query { project(id: "${projectId}") { services { edges { node { serviceInstances { edges { node { domains { serviceDomains { domain } } } } } } } } } }`,
      }),
    });

    let deployUrl = `https://railway.app/project/${projectId}`;
    if (urlRes.ok) {
      const urlData = await urlRes.json();
      const serviceDomain = urlData?.data?.project?.services?.edges?.[0]?.node?.serviceInstances?.edges?.[0]?.node?.domains?.serviceDomains?.[0]?.domain;
      if (serviceDomain) {
        deployUrl = `https://${serviceDomain}`;
      }
    }

    return {
      success: true,
      url: deployUrl,
      deployId: projectId,
    };
  } catch (err: any) {
    onStatusChange?.('error');
    return { success: false, error: err.message };
  }
};
