import React from 'react';
import FallbackComponent from './components/FallbackComponent';
import { SectionComponent, ContainerComponent, DividerComponent, SpacerComponent, GridComponent, ColumnsComponent } from './components/BasicComponents';
import { HeadingComponent, SubheadingComponent, ParagraphComponent, ListComponent, QuoteComponent, ButtonComponent } from './components/TextComponents';
import { ImageComponent, VideoComponent, GalleryComponent, BackgroundVideoComponent } from './components/MediaComponents';
import { HeroComponent, CardComponent, FeatureGridComponent, TestimonialComponent, PricingTableComponent, TabsComponent, AccordionComponent } from './components/LayoutComponents';
import { InputComponent, TextareaComponent, CheckboxComponent, RadioComponent, SelectComponent, LoginFormComponent, SignupFormComponent, ContactFormComponent } from './components/FormComponents';
import { NavbarComponent, SidebarNavComponent, BreadcrumbComponent } from './components/NavigationComponents';
import { ProductCardComponent, ProductGridComponent, ShoppingCartComponent, CheckoutComponent, PaymentBlockComponent } from './components/EcommerceComponents';
import { HtmlComponent, CustomCodeComponent, ApiPlaceholderComponent } from './components/AdvancedComponents';

// Maps component type strings to React components
// Each component receives: { content, children, ...props }
const registry: Record<string, React.FC<any>> = {
  // Basic
  section: SectionComponent,
  container: ContainerComponent,
  divider: DividerComponent,
  spacer: SpacerComponent,
  grid: GridComponent,
  columns: ColumnsComponent,

  // Text
  heading: HeadingComponent,
  subheading: SubheadingComponent,
  paragraph: ParagraphComponent,
  list: ListComponent,
  quote: QuoteComponent,
  button: ButtonComponent,

  // Media
  image: ImageComponent,
  video: VideoComponent,
  gallery: GalleryComponent,
  'background-video': BackgroundVideoComponent,

  // Layout
  hero: HeroComponent,
  card: CardComponent,
  'feature-grid': FeatureGridComponent,
  testimonial: TestimonialComponent,
  'pricing-table': PricingTableComponent,
  tabs: TabsComponent,
  accordion: AccordionComponent,

  // Forms
  input: InputComponent,
  textarea: TextareaComponent,
  checkbox: CheckboxComponent,
  radio: RadioComponent,
  select: SelectComponent,
  'login-form': LoginFormComponent,
  'signup-form': SignupFormComponent,
  'contact-form': ContactFormComponent,

  // Navigation
  navbar: NavbarComponent,
  'sidebar-nav': SidebarNavComponent,
  breadcrumbs: BreadcrumbComponent,

  // Ecommerce
  'product-card': ProductCardComponent,
  'product-grid': ProductGridComponent,
  'shopping-cart': ShoppingCartComponent,
  checkout: CheckoutComponent,
  'payment-block': PaymentBlockComponent,

  // Advanced
  html: HtmlComponent,
  'custom-code': CustomCodeComponent,
  'api-placeholder': ApiPlaceholderComponent,
};

export const getComponent = (type: string): React.FC<any> => {
  return registry[type] || ((props: any) => <FallbackComponent type={type}>{props.children}</FallbackComponent>);
};

export const registerComponent = (type: string, component: React.FC<any>) => {
  registry[type] = component;
};

export const getRegisteredTypes = (): string[] => Object.keys(registry);

export default registry;
