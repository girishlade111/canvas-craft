/**
 * Property Schema Registry
 * Defines editable properties for each component type.
 * Used by the PropertiesPanel to render appropriate editors.
 */

import type { PropertySchema } from '@/types/builder';

const propertySchemas: Map<string, PropertySchema[]> = new Map();

// ─── Base schemas (inherited by multiple types) ────────────

const baseLayoutProps: PropertySchema[] = [
  { key: 'width', label: 'Width', type: 'string', group: 'Layout', placeholder: '100%' },
  { key: 'height', label: 'Height', type: 'string', group: 'Layout', placeholder: 'auto' },
  { key: 'minHeight', label: 'Min Height', type: 'string', group: 'Layout', placeholder: '0' },
  { key: 'maxWidth', label: 'Max Width', type: 'string', group: 'Layout', placeholder: 'none' },
  { key: 'padding', label: 'Padding', type: 'string', group: 'Layout', placeholder: '0px' },
  { key: 'margin', label: 'Margin', type: 'string', group: 'Layout', placeholder: '0px' },
  { key: 'display', label: 'Display', type: 'select', group: 'Layout', options: [
    { label: 'Block', value: 'block' }, { label: 'Flex', value: 'flex' },
    { label: 'Grid', value: 'grid' }, { label: 'Inline', value: 'inline' },
    { label: 'Inline Block', value: 'inline-block' }, { label: 'None', value: 'none' },
  ]},
  { key: 'flexDirection', label: 'Flex Direction', type: 'select', group: 'Layout', options: [
    { label: 'Row', value: 'row' }, { label: 'Column', value: 'column' },
    { label: 'Row Reverse', value: 'row-reverse' }, { label: 'Column Reverse', value: 'column-reverse' },
  ]},
  { key: 'justifyContent', label: 'Justify', type: 'select', group: 'Layout', options: [
    { label: 'Start', value: 'flex-start' }, { label: 'Center', value: 'center' },
    { label: 'End', value: 'flex-end' }, { label: 'Between', value: 'space-between' },
    { label: 'Around', value: 'space-around' }, { label: 'Evenly', value: 'space-evenly' },
  ]},
  { key: 'alignItems', label: 'Align', type: 'select', group: 'Layout', options: [
    { label: 'Start', value: 'flex-start' }, { label: 'Center', value: 'center' },
    { label: 'End', value: 'flex-end' }, { label: 'Stretch', value: 'stretch' },
    { label: 'Baseline', value: 'baseline' },
  ]},
  { key: 'gap', label: 'Gap', type: 'string', group: 'Layout', placeholder: '0px' },
];

const baseTypographyProps: PropertySchema[] = [
  { key: 'fontSize', label: 'Font Size', type: 'string', group: 'Typography', placeholder: '16px' },
  { key: 'fontWeight', label: 'Weight', type: 'select', group: 'Typography', options: [
    { label: 'Light', value: '300' }, { label: 'Regular', value: '400' },
    { label: 'Medium', value: '500' }, { label: 'Semi Bold', value: '600' },
    { label: 'Bold', value: '700' }, { label: 'Extra Bold', value: '800' },
  ]},
  { key: 'fontFamily', label: 'Font', type: 'string', group: 'Typography', placeholder: 'inherit' },
  { key: 'lineHeight', label: 'Line Height', type: 'string', group: 'Typography', placeholder: '1.5' },
  { key: 'textAlign', label: 'Align', type: 'select', group: 'Typography', options: [
    { label: 'Left', value: 'left' }, { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' }, { label: 'Justify', value: 'justify' },
  ]},
  { key: 'letterSpacing', label: 'Spacing', type: 'string', group: 'Typography', placeholder: 'normal' },
  { key: 'textTransform', label: 'Transform', type: 'select', group: 'Typography', options: [
    { label: 'None', value: 'none' }, { label: 'Uppercase', value: 'uppercase' },
    { label: 'Lowercase', value: 'lowercase' }, { label: 'Capitalize', value: 'capitalize' },
  ]},
  { key: 'textDecoration', label: 'Decoration', type: 'select', group: 'Typography', options: [
    { label: 'None', value: 'none' }, { label: 'Underline', value: 'underline' },
    { label: 'Line Through', value: 'line-through' },
  ]},
];

const baseAppearanceProps: PropertySchema[] = [
  { key: 'backgroundColor', label: 'Background', type: 'color', group: 'Appearance' },
  { key: 'color', label: 'Text Color', type: 'color', group: 'Appearance' },
  { key: 'border', label: 'Border', type: 'string', group: 'Appearance', placeholder: 'none' },
  { key: 'borderRadius', label: 'Radius', type: 'string', group: 'Appearance', placeholder: '0px' },
  { key: 'boxShadow', label: 'Shadow', type: 'string', group: 'Appearance', placeholder: 'none' },
  { key: 'opacity', label: 'Opacity', type: 'string', group: 'Appearance', placeholder: '1' },
  { key: 'overflow', label: 'Overflow', type: 'select', group: 'Appearance', options: [
    { label: 'Visible', value: 'visible' }, { label: 'Hidden', value: 'hidden' },
    { label: 'Scroll', value: 'scroll' }, { label: 'Auto', value: 'auto' },
  ]},
];

const baseAdvancedProps: PropertySchema[] = [
  { key: 'customCSS', label: 'Custom CSS', type: 'code', group: 'Advanced' },
  { key: 'customClasses', label: 'CSS Classes', type: 'string', group: 'Advanced', placeholder: 'class1 class2' },
  { key: 'position', label: 'Position', type: 'select', group: 'Advanced', options: [
    { label: 'Static', value: 'static' }, { label: 'Relative', value: 'relative' },
    { label: 'Absolute', value: 'absolute' }, { label: 'Fixed', value: 'fixed' },
    { label: 'Sticky', value: 'sticky' },
  ]},
  { key: 'zIndex', label: 'Z-Index', type: 'string', group: 'Advanced', placeholder: 'auto' },
  { key: 'cursor', label: 'Cursor', type: 'select', group: 'Advanced', options: [
    { label: 'Default', value: 'default' }, { label: 'Pointer', value: 'pointer' },
    { label: 'Move', value: 'move' }, { label: 'Text', value: 'text' },
    { label: 'Not Allowed', value: 'not-allowed' },
  ]},
  { key: 'transition', label: 'Transition', type: 'string', group: 'Advanced', placeholder: 'all 0.3s ease' },
  { key: 'transform', label: 'Transform', type: 'string', group: 'Advanced', placeholder: 'none' },
];

const baseBackgroundProps: PropertySchema[] = [
  { key: 'backgroundImage', label: 'BG Image', type: 'url', group: 'Background' },
  { key: 'backgroundSize', label: 'BG Size', type: 'select', group: 'Background', options: [
    { label: 'Cover', value: 'cover' }, { label: 'Contain', value: 'contain' }, { label: 'Auto', value: 'auto' },
  ]},
  { key: 'backgroundPosition', label: 'BG Position', type: 'select', group: 'Background', options: [
    { label: 'Center', value: 'center' }, { label: 'Top', value: 'top' },
    { label: 'Bottom', value: 'bottom' }, { label: 'Left', value: 'left' }, { label: 'Right', value: 'right' },
  ]},
  { key: 'backgroundRepeat', label: 'BG Repeat', type: 'select', group: 'Background', options: [
    { label: 'No Repeat', value: 'no-repeat' }, { label: 'Repeat', value: 'repeat' },
    { label: 'Repeat X', value: 'repeat-x' }, { label: 'Repeat Y', value: 'repeat-y' },
  ]},
];

// All style properties combined
const allStyleProps = [...baseLayoutProps, ...baseTypographyProps, ...baseAppearanceProps, ...baseBackgroundProps, ...baseAdvancedProps];

// ─── Component-specific property schemas ──────────────────

// Basic
propertySchemas.set('section', allStyleProps);
propertySchemas.set('container', allStyleProps);
propertySchemas.set('grid', [
  { key: 'columns', label: 'Columns', type: 'number', group: 'Component', defaultValue: 3, min: 1, max: 12 },
  { key: 'gridTemplateColumns', label: 'Grid Template', type: 'string', group: 'Layout', placeholder: 'repeat(3, 1fr)' },
  ...allStyleProps,
]);
propertySchemas.set('columns', [
  { key: 'columnCount', label: 'Columns', type: 'number', group: 'Component', defaultValue: 2, min: 1, max: 6 },
  ...allStyleProps,
]);
propertySchemas.set('divider', [
  { key: 'dividerColor', label: 'Color', type: 'color', group: 'Component' },
  { key: 'thickness', label: 'Thickness', type: 'string', group: 'Component', placeholder: '1px' },
  ...allStyleProps,
]);
propertySchemas.set('spacer', [
  { key: 'height', label: 'Height', type: 'string', group: 'Component', placeholder: '40px', defaultValue: '40px' },
  ...baseLayoutProps,
]);

// Text
propertySchemas.set('heading', [
  { key: 'level', label: 'Level', type: 'select', group: 'Component', options: [
    { label: 'H1', value: '1' }, { label: 'H2', value: '2' }, { label: 'H3', value: '3' },
    { label: 'H4', value: '4' }, { label: 'H5', value: '5' }, { label: 'H6', value: '6' },
  ], defaultValue: '2' },
  ...allStyleProps,
]);
propertySchemas.set('subheading', allStyleProps);
propertySchemas.set('paragraph', allStyleProps);
propertySchemas.set('list', [
  { key: 'listStyle', label: 'Style', type: 'select', group: 'Component', options: [
    { label: 'Disc', value: 'disc' }, { label: 'Circle', value: 'circle' },
    { label: 'Square', value: 'square' }, { label: 'Decimal', value: 'decimal' },
    { label: 'None', value: 'none' },
  ], defaultValue: 'disc' },
  ...allStyleProps,
]);
propertySchemas.set('quote', [
  { key: 'author', label: 'Author', type: 'string', group: 'Component', placeholder: 'Author name' },
  ...allStyleProps,
]);
propertySchemas.set('button', [
  { key: 'variant', label: 'Variant', type: 'select', group: 'Component', options: [
    { label: 'Primary', value: 'primary' }, { label: 'Secondary', value: 'secondary' },
    { label: 'Outline', value: 'outline' }, { label: 'Ghost', value: 'ghost' },
    { label: 'Destructive', value: 'destructive' },
  ], defaultValue: 'primary' },
  { key: 'size', label: 'Size', type: 'select', group: 'Component', options: [
    { label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' }, { label: 'XL', value: 'xl' },
  ], defaultValue: 'md' },
  { key: 'url', label: 'Link URL', type: 'url', group: 'Component', placeholder: 'https://' },
  { key: 'fullWidth', label: 'Full Width', type: 'boolean', group: 'Component', defaultValue: false },
  ...allStyleProps,
]);

// Media
propertySchemas.set('image', [
  { key: 'src', label: 'Image URL', type: 'image', group: 'Component', required: true },
  { key: 'alt', label: 'Alt Text', type: 'string', group: 'Component', placeholder: 'Description' },
  { key: 'objectFit', label: 'Fit', type: 'select', group: 'Component', options: [
    { label: 'Cover', value: 'cover' }, { label: 'Contain', value: 'contain' },
    { label: 'Fill', value: 'fill' }, { label: 'None', value: 'none' },
  ]},
  ...allStyleProps,
]);
propertySchemas.set('video', [
  { key: 'src', label: 'Video URL', type: 'url', group: 'Component' },
  { key: 'autoplay', label: 'Autoplay', type: 'boolean', group: 'Component', defaultValue: false },
  { key: 'loop', label: 'Loop', type: 'boolean', group: 'Component', defaultValue: false },
  { key: 'muted', label: 'Muted', type: 'boolean', group: 'Component', defaultValue: false },
  { key: 'controls', label: 'Controls', type: 'boolean', group: 'Component', defaultValue: true },
  ...allStyleProps,
]);
propertySchemas.set('gallery', [
  { key: 'columns', label: 'Columns', type: 'number', group: 'Component', defaultValue: 3, min: 1, max: 6 },
  { key: 'gap', label: 'Gap', type: 'string', group: 'Component', placeholder: '8px' },
  ...allStyleProps,
]);
propertySchemas.set('background-video', allStyleProps);

// Layout
propertySchemas.set('hero', [
  { key: 'alignment', label: 'Alignment', type: 'select', group: 'Component', options: [
    { label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' },
  ], defaultValue: 'center' },
  { key: 'overlayColor', label: 'Overlay', type: 'color', group: 'Component' },
  { key: 'overlayOpacity', label: 'Overlay Opacity', type: 'string', group: 'Component', placeholder: '0.5' },
  ...allStyleProps,
]);
propertySchemas.set('card', [
  { key: 'hoverable', label: 'Hover Effect', type: 'boolean', group: 'Component', defaultValue: false },
  ...allStyleProps,
]);
propertySchemas.set('feature-grid', [
  { key: 'columns', label: 'Columns', type: 'number', group: 'Component', defaultValue: 3, min: 1, max: 4 },
  ...allStyleProps,
]);
propertySchemas.set('testimonial', [
  { key: 'authorName', label: 'Author', type: 'string', group: 'Component', defaultValue: 'Jane Doe' },
  { key: 'authorTitle', label: 'Title', type: 'string', group: 'Component', defaultValue: 'CEO, Company' },
  { key: 'authorAvatar', label: 'Avatar URL', type: 'image', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('pricing-table', [
  { key: 'columns', label: 'Plans', type: 'number', group: 'Component', defaultValue: 3, min: 1, max: 4 },
  ...allStyleProps,
]);
propertySchemas.set('tabs', allStyleProps);
propertySchemas.set('accordion', [
  { key: 'allowMultiple', label: 'Allow Multiple', type: 'boolean', group: 'Component', defaultValue: false },
  ...allStyleProps,
]);

// Forms
const formFieldProps: PropertySchema[] = [
  { key: 'placeholder', label: 'Placeholder', type: 'string', group: 'Component' },
  { key: 'label', label: 'Label', type: 'string', group: 'Component' },
  { key: 'required', label: 'Required', type: 'boolean', group: 'Component', defaultValue: false },
  { key: 'disabled', label: 'Disabled', type: 'boolean', group: 'Component', defaultValue: false },
  ...allStyleProps,
];
propertySchemas.set('input', [
  { key: 'inputType', label: 'Type', type: 'select', group: 'Component', options: [
    { label: 'Text', value: 'text' }, { label: 'Email', value: 'email' },
    { label: 'Password', value: 'password' }, { label: 'Number', value: 'number' },
    { label: 'Tel', value: 'tel' }, { label: 'URL', value: 'url' },
  ], defaultValue: 'text' },
  ...formFieldProps,
]);
propertySchemas.set('textarea', [
  { key: 'rows', label: 'Rows', type: 'number', group: 'Component', defaultValue: 4, min: 1, max: 20 },
  ...formFieldProps,
]);
propertySchemas.set('select', formFieldProps);
propertySchemas.set('checkbox', formFieldProps);
propertySchemas.set('radio', formFieldProps);
propertySchemas.set('login-form', allStyleProps);
propertySchemas.set('signup-form', allStyleProps);
propertySchemas.set('contact-form', allStyleProps);

// Ecommerce
propertySchemas.set('product-card', [
  { key: 'productName', label: 'Name', type: 'string', group: 'Component', defaultValue: 'Product Name' },
  { key: 'price', label: 'Price', type: 'string', group: 'Component', defaultValue: '$49.99' },
  { key: 'imageUrl', label: 'Image', type: 'image', group: 'Component' },
  { key: 'badge', label: 'Badge', type: 'string', group: 'Component', placeholder: 'Sale' },
  ...allStyleProps,
]);
propertySchemas.set('product-grid', [
  { key: 'columns', label: 'Columns', type: 'number', group: 'Component', defaultValue: 3, min: 1, max: 6 },
  { key: 'productCount', label: 'Products', type: 'number', group: 'Component', defaultValue: 6, min: 1, max: 24 },
  ...allStyleProps,
]);
propertySchemas.set('shopping-cart', allStyleProps);
propertySchemas.set('checkout', allStyleProps);
propertySchemas.set('payment-block', allStyleProps);

// Navigation
propertySchemas.set('navbar', [
  { key: 'brandName', label: 'Brand Name', type: 'string', group: 'Component', defaultValue: 'Brand' },
  { key: 'logoUrl', label: 'Logo', type: 'image', group: 'Component', placeholder: 'Upload or enter logo URL' },
  { key: 'sticky', label: 'Sticky Header', type: 'boolean', group: 'Component', defaultValue: false },
  ...allStyleProps,
]);
propertySchemas.set('sidebar-nav', allStyleProps);
propertySchemas.set('breadcrumbs', allStyleProps);

// Theme / Site Components
propertySchemas.set('site-logo', [
  { key: 'src', label: 'Logo Image', type: 'image', group: 'Component', placeholder: 'Upload or enter logo URL' },
  { key: 'width', label: 'Width', type: 'string', group: 'Component', placeholder: '120px', defaultValue: '120px' },
  { key: 'alt', label: 'Alt Text', type: 'string', group: 'Component', placeholder: 'Site logo' },
  { key: 'linkUrl', label: 'Link URL', type: 'url', group: 'Component', placeholder: '/', defaultValue: '/' },
  ...allStyleProps,
]);
propertySchemas.set('site-title', [
  { key: 'content', label: 'Title', type: 'string', group: 'Component', placeholder: 'My Website' },
  ...allStyleProps,
]);
propertySchemas.set('site-tagline', [
  { key: 'content', label: 'Tagline', type: 'string', group: 'Component', placeholder: 'Your site tagline' },
  ...allStyleProps,
]);
propertySchemas.set('navigation-menu', [
  { key: 'items', label: 'Menu Items', type: 'code', group: 'Component', placeholder: 'Home\\nAbout\\nServices\\nContact' },
  { key: 'layout', label: 'Layout', type: 'select', group: 'Component', options: [
    { label: 'Horizontal', value: 'horizontal' }, { label: 'Vertical', value: 'vertical' },
  ], defaultValue: 'horizontal' },
  ...allStyleProps,
]);
propertySchemas.set('header', [
  { key: 'logoUrl', label: 'Logo', type: 'image', group: 'Component' },
  { key: 'brandName', label: 'Brand Name', type: 'string', group: 'Component', placeholder: 'Brand' },
  { key: 'sticky', label: 'Sticky', type: 'boolean', group: 'Component', defaultValue: false },
  ...allStyleProps,
]);
propertySchemas.set('footer', allStyleProps);

// Advanced
propertySchemas.set('html', [
  { key: 'htmlContent', label: 'HTML', type: 'code', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('custom-code', [
  { key: 'language', label: 'Language', type: 'select', group: 'Component', options: [
    { label: 'JavaScript', value: 'javascript' }, { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' }, { label: 'JSON', value: 'json' },
  ], defaultValue: 'javascript' },
  ...allStyleProps,
]);
propertySchemas.set('api-placeholder', [
  { key: 'endpoint', label: 'API Endpoint', type: 'url', group: 'Component', placeholder: 'https://api.example.com/data' },
  { key: 'method', label: 'Method', type: 'select', group: 'Component', options: [
    { label: 'GET', value: 'GET' }, { label: 'POST', value: 'POST' },
  ], defaultValue: 'GET' },
  ...allStyleProps,
]);

// Widgets
propertySchemas.set('social-icons', [
  { key: 'layout', label: 'Layout', type: 'select', group: 'Component', options: [
    { label: 'Horizontal', value: 'horizontal' }, { label: 'Vertical', value: 'vertical' },
  ], defaultValue: 'horizontal' },
  { key: 'size', label: 'Size', type: 'string', group: 'Component', placeholder: '36', defaultValue: '36' },
  ...allStyleProps,
]);
propertySchemas.set('countdown', [
  { key: 'targetDate', label: 'Target Date', type: 'string', group: 'Component', placeholder: '2026-12-31T00:00:00' },
  ...allStyleProps,
]);
propertySchemas.set('progress-bar', [
  { key: 'value', label: 'Value (%)', type: 'number', group: 'Component', defaultValue: 65, min: 0, max: 100 },
  { key: 'label', label: 'Label', type: 'string', group: 'Component', placeholder: 'Progress' },
  { key: 'color', label: 'Bar Color', type: 'color', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('star-rating', [
  { key: 'rating', label: 'Rating', type: 'number', group: 'Component', defaultValue: 4, min: 0, max: 5 },
  { key: 'maxStars', label: 'Max Stars', type: 'number', group: 'Component', defaultValue: 5, min: 1, max: 10 },
  ...allStyleProps,
]);
propertySchemas.set('map', [
  { key: 'address', label: 'Address', type: 'string', group: 'Component', placeholder: 'New York City' },
  ...allStyleProps,
]);
propertySchemas.set('badge', [
  { key: 'variant', label: 'Variant', type: 'select', group: 'Component', options: [
    { label: 'Default', value: 'default' }, { label: 'Secondary', value: 'secondary' },
    { label: 'Success', value: 'success' }, { label: 'Warning', value: 'warning' },
    { label: 'Destructive', value: 'destructive' },
  ], defaultValue: 'default' },
  ...allStyleProps,
]);
propertySchemas.set('alert', [
  { key: 'type', label: 'Type', type: 'select', group: 'Component', options: [
    { label: 'Info', value: 'info' }, { label: 'Success', value: 'success' },
    { label: 'Warning', value: 'warning' }, { label: 'Error', value: 'error' },
  ], defaultValue: 'info' },
  ...allStyleProps,
]);
propertySchemas.set('icon', [
  { key: 'icon', label: 'Icon (emoji)', type: 'string', group: 'Component', placeholder: '⭐', defaultValue: '⭐' },
  { key: 'iconName', label: 'Icon Name (Lucide)', type: 'string', group: 'Component', placeholder: 'Star' },
  { key: 'size', label: 'Size', type: 'number', group: 'Component', placeholder: '24', defaultValue: 24 },
  { key: 'color', label: 'Color', type: 'color', group: 'Component' },
  { key: 'strokeWidth', label: 'Stroke Width', type: 'number', group: 'Component', defaultValue: 2, min: 1, max: 4 },
  ...allStyleProps,
]);
propertySchemas.set('lucide-icon', [
  { key: 'name', label: 'Icon Name', type: 'string', group: 'Component', placeholder: 'Star', defaultValue: 'Star' },
  { key: 'size', label: 'Size (px)', type: 'number', group: 'Component', defaultValue: 24, min: 12, max: 128 },
  { key: 'color', label: 'Color', type: 'color', group: 'Component' },
  { key: 'strokeWidth', label: 'Stroke Width', type: 'number', group: 'Component', defaultValue: 2, min: 0.5, max: 4, step: 0.5 },
  ...allStyleProps,
]);
propertySchemas.set('hero-icon', [
  { key: 'name', label: 'Icon Name', type: 'string', group: 'Component', placeholder: 'HomeIcon', defaultValue: 'HomeIcon' },
  { key: 'variant', label: 'Variant', type: 'select', group: 'Component', options: [
    { label: 'Outline', value: 'outline' },
    { label: 'Solid', value: 'solid' },
  ], defaultValue: 'outline' },
  { key: 'size', label: 'Size (px)', type: 'number', group: 'Component', defaultValue: 24, min: 12, max: 128 },
  { key: 'color', label: 'Color', type: 'color', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('universal-icon', [
  { key: 'name', label: 'Icon Name', type: 'string', group: 'Component', placeholder: 'Star', defaultValue: 'Star' },
  { key: 'library', label: 'Library', type: 'select', group: 'Component', options: [
    { label: 'Lucide', value: 'lucide' },
    { label: 'Heroicons (Outline)', value: 'heroicons-outline' },
    { label: 'Heroicons (Solid)', value: 'heroicons-solid' },
  ], defaultValue: 'lucide' },
  { key: 'size', label: 'Size (px)', type: 'number', group: 'Component', defaultValue: 24, min: 12, max: 128 },
  { key: 'color', label: 'Color', type: 'color', group: 'Component' },
  { key: 'strokeWidth', label: 'Stroke Width', type: 'number', group: 'Component', defaultValue: 2, min: 0.5, max: 4, step: 0.5 },
  ...allStyleProps,
]);
propertySchemas.set('avatar', [
  { key: 'src', label: 'Image URL', type: 'image', group: 'Component' },
  { key: 'name', label: 'Name', type: 'string', group: 'Component', defaultValue: 'User' },
  { key: 'size', label: 'Size', type: 'string', group: 'Component', placeholder: '48', defaultValue: '48' },
  ...allStyleProps,
]);
propertySchemas.set('tooltip', [
  { key: 'tooltipText', label: 'Tooltip', type: 'string', group: 'Component', placeholder: 'Tooltip text' },
  ...allStyleProps,
]);
propertySchemas.set('cta-banner', [
  { key: 'buttonText', label: 'Button Text', type: 'string', group: 'Component', defaultValue: 'Get Started Free' },
  ...allStyleProps,
]);
propertySchemas.set('logo-cloud', [
  { key: 'title', label: 'Title', type: 'string', group: 'Component', defaultValue: 'Trusted by' },
  ...allStyleProps,
]);
propertySchemas.set('stats', [
  { key: 'columns', label: 'Columns', type: 'number', group: 'Component', defaultValue: 4, min: 1, max: 6 },
  ...allStyleProps,
]);

// Marketing
propertySchemas.set('newsletter', [
  { key: 'title', label: 'Title', type: 'string', group: 'Component', defaultValue: 'Subscribe to our newsletter' },
  { key: 'buttonText', label: 'Button Text', type: 'string', group: 'Component', defaultValue: 'Subscribe' },
  ...allStyleProps,
]);
propertySchemas.set('popup-trigger', [
  { key: 'triggerText', label: 'Trigger Text', type: 'string', group: 'Component', defaultValue: 'Open Popup' },
  ...allStyleProps,
]);
propertySchemas.set('announcement-bar', [
  { key: 'dismissible', label: 'Dismissible', type: 'boolean', group: 'Component', defaultValue: true },
  ...allStyleProps,
]);
propertySchemas.set('cookie-consent', allStyleProps);
propertySchemas.set('fab', [
  { key: 'icon', label: 'Icon', type: 'string', group: 'Component', defaultValue: '+' },
  ...allStyleProps,
]);
propertySchemas.set('back-to-top', allStyleProps);
propertySchemas.set('comparison-table', [
  { key: 'columns', label: 'Columns', type: 'number', group: 'Component', defaultValue: 3, min: 2, max: 5 },
  ...allStyleProps,
]);
propertySchemas.set('before-after', allStyleProps);
propertySchemas.set('team-grid', [
  { key: 'columns', label: 'Columns', type: 'number', group: 'Component', defaultValue: 3, min: 1, max: 6 },
  ...allStyleProps,
]);
propertySchemas.set('timeline', allStyleProps);
propertySchemas.set('faq', [
  { key: 'allowMultiple', label: 'Allow Multiple', type: 'boolean', group: 'Component', defaultValue: false },
  ...allStyleProps,
]);

// Blog
propertySchemas.set('blog-post-card', [
  { key: 'title', label: 'Title', type: 'string', group: 'Component', defaultValue: 'Blog Post Title' },
  { key: 'excerpt', label: 'Excerpt', type: 'string', group: 'Component' },
  { key: 'imageUrl', label: 'Image', type: 'image', group: 'Component' },
  { key: 'author', label: 'Author', type: 'string', group: 'Component', defaultValue: 'Author' },
  { key: 'date', label: 'Date', type: 'string', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('author-bio', [
  { key: 'name', label: 'Name', type: 'string', group: 'Component', defaultValue: 'Author Name' },
  { key: 'bio', label: 'Bio', type: 'string', group: 'Component' },
  { key: 'avatarUrl', label: 'Avatar', type: 'image', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('related-posts', allStyleProps);
propertySchemas.set('share-buttons', allStyleProps);
propertySchemas.set('toc', allStyleProps);
propertySchemas.set('reading-progress', [
  { key: 'color', label: 'Bar Color', type: 'color', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('comment-item', allStyleProps);

// Interactive
propertySchemas.set('toggle-switch', [
  { key: 'label', label: 'Label', type: 'string', group: 'Component', defaultValue: 'Toggle' },
  { key: 'defaultChecked', label: 'Default On', type: 'boolean', group: 'Component', defaultValue: false },
  ...allStyleProps,
]);
propertySchemas.set('range-slider', [
  { key: 'label', label: 'Label', type: 'string', group: 'Component', defaultValue: 'Range' },
  { key: 'min', label: 'Min', type: 'number', group: 'Component', defaultValue: 0 },
  { key: 'max', label: 'Max', type: 'number', group: 'Component', defaultValue: 100 },
  { key: 'value', label: 'Value', type: 'number', group: 'Component', defaultValue: 50 },
  ...allStyleProps,
]);
propertySchemas.set('stepper', [
  { key: 'label', label: 'Label', type: 'string', group: 'Component', defaultValue: 'Quantity' },
  { key: 'value', label: 'Value', type: 'number', group: 'Component', defaultValue: 1 },
  ...allStyleProps,
]);
propertySchemas.set('chip-group', [
  { key: 'items', label: 'Items (comma-sep)', type: 'string', group: 'Component', defaultValue: 'Tag 1, Tag 2, Tag 3' },
  ...allStyleProps,
]);
propertySchemas.set('mega-menu', allStyleProps);
propertySchemas.set('notification', [
  { key: 'type', label: 'Type', type: 'select', group: 'Component', options: [
    { label: 'Info', value: 'info' }, { label: 'Success', value: 'success' },
    { label: 'Warning', value: 'warning' }, { label: 'Error', value: 'error' },
  ], defaultValue: 'info' },
  ...allStyleProps,
]);
propertySchemas.set('skeleton', [
  { key: 'variant', label: 'Variant', type: 'select', group: 'Component', options: [
    { label: 'Card', value: 'card' }, { label: 'Text', value: 'text' },
  ], defaultValue: 'card' },
  ...allStyleProps,
]);
propertySchemas.set('empty-state', [
  { key: 'title', label: 'Title', type: 'string', group: 'Component', defaultValue: 'No data yet' },
  { key: 'description', label: 'Description', type: 'string', group: 'Component' },
  ...allStyleProps,
]);

// Data Display
propertySchemas.set('data-table', allStyleProps);
propertySchemas.set('metric-card', [
  { key: 'title', label: 'Title', type: 'string', group: 'Component', defaultValue: 'Metric' },
  { key: 'value', label: 'Value', type: 'string', group: 'Component', defaultValue: '0' },
  ...allStyleProps,
]);
propertySchemas.set('chart-placeholder', allStyleProps);
propertySchemas.set('kpi-dashboard', allStyleProps);
propertySchemas.set('feature-list', allStyleProps);
propertySchemas.set('pagination', allStyleProps);
propertySchemas.set('breadcrumb-trail', allStyleProps);
propertySchemas.set('tag-list', allStyleProps);

// Social
propertySchemas.set('testimonial-carousel', allStyleProps);
propertySchemas.set('social-feed-card', allStyleProps);
propertySchemas.set('user-profile-card', [
  { key: 'name', label: 'Name', type: 'string', group: 'Component', defaultValue: 'User Name' },
  { key: 'avatarUrl', label: 'Avatar', type: 'image', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('review-card', allStyleProps);
propertySchemas.set('chat-bubble', allStyleProps);

// Content Blocks
propertySchemas.set('feature-card', [
  { key: 'title', label: 'Title', type: 'string', group: 'Component', defaultValue: 'Feature' },
  { key: 'description', label: 'Description', type: 'string', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('callout', [
  { key: 'type', label: 'Type', type: 'select', group: 'Component', options: [
    { label: 'Info', value: 'info' }, { label: 'Warning', value: 'warning' },
    { label: 'Tip', value: 'tip' }, { label: 'Note', value: 'note' },
  ], defaultValue: 'info' },
  ...allStyleProps,
]);
propertySchemas.set('numbered-steps', allStyleProps);
propertySchemas.set('marquee', [
  { key: 'speed', label: 'Speed', type: 'number', group: 'Component', defaultValue: 30, min: 5, max: 100 },
  { key: 'direction', label: 'Direction', type: 'select', group: 'Component', options: [
    { label: 'Left', value: 'left' }, { label: 'Right', value: 'right' },
  ], defaultValue: 'left' },
  ...allStyleProps,
]);
propertySchemas.set('pricing-card', [
  { key: 'planName', label: 'Plan', type: 'string', group: 'Component', defaultValue: 'Pro' },
  { key: 'price', label: 'Price', type: 'string', group: 'Component', defaultValue: '$29/mo' },
  ...allStyleProps,
]);
propertySchemas.set('image-overlay-card', allStyleProps);
propertySchemas.set('divider-text', [
  { key: 'text', label: 'Text', type: 'string', group: 'Component', defaultValue: 'or' },
  ...allStyleProps,
]);
propertySchemas.set('blockquote-image', allStyleProps);
propertySchemas.set('horizontal-gallery', allStyleProps);
propertySchemas.set('content-switcher', allStyleProps);

// Embeds
propertySchemas.set('youtube-embed', [
  { key: 'url', label: 'YouTube URL', type: 'url', group: 'Component', placeholder: 'https://youtube.com/watch?v=...' },
  ...allStyleProps,
]);
propertySchemas.set('twitter-embed', [
  { key: 'tweetUrl', label: 'Tweet URL', type: 'url', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('instagram-embed', [
  { key: 'postUrl', label: 'Post URL', type: 'url', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('spotify-embed', [
  { key: 'spotifyUrl', label: 'Spotify URL', type: 'url', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('soundcloud-embed', [
  { key: 'trackUrl', label: 'Track URL', type: 'url', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('vimeo-embed', [
  { key: 'url', label: 'Vimeo URL', type: 'url', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('tiktok-embed', [
  { key: 'videoUrl', label: 'Video URL', type: 'url', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('pinterest-embed', [
  { key: 'pinUrl', label: 'Pin URL', type: 'url', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('reddit-embed', [
  { key: 'postUrl', label: 'Post URL', type: 'url', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('flickr-embed', [
  { key: 'photoUrl', label: 'Photo URL', type: 'url', group: 'Component' },
  ...allStyleProps,
]);
propertySchemas.set('pdf-viewer', [
  { key: 'url', label: 'PDF URL', type: 'url', group: 'Component' },
  ...allStyleProps,
]);

// Theme extras
propertySchemas.set('query-loop', allStyleProps);
propertySchemas.set('post-list', allStyleProps);
propertySchemas.set('post-navigation', allStyleProps);
propertySchemas.set('comments', allStyleProps);
propertySchemas.set('comment-form', allStyleProps);
propertySchemas.set('login-out', allStyleProps);
propertySchemas.set('template-part', allStyleProps);
propertySchemas.set('archive-title', allStyleProps);
propertySchemas.set('search-results-title', allStyleProps);
propertySchemas.set('search-bar', [
  { key: 'placeholder', label: 'Placeholder', type: 'string', group: 'Component', defaultValue: 'Search...' },
  ...allStyleProps,
]);
propertySchemas.set('archives', allStyleProps);
propertySchemas.set('calendar-widget', allStyleProps);
propertySchemas.set('categories', allStyleProps);
propertySchemas.set('latest-posts', allStyleProps);
propertySchemas.set('latest-comments', allStyleProps);
propertySchemas.set('page-list', allStyleProps);
propertySchemas.set('rss', allStyleProps);
propertySchemas.set('shortcode', allStyleProps);
propertySchemas.set('tag-cloud', allStyleProps);

// Design extras
propertySchemas.set('table', allStyleProps);
propertySchemas.set('pull-quote', allStyleProps);
propertySchemas.set('code-block', [
  { key: 'language', label: 'Language', type: 'string', group: 'Component', defaultValue: 'javascript' },
  ...allStyleProps,
]);
propertySchemas.set('preformatted', allStyleProps);
propertySchemas.set('verse', allStyleProps);
propertySchemas.set('group', allStyleProps);
propertySchemas.set('row', allStyleProps);
propertySchemas.set('stack', allStyleProps);
propertySchemas.set('separator', allStyleProps);
propertySchemas.set('more', allStyleProps);
propertySchemas.set('page-break', allStyleProps);
propertySchemas.set('cover', allStyleProps);
propertySchemas.set('media-text', allStyleProps);
propertySchemas.set('file', allStyleProps);
propertySchemas.set('audio', [
  { key: 'src', label: 'Audio URL', type: 'url', group: 'Component' },
  ...allStyleProps,
]);


export const getPropertySchema = (type: string): PropertySchema[] => {
  return propertySchemas.get(type) || allStyleProps;
};

export const setPropertySchema = (type: string, schema: PropertySchema[]): void => {
  propertySchemas.set(type, schema);
};

export const getPropertyGroups = (type: string): Record<string, PropertySchema[]> => {
  const schema = getPropertySchema(type);
  const groups: Record<string, PropertySchema[]> = {};
  for (const prop of schema) {
    const group = prop.group || 'General';
    if (!groups[group]) groups[group] = [];
    groups[group].push(prop);
  }
  return groups;
};

export const getBaseStyleProps = () => allStyleProps;
export const getBaseLayoutProps = () => baseLayoutProps;
export const getBaseTypographyProps = () => baseTypographyProps;
export const getBaseAppearanceProps = () => baseAppearanceProps;
