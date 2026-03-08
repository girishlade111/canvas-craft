import { useRef } from 'react';
import { useAssets, useUploadAsset, useDeleteAsset } from '@/hooks/useAssets';
import { Upload, Trash2, Image, FileText, Video, Loader2, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface AssetPanelProps {
  projectId: string;
}

const AssetPanel = ({ projectId }: AssetPanelProps) => {
  const { data: assets, isLoading } = useAssets(projectId);
  const uploadAsset = useUploadAsset();
  const deleteAsset = useDeleteAsset();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadAsset.mutateAsync({ projectId, file });
      toast.success('Asset uploaded!');
    } catch (err: any) {
      toast.error(err.message);
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied!');
  };

  const getIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    return FileText;
  };

  return (
    <div className="builder-sidebar w-64 border-r overflow-y-auto">
      <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60">Assets</h2>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploadAsset.isPending}
          className="p-1.5 rounded hover:bg-white/10 transition-colors"
        >
          {uploadAsset.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        </button>
      </div>

      <input ref={fileRef} type="file" className="hidden" onChange={handleUpload} accept="image/*,video/*,.pdf,.svg" />

      <div className="p-2 space-y-1">
        {isLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin opacity-40" /></div>
        ) : !assets?.length ? (
          <p className="text-xs text-center py-8 opacity-40">No assets yet. Upload files to get started.</p>
        ) : (
          assets.map(asset => {
            const Icon = getIcon(asset.file_type);
            return (
              <div key={asset.id} className="flex items-center gap-2 px-2 py-1.5 rounded text-sm hover:bg-white/5 group">
                {asset.file_type.startsWith('image/') ? (
                  <img src={asset.file_url} alt={asset.name} className="w-8 h-8 rounded object-cover shrink-0" />
                ) : (
                  <Icon className="w-4 h-4 shrink-0 opacity-50" />
                )}
                <span className="truncate flex-1 text-xs">{asset.name}</span>
                <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleCopyUrl(asset.file_url)} className="p-1 rounded hover:bg-white/10">
                    <Copy className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => deleteAsset.mutateAsync({ assetId: asset.id, filePath: asset.file_path })}
                    className="p-1 rounded hover:bg-destructive/20 text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AssetPanel;
