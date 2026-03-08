import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjectSettings, useUpdateProjectSettings } from '@/hooks/useProjectSettings';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ProjectSettingsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { data: settings, isLoading } = useProjectSettings(projectId ?? null);
  const updateSettings = useUpdateProjectSettings();

  const [form, setForm] = useState({
    site_title: '',
    meta_description: '',
    favicon_url: '',
    og_image_url: '',
    custom_domain: '',
    analytics_scripts: '',
    custom_head_code: '',
  });

  useEffect(() => {
    if (settings) {
      setForm({
        site_title: settings.site_title || '',
        meta_description: settings.meta_description || '',
        favicon_url: settings.favicon_url || '',
        og_image_url: settings.og_image_url || '',
        custom_domain: settings.custom_domain || '',
        analytics_scripts: settings.analytics_scripts || '',
        custom_head_code: settings.custom_head_code || '',
      });
    }
  }, [settings]);

  const handleSave = async () => {
    if (!projectId) return;
    await updateSettings.mutateAsync({ projectId, updates: form });
    toast.success('Settings saved!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(220 16% 8%)' }}>
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const Field = ({ label, field, multiline }: { label: string; field: keyof typeof form; multiline?: boolean }) => (
    <div>
      <label className="block text-sm mb-1.5 font-medium" style={{ color: 'hsl(220 10% 60%)' }}>{label}</label>
      {multiline ? (
        <textarea
          value={form[field]}
          onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
          rows={4}
          className="w-full rounded-lg border px-3 py-2 text-sm bg-background font-mono"
        />
      ) : (
        <input
          value={form[field]}
          onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
          className="w-full rounded-lg border px-3 py-2 text-sm bg-background"
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: 'hsl(220 16% 8%)' }}>
      <header className="border-b px-6 py-4 flex items-center gap-4" style={{ borderColor: 'hsl(220 16% 18%)', background: 'hsl(220 16% 10%)' }}>
        <button onClick={() => navigate('/dashboard')} className="p-2 rounded hover:bg-white/10" style={{ color: 'hsl(220 10% 60%)' }}>
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-lg font-semibold" style={{ color: 'hsl(220 10% 90%)' }}>Project Settings</h1>
        <div className="flex-1" />
        <button
          onClick={handleSave}
          disabled={updateSettings.isPending}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {updateSettings.isPending ? 'Saving...' : 'Save Settings'}
        </button>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'hsl(220 10% 85%)' }}>SEO & Metadata</h2>
          <div className="space-y-4 rounded-xl p-6" style={{ background: 'hsl(220 16% 12%)' }}>
            <Field label="Site Title" field="site_title" />
            <Field label="Meta Description" field="meta_description" multiline />
            <Field label="OG Image URL" field="og_image_url" />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'hsl(220 10% 85%)' }}>Branding</h2>
          <div className="space-y-4 rounded-xl p-6" style={{ background: 'hsl(220 16% 12%)' }}>
            <Field label="Favicon URL" field="favicon_url" />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'hsl(220 10% 85%)' }}>Domain</h2>
          <div className="space-y-4 rounded-xl p-6" style={{ background: 'hsl(220 16% 12%)' }}>
            <Field label="Custom Domain" field="custom_domain" />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'hsl(220 10% 85%)' }}>Advanced</h2>
          <div className="space-y-4 rounded-xl p-6" style={{ background: 'hsl(220 16% 12%)' }}>
            <Field label="Analytics Scripts" field="analytics_scripts" multiline />
            <Field label="Custom Head Code" field="custom_head_code" multiline />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectSettingsPage;
