import { useState } from 'react';
import { X, FileText, Plus, Trash2, GripVertical, Copy, Mail, Phone, User, MessageSquare, Check, ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number' | 'date' | 'file' | 'url' | 'password' | 'hidden';
  label: string;
  placeholder: string;
  required: boolean;
  options?: string[];
  validation?: string;
  width: '100' | '50' | '33';
}

interface FormConfig {
  id: string;
  name: string;
  fields: FormField[];
  submitText: string;
  successMessage: string;
  redirectUrl: string;
  emailNotification: string;
  style: 'default' | 'modern' | 'minimal' | 'bordered';
}

const FIELD_TYPES: { type: FormField['type']; label: string; icon: typeof Mail }[] = [
  { type: 'text', label: 'Text', icon: User },
  { type: 'email', label: 'Email', icon: Mail },
  { type: 'phone', label: 'Phone', icon: Phone },
  { type: 'textarea', label: 'Message', icon: MessageSquare },
  { type: 'select', label: 'Dropdown', icon: ChevronDown },
  { type: 'checkbox', label: 'Checkbox', icon: Check },
  { type: 'radio', label: 'Radio', icon: Check },
  { type: 'number', label: 'Number', icon: FileText },
  { type: 'date', label: 'Date', icon: FileText },
  { type: 'file', label: 'File Upload', icon: FileText },
  { type: 'url', label: 'URL', icon: FileText },
];

const FORM_TEMPLATES = [
  { name: 'Contact Form', fields: [
    { type: 'text' as const, label: 'Name', placeholder: 'Your name' },
    { type: 'email' as const, label: 'Email', placeholder: 'your@email.com' },
    { type: 'textarea' as const, label: 'Message', placeholder: 'Your message...' },
  ]},
  { name: 'Newsletter Signup', fields: [
    { type: 'email' as const, label: 'Email', placeholder: 'Enter your email' },
  ]},
  { name: 'Registration', fields: [
    { type: 'text' as const, label: 'Full Name', placeholder: 'John Doe' },
    { type: 'email' as const, label: 'Email', placeholder: 'john@example.com' },
    { type: 'phone' as const, label: 'Phone', placeholder: '+1 (555) 000-0000' },
    { type: 'select' as const, label: 'Role', placeholder: 'Select role' },
  ]},
  { name: 'Feedback', fields: [
    { type: 'text' as const, label: 'Name', placeholder: 'Your name' },
    { type: 'email' as const, label: 'Email', placeholder: 'your@email.com' },
    { type: 'select' as const, label: 'Rating', placeholder: 'Rate us' },
    { type: 'textarea' as const, label: 'Feedback', placeholder: 'Tell us what you think...' },
  ]},
  { name: 'Booking Request', fields: [
    { type: 'text' as const, label: 'Name', placeholder: 'Your name' },
    { type: 'email' as const, label: 'Email', placeholder: 'your@email.com' },
    { type: 'date' as const, label: 'Preferred Date', placeholder: '' },
    { type: 'select' as const, label: 'Service', placeholder: 'Choose a service' },
    { type: 'textarea' as const, label: 'Notes', placeholder: 'Any additional notes...' },
  ]},
];

const FormBuilderPanel = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState<FormConfig>({
    id: `form-${Date.now()}`,
    name: 'Contact Form',
    fields: [],
    submitText: 'Submit',
    successMessage: 'Thank you! Your form has been submitted.',
    redirectUrl: '',
    emailNotification: '',
    style: 'modern',
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'fields' | 'settings' | 'preview'>('fields');

  const addField = (type: FormField['type']) => {
    const field: FormField = {
      id: `field-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type, label: type.charAt(0).toUpperCase() + type.slice(1),
      placeholder: '', required: false, width: '100',
      options: type === 'select' || type === 'radio' ? ['Option 1', 'Option 2', 'Option 3'] : undefined,
    };
    setForm(prev => ({ ...prev, fields: [...prev.fields, field] }));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setForm(prev => ({ ...prev, fields: prev.fields.map(f => f.id === id ? { ...f, ...updates } : f) }));
  };

  const removeField = (id: string) => {
    setForm(prev => ({ ...prev, fields: prev.fields.filter(f => f.id !== id) }));
    if (editingField === id) setEditingField(null);
  };

  const moveField = (idx: number, dir: -1 | 1) => {
    const fields = [...form.fields];
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= fields.length) return;
    [fields[idx], fields[newIdx]] = [fields[newIdx], fields[idx]];
    setForm(prev => ({ ...prev, fields }));
  };

  const applyTemplate = (template: typeof FORM_TEMPLATES[0]) => {
    const fields = template.fields.map(f => ({
      id: `field-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      ...f, required: f.type === 'email', width: '100' as const,
      options: f.type === 'select' ? ['Option 1', 'Option 2', 'Option 3'] : undefined,
    }));
    setForm(prev => ({ ...prev, name: template.name, fields }));
    toast.success(`Applied "${template.name}" template`);
  };

  const copyFormCode = () => {
    const code = `<form>\n${form.fields.map(f =>
      `  <label>${f.label}${f.required ? '*' : ''}</label>\n  <${f.type === 'textarea' ? 'textarea' : 'input type="' + f.type + '"'} placeholder="${f.placeholder}" ${f.required ? 'required' : ''} />`
    ).join('\n')}\n  <button type="submit">${form.submitText}</button>\n</form>`;
    navigator.clipboard.writeText(code);
    toast.success('Form HTML copied');
  };

  return (
    <div className="builder-sidebar w-80 border-l overflow-y-auto">
      <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60">Form Builder</h2>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={copyFormCode} className="p-1 rounded hover:opacity-70" title="Copy HTML"><Copy className="w-3.5 h-3.5" /></button>
          <button onClick={onClose} className="p-1 rounded hover:opacity-70"><X className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Form name */}
      <div className="px-3 py-2 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <input value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="property-input font-medium" />
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {(['fields', 'settings', 'preview'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-medium capitalize transition-colors ${activeTab === tab ? 'border-b-2 opacity-100' : 'opacity-50'}`}
            style={activeTab === tab ? { borderColor: 'hsl(var(--primary))' } : undefined}
          >{tab}</button>
        ))}
      </div>

      {activeTab === 'fields' && (
        <div className="p-3 space-y-3">
          {/* Templates */}
          <div>
            <label className="text-[10px] uppercase tracking-wider opacity-40 mb-2 block">Quick Templates</label>
            <div className="grid grid-cols-2 gap-1.5">
              {FORM_TEMPLATES.map(t => (
                <button key={t.name} onClick={() => applyTemplate(t)}
                  className="p-2 rounded text-[10px] font-medium text-left hover:bg-muted transition-colors"
                  style={{ border: '1px solid hsl(var(--builder-panel-border))' }}
                >{t.name}</button>
              ))}
            </div>
          </div>

          {/* Add field */}
          <div>
            <label className="text-[10px] uppercase tracking-wider opacity-40 mb-2 block">Add Field</label>
            <div className="grid grid-cols-3 gap-1.5">
              {FIELD_TYPES.map(({ type, label, icon: Icon }) => (
                <button key={type} onClick={() => addField(type)}
                  className="p-2 rounded text-center hover:bg-muted transition-colors"
                  style={{ border: '1px solid hsl(var(--builder-panel-border))' }}
                >
                  <Icon className="w-3 h-3 mx-auto mb-0.5 opacity-60" />
                  <div className="text-[9px]">{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Field list */}
          {form.fields.length > 0 && (
            <div>
              <label className="text-[10px] uppercase tracking-wider opacity-40 mb-2 block">Fields ({form.fields.length})</label>
              <div className="space-y-1.5">
                {form.fields.map((field, idx) => (
                  <div key={field.id} className="rounded-lg p-2" style={{ border: editingField === field.id ? '2px solid hsl(var(--primary))' : '1px solid hsl(var(--builder-panel-border))', background: 'hsl(var(--builder-component-bg))' }}>
                    <div className="flex items-center gap-1.5">
                      <GripVertical className="w-3 h-3 opacity-30 cursor-grab" />
                      <span className="text-xs flex-1">{field.label}</span>
                      <span className="text-[9px] opacity-40 capitalize">{field.type}</span>
                      {field.required && <span className="text-[9px] font-bold" style={{ color: 'hsl(var(--primary))' }}>*</span>}
                      <button onClick={() => moveField(idx, -1)} className="p-0.5 hover:bg-muted rounded"><ChevronUp className="w-3 h-3" /></button>
                      <button onClick={() => moveField(idx, 1)} className="p-0.5 hover:bg-muted rounded"><ChevronDown className="w-3 h-3" /></button>
                      <button onClick={() => setEditingField(editingField === field.id ? null : field.id)} className="p-0.5 hover:bg-muted rounded"><Settings className="w-3 h-3" /></button>
                      <button onClick={() => removeField(field.id)} className="p-0.5 hover:bg-destructive/10 rounded"><Trash2 className="w-3 h-3 text-destructive" /></button>
                    </div>

                    {editingField === field.id && (
                      <div className="mt-2 pt-2 space-y-2" style={{ borderTop: '1px solid hsl(var(--builder-panel-border))' }}>
                        <div><label className="text-[10px] opacity-60 block mb-0.5">Label</label>
                          <input value={field.label} onChange={e => updateField(field.id, { label: e.target.value })} className="property-input text-xs" /></div>
                        <div><label className="text-[10px] opacity-60 block mb-0.5">Placeholder</label>
                          <input value={field.placeholder} onChange={e => updateField(field.id, { placeholder: e.target.value })} className="property-input text-xs" /></div>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="checkbox" checked={field.required} onChange={e => updateField(field.id, { required: e.target.checked })} className="w-3 h-3 accent-primary" />
                            <span className="text-[10px]">Required</span>
                          </label>
                          <div className="flex items-center gap-1">
                            <label className="text-[10px] opacity-60">Width</label>
                            <select value={field.width} onChange={e => updateField(field.id, { width: e.target.value as any })} className="property-input text-[10px] w-16 py-0.5">
                              <option value="100">Full</option><option value="50">Half</option><option value="33">Third</option>
                            </select>
                          </div>
                        </div>
                        {field.options && (
                          <div><label className="text-[10px] opacity-60 block mb-0.5">Options (one per line)</label>
                            <textarea value={field.options.join('\n')} onChange={e => updateField(field.id, { options: e.target.value.split('\n') })}
                              className="property-input text-xs resize-y min-h-[50px]" rows={3} /></div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="p-3 space-y-3">
          <div><label className="text-xs opacity-70 mb-1 block">Submit Button Text</label>
            <input value={form.submitText} onChange={e => setForm(prev => ({ ...prev, submitText: e.target.value }))} className="property-input" /></div>
          <div><label className="text-xs opacity-70 mb-1 block">Success Message</label>
            <textarea value={form.successMessage} onChange={e => setForm(prev => ({ ...prev, successMessage: e.target.value }))} className="property-input resize-y min-h-[50px]" rows={2} /></div>
          <div><label className="text-xs opacity-70 mb-1 block">Redirect URL (optional)</label>
            <input value={form.redirectUrl} onChange={e => setForm(prev => ({ ...prev, redirectUrl: e.target.value }))} className="property-input" placeholder="https://" /></div>
          <div><label className="text-xs opacity-70 mb-1 block">Email Notification</label>
            <input value={form.emailNotification} onChange={e => setForm(prev => ({ ...prev, emailNotification: e.target.value }))} className="property-input" placeholder="admin@example.com" /></div>
          <div><label className="text-xs opacity-70 mb-1 block">Form Style</label>
            <select value={form.style} onChange={e => setForm(prev => ({ ...prev, style: e.target.value as any }))} className="property-input">
              <option value="default">Default</option><option value="modern">Modern</option>
              <option value="minimal">Minimal</option><option value="bordered">Bordered</option>
            </select></div>
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="p-3">
          <div className="rounded-lg p-4 space-y-3" style={{ background: 'hsl(var(--builder-component-bg))', border: '1px solid hsl(var(--builder-panel-border))' }}>
            <div className="text-xs font-semibold mb-3">{form.name}</div>
            {form.fields.map(field => (
              <div key={field.id} style={{ width: field.width === '100' ? '100%' : field.width === '50' ? '48%' : '32%', display: 'inline-block', verticalAlign: 'top', paddingRight: '4px' }}>
                <label className="text-[10px] font-medium block mb-0.5">
                  {field.label}{field.required && <span className="text-destructive ml-0.5">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea className="w-full p-1.5 rounded text-[10px]" style={{ border: '1px solid hsl(var(--builder-panel-border))', background: 'hsl(var(--background))' }} placeholder={field.placeholder} rows={2} readOnly />
                ) : field.type === 'select' ? (
                  <select className="w-full p-1.5 rounded text-[10px]" style={{ border: '1px solid hsl(var(--builder-panel-border))', background: 'hsl(var(--background))' }}>
                    <option>{field.placeholder || 'Select...'}</option>
                    {field.options?.map((o, i) => <option key={i}>{o}</option>)}
                  </select>
                ) : field.type === 'checkbox' ? (
                  <div className="flex items-center gap-1.5"><input type="checkbox" className="w-3 h-3 accent-primary" readOnly /><span className="text-[10px]">{field.placeholder || field.label}</span></div>
                ) : (
                  <input type={field.type} className="w-full p-1.5 rounded text-[10px]" style={{ border: '1px solid hsl(var(--builder-panel-border))', background: 'hsl(var(--background))' }} placeholder={field.placeholder} readOnly />
                )}
              </div>
            ))}
            {form.fields.length > 0 && (
              <button className="w-full py-2 rounded text-xs font-medium text-white mt-2" style={{ background: 'hsl(var(--primary))' }}>{form.submitText}</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilderPanel;
