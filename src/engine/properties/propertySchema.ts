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
  { key: 'icon', label: 'Icon', type: 'string', group: 'Component', placeholder: '⭐', defaultValue: '⭐' },
  { key: 'size', label: 'Size', type: 'string', group: 'Component', placeholder: '32', defaultValue: '32' },
  { key: 'color', label: 'Color', type: 'color', group: 'Component' },
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

// ─── Public API ────────────────────────────────────────────

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
