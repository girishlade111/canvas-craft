/**
 * Layer 6 — Deployment Engine
 * Pipeline: component tree → code generator → build → deploy via Vercel API.
 * 
 * This module provides the architecture for Vercel deployment.
 * Actual deployment requires a Vercel API token configured as a secret.
 */

import type { PageSchema } from '@/types/builder';
import { generateReactProject } from '@/engine/codegen';

export interface DeploymentConfig {
  projectName: string;
  teamId?: string;
  token: string;
}

export interface DeploymentResult {
  success: boolean;
  url?: string;
  deploymentId?: string;
  error?: string;
}

export type DeploymentStatus = 'idle' | 'generating' | 'uploading' | 'building' | 'deployed' | 'error';

/**
 * Generate project files from the builder schema.
 */
export const generateProjectFiles = (schema: PageSchema): Record<string, string> => {
  return generateReactProject(schema);
};

/**
 * Deploy to Vercel via their REST API.
 * Requires a valid Vercel API token.
 */
export const deployToVercel = async (
  schema: PageSchema,
  config: DeploymentConfig,
  onStatusChange?: (status: DeploymentStatus) => void
): Promise<DeploymentResult> => {
  try {
    onStatusChange?.('generating');
    const files = generateProjectFiles(schema);

    onStatusChange?.('uploading');

    // Convert files to Vercel API format
    const vercelFiles = Object.entries(files).map(([file, data]) => ({
      file,
      data,
    }));

    const response = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: config.projectName,
        files: vercelFiles,
        projectSettings: {
          framework: 'vite',
        },
        ...(config.teamId ? { teamId: config.teamId } : {}),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      onStatusChange?.('error');
      return { success: false, error: error.error?.message || 'Deployment failed' };
    }

    const result = await response.json();
    onStatusChange?.('deployed');

    return {
      success: true,
      url: `https://${result.url}`,
      deploymentId: result.id,
    };
  } catch (err: any) {
    onStatusChange?.('error');
    return { success: false, error: err.message };
  }
};
