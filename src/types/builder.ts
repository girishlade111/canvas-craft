export type DeviceView = 'desktop' | 'tablet' | 'mobile';

export interface ComponentStyles {
  width?: string;
  height?: string;
  minHeight?: string;
  maxWidth?: string;
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  lineHeight?: string;
  textAlign?: string;
  border?: string;
  borderRadius?: string;
  boxShadow?: string;
  opacity?: string;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  gridTemplateColumns?: string;
  position?: string;
  overflow?: string;
  customCSS?: string;
  customClasses?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  letterSpacing?: string;
  textDecoration?: string;
  textTransform?: string;
  [key: string]: string | undefined;
}

export interface ResponsiveStyles {
  desktop?: Partial<ComponentStyles>;
  tablet?: Partial<ComponentStyles>;
  mobile?: Partial<ComponentStyles>;
}

export interface BuilderComponent {
  id: string;
  type: string;
  category: string;
  label: string;
  content?: string;
  children?: BuilderComponent[];
  styles: ComponentStyles;
  responsiveStyles?: ResponsiveStyles;
  props?: Record<string, any>;
  isContainer?: boolean;
}

export interface PageSection {
  id: string;
  type: 'header' | 'nav' | 'body' | 'footer' | 'section';
  label: string;
  components: BuilderComponent[];
  styles: ComponentStyles;
}

export interface PageSchema {
  id: string;
  name: string;
  sections: PageSection[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  schema: PageSchema;
}

export interface ComponentDefinition {
  type: string;
  label: string;
  category: string;
  icon: string;
  defaultContent?: string;
  defaultStyles?: ComponentStyles;
  defaultProps?: Record<string, any>;
  isContainer?: boolean;
  acceptsChildren?: boolean;
}

export type ComponentCategory =
  | 'Basic'
  | 'Text'
  | 'Media'
  | 'Layout'
  | 'Forms'
  | 'Ecommerce'
  | 'Navigation'
  | 'Advanced';

// Container types that accept children
export const CONTAINER_TYPES = [
  'section', 'container', 'grid', 'columns', 'card', 'hero',
  'tabs', 'accordion', 'navbar', 'sidebar-nav',
  'column', 'tab-panel', 'accordion-item',
];

export const isContainerType = (type: string): boolean => CONTAINER_TYPES.includes(type);
