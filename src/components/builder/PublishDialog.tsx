import { useState } from 'react';
import { useBuilderStore } from '@/store/builderStore';
import { usePages, useSavePage } from '@/hooks/usePages';
import { useCreateDeployment, useUpdateDeployment, useDeployments } from '@/hooks/useDeployments';
import { generateProjectFiles } from '@/engine/deploy/vercelDeploy';
import { downloadZip } from '@/engine/codegen/zipExporter';
import type { PageSchema } from '@/types/builder';
import {
  Upload, Check, X, Loader2, Globe, Clock, ExternalLink, Rocket,
  FileArchive, Download,
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
      setStatus('saving');
      const currentPage = pages?.find((p) =>
        (p.schema as unknown as PageSchema)?.id === schema.id
      );
      if (currentPage) {
        await savePage.mutateAsync({ pageId: currentPage.id, schema });
      }

      setStatus('generating');
      const files = generateProjectFiles(schema);
      setGeneratedFiles(files);

      setStatus('deploying');
      const versionNumber = (deployments?.length ?? 0) + 1;
      const deployment = await createDeployment.mutateAsync({
        projectId,
        versionNumber,
      });

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

  const handleDownloadZip = async () => {
    if (!generatedFiles) return;
    try {
      const projectName = schema.name || 'my-website';
      await downloadZip(generatedFiles, projectName);
      toast.success('ZIP downloaded — open in VS Code and run `npm install && npm run dev`');
    } catch (err: any) {
      toast.error('Download failed: ' + err.message);
    }
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
                  {Object.keys(generatedFiles).length} files generated • Vercel-ready
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

          {/* Download ZIP info when done */}
          {status === 'done' && generatedFiles && (
            <div className="p-3 rounded-lg text-xs space-y-2" style={{ background: 'hsl(var(--primary) / 0.08)' }}>
              <p className="font-medium" style={{ color: 'hsl(var(--primary))' }}>
                🚀 Ready for Vercel deployment
              </p>
              <ol className="space-y-1 opacity-70 list-decimal list-inside">
                <li>Download the ZIP and extract it</li>
                <li>Open the folder in VS Code</li>
                <li>Run <code className="px-1 py-0.5 rounded text-[10px]" style={{ background: 'hsl(var(--muted))' }}>npm install && npm run dev</code></li>
                <li>Push to GitHub and import on Vercel</li>
              </ol>
            </div>
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
              onClick={handleDownloadZip}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <FileArchive className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              Download ZIP
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
