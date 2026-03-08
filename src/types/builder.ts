export type DeviceView = 'desktop' | 'tablet' | 'mobile';

export interface ComponentStyles {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  border?: string;
  borderRadius?: string;
  boxShadow?: string;
  opacity?: string;
  textAlign?: string;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  customCSS?: string;
  customClasses?: string;
  minHeight?: string;
  maxWidth?: string;
  lineHeight?: string;
  [key: string]: string | undefined;
}

export interface BuilderComponent {
  id: string;
  type: string;
  category: string;
  label: string;
  content?: string;
  children?: BuilderComponent[];
  styles: ComponentStyles;
  props?: Record<string, any>;
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
