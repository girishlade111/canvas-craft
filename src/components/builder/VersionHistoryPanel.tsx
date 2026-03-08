import { usePageVersions, useRestoreVersion } from '@/hooks/usePages';
import { useBuilderStore } from '@/store/builderStore';
import { History, RotateCcw, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { PageSchema } from '@/types/builder';

interface VersionHistoryPanelProps {
  pageId: string;
}

const VersionHistoryPanel = ({ pageId }: VersionHistoryPanelProps) => {
  const { data: versions, isLoading } = usePageVersions(pageId);
  const restoreVersion = useRestoreVersion();
  const setSchema = useBuilderStore(s => s.setSchema);

  const handleRestore = async (schema: any) => {
    await restoreVersion.mutateAsync({ pageId, schema });
    setSchema(schema as PageSchema);
    toast.success('Version restored!');
  };

  return (
    <div className="builder-sidebar w-64 border-l overflow-y-auto">
      <div className="p-3 border-b flex items-center gap-2" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <History className="w-4 h-4 opacity-60" />
        <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60">Version History</h2>
      </div>

      <div className="p-2 space-y-1">
        {isLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin opacity-40" /></div>
        ) : !versions?.length ? (
          <p className="text-xs text-center py-8 opacity-40">No versions saved yet.</p>
        ) : (
          versions.map(v => (
            <div key={v.id} className="flex items-center gap-2 px-2 py-2 rounded text-sm hover:bg-white/5 group">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium">Version {v.version_number}</p>
                <p className="text-xs opacity-40">{new Date(v.created_at).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleRestore(v.schema)}
                disabled={restoreVersion.isPending}
                className="p-1.5 rounded opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all"
                title="Restore this version"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VersionHistoryPanel;
