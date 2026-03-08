/**
 * Netlify Deployment Engine
 * Pipeline: component tree → code generator → build → deploy via Netlify API.
 */

import type { PageSchema } from '@/types/builder';
import { generateReactProject } from '@/engine/codegen';

export interface NetlifyDeployConfig {
  projectName: string;
  siteId?: string;
  token: string;
}

export interface NetlifyDeployResult {
  success: boolean;
  url?: string;
  deployId?: string;
  error?: string;
}

export type NetlifyDeployStatus = 'idle' | 'generating' | 'uploading' | 'building' | 'deployed' | 'error';

/**
 * Generate project files from the builder schema.
 */
export const generateNetlifyFiles = (schema: PageSchema): Record<string, string> => {
  const files = generateReactProject(schema);
  // Add Netlify-specific files
  files['netlify.toml'] = `[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;
  return files;
};

/**
 * Deploy to Netlify via their REST API.
 * Requires a valid Netlify Personal Access Token.
 */
export const deployToNetlify = async (
  schema: PageSchema,
  config: NetlifyDeployConfig,
  onStatusChange?: (status: NetlifyDeployStatus) => void
): Promise<NetlifyDeployResult> => {
  try {
    onStatusChange?.('generating');
    const files = generateNetlifyFiles(schema);

    onStatusChange?.('uploading');

    // If no siteId, create a new site first
    let siteId = config.siteId;
    if (!siteId) {
      const createRes = await fetch('https://api.netlify.com/api/v1/sites', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: config.projectName,
        }),
      });

      if (!createRes.ok) {
        const err = await createRes.json();
        onStatusChange?.('error');
        return { success: false, error: err.message || 'Failed to create Netlify site' };
      }

      const site = await createRes.json();
      siteId = site.id;
    }

    // Deploy files using the file digest approach
    const fileDigests: Record<string, string> = {};
    const fileContents: Record<string, string> = {};

    for (const [path, content] of Object.entries(files)) {
      // Create a simple hash for the file
      const encoder = new TextEncoder();
      const data = encoder.encode(content);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      fileDigests[`/${path}`] = hash;
      fileContents[hash] = content;
    }

    onStatusChange?.('building');

    // Create the deploy
    const deployRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        files: fileDigests,
      }),
    });

    if (!deployRes.ok) {
      const err = await deployRes.json();
      onStatusChange?.('error');
      return { success: false, error: err.message || 'Deploy creation failed' };
    }

    const deploy = await deployRes.json();

    // Upload required files
    const required = deploy.required || [];
    for (const hash of required) {
      if (fileContents[hash]) {
        await fetch(`https://api.netlify.com/api/v1/deploys/${deploy.id}/files/${hash}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${config.token}`,
            'Content-Type': 'application/octet-stream',
          },
          body: fileContents[hash],
        });
      }
    }

    onStatusChange?.('deployed');

    return {
      success: true,
      url: deploy.ssl_url || deploy.url || `https://${deploy.subdomain}.netlify.app`,
      deployId: deploy.id,
    };
  } catch (err: any) {
    onStatusChange?.('error');
    return { success: false, error: err.message };
  }
};
