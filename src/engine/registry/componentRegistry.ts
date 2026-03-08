/**
 * Layer 4 — Component Registry
 * Global registry mapping component type strings to React components.
 * Uses lazy loading for less-common component groups to reduce initial bundle.
 */

import React, { lazy } from 'react';
import FallbackComponent from '@/registry/components/FallbackComponent';

// ── Core components (always loaded — used in most pages) ───
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

// ─── Registry Store ────────────────────────────────────────

const registry: Map<string, React.FC<any>> = new Map();
const pendingLoaders: Map<string, () => Promise<void>> = new Map();
let extendedLoaded = false;

// ─── Core Components (loaded immediately) ──────────────────

const coreComponents: Record<string, React.FC<any>> = {
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
};

// Initialize with core components
Object.entries(coreComponents).forEach(([type, component]) => {
  registry.set(type, component);
});

// ─── Extended Components (loaded on demand) ────────────────

const loadExtendedComponents = async () => {
  if (extendedLoaded) return;
  extendedLoaded = true;

  const [
    forms, navigation, ecommerce, widgets, design,
    theme, embeds, marketing, blog, interactive,
    dataDisplay, social, contentBlocks, advanced,
  ] = await Promise.all([
    import('@/registry/components/FormComponents'),
    import('@/registry/components/NavigationComponents'),
    import('@/registry/components/EcommerceComponents'),
    import('@/registry/components/WidgetComponents'),
    import('@/registry/components/DesignComponents'),
    import('@/registry/components/ThemeComponents'),
    import('@/registry/components/EmbedComponents'),
    import('@/registry/components/MarketingComponents'),
    import('@/registry/components/BlogComponents'),
    import('@/registry/components/InteractiveComponents'),
    import('@/registry/components/DataDisplayComponents'),
    import('@/registry/components/SocialComponents'),
    import('@/registry/components/ContentBlockComponents'),
    import('@/registry/components/AdvancedComponents'),
  ]);

  const extended: Record<string, React.FC<any>> = {
    // Forms
    input: forms.InputComponent,
    textarea: forms.TextareaComponent,
    checkbox: forms.CheckboxComponent,
    radio: forms.RadioComponent,
    select: forms.SelectComponent,
    'login-form': forms.LoginFormComponent,
    'signup-form': forms.SignupFormComponent,
    'contact-form': forms.ContactFormComponent,

    // Navigation
    navbar: navigation.NavbarComponent,
    'sidebar-nav': navigation.SidebarNavComponent,
    breadcrumbs: navigation.BreadcrumbComponent,

    // Ecommerce
    'product-card': ecommerce.ProductCardComponent,
    'product-grid': ecommerce.ProductGridComponent,
    'shopping-cart': ecommerce.ShoppingCartComponent,
    checkout: ecommerce.CheckoutComponent,
    'payment-block': ecommerce.PaymentBlockComponent,

    // Widgets
    'social-icons': widgets.SocialIconsComponent,
    countdown: widgets.CountdownComponent,
    'progress-bar': widgets.ProgressBarComponent,
    'star-rating': widgets.StarRatingComponent,
    map: widgets.MapComponent,
    badge: widgets.BadgeComponent,
    alert: widgets.AlertComponent,
    icon: widgets.IconComponent,
    avatar: widgets.AvatarComponent,
    tooltip: widgets.TooltipComponent,
    'cta-banner': widgets.CTABannerComponent,
    'logo-cloud': widgets.LogoCloudComponent,
    stats: widgets.StatsComponent,

    // Design
    table: design.TableComponent,
    'pull-quote': design.PullQuoteComponent,
    'code-block': design.CodeBlockComponent,
    preformatted: design.PreformattedComponent,
    verse: design.VerseComponent,
    group: design.GroupComponent,
    row: design.RowComponent,
    stack: design.StackComponent,
    separator: design.SeparatorComponent,
    more: design.MoreComponent,
    'page-break': design.PageBreakComponent,
    cover: design.CoverComponent,
    'media-text': design.MediaTextComponent,
    file: design.FileComponent,
    audio: design.AudioComponent,

    // Theme / Site
    'site-logo': theme.SiteLogoComponent,
    'site-title': theme.SiteTitleComponent,
    'site-tagline': theme.SiteTaglineComponent,
    'navigation-menu': theme.NavigationMenuComponent,
    'query-loop': theme.QueryLoopComponent,
    'post-list': theme.PostListComponent,
    'post-navigation': theme.PostNavigationComponent,
    comments: theme.CommentsComponent,
    'comment-form': theme.CommentFormComponent,
    'login-out': theme.LoginOutComponent,
    'template-part': theme.TemplatePartComponent,
    'archive-title': theme.ArchiveTitleComponent,
    'search-results-title': theme.SearchResultsTitleComponent,
    'search-bar': theme.SearchBarComponent,
    archives: theme.ArchivesComponent,
    'calendar-widget': theme.CalendarWidgetComponent,
    categories: theme.CategoriesComponent,
    'latest-posts': theme.LatestPostsComponent,
    'latest-comments': theme.LatestCommentsComponent,
    'page-list': theme.PageListComponent,
    rss: theme.RSSComponent,
    shortcode: theme.ShortcodeComponent,
    'tag-cloud': theme.TagCloudComponent,

    // Embeds
    'youtube-embed': embeds.YouTubeEmbedComponent,
    'twitter-embed': embeds.TwitterEmbedComponent,
    'instagram-embed': embeds.InstagramEmbedComponent,
    'spotify-embed': embeds.SpotifyEmbedComponent,
    'soundcloud-embed': embeds.SoundCloudEmbedComponent,
    'vimeo-embed': embeds.VimeoEmbedComponent,
    'tiktok-embed': embeds.TikTokEmbedComponent,
    'pinterest-embed': embeds.PinterestEmbedComponent,
    'reddit-embed': embeds.RedditEmbedComponent,
    'flickr-embed': embeds.FlickrEmbedComponent,
    'pdf-viewer': embeds.PDFViewerComponent,

    // Advanced
    html: advanced.HtmlComponent,
    'custom-code': advanced.CustomCodeComponent,
    'api-placeholder': advanced.ApiPlaceholderComponent,

    // Marketing
    newsletter: marketing.NewsletterComponent,
    'popup-trigger': marketing.PopupTriggerComponent,
    'announcement-bar': marketing.AnnouncementBarComponent,
    'cookie-consent': marketing.CookieConsentComponent,
    fab: marketing.FABComponent,
    'back-to-top': marketing.BackToTopComponent,
    'comparison-table': marketing.ComparisonTableComponent,
    'before-after': marketing.BeforeAfterComponent,
    'team-grid': marketing.TeamGridComponent,
    timeline: marketing.TimelineComponent,
    faq: marketing.FAQComponent,

    // Blog
    'blog-post-card': blog.BlogPostCardComponent,
    'author-bio': blog.AuthorBioComponent,
    'related-posts': blog.RelatedPostsComponent,
    'share-buttons': blog.ShareButtonsComponent,
    toc: blog.TOCComponent,
    'reading-progress': blog.ReadingProgressComponent,
    'comment-item': blog.CommentItemComponent,

    // Interactive
    'toggle-switch': interactive.ToggleSwitchComponent,
    'range-slider': interactive.RangeSliderComponent,
    stepper: interactive.StepperComponent,
    'chip-group': interactive.ChipGroupComponent,
    'mega-menu': interactive.MegaMenuComponent,
    notification: interactive.NotificationComponent,
    skeleton: interactive.SkeletonComponent,
    'empty-state': interactive.EmptyStateComponent,

    // Data Display
    'data-table': dataDisplay.DataTableComponent,
    'metric-card': dataDisplay.MetricCardComponent,
    'chart-placeholder': dataDisplay.ChartPlaceholderComponent,
    'kpi-dashboard': dataDisplay.KPIDashboardComponent,
    'feature-list': dataDisplay.FeatureListComponent,
    pagination: dataDisplay.PaginationComponent,
    'breadcrumb-trail': dataDisplay.BreadcrumbTrailComponent,
    'tag-list': dataDisplay.TagListComponent,

    // Social
    'testimonial-carousel': social.TestimonialCarouselComponent,
    'social-feed-card': social.SocialFeedCardComponent,
    'user-profile-card': social.UserProfileCardComponent,
    'review-card': social.ReviewCardComponent,
    'chat-bubble': social.ChatBubbleComponent,

    // Content Blocks
    'feature-card': contentBlocks.FeatureCardComponent,
    callout: contentBlocks.CalloutComponent,
    'numbered-steps': contentBlocks.NumberedStepsComponent,
    marquee: contentBlocks.MarqueeComponent,
    'pricing-card': contentBlocks.PricingCardComponent,
    'image-overlay-card': contentBlocks.ImageOverlayCardComponent,
    'divider-text': contentBlocks.DividerWithTextComponent,
    'blockquote-image': contentBlocks.BlockquoteImageComponent,
    'horizontal-gallery': contentBlocks.HorizontalGalleryComponent,
    'content-switcher': contentBlocks.ContentSwitcherComponent,
  };

  Object.entries(extended).forEach(([type, component]) => {
    registry.set(type, component);
  });
};

// Eagerly start loading extended components (non-blocking)
// This triggers the async load immediately but doesn't block rendering
if (typeof window !== 'undefined') {
  // Use requestIdleCallback to load during browser idle time
  const load = () => loadExtendedComponents();
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(load, { timeout: 2000 });
  } else {
    setTimeout(load, 100);
  }
}

// ─── Public API ────────────────────────────────────────────

export const getComponent = (type: string): React.FC<any> => {
  const found = registry.get(type);
  if (found) return found;

  // If not found, trigger load and return fallback
  if (!extendedLoaded) {
    loadExtendedComponents();
  }

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

// Force-load all extended components (useful for builder page)
export const ensureAllComponentsLoaded = (): Promise<void> => {
  return loadExtendedComponents();
};
