export type DeviceView = 'desktop' | 'tablet' | 'mobile';

// ─── Property Schema System ───────────────────────────────
// Defines what properties each component type exposes for editing

export type PropertyType = 'string' | 'number' | 'boolean' | 'color' | 'select' | 'image' | 'url' | 'richtext' | 'code' | 'json';

export interface PropertySchema {
  key: string;
  label: string;
  type: PropertyType;
  defaultValue?: any;
  group?: string;
  options?: { label: string; value: string }[];
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
  required?: boolean;
}

// ─── Component Styles ──────────────────────────────────────

export interface ComponentStyles {
  width?: string;
  height?: string;
  minHeight?: string;
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: string;
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  lineHeight?: string;
  textAlign?: string;
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRadius?: string;
  borderColor?: string;
  boxShadow?: string;
  opacity?: string;
  display?: string;
  flexDirection?: string;
  flexWrap?: string;
  justifyContent?: string;
  alignItems?: string;
  alignSelf?: string;
  flex?: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridColumn?: string;
  gridRow?: string;
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: string;
  overflow?: string;
  overflowX?: string;
  overflowY?: string;
  cursor?: string;
  transition?: string;
  transform?: string;
  customCSS?: string;
  customClasses?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundGradient?: string;
  letterSpacing?: string;
  textDecoration?: string;
  textTransform?: string;
  whiteSpace?: string;
  wordBreak?: string;
  objectFit?: string;
  aspectRatio?: string;
  [key: string]: string | undefined;
}

export interface ResponsiveStyles {
  desktop?: Partial<ComponentStyles>;
  tablet?: Partial<ComponentStyles>;
  mobile?: Partial<ComponentStyles>;
}

// ─── Component Node ────────────────────────────────────────

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

  // Component reuse — if set, this component is an instance of a symbol
  symbolId?: string;
  // Overrides applied on top of the symbol's base props/styles
  symbolOverrides?: {
    props?: Record<string, any>;
    styles?: Partial<ComponentStyles>;
    content?: string;
  };

  // Component inheritance — the base component type to inherit from
  inheritsFrom?: string;

  // Lock/visibility
  locked?: boolean;
  hidden?: boolean;
  
  // Metadata
  tags?: string[];
  description?: string;
}

// ─── Symbol (Reusable Component) ───────────────────────────

export interface ComponentSymbol {
  id: string;
  name: string;
  description?: string;
  component: BuilderComponent;
  createdAt: string;
  updatedAt: string;
}

// ─── Page Structure ────────────────────────────────────────

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
  symbols?: ComponentSymbol[];
}

// ─── Template ──────────────────────────────────────────────

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  schema: PageSchema;
}

// ─── Component Definition (Library) ────────────────────────

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
  propertySchema?: PropertySchema[];
  // Which component type this inherits defaults from
  inheritsFrom?: string;
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
  'background-video',
];

export const isContainerType = (type: string): boolean => CONTAINER_TYPES.includes(type);
