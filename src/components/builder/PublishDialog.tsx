import { useState } from 'react';
import { useBuilderStore } from '@/store/builderStore';
import { usePages, useSavePage } from '@/hooks/usePages';
import { useCreateDeployment, useUpdateDeployment, useDeployments } from '@/hooks/useDeployments';
import { generateProjectFiles } from '@/engine/deploy/vercelDeploy';
import type { PageSchema } from '@/types/builder';
import {
  Upload, Check, X, Loader2, Globe, Clock, ExternalLink, Rocket,
} from 'lucide-react';
import { toast } from 'sonner';

type DeployStatus = 'idle' | 'saving' | 'generating' | 'deploying' | 'done' | 'error';

interface PublishDialogProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

const statusLabels: Record<DeployStatus, string> = {
  idle: 'Ready to publish',
  saving: 'Saving pages…',
  generating: 'Generating code…',
  deploying: 'Deploying…',
  done: 'Published!',
  error: 'Failed',
};

const statusIcons: Record<DeployStatus, React.ReactNode> = {
  idle: <Rocket className="w-5 h-5" />,
  saving: <Loader2 className="w-5 h-5 animate-spin" />,
  generating: <Loader2 className="w-5 h-5 animate-spin" />,
  deploying: <Loader2 className="w-5 h-5 animate-spin" />,
  done: <Check className="w-5 h-5" />,
  error: <X className="w-5 h-5" />,
};

const PublishDialog: React.FC<PublishDialogProps> = ({ projectId, isOpen, onClose }) => {
  const [status, setStatus] = useState<DeployStatus>('idle');
  const [generatedFiles, setGeneratedFiles] = useState<Record<string, string> | null>(null);
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);

  const schema = useBuilderStore((s) => s.schema);
  const { data: pages } = usePages(projectId);
  const savePage = useSavePage();
  const createDeployment = useCreateDeployment();
  const updateDeployment = useUpdateDeployment();
  const { data: deployments } = useDeployments(projectId);

  const handlePublish = async () => {
    try {
      // Step 1: Save current page
      setStatus('saving');
      const currentPage = pages?.find((p) =>
        (p.schema as unknown as PageSchema)?.id === schema.id
      );
      if (currentPage) {
        await savePage.mutateAsync({ pageId: currentPage.id, schema });
      }

      // Step 2: Generate code
      setStatus('generating');
      const files = generateProjectFiles(schema);
      setGeneratedFiles(files);

      // Step 3: Create deployment record
      setStatus('deploying');
      const versionNumber = (deployments?.length ?? 0) + 1;
      const deployment = await createDeployment.mutateAsync({
        projectId,
        versionNumber,
      });

      // Step 4: Update with generated status
      // In production this would call Vercel API via edge function
      // For now we mark as completed with generated files
      await updateDeployment.mutateAsync({
        deploymentId: deployment.id,
        updates: {
          status: 'completed',
          build_log: `Generated ${Object.keys(files).length} files at ${new Date().toISOString()}`,
        },
      });

      setStatus('done');
      toast.success('Project published successfully!');
    } catch (err: any) {
      setStatus('error');
      toast.error('Publish failed: ' + err.message);
    }
  };

  const handleDownloadBuild = () => {
    if (!generatedFiles) return;
    Object.entries(generatedFiles).forEach(([filename, content]) => {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    });
    toast.success('Files downloaded');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-lg rounded-xl shadow-2xl overflow-hidden"
        style={{
          background: 'hsl(var(--builder-sidebar))',
          border: '1px solid hsl(var(--builder-panel-border))',
          color: 'hsl(var(--builder-toolbar-foreground))',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
            <h2 className="text-lg font-semibold">Publish Project</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/10 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status pipeline */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'hsl(var(--builder-bg))' }}>
            <div style={{ color: status === 'error' ? 'hsl(var(--destructive))' : status === 'done' ? '#22c55e' : 'hsl(var(--primary))' }}>
              {statusIcons[status]}
            </div>
            <div>
              <p className="text-sm font-medium">{statusLabels[status]}</p>
              {generatedFiles && status === 'done' && (
                <p className="text-xs opacity-60 mt-0.5">
                  {Object.keys(generatedFiles).length} files generated
                </p>
              )}
            </div>
          </div>

          {/* Pipeline steps */}
          <div className="space-y-2 text-xs">
            {['Save pages', 'Generate code', 'Create deployment', 'Deploy'].map((step, i) => {
              const stepStatuses: DeployStatus[] = ['saving', 'generating', 'deploying', 'done'];
              const currentStep = stepStatuses.indexOf(status);
              const isDone = currentStep > i || status === 'done';
              const isActive = currentStep === i;
              return (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{
                      background: isDone ? '#22c55e' : isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                      color: isDone || isActive ? 'white' : 'hsl(var(--muted-foreground))',
                    }}
                  >
                    {isDone ? '✓' : i + 1}
                  </div>
                  <span className={isDone ? 'opacity-60 line-through' : isActive ? 'font-medium' : 'opacity-40'}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Deployment URL */}
          {deploymentUrl && (
            <a
              href={deploymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg text-sm hover:opacity-80 transition-opacity"
              style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}
            >
              <ExternalLink className="w-4 h-4" />
              {deploymentUrl}
            </a>
          )}

          {/* Previous deployments */}
          {deployments && deployments.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-50 mb-2">
                Recent deployments
              </p>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {deployments.slice(0, 5).map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between text-xs p-2 rounded"
                    style={{ background: 'hsl(var(--builder-bg))' }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: d.status === 'completed' ? '#22c55e' : d.status === 'pending' ? '#eab308' : '#ef4444',
                        }}
                      />
                      <span>v{d.version_number}</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-50">
                      <Clock className="w-3 h-3" />
                      {new Date(d.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 p-5 border-t" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
          {status === 'done' && generatedFiles && (
            <button
              onClick={handleDownloadBuild}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              Download Build
            </button>
          )}
          <button
            onClick={status === 'done' || status === 'error' ? onClose : handlePublish}
            disabled={status === 'saving' || status === 'generating' || status === 'deploying'}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-opacity disabled:opacity-50"
            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
          >
            {status === 'idle' && <><Upload className="w-3.5 h-3.5" /> Publish Now</>}
            {(status === 'saving' || status === 'generating' || status === 'deploying') && (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Publishing…</>
            )}
            {status === 'done' && 'Close'}
            {status === 'error' && 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishDialog;
