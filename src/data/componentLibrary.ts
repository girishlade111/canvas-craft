import type { ComponentDefinition, ComponentCategory } from '@/types/builder';

export const componentLibrary: Record<ComponentCategory, ComponentDefinition[]> = {
  Basic: [
    { type: 'section', label: 'Section', category: 'Basic', icon: 'LayoutTemplate', defaultStyles: { padding: '40px 20px', width: '100%' } },
    { type: 'container', label: 'Container', category: 'Basic', icon: 'Square', defaultStyles: { padding: '20px', maxWidth: '1200px', margin: '0 auto' } as any },
    { type: 'divider', label: 'Divider', category: 'Basic', icon: 'Minus', defaultStyles: { width: '100%', height: '1px', backgroundColor: '#e5e7eb' } },
    { type: 'spacer', label: 'Spacer', category: 'Basic', icon: 'MoveVertical', defaultStyles: { width: '100%', height: '40px' } },
  ],
  Text: [
    { type: 'heading', label: 'Heading', category: 'Text', icon: 'Type', defaultContent: 'Heading Text', defaultStyles: { fontSize: '32px', fontWeight: '700' } },
    { type: 'paragraph', label: 'Paragraph', category: 'Text', icon: 'AlignLeft', defaultContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', defaultStyles: { fontSize: '16px', lineHeight: '1.6' } as any },
    { type: 'subheading', label: 'Subheading', category: 'Text', icon: 'Heading2', defaultContent: 'Subheading Text', defaultStyles: { fontSize: '24px', fontWeight: '600' } },
    { type: 'list', label: 'List', category: 'Text', icon: 'List', defaultContent: 'Item 1\nItem 2\nItem 3', defaultStyles: { fontSize: '16px', padding: '0 0 0 20px' } },
    { type: 'quote', label: 'Quote', category: 'Text', icon: 'Quote', defaultContent: '"Design is not just what it looks like and feels like. Design is how it works."', defaultStyles: { fontSize: '18px', fontWeight: '500', padding: '20px', borderRadius: '8px' } },
  ],
  Media: [
    { type: 'image', label: 'Image', category: 'Media', icon: 'Image', defaultStyles: { width: '100%', height: 'auto' }, defaultProps: { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800', alt: 'Placeholder' } },
    { type: 'video', label: 'Video', category: 'Media', icon: 'Video', defaultStyles: { width: '100%' }, defaultProps: { src: '' } },
    { type: 'gallery', label: 'Gallery', category: 'Media', icon: 'GalleryHorizontal', defaultStyles: { display: 'grid', gap: '10px' } },
    { type: 'background-video', label: 'Background Video', category: 'Media', icon: 'MonitorPlay', defaultStyles: { width: '100%', height: '400px' } },
  ],
  Layout: [
    { type: 'hero', label: 'Hero Section', category: 'Layout', icon: 'Sparkles', defaultContent: 'Build Something Amazing', defaultStyles: { padding: '80px 20px', textAlign: 'center', fontSize: '48px', fontWeight: '700' } },
    { type: 'grid', label: 'Grid', category: 'Layout', icon: 'Grid3x3', defaultStyles: { display: 'grid', gap: '20px' }, defaultProps: { columns: 3 } },
    { type: 'columns', label: 'Columns', category: 'Layout', icon: 'Columns3', defaultStyles: { display: 'flex', gap: '20px' } },
    { type: 'card', label: 'Card', category: 'Layout', icon: 'RectangleHorizontal', defaultContent: 'Card Content', defaultStyles: { padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' } },
    { type: 'tabs', label: 'Tabs', category: 'Layout', icon: 'PanelTop', defaultStyles: {} },
    { type: 'accordion', label: 'Accordion', category: 'Layout', icon: 'ChevronDown', defaultStyles: {} },
  ],
  Forms: [
    { type: 'input', label: 'Input', category: 'Forms', icon: 'TextCursorInput', defaultStyles: { width: '100%' }, defaultProps: { placeholder: 'Enter text...', label: 'Label' } },
    { type: 'textarea', label: 'Textarea', category: 'Forms', icon: 'FileText', defaultStyles: { width: '100%' }, defaultProps: { placeholder: 'Enter text...', label: 'Message' } },
    { type: 'select', label: 'Select', category: 'Forms', icon: 'ChevronDown', defaultStyles: { width: '100%' }, defaultProps: { label: 'Select option' } },
    { type: 'checkbox', label: 'Checkbox', category: 'Forms', icon: 'CheckSquare', defaultStyles: {}, defaultProps: { label: 'Check me' } },
    { type: 'login-form', label: 'Login Form', category: 'Forms', icon: 'LogIn', defaultStyles: { padding: '32px', maxWidth: '400px' } as any },
    { type: 'signup-form', label: 'Signup Form', category: 'Forms', icon: 'UserPlus', defaultStyles: { padding: '32px', maxWidth: '400px' } as any },
    { type: 'contact-form', label: 'Contact Form', category: 'Forms', icon: 'Mail', defaultStyles: { padding: '32px', maxWidth: '600px' } as any },
  ],
  Ecommerce: [
    { type: 'product-card', label: 'Product Card', category: 'Ecommerce', icon: 'ShoppingBag', defaultStyles: { padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb' } },
    { type: 'product-grid', label: 'Product Grid', category: 'Ecommerce', icon: 'LayoutGrid', defaultStyles: { display: 'grid', gap: '20px' } },
    { type: 'shopping-cart', label: 'Shopping Cart', category: 'Ecommerce', icon: 'ShoppingCart', defaultStyles: { padding: '24px' } },
    { type: 'checkout', label: 'Checkout', category: 'Ecommerce', icon: 'CreditCard', defaultStyles: { padding: '32px' } },
    { type: 'payment-block', label: 'Payment Block', category: 'Ecommerce', icon: 'Wallet', defaultStyles: { padding: '24px' } },
  ],
  Navigation: [
    { type: 'navbar', label: 'Navbar', category: 'Navigation', icon: 'Menu', defaultStyles: { padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
    { type: 'sidebar-nav', label: 'Sidebar Navigation', category: 'Navigation', icon: 'PanelLeft', defaultStyles: { padding: '20px', width: '260px' } },
    { type: 'breadcrumbs', label: 'Breadcrumbs', category: 'Navigation', icon: 'ChevronRight', defaultStyles: { padding: '8px 0', fontSize: '14px' } },
  ],
  Advanced: [
    { type: 'html', label: 'HTML Component', category: 'Advanced', icon: 'Code2', defaultContent: '<div>Custom HTML</div>', defaultStyles: {} },
    { type: 'custom-code', label: 'Custom Code', category: 'Advanced', icon: 'Terminal', defaultContent: '// Custom code here', defaultStyles: {} },
    { type: 'api-placeholder', label: 'API Component', category: 'Advanced', icon: 'Globe', defaultStyles: { padding: '20px' } },
  ],
};

export const categoryIcons: Record<ComponentCategory, string> = {
  Basic: 'LayoutTemplate',
  Text: 'Type',
  Media: 'Image',
  Layout: 'Columns3',
  Forms: 'FileInput',
  Ecommerce: 'ShoppingBag',
  Navigation: 'Navigation',
  Advanced: 'Code2',
};
