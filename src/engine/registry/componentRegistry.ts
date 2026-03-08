/**
 * Layer 4 — Component Registry
 * Global registry mapping component type strings to React components.
 */

import React from 'react';
import FallbackComponent from '@/registry/components/FallbackComponent';
import {
  SectionComponent, ContainerComponent, DividerComponent,
  SpacerComponent, GridComponent, ColumnsComponent,
} from '@/registry/components/BasicComponents';
import {
  HeadingComponent, SubheadingComponent, ParagraphComponent,
  ListComponent, QuoteComponent, ButtonComponent,
} from '@/registry/components/TextComponents';
import {
  ImageComponent, VideoComponent, GalleryComponent, BackgroundVideoComponent,
} from '@/registry/components/MediaComponents';
import {
  HeroComponent, CardComponent, FeatureGridComponent,
  TestimonialComponent, PricingTableComponent, TabsComponent, AccordionComponent,
} from '@/registry/components/LayoutComponents';
import {
  InputComponent, TextareaComponent, CheckboxComponent,
  RadioComponent, SelectComponent, LoginFormComponent,
  SignupFormComponent, ContactFormComponent,
} from '@/registry/components/FormComponents';
import {
  NavbarComponent, SidebarNavComponent, BreadcrumbComponent,
} from '@/registry/components/NavigationComponents';
import {
  ProductCardComponent, ProductGridComponent, ShoppingCartComponent,
  CheckoutComponent, PaymentBlockComponent,
} from '@/registry/components/EcommerceComponents';
import {
  HtmlComponent, CustomCodeComponent, ApiPlaceholderComponent,
} from '@/registry/components/AdvancedComponents';
import {
  SocialIconsComponent, CountdownComponent, ProgressBarComponent,
  StarRatingComponent, MapComponent, BadgeComponent, AlertComponent,
  IconComponent, AvatarComponent, TooltipComponent, CTABannerComponent,
  LogoCloudComponent, StatsComponent,
} from '@/registry/components/WidgetComponents';
import {
  TableComponent, PullQuoteComponent, CodeBlockComponent,
  PreformattedComponent, VerseComponent, GroupComponent,
  RowComponent, StackComponent, SeparatorComponent,
  MoreComponent, PageBreakComponent, CoverComponent,
  MediaTextComponent, FileComponent, AudioComponent,
} from '@/registry/components/DesignComponents';
import {
  SiteLogoComponent, SiteTitleComponent, SiteTaglineComponent,
  NavigationMenuComponent, QueryLoopComponent, PostListComponent,
  PostNavigationComponent, CommentsComponent, CommentFormComponent,
  LoginOutComponent, TemplatePartComponent, ArchiveTitleComponent,
  SearchResultsTitleComponent, SearchBarComponent, ArchivesComponent,
  CalendarWidgetComponent, CategoriesComponent, LatestPostsComponent,
  LatestCommentsComponent, PageListComponent, RSSComponent,
  ShortcodeComponent, TagCloudComponent,
} from '@/registry/components/ThemeComponents';
import {
  YouTubeEmbedComponent, TwitterEmbedComponent, InstagramEmbedComponent,
  SpotifyEmbedComponent, SoundCloudEmbedComponent, VimeoEmbedComponent,
  TikTokEmbedComponent, PinterestEmbedComponent, RedditEmbedComponent,
  FlickrEmbedComponent, PDFViewerComponent,
} from '@/registry/components/EmbedComponents';

// New component imports
import {
  NewsletterComponent, PopupTriggerComponent, AnnouncementBarComponent,
  CookieConsentComponent, FABComponent, BackToTopComponent,
  ComparisonTableComponent, BeforeAfterComponent, TeamGridComponent,
  TimelineComponent, FAQComponent,
} from '@/registry/components/MarketingComponents';
import {
  BlogPostCardComponent, AuthorBioComponent, RelatedPostsComponent,
  ShareButtonsComponent, TOCComponent, ReadingProgressComponent,
  CommentItemComponent,
} from '@/registry/components/BlogComponents';
import {
  ToggleSwitchComponent, RangeSliderComponent, StepperComponent,
  ChipGroupComponent, MegaMenuComponent, NotificationComponent,
  SkeletonComponent, EmptyStateComponent,
} from '@/registry/components/InteractiveComponents';
import {
  DataTableComponent, MetricCardComponent, ChartPlaceholderComponent,
  KPIDashboardComponent, FeatureListComponent, PaginationComponent,
  BreadcrumbTrailComponent, TagListComponent,
} from '@/registry/components/DataDisplayComponents';
import {
  TestimonialCarouselComponent, SocialFeedCardComponent,
  UserProfileCardComponent, ReviewCardComponent, ChatBubbleComponent,
} from '@/registry/components/SocialComponents';
import {
  FeatureCardComponent, CalloutComponent, NumberedStepsComponent,
  MarqueeComponent, PricingCardComponent, ImageOverlayCardComponent,
  DividerWithTextComponent, BlockquoteImageComponent,
  HorizontalGalleryComponent, ContentSwitcherComponent,
} from '@/registry/components/ContentBlockComponents';

// ─── Registry Store ────────────────────────────────────────

const registry: Map<string, React.FC<any>> = new Map();

// ─── Default Components ────────────────────────────────────

const defaultComponents: Record<string, React.FC<any>> = {
  // Basic
  section: SectionComponent,
  container: ContainerComponent,
  divider: DividerComponent,
  spacer: SpacerComponent,
  grid: GridComponent,
  columns: ColumnsComponent,
  group: GroupComponent,
  row: RowComponent,
  stack: StackComponent,
  separator: SeparatorComponent,
  more: MoreComponent,
  'page-break': PageBreakComponent,

  // Text
  heading: HeadingComponent,
  subheading: SubheadingComponent,
  paragraph: ParagraphComponent,
  list: ListComponent,
  quote: QuoteComponent,
  button: ButtonComponent,
  table: TableComponent,
  'pull-quote': PullQuoteComponent,
  'code-block': CodeBlockComponent,
  preformatted: PreformattedComponent,
  verse: VerseComponent,

  // Media
  image: ImageComponent,
  video: VideoComponent,
  gallery: GalleryComponent,
  audio: AudioComponent,
  cover: CoverComponent,
  file: FileComponent,
  'media-text': MediaTextComponent,
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

  // Widgets
  'social-icons': SocialIconsComponent,
  countdown: CountdownComponent,
  'progress-bar': ProgressBarComponent,
  'star-rating': StarRatingComponent,
  map: MapComponent,
  badge: BadgeComponent,
  alert: AlertComponent,
  icon: IconComponent,
  avatar: AvatarComponent,
  tooltip: TooltipComponent,
  'cta-banner': CTABannerComponent,
  'logo-cloud': LogoCloudComponent,
  stats: StatsComponent,
  'search-bar': SearchBarComponent,
  archives: ArchivesComponent,
  'calendar-widget': CalendarWidgetComponent,
  categories: CategoriesComponent,
  'latest-posts': LatestPostsComponent,
  'latest-comments': LatestCommentsComponent,
  'page-list': PageListComponent,
  rss: RSSComponent,
  shortcode: ShortcodeComponent,
  'tag-cloud': TagCloudComponent,

  // Theme / Site
  'site-logo': SiteLogoComponent,
  'site-title': SiteTitleComponent,
  'site-tagline': SiteTaglineComponent,
  'navigation-menu': NavigationMenuComponent,
  'query-loop': QueryLoopComponent,
  'post-list': PostListComponent,
  'post-navigation': PostNavigationComponent,
  comments: CommentsComponent,
  'comment-form': CommentFormComponent,
  'login-out': LoginOutComponent,
  'template-part': TemplatePartComponent,
  'archive-title': ArchiveTitleComponent,
  'search-results-title': SearchResultsTitleComponent,

  // Embeds
  'youtube-embed': YouTubeEmbedComponent,
  'twitter-embed': TwitterEmbedComponent,
  'instagram-embed': InstagramEmbedComponent,
  'spotify-embed': SpotifyEmbedComponent,
  'soundcloud-embed': SoundCloudEmbedComponent,
  'vimeo-embed': VimeoEmbedComponent,
  'tiktok-embed': TikTokEmbedComponent,
  'pinterest-embed': PinterestEmbedComponent,
  'reddit-embed': RedditEmbedComponent,
  'flickr-embed': FlickrEmbedComponent,
  'pdf-viewer': PDFViewerComponent,

  // Advanced
  html: HtmlComponent,
  'custom-code': CustomCodeComponent,
  'api-placeholder': ApiPlaceholderComponent,

  // ═══════════════════════════════════════════════
  // NEW 50+ COMPONENTS
  // ═══════════════════════════════════════════════

  // Marketing
  newsletter: NewsletterComponent,
  'popup-trigger': PopupTriggerComponent,
  'announcement-bar': AnnouncementBarComponent,
  'cookie-consent': CookieConsentComponent,
  fab: FABComponent,
  'back-to-top': BackToTopComponent,
  'comparison-table': ComparisonTableComponent,
  'before-after': BeforeAfterComponent,
  'team-grid': TeamGridComponent,
  timeline: TimelineComponent,
  faq: FAQComponent,

  // Blog
  'blog-post-card': BlogPostCardComponent,
  'author-bio': AuthorBioComponent,
  'related-posts': RelatedPostsComponent,
  'share-buttons': ShareButtonsComponent,
  toc: TOCComponent,
  'reading-progress': ReadingProgressComponent,
  'comment-item': CommentItemComponent,

  // Interactive
  'toggle-switch': ToggleSwitchComponent,
  'range-slider': RangeSliderComponent,
  stepper: StepperComponent,
  'chip-group': ChipGroupComponent,
  'mega-menu': MegaMenuComponent,
  notification: NotificationComponent,
  skeleton: SkeletonComponent,
  'empty-state': EmptyStateComponent,

  // Data Display
  'data-table': DataTableComponent,
  'metric-card': MetricCardComponent,
  'chart-placeholder': ChartPlaceholderComponent,
  'kpi-dashboard': KPIDashboardComponent,
  'feature-list': FeatureListComponent,
  pagination: PaginationComponent,
  'breadcrumb-trail': BreadcrumbTrailComponent,
  'tag-list': TagListComponent,

  // Social
  'testimonial-carousel': TestimonialCarouselComponent,
  'social-feed-card': SocialFeedCardComponent,
  'user-profile-card': UserProfileCardComponent,
  'review-card': ReviewCardComponent,
  'chat-bubble': ChatBubbleComponent,

  // Content Blocks
  'feature-card': FeatureCardComponent,
  callout: CalloutComponent,
  'numbered-steps': NumberedStepsComponent,
  marquee: MarqueeComponent,
  'pricing-card': PricingCardComponent,
  'image-overlay-card': ImageOverlayCardComponent,
  'divider-text': DividerWithTextComponent,
  'blockquote-image': BlockquoteImageComponent,
  'horizontal-gallery': HorizontalGalleryComponent,
  'content-switcher': ContentSwitcherComponent,
};

// Initialize registry with defaults
Object.entries(defaultComponents).forEach(([type, component]) => {
  registry.set(type, component);
});

// ─── Public API ────────────────────────────────────────────

export const getComponent = (type: string): React.FC<any> => {
  const found = registry.get(type);
  if (found) return found;
  const Fallback: React.FC<any> = (props) => {
    return React.createElement(FallbackComponent, { type }, props.children);
  };
  return Fallback;
};

export const registerComponent = (type: string, component: React.FC<any>): void => {
  registry.set(type, component);
};

export const unregisterComponent = (type: string): boolean => {
  return registry.delete(type);
};

export const hasComponent = (type: string): boolean => {
  return registry.has(type);
};

export const getRegisteredTypes = (): string[] => {
  return Array.from(registry.keys());
};

export const getRegistrySize = (): number => {
  return registry.size;
};

export const registerComponents = (components: Record<string, React.FC<any>>): void => {
  Object.entries(components).forEach(([type, component]) => {
    registry.set(type, component);
  });
};
