import type { ComponentDefinition, ComponentCategory } from '@/types/builder';

export const componentLibrary: Record<ComponentCategory, ComponentDefinition[]> = {
  Basic: [
    { type: 'section', label: 'Section', category: 'Basic', icon: 'LayoutTemplate', isContainer: true, acceptsChildren: true, defaultStyles: { padding: '40px 20px', width: '100%' } },
    { type: 'container', label: 'Container', category: 'Basic', icon: 'Square', isContainer: true, acceptsChildren: true, defaultStyles: { padding: '20px', maxWidth: '1200px', margin: '0 auto' } },
    { type: 'grid', label: 'Grid', category: 'Basic', icon: 'Grid3x3', isContainer: true, acceptsChildren: true, defaultStyles: { display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(3, 1fr)' }, defaultProps: { columns: 3 } },
    { type: 'columns', label: 'Columns', category: 'Basic', icon: 'Columns3', isContainer: true, acceptsChildren: true, defaultStyles: { display: 'flex', gap: '20px' } },
    { type: 'divider', label: 'Divider', category: 'Basic', icon: 'Minus', defaultStyles: { width: '100%', height: '1px', backgroundColor: '#e5e7eb' } },
    { type: 'spacer', label: 'Spacer', category: 'Basic', icon: 'MoveVertical', defaultStyles: { width: '100%', height: '40px' } },
  ],
  Text: [
    { type: 'heading', label: 'Heading', category: 'Text', icon: 'Type', defaultContent: 'Heading Text', defaultStyles: { fontSize: '32px', fontWeight: '700' } },
    { type: 'subheading', label: 'Subheading', category: 'Text', icon: 'Heading2', defaultContent: 'Subheading Text', defaultStyles: { fontSize: '24px', fontWeight: '600' } },
    { type: 'paragraph', label: 'Paragraph', category: 'Text', icon: 'AlignLeft', defaultContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', defaultStyles: { fontSize: '16px', lineHeight: '1.6' } },
    { type: 'list', label: 'List', category: 'Text', icon: 'List', defaultContent: 'Item 1\nItem 2\nItem 3', defaultStyles: { fontSize: '16px', padding: '0 0 0 20px' } },
    { type: 'quote', label: 'Quote', category: 'Text', icon: 'Quote', defaultContent: '"Design is not just what it looks like. Design is how it works."', defaultStyles: { fontSize: '18px', fontWeight: '500', padding: '20px' } },
    { type: 'button', label: 'Button', category: 'Text', icon: 'MousePointerClick', defaultContent: 'Click Me', defaultStyles: {} },
  ],
  Media: [
    { type: 'image', label: 'Image', category: 'Media', icon: 'Image', defaultStyles: { width: '100%', height: 'auto' }, defaultProps: { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800', alt: 'Placeholder' } },
    { type: 'video', label: 'Video', category: 'Media', icon: 'Video', defaultStyles: { width: '100%' }, defaultProps: { src: '' } },
    { type: 'gallery', label: 'Gallery', category: 'Media', icon: 'GalleryHorizontal', defaultStyles: { display: 'grid', gap: '10px' } },
    { type: 'background-video', label: 'Background Video', category: 'Media', icon: 'MonitorPlay', isContainer: true, acceptsChildren: true, defaultStyles: { width: '100%', height: '400px' } },
  ],
  Layout: [
    { type: 'hero', label: 'Hero Section', category: 'Layout', icon: 'Sparkles', isContainer: true, acceptsChildren: true, defaultContent: 'Build Something Amazing', defaultStyles: { padding: '80px 20px', textAlign: 'center' } },
    { type: 'card', label: 'Card', category: 'Layout', icon: 'RectangleHorizontal', isContainer: true, acceptsChildren: true, defaultContent: 'Card Content', defaultStyles: { padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' } },
    { type: 'feature-grid', label: 'Feature Grid', category: 'Layout', icon: 'LayoutGrid', defaultStyles: { padding: '40px 20px' } },
    { type: 'testimonial', label: 'Testimonial', category: 'Layout', icon: 'MessageSquareQuote', defaultContent: '"This product changed my life."', defaultStyles: { padding: '40px 20px' } },
    { type: 'pricing-table', label: 'Pricing Table', category: 'Layout', icon: 'DollarSign', defaultStyles: { padding: '40px 20px' } },
    { type: 'tabs', label: 'Tabs', category: 'Layout', icon: 'PanelTop', isContainer: true, acceptsChildren: true, defaultStyles: {} },
    { type: 'accordion', label: 'Accordion', category: 'Layout', icon: 'ChevronDown', isContainer: true, acceptsChildren: true, defaultStyles: {} },
  ],
  Forms: [
    { type: 'input', label: 'Input', category: 'Forms', icon: 'TextCursorInput', defaultStyles: { width: '100%' }, defaultProps: { placeholder: 'Enter text...', label: 'Label' } },
    { type: 'textarea', label: 'Textarea', category: 'Forms', icon: 'FileText', defaultStyles: { width: '100%' }, defaultProps: { placeholder: 'Enter text...', label: 'Message' } },
    { type: 'checkbox', label: 'Checkbox', category: 'Forms', icon: 'CheckSquare', defaultStyles: {}, defaultProps: { label: 'Check me' } },
    { type: 'radio', label: 'Radio', category: 'Forms', icon: 'Circle', defaultStyles: {}, defaultProps: { label: 'Option' } },
    { type: 'select', label: 'Select', category: 'Forms', icon: 'ChevronDown', defaultStyles: { width: '100%' }, defaultProps: { label: 'Select option' } },
    { type: 'login-form', label: 'Login Form', category: 'Forms', icon: 'LogIn', defaultStyles: { padding: '32px', maxWidth: '400px' } },
    { type: 'signup-form', label: 'Signup Form', category: 'Forms', icon: 'UserPlus', defaultStyles: { padding: '32px', maxWidth: '400px' } },
    { type: 'contact-form', label: 'Contact Form', category: 'Forms', icon: 'Mail', defaultStyles: { padding: '32px', maxWidth: '600px' } },
  ],
  Ecommerce: [
    { type: 'product-card', label: 'Product Card', category: 'Ecommerce', icon: 'ShoppingBag', defaultStyles: { padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb' } },
    { type: 'product-grid', label: 'Product Grid', category: 'Ecommerce', icon: 'LayoutGrid', defaultStyles: { padding: '20px' } },
    { type: 'shopping-cart', label: 'Shopping Cart', category: 'Ecommerce', icon: 'ShoppingCart', defaultStyles: { padding: '24px' } },
    { type: 'checkout', label: 'Checkout', category: 'Ecommerce', icon: 'CreditCard', defaultStyles: { padding: '32px' } },
    { type: 'payment-block', label: 'Payment Block', category: 'Ecommerce', icon: 'Wallet', defaultStyles: { padding: '24px' } },
  ],
  Navigation: [
    { type: 'navbar', label: 'Navbar', category: 'Navigation', icon: 'Menu', isContainer: true, acceptsChildren: true, defaultStyles: { padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
    { type: 'sidebar-nav', label: 'Sidebar Navigation', category: 'Navigation', icon: 'PanelLeft', isContainer: true, acceptsChildren: true, defaultStyles: { padding: '20px', width: '260px' } },
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
