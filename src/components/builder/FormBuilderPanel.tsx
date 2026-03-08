import { useState, useMemo } from 'react';
import {
  X, FileText, Plus, Trash2, GripVertical, Copy, Mail, Phone, User, MessageSquare,
  Check, ChevronDown, ChevronUp, Settings, Search, Layers, Zap, Star, Eye,
  Calendar, Upload, Lock, Globe, Hash, Image, ToggleLeft, Clock, MapPin,
  CreditCard, Link, AtSign, Palette, Type, AlignLeft, ListOrdered, Sliders,
  Percent, DollarSign, Smartphone, Shield, BookOpen, Bookmark, Tag,
  ThumbsUp, Heart, Award, Target, BarChart3, PieChart, Sparkles, Gift,
  ChevronRight, Info, Columns, ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useBuilderStore } from '@/store/builderStore';

// ─── Types ─────────────────────────────────────────────────

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  options?: string[];
  validation?: string;
  width: '100' | '50' | '33';
  helpText?: string;
  defaultValue?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

interface FormConfig {
  id: string;
  name: string;
  fields: FormField[];
  submitText: string;
  successMessage: string;
  redirectUrl: string;
  emailNotification: string;
  style: 'default' | 'modern' | 'minimal' | 'bordered' | 'floating' | 'glassmorphism' | 'brutalist' | 'rounded';
  layout: 'single-column' | 'two-column' | 'inline' | 'stepped';
  submitAction: 'message' | 'redirect' | 'email' | 'webhook';
  webhookUrl: string;
  enableCaptcha: boolean;
  enableAutosave: boolean;
  enableProgressBar: boolean;
}

// ─── Field Types ───────────────────────────────────────────

const FIELD_CATEGORIES: Record<string, { icon: any; fields: { type: string; label: string; icon: any; description: string }[] }> = {
  'Basic Input': {
    icon: Type,
    fields: [
      { type: 'text', label: 'Text', icon: Type, description: 'Single line text' },
      { type: 'email', label: 'Email', icon: Mail, description: 'Email address' },
      { type: 'password', label: 'Password', icon: Lock, description: 'Password field' },
      { type: 'number', label: 'Number', icon: Hash, description: 'Numeric input' },
      { type: 'phone', label: 'Phone', icon: Phone, description: 'Phone number' },
      { type: 'url', label: 'URL', icon: Link, description: 'Website link' },
    ],
  },
  'Text & Content': {
    icon: AlignLeft,
    fields: [
      { type: 'textarea', label: 'Text Area', icon: AlignLeft, description: 'Multi-line text' },
      { type: 'rich-text', label: 'Rich Text', icon: FileText, description: 'Formatted text editor' },
      { type: 'markdown', label: 'Markdown', icon: BookOpen, description: 'Markdown editor' },
      { type: 'code', label: 'Code Input', icon: FileText, description: 'Code with syntax highlighting' },
    ],
  },
  'Selection': {
    icon: ListOrdered,
    fields: [
      { type: 'select', label: 'Dropdown', icon: ChevronDown, description: 'Select from list' },
      { type: 'multi-select', label: 'Multi Select', icon: Layers, description: 'Multiple choices' },
      { type: 'checkbox', label: 'Checkbox', icon: Check, description: 'Yes/No toggle' },
      { type: 'checkbox-group', label: 'Checkbox Group', icon: Layers, description: 'Multiple checkboxes' },
      { type: 'radio', label: 'Radio Buttons', icon: Target, description: 'Single selection' },
      { type: 'toggle', label: 'Toggle Switch', icon: ToggleLeft, description: 'On/Off switch' },
      { type: 'button-group', label: 'Button Group', icon: Columns, description: 'Selectable buttons' },
    ],
  },
  'Date & Time': {
    icon: Calendar,
    fields: [
      { type: 'date', label: 'Date', icon: Calendar, description: 'Date picker' },
      { type: 'time', label: 'Time', icon: Clock, description: 'Time picker' },
      { type: 'datetime', label: 'Date & Time', icon: Calendar, description: 'Date and time' },
      { type: 'date-range', label: 'Date Range', icon: Calendar, description: 'Start and end dates' },
    ],
  },
  'Media & Files': {
    icon: Upload,
    fields: [
      { type: 'file', label: 'File Upload', icon: Upload, description: 'Single file upload' },
      { type: 'multi-file', label: 'Multi File', icon: Upload, description: 'Multiple files' },
      { type: 'image-upload', label: 'Image Upload', icon: Image, description: 'Image with preview' },
      { type: 'avatar', label: 'Avatar Upload', icon: User, description: 'Profile picture' },
      { type: 'signature', label: 'Signature', icon: FileText, description: 'Digital signature pad' },
    ],
  },
  'Advanced': {
    icon: Sparkles,
    fields: [
      { type: 'slider', label: 'Slider', icon: Sliders, description: 'Range slider' },
      { type: 'rating', label: 'Star Rating', icon: Star, description: '1-5 star rating' },
      { type: 'color', label: 'Color Picker', icon: Palette, description: 'Color selection' },
      { type: 'address', label: 'Address', icon: MapPin, description: 'Full address fields' },
      { type: 'location', label: 'Location', icon: Globe, description: 'Map location picker' },
      { type: 'tags', label: 'Tag Input', icon: Tag, description: 'Add multiple tags' },
      { type: 'autocomplete', label: 'Autocomplete', icon: Search, description: 'Search & suggest' },
      { type: 'otp', label: 'OTP Code', icon: Shield, description: 'Verification code' },
    ],
  },
  'Payment': {
    icon: CreditCard,
    fields: [
      { type: 'credit-card', label: 'Credit Card', icon: CreditCard, description: 'Card number input' },
      { type: 'price', label: 'Price', icon: DollarSign, description: 'Currency amount' },
      { type: 'quantity', label: 'Quantity', icon: Hash, description: 'Stepper input' },
      { type: 'coupon', label: 'Coupon Code', icon: Percent, description: 'Discount code input' },
    ],
  },
  'Layout & Display': {
    icon: Columns,
    fields: [
      { type: 'heading', label: 'Section Heading', icon: Type, description: 'Form section title' },
      { type: 'paragraph', label: 'Paragraph', icon: AlignLeft, description: 'Static info text' },
      { type: 'divider', label: 'Divider', icon: ArrowRight, description: 'Horizontal line' },
      { type: 'spacer', label: 'Spacer', icon: Columns, description: 'Vertical space' },
      { type: 'hidden', label: 'Hidden Field', icon: Eye, description: 'Hidden data' },
    ],
  },
};

// ─── Templates ─────────────────────────────────────────────

const FORM_TEMPLATES = [
  {
    name: 'Contact Form', category: 'Basic', icon: '📧', description: 'Name, email, and message',
    fields: [
      { type: 'text', label: 'Full Name', placeholder: 'John Doe', required: true },
      { type: 'email', label: 'Email Address', placeholder: 'john@example.com', required: true },
      { type: 'phone', label: 'Phone', placeholder: '+1 (555) 000-0000', required: false },
      { type: 'textarea', label: 'Message', placeholder: 'How can we help?', required: true },
    ],
  },
  {
    name: 'Newsletter Signup', category: 'Marketing', icon: '📬', description: 'Email opt-in with consent',
    fields: [
      { type: 'text', label: 'First Name', placeholder: 'Enter your name', required: false },
      { type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
      { type: 'checkbox', label: 'I agree to receive marketing emails', placeholder: '', required: true },
    ],
  },
  {
    name: 'Registration', category: 'Auth', icon: '👤', description: 'User signup form',
    fields: [
      { type: 'text', label: 'Full Name', placeholder: 'John Doe', required: true },
      { type: 'email', label: 'Email', placeholder: 'john@example.com', required: true },
      { type: 'password', label: 'Password', placeholder: '••••••••', required: true },
      { type: 'password', label: 'Confirm Password', placeholder: '••••••••', required: true },
      { type: 'checkbox', label: 'I agree to the Terms of Service', placeholder: '', required: true },
    ],
  },
  {
    name: 'Login Form', category: 'Auth', icon: '🔐', description: 'Email & password login',
    fields: [
      { type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
      { type: 'password', label: 'Password', placeholder: '••••••••', required: true },
      { type: 'checkbox', label: 'Remember me', placeholder: '', required: false },
    ],
  },
  {
    name: 'Feedback Survey', category: 'Feedback', icon: '⭐', description: 'Rating and comments',
    fields: [
      { type: 'text', label: 'Name', placeholder: 'Your name', required: false },
      { type: 'email', label: 'Email', placeholder: 'your@email.com', required: false },
      { type: 'rating', label: 'Overall Rating', placeholder: '', required: true },
      { type: 'select', label: 'Category', placeholder: 'Select topic', required: true },
      { type: 'textarea', label: 'Comments', placeholder: 'Tell us what you think...', required: false },
    ],
  },
  {
    name: 'Booking Request', category: 'Booking', icon: '📅', description: 'Appointment scheduler',
    fields: [
      { type: 'text', label: 'Full Name', placeholder: 'Your name', required: true },
      { type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
      { type: 'phone', label: 'Phone', placeholder: '+1 (555) 000-0000', required: true },
      { type: 'date', label: 'Preferred Date', placeholder: '', required: true },
      { type: 'time', label: 'Preferred Time', placeholder: '', required: true },
      { type: 'select', label: 'Service', placeholder: 'Choose a service', required: true },
      { type: 'textarea', label: 'Special Requests', placeholder: 'Any notes...', required: false },
    ],
  },
  {
    name: 'Job Application', category: 'HR', icon: '💼', description: 'Resume and cover letter',
    fields: [
      { type: 'text', label: 'Full Name', placeholder: 'Jane Smith', required: true },
      { type: 'email', label: 'Email', placeholder: 'jane@example.com', required: true },
      { type: 'phone', label: 'Phone', placeholder: '+1 (555) 000-0000', required: true },
      { type: 'url', label: 'LinkedIn Profile', placeholder: 'https://linkedin.com/in/...', required: false },
      { type: 'url', label: 'Portfolio URL', placeholder: 'https://...', required: false },
      { type: 'select', label: 'Position', placeholder: 'Select role', required: true },
      { type: 'file', label: 'Resume (PDF)', placeholder: '', required: true },
      { type: 'textarea', label: 'Cover Letter', placeholder: 'Tell us why you\'re a great fit...', required: false },
    ],
  },
  {
    name: 'Order / Checkout', category: 'E-commerce', icon: '🛒', description: 'Shipping + payment',
    fields: [
      { type: 'text', label: 'Full Name', placeholder: 'Name on card', required: true },
      { type: 'email', label: 'Email', placeholder: 'for receipt', required: true },
      { type: 'address', label: 'Shipping Address', placeholder: '', required: true },
      { type: 'phone', label: 'Phone', placeholder: '+1 (555) 000-0000', required: true },
      { type: 'credit-card', label: 'Card Number', placeholder: '4242 4242 4242 4242', required: true },
      { type: 'coupon', label: 'Coupon Code', placeholder: 'Enter discount code', required: false },
    ],
  },
  {
    name: 'Event RSVP', category: 'Events', icon: '🎉', description: 'Event registration',
    fields: [
      { type: 'text', label: 'Name', placeholder: 'Your name', required: true },
      { type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
      { type: 'number', label: 'Number of Guests', placeholder: '1', required: true },
      { type: 'select', label: 'Dietary Preference', placeholder: 'Select...', required: false },
      { type: 'textarea', label: 'Message', placeholder: 'Anything we should know?', required: false },
    ],
  },
  {
    name: 'Support Ticket', category: 'Support', icon: '🎫', description: 'Issue reporting',
    fields: [
      { type: 'text', label: 'Subject', placeholder: 'Brief description', required: true },
      { type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
      { type: 'select', label: 'Priority', placeholder: 'Select priority', required: true },
      { type: 'select', label: 'Category', placeholder: 'Select category', required: true },
      { type: 'textarea', label: 'Description', placeholder: 'Describe your issue in detail...', required: true },
      { type: 'file', label: 'Attachment', placeholder: '', required: false },
    ],
  },
  {
    name: 'NPS Survey', category: 'Feedback', icon: '📊', description: 'Net Promoter Score',
    fields: [
      { type: 'rating', label: 'How likely are you to recommend us? (0-10)', placeholder: '', required: true },
      { type: 'textarea', label: 'What\'s the main reason for your score?', placeholder: 'Tell us more...', required: false },
      { type: 'select', label: 'What could we improve?', placeholder: 'Select area', required: false },
    ],
  },
  {
    name: 'Quiz / Assessment', category: 'Engagement', icon: '🧠', description: 'Multi-question quiz',
    fields: [
      { type: 'text', label: 'Your Name', placeholder: 'Name', required: true },
      { type: 'radio', label: 'Question 1: What is 2+2?', placeholder: '', required: true },
      { type: 'radio', label: 'Question 2: Capital of France?', placeholder: '', required: true },
      { type: 'checkbox-group', label: 'Question 3: Select all that apply', placeholder: '', required: true },
      { type: 'textarea', label: 'Bonus: Explain your reasoning', placeholder: '', required: false },
    ],
  },
  {
    name: 'Multi-Step Wizard', category: 'Advanced', icon: '🧙', description: 'Step-by-step form',
    fields: [
      { type: 'heading', label: 'Step 1: Personal Info', placeholder: '', required: false },
      { type: 'text', label: 'Full Name', placeholder: 'Your name', required: true },
      { type: 'email', label: 'Email', placeholder: 'email@example.com', required: true },
      { type: 'divider', label: '', placeholder: '', required: false },
      { type: 'heading', label: 'Step 2: Preferences', placeholder: '', required: false },
      { type: 'select', label: 'Industry', placeholder: 'Choose...', required: true },
      { type: 'checkbox-group', label: 'Interests', placeholder: '', required: false },
      { type: 'divider', label: '', placeholder: '', required: false },
      { type: 'heading', label: 'Step 3: Confirm', placeholder: '', required: false },
      { type: 'checkbox', label: 'I agree to the terms', placeholder: '', required: true },
    ],
  },
  {
    name: 'Waitlist', category: 'Marketing', icon: '⏳', description: 'Early access signup',
    fields: [
      { type: 'text', label: 'Name', placeholder: 'Your name', required: true },
      { type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
      { type: 'select', label: 'How did you hear about us?', placeholder: 'Select...', required: false },
      { type: 'textarea', label: 'What feature are you most excited about?', placeholder: '', required: false },
    ],
  },
  {
    name: 'Product Review', category: 'E-commerce', icon: '🌟', description: 'Rate & review product',
    fields: [
      { type: 'text', label: 'Display Name', placeholder: 'Your name', required: true },
      { type: 'rating', label: 'Rating', placeholder: '', required: true },
      { type: 'text', label: 'Review Title', placeholder: 'Summarize your experience', required: true },
      { type: 'textarea', label: 'Review', placeholder: 'Write your review...', required: true },
      { type: 'image-upload', label: 'Add Photos', placeholder: '', required: false },
      { type: 'checkbox', label: 'I recommend this product', placeholder: '', required: false },
    ],
  },
  {
    name: 'Donation Form', category: 'Nonprofit', icon: '❤️', description: 'Accept donations',
    fields: [
      { type: 'text', label: 'Name', placeholder: 'Your name', required: true },
      { type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
      { type: 'button-group', label: 'Donation Amount', placeholder: '', required: true },
      { type: 'price', label: 'Custom Amount', placeholder: '$0.00', required: false },
      { type: 'checkbox', label: 'Make this a monthly donation', placeholder: '', required: false },
      { type: 'textarea', label: 'Leave a message', placeholder: 'Optional message...', required: false },
    ],
  },
];

// ─── Section Component ─────────────────────────────────────

const Section = ({ title, icon: Icon, children, defaultOpen = false, badge }: { title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean; badge?: string | number }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-b border-border/30">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium">{title}</span>
          {badge !== undefined && <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{badge}</Badge>}
        </div>
        <ChevronRight className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

// ─── Main Component ────────────────────────────────────────

const FormBuilderPanel = ({ onClose }: { onClose: () => void }) => {
  const { schema, addComponent } = useBuilderStore();

  const [form, setForm] = useState<FormConfig>({
    id: `form-${Date.now()}`,
    name: 'My Form',
    fields: [],
    submitText: 'Submit',
    successMessage: 'Thank you! Your form has been submitted.',
    redirectUrl: '',
    emailNotification: '',
    style: 'modern',
    layout: 'single-column',
    submitAction: 'message',
    webhookUrl: '',
    enableCaptcha: false,
    enableAutosave: false,
    enableProgressBar: false,
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'templates' | 'elements' | 'builder' | 'settings'>('templates');
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateFilter, setTemplateFilter] = useState('all');
  const [componentSearch, setComponentSearch] = useState('');

  // ─── Helpers ───────────────────

  const addField = (type: string) => {
    const field: FormField = {
      id: `field-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type,
      label: type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' '),
      placeholder: '',
      required: false,
      width: '100',
      options: ['select', 'multi-select', 'radio', 'checkbox-group', 'button-group'].includes(type)
        ? ['Option 1', 'Option 2', 'Option 3']
        : undefined,
    };
    setForm(prev => ({ ...prev, fields: [...prev.fields, field] }));
    setActiveTab('builder');
    toast.success(`Added ${field.label} field`);
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
    const fields: FormField[] = template.fields.map(f => ({
      id: `field-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: f.type,
      label: f.label,
      placeholder: f.placeholder,
      required: f.required,
      width: '100' as const,
      options: ['select', 'multi-select', 'radio', 'checkbox-group', 'button-group'].includes(f.type)
        ? ['Option 1', 'Option 2', 'Option 3']
        : undefined,
    }));
    setForm(prev => ({ ...prev, name: template.name, fields }));
    setActiveTab('builder');
    toast.success(`Applied "${template.name}" template`);
  };

  const addFormToPage = () => {
    const bodySection = schema.sections.find(s => s.type === 'body');
    if (bodySection) {
      addComponent(bodySection.id, {
        id: `form-${Date.now()}`,
        type: 'form',
        category: 'forms',
        label: form.name,
        content: '',
        props: { fields: form.fields, config: form },
        children: [],
        styles: { padding: '24px' },
      });
      toast.success(`"${form.name}" added to page`);
    }
  };

  const copyFormCode = () => {
    const code = `<form>\n${form.fields.map(f =>
      `  <label>${f.label}${f.required ? '*' : ''}</label>\n  <${f.type === 'textarea' ? 'textarea' : 'input type="' + f.type + '"'} placeholder="${f.placeholder}" ${f.required ? 'required' : ''} />`
    ).join('\n')}\n  <button type="submit">${form.submitText}</button>\n</form>`;
    navigator.clipboard.writeText(code);
    toast.success('Form HTML copied to clipboard');
  };

  // ─── Filtering ─────────────────

  const templateCategories = ['all', ...new Set(FORM_TEMPLATES.map(t => t.category))];

  const filteredTemplates = useMemo(() =>
    FORM_TEMPLATES.filter(t => {
      const matchSearch = !templateSearch || t.name.toLowerCase().includes(templateSearch.toLowerCase()) || t.description.toLowerCase().includes(templateSearch.toLowerCase());
      const matchCat = templateFilter === 'all' || t.category === templateFilter;
      return matchSearch && matchCat;
    }),
  [templateSearch, templateFilter]);

  const filteredComponents = useMemo(() => {
    if (!componentSearch) return FIELD_CATEGORIES;
    const result: typeof FIELD_CATEGORIES = {};
    Object.entries(FIELD_CATEGORIES).forEach(([cat, data]) => {
      const matching = data.fields.filter(f =>
        f.label.toLowerCase().includes(componentSearch.toLowerCase()) ||
        f.description.toLowerCase().includes(componentSearch.toLowerCase())
      );
      if (matching.length) result[cat] = { ...data, fields: matching };
    });
    return result;
  }, [componentSearch]);

  const totalFieldTypes = Object.values(FIELD_CATEGORIES).reduce((sum, c) => sum + c.fields.length, 0);

  return (
    <div className="builder-flyout flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Forms</h2>
            <p className="text-[10px] text-muted-foreground">{FORM_TEMPLATES.length} templates • {totalFieldTypes} field types</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={copyFormCode} className="p-1.5 rounded hover:bg-muted" title="Copy HTML"><Copy className="w-3.5 h-3.5" /></button>
          {onClose && <button onClick={onClose} className="p-1.5 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border shrink-0">
        {[
          { id: 'templates' as const, label: 'Templates', icon: Layers },
          { id: 'elements' as const, label: 'Elements', icon: Zap },
          { id: 'builder' as const, label: 'Builder', icon: Settings },
          { id: 'settings' as const, label: 'Config', icon: Sliders },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
              activeTab === id ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground'
            }`}
          >
            <Icon className="w-3 h-3" /> {label}
            {id === 'builder' && form.fields.length > 0 && (
              <Badge variant="secondary" className="text-[9px] px-1 py-0">{form.fields.length}</Badge>
            )}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        {/* ════════════════════════════════════════════════════ */}
        {/* TEMPLATES TAB */}
        {/* ════════════════════════════════════════════════════ */}
        {activeTab === 'templates' && (
          <div className="divide-y divide-border/30">
            <div className="p-3">
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={templateSearch}
                  onChange={e => setTemplateSearch(e.target.value)}
                  placeholder="Search form templates..."
                  className="w-full bg-muted/30 border-0 rounded-lg pl-8 pr-3 py-2 text-xs placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {templateCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setTemplateFilter(cat)}
                    className={`px-2.5 py-1 rounded-full text-[9px] font-medium capitalize transition-colors ${
                      templateFilter === cat ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 space-y-2">
              {filteredTemplates.map(template => (
                <button
                  key={template.name}
                  onClick={() => applyTemplate(template)}
                  className="w-full p-3 rounded-lg text-left border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl shrink-0">
                      {template.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium group-hover:text-primary transition-colors">{template.name}</span>
                        <Badge variant="secondary" className="text-[8px]">{template.category}</Badge>
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{template.description}</div>
                      <div className="text-[9px] text-muted-foreground/60 mt-0.5">{template.fields.length} fields</div>
                    </div>
                    <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 text-primary shrink-0" />
                  </div>
                </button>
              ))}
              {filteredTemplates.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">No templates match your search</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════ */}
        {/* ELEMENTS TAB */}
        {/* ════════════════════════════════════════════════════ */}
        {activeTab === 'elements' && (
          <div className="divide-y divide-border/30">
            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={componentSearch}
                  onChange={e => setComponentSearch(e.target.value)}
                  placeholder="Search form elements..."
                  className="w-full bg-muted/30 border-0 rounded-lg pl-8 pr-3 py-2 text-xs placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {Object.entries(filteredComponents).map(([category, data]) => (
              <Section key={category} title={category} icon={data.icon} badge={data.fields.length} defaultOpen={category === 'Basic Input'}>
                <div className="grid grid-cols-2 gap-1.5">
                  {data.fields.map(field => (
                    <button
                      key={field.type}
                      onClick={() => addField(field.type)}
                      className="p-2.5 rounded-lg text-left transition-all hover:scale-[1.02] border border-border/50 hover:border-primary/50 hover:bg-primary/5 group"
                    >
                      <div className="flex items-center gap-2">
                        <field.icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        <div className="min-w-0">
                          <div className="text-[10px] font-medium truncate group-hover:text-primary transition-colors">{field.label}</div>
                          <div className="text-[8px] text-muted-foreground truncate">{field.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Section>
            ))}
          </div>
        )}

        {/* ════════════════════════════════════════════════════ */}
        {/* BUILDER TAB */}
        {/* ════════════════════════════════════════════════════ */}
        {activeTab === 'builder' && (
          <div className="p-3 space-y-3">
            {/* Form name */}
            <div>
              <label className="text-[11px] font-medium mb-1.5 block">Form Name</label>
              <input
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
              />
            </div>

            {/* Quick add */}
            <div>
              <label className="text-[11px] font-medium mb-1.5 block">Quick Add Field</label>
              <div className="flex flex-wrap gap-1.5">
                {['text', 'email', 'phone', 'textarea', 'select', 'checkbox', 'date', 'file', 'rating'].map(type => (
                  <button
                    key={type}
                    onClick={() => addField(type)}
                    className="px-2.5 py-1.5 rounded-md text-[9px] font-medium capitalize bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors border border-border/30"
                  >
                    + {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Field list */}
            {form.fields.length === 0 ? (
              <div className="text-center py-10">
                <Layers className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
                <div className="text-sm font-medium mb-1">No fields yet</div>
                <div className="text-xs text-muted-foreground">Choose a template or add fields from the Elements tab</div>
              </div>
            ) : (
              <div>
                <label className="text-[11px] font-medium mb-1.5 block">Fields ({form.fields.length})</label>
                <div className="space-y-1.5">
                  {form.fields.map((field, idx) => (
                    <div
                      key={field.id}
                      className={`rounded-lg p-2.5 border transition-colors ${
                        editingField === field.id ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-border'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <GripVertical className="w-3 h-3 text-muted-foreground/50 cursor-grab shrink-0" />
                        <span className="text-xs flex-1 truncate">{field.label}</span>
                        <Badge variant="secondary" className="text-[8px] capitalize shrink-0">{field.type}</Badge>
                        {field.required && <span className="text-[9px] font-bold text-primary">*</span>}
                        <button onClick={() => moveField(idx, -1)} className="p-0.5 hover:bg-muted rounded"><ChevronUp className="w-3 h-3" /></button>
                        <button onClick={() => moveField(idx, 1)} className="p-0.5 hover:bg-muted rounded"><ChevronDown className="w-3 h-3" /></button>
                        <button
                          onClick={() => setEditingField(editingField === field.id ? null : field.id)}
                          className={`p-0.5 rounded ${editingField === field.id ? 'bg-primary/20 text-primary' : 'hover:bg-muted'}`}
                        >
                          <Settings className="w-3 h-3" />
                        </button>
                        <button onClick={() => removeField(field.id)} className="p-0.5 hover:bg-destructive/10 rounded">
                          <Trash2 className="w-3 h-3 text-destructive" />
                        </button>
                      </div>

                      {editingField === field.id && (
                        <div className="mt-2.5 pt-2.5 space-y-2 border-t border-border/30">
                          <div>
                            <label className="text-[10px] text-muted-foreground block mb-0.5">Label</label>
                            <input value={field.label} onChange={e => updateField(field.id, { label: e.target.value })} className="w-full bg-muted/30 border-0 rounded px-2.5 py-1.5 text-xs" />
                          </div>
                          <div>
                            <label className="text-[10px] text-muted-foreground block mb-0.5">Placeholder</label>
                            <input value={field.placeholder} onChange={e => updateField(field.id, { placeholder: e.target.value })} className="w-full bg-muted/30 border-0 rounded px-2.5 py-1.5 text-xs" />
                          </div>
                          <div>
                            <label className="text-[10px] text-muted-foreground block mb-0.5">Help Text</label>
                            <input value={field.helpText || ''} onChange={e => updateField(field.id, { helpText: e.target.value })} className="w-full bg-muted/30 border-0 rounded px-2.5 py-1.5 text-xs" placeholder="Optional helper text" />
                          </div>
                          <div>
                            <label className="text-[10px] text-muted-foreground block mb-0.5">Default Value</label>
                            <input value={field.defaultValue || ''} onChange={e => updateField(field.id, { defaultValue: e.target.value })} className="w-full bg-muted/30 border-0 rounded px-2.5 py-1.5 text-xs" />
                          </div>
                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input type="checkbox" checked={field.required} onChange={e => updateField(field.id, { required: e.target.checked })} className="w-3 h-3 rounded accent-primary" />
                              <span className="text-[10px]">Required</span>
                            </label>
                            <div className="flex items-center gap-1">
                              <label className="text-[10px] text-muted-foreground">Width</label>
                              <select value={field.width} onChange={e => updateField(field.id, { width: e.target.value as any })} className="bg-muted/30 border-0 rounded px-2 py-1 text-[10px]">
                                <option value="100">Full</option>
                                <option value="50">Half</option>
                                <option value="33">Third</option>
                              </select>
                            </div>
                          </div>
                          {field.options && (
                            <div>
                              <label className="text-[10px] text-muted-foreground block mb-0.5">Options (one per line)</label>
                              <textarea
                                value={field.options.join('\n')}
                                onChange={e => updateField(field.id, { options: e.target.value.split('\n') })}
                                className="w-full bg-muted/30 border-0 rounded px-2.5 py-1.5 text-xs resize-y min-h-[50px]"
                                rows={3}
                              />
                            </div>
                          )}
                          {['text', 'email', 'password', 'textarea'].includes(field.type) && (
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[10px] text-muted-foreground block mb-0.5">Min Length</label>
                                <input type="number" value={field.minLength || ''} onChange={e => updateField(field.id, { minLength: Number(e.target.value) || undefined })} className="w-full bg-muted/30 border-0 rounded px-2.5 py-1.5 text-xs" />
                              </div>
                              <div>
                                <label className="text-[10px] text-muted-foreground block mb-0.5">Max Length</label>
                                <input type="number" value={field.maxLength || ''} onChange={e => updateField(field.id, { maxLength: Number(e.target.value) || undefined })} className="w-full bg-muted/30 border-0 rounded px-2.5 py-1.5 text-xs" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            {form.fields.length > 0 && (
              <div className="flex gap-2 pt-2">
                <button onClick={addFormToPage} className="flex-1 py-2.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Add to Page
                </button>
                <button onClick={copyFormCode} className="px-4 py-2.5 rounded-lg text-xs font-medium border border-border hover:bg-muted transition-colors">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Preview */}
            {form.fields.length > 0 && (
              <div className="mt-3 rounded-lg overflow-hidden border border-border">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground p-2 bg-muted/30 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Preview
                </div>
                <div className="p-4 space-y-2.5">
                  <div className="text-xs font-semibold mb-3">{form.name}</div>
                  {form.fields.map(field => (
                    <div key={field.id} style={{ width: field.width === '100' ? '100%' : field.width === '50' ? '48%' : '32%', display: 'inline-block', verticalAlign: 'top', paddingRight: '4px' }}>
                      {field.type === 'heading' ? (
                        <div className="text-xs font-semibold mt-2 mb-1">{field.label}</div>
                      ) : field.type === 'divider' ? (
                        <hr className="my-2 border-border" />
                      ) : field.type === 'spacer' ? (
                        <div className="h-4" />
                      ) : field.type === 'paragraph' ? (
                        <p className="text-[10px] text-muted-foreground">{field.label}</p>
                      ) : (
                        <>
                          <label className="text-[10px] font-medium block mb-0.5">
                            {field.label}{field.required && <span className="text-destructive ml-0.5">*</span>}
                          </label>
                          {field.type === 'textarea' || field.type === 'rich-text' || field.type === 'markdown' ? (
                            <div className="w-full p-1.5 rounded text-[10px] border border-border bg-background min-h-[40px]" />
                          ) : field.type === 'select' || field.type === 'multi-select' ? (
                            <div className="w-full p-1.5 rounded text-[10px] border border-border bg-background flex items-center justify-between">
                              <span className="text-muted-foreground">{field.placeholder || 'Select...'}</span>
                              <ChevronDown className="w-3 h-3 text-muted-foreground" />
                            </div>
                          ) : field.type === 'checkbox' || field.type === 'toggle' ? (
                            <div className="flex items-center gap-1.5">
                              <div className="w-3.5 h-3.5 rounded border border-border bg-background" />
                              <span className="text-[10px]">{field.placeholder || field.label}</span>
                            </div>
                          ) : field.type === 'radio' ? (
                            <div className="space-y-1">
                              {(field.options || ['Option 1', 'Option 2']).slice(0, 3).map((o, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                  <div className="w-3.5 h-3.5 rounded-full border border-border bg-background" />
                                  <span className="text-[10px]">{o}</span>
                                </div>
                              ))}
                            </div>
                          ) : field.type === 'rating' ? (
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map(n => (
                                <Star key={n} className="w-4 h-4 text-muted-foreground/40" />
                              ))}
                            </div>
                          ) : field.type === 'file' || field.type === 'multi-file' || field.type === 'image-upload' || field.type === 'avatar' ? (
                            <div className="w-full p-3 rounded border border-dashed border-border bg-background text-center">
                              <Upload className="w-4 h-4 mx-auto mb-1 text-muted-foreground/50" />
                              <div className="text-[9px] text-muted-foreground">Click or drag to upload</div>
                            </div>
                          ) : field.type === 'color' ? (
                            <div className="w-full flex items-center gap-2">
                              <div className="w-8 h-8 rounded bg-primary border border-border" />
                              <span className="text-[10px] text-muted-foreground">#6366f1</span>
                            </div>
                          ) : field.type === 'slider' ? (
                            <div className="w-full h-2 rounded-full bg-muted relative mt-2">
                              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background shadow" />
                            </div>
                          ) : field.type === 'button-group' ? (
                            <div className="flex gap-1">
                              {(field.options || ['$10', '$25', '$50']).map((o, i) => (
                                <div key={i} className={`px-3 py-1.5 rounded text-[9px] font-medium ${i === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>{o}</div>
                              ))}
                            </div>
                          ) : field.type === 'otp' ? (
                            <div className="flex gap-1.5">
                              {[1, 2, 3, 4, 5, 6].map(n => (
                                <div key={n} className="w-8 h-10 rounded border border-border bg-background" />
                              ))}
                            </div>
                          ) : (
                            <div className="w-full p-1.5 rounded text-[10px] border border-border bg-background text-muted-foreground">
                              {field.placeholder || field.type}
                            </div>
                          )}
                          {field.helpText && <div className="text-[8px] text-muted-foreground mt-0.5">{field.helpText}</div>}
                        </>
                      )}
                    </div>
                  ))}
                  <button className="w-full py-2 rounded-md text-xs font-medium bg-primary text-primary-foreground mt-2">
                    {form.submitText}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════ */}
        {/* SETTINGS TAB */}
        {/* ════════════════════════════════════════════════════ */}
        {activeTab === 'settings' && (
          <div className="p-3 space-y-4">
            <div>
              <label className="text-[11px] font-medium mb-1.5 block">Submit Button Text</label>
              <input value={form.submitText} onChange={e => setForm(prev => ({ ...prev, submitText: e.target.value }))} className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" />
            </div>

            <div>
              <label className="text-[11px] font-medium mb-1.5 block">Form Style</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['default', 'modern', 'minimal', 'bordered', 'floating', 'glassmorphism', 'brutalist', 'rounded'] as const).map(style => (
                  <button
                    key={style}
                    onClick={() => setForm(prev => ({ ...prev, style }))}
                    className={`p-2 rounded-md text-[10px] capitalize transition-colors ${
                      form.style === style ? 'bg-primary/10 ring-1 ring-primary text-primary' : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-medium mb-1.5 block">Layout</label>
              <select value={form.layout} onChange={e => setForm(prev => ({ ...prev, layout: e.target.value as any }))} className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs">
                <option value="single-column">Single Column</option>
                <option value="two-column">Two Columns</option>
                <option value="inline">Inline</option>
                <option value="stepped">Multi-Step</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-medium mb-1.5 block">On Submit</label>
              <select value={form.submitAction} onChange={e => setForm(prev => ({ ...prev, submitAction: e.target.value as any }))} className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs">
                <option value="message">Show Success Message</option>
                <option value="redirect">Redirect to URL</option>
                <option value="email">Send Email Notification</option>
                <option value="webhook">Send to Webhook</option>
              </select>
            </div>

            {form.submitAction === 'message' && (
              <div>
                <label className="text-[11px] font-medium mb-1.5 block">Success Message</label>
                <textarea value={form.successMessage} onChange={e => setForm(prev => ({ ...prev, successMessage: e.target.value }))} className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs resize-y min-h-[60px]" rows={2} />
              </div>
            )}
            {form.submitAction === 'redirect' && (
              <div>
                <label className="text-[11px] font-medium mb-1.5 block">Redirect URL</label>
                <input value={form.redirectUrl} onChange={e => setForm(prev => ({ ...prev, redirectUrl: e.target.value }))} className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" placeholder="https://..." />
              </div>
            )}
            {form.submitAction === 'email' && (
              <div>
                <label className="text-[11px] font-medium mb-1.5 block">Notification Email</label>
                <input value={form.emailNotification} onChange={e => setForm(prev => ({ ...prev, emailNotification: e.target.value }))} className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" placeholder="admin@example.com" />
              </div>
            )}
            {form.submitAction === 'webhook' && (
              <div>
                <label className="text-[11px] font-medium mb-1.5 block">Webhook URL</label>
                <input value={form.webhookUrl} onChange={e => setForm(prev => ({ ...prev, webhookUrl: e.target.value }))} className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" placeholder="https://hooks.example.com/..." />
              </div>
            )}

            {/* Toggles */}
            <div className="space-y-2">
              <label className="text-[11px] font-medium block">Features</label>
              {[
                { key: 'enableCaptcha', label: 'Enable CAPTCHA', description: 'Bot protection' },
                { key: 'enableAutosave', label: 'Autosave Progress', description: 'Save partial entries' },
                { key: 'enableProgressBar', label: 'Progress Bar', description: 'Show completion progress' },
              ].map(item => (
                <label key={item.key} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 cursor-pointer">
                  <div>
                    <div className="text-[11px] font-medium">{item.label}</div>
                    <div className="text-[9px] text-muted-foreground">{item.description}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={(form as any)[item.key]}
                    onChange={e => setForm(prev => ({ ...prev, [item.key]: e.target.checked }))}
                    className="w-4 h-4 rounded accent-primary"
                  />
                </label>
              ))}
            </div>

            {/* Info */}
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="text-[10px] text-muted-foreground">
                  Forms are added to your page as components. Configure validation, styling, and submission behavior here, then click "Add to Page" in the Builder tab.
                </div>
              </div>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default FormBuilderPanel;
