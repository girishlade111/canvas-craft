/**
 * Layer 4 — Component Registry
 * Global registry mapping component type strings to React components.
 * Uses lazy loading for less-common component groups to reduce initial bundle.
 */

import React from 'react';
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

// ── Generic components for variant types ───────────────────
import {
  GenericHeading, GenericText, GenericParagraph, GenericList, GenericBadge,
  GenericAlertBox, GenericContainer, GenericButton, GenericButtonGroup,
  GenericCard, GenericEmbed, GenericImage, GenericFormField, GenericFormGroup,
  GenericForm, GenericNav, GenericPlaceholder, GenericMetric, GenericDivider,
  GenericProfile, GenericBlogCard, GenericProductCard, GenericIcon,
} from '@/registry/components/GenericComponents';

// ─── Registry Store ────────────────────────────────────────

const registry: Map<string, React.FC<any>> = new Map();
let extendedLoaded = false;
let extendedLoadingPromise: Promise<void> | null = null;

// Listeners for re-render after extended load
const listeners: Set<() => void> = new Set();
export const onRegistryUpdate = (cb: () => void) => {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
};

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

// ─── Alias mappings: map variant types to core/generic renderers ──

const aliasComponents: Record<string, React.FC<any>> = {
  // Basic variants
  'flex-box': GenericContainer,
  'masonry': GenericContainer,
  'carousel-container': GenericContainer,
  'gradient-divider': GenericDivider,
  'wave-divider': GenericDivider,
  'button-group': GenericButtonGroup,
  'icon-button': GenericButton,
  'link-button': GenericButton,
  'anchor': GenericButton,
  'back-link': GenericButton,

  // Text variants
  'heading-h1': (p: any) => React.createElement(HeadingComponent, { ...p, level: '1' }),
  'heading-h2': (p: any) => React.createElement(HeadingComponent, { ...p, level: '2' }),
  'heading-h3': (p: any) => React.createElement(HeadingComponent, { ...p, level: '3' }),
  'heading-h4': (p: any) => React.createElement(HeadingComponent, { ...p, level: '4' }),
  'eyebrow': GenericText,
  'lead-paragraph': ParagraphComponent,
  'small-text': ParagraphComponent,
  'numbered-list': (p: any) => React.createElement(GenericList, { ...p, ordered: true }),
  'checklist': GenericList,
  'inline-list': GenericText,
  'testimonial-quote': QuoteComponent,
  'inline-code': GenericText,
  'status-badge': GenericBadge,
  'label': GenericBadge,
  'callout': GenericAlertBox,
  'info-box': (p: any) => React.createElement(GenericAlertBox, { ...p, variant: 'info' }),
  'warning-box': (p: any) => React.createElement(GenericAlertBox, { ...p, variant: 'warning' }),
  'success-box': (p: any) => React.createElement(GenericAlertBox, { ...p, variant: 'success' }),
  'error-box': (p: any) => React.createElement(GenericAlertBox, { ...p, variant: 'error' }),
  'highlight-box': GenericAlertBox,
  'note': GenericAlertBox,
  'definition': GenericText,
  'abbreviation': GenericText,
  'drop-cap': GenericParagraph,

  // Media variants
  'image-rounded': GenericImage,
  'image-circle': GenericImage,
  'image-frame': GenericImage,
  'image-shadow': GenericImage,
  'horizontal-gallery': GalleryComponent,
  'lightbox-gallery': GalleryComponent,
  'image-carousel': GalleryComponent,
  'image-slider': GalleryComponent,
  'video-thumbnail': GenericPlaceholder,
  'video-gallery': GenericPlaceholder,
  'audio-playlist': GenericPlaceholder,
  'podcast-player': GenericPlaceholder,
  'parallax-image': GenericImage,
  'ken-burns': GenericImage,
  'file-list': GenericPlaceholder,
  'lottie': GenericPlaceholder,
  'gif': GenericImage,
  'icon-box': GenericCard,
  'emoji': GenericIcon,
  'avatar-group': GenericPlaceholder,
  'image-hotspot': GenericPlaceholder,
  'image-comparison': GenericPlaceholder,
  'logo': GenericImage,
  'qr-code': GenericPlaceholder,
  'barcode': GenericPlaceholder,
  'svg-icon': GenericIcon,
  '3d-model': GenericPlaceholder,

  // Layout variants
  'hero-split': HeroComponent,
  'hero-video': HeroComponent,
  'hero-gradient': HeroComponent,
  'hero-minimal': HeroComponent,
  'card-horizontal': GenericCard,
  'card-image': GenericCard,
  'card-profile': GenericCard,
  'card-stats': GenericCard,
  'card-pricing': GenericCard,
  'card-feature': GenericCard,
  'card-testimonial': GenericCard,
  'card-blog': GenericCard,
  'card-event': GenericCard,
  'card-job': GenericCard,
  'card-product': GenericProductCard,
  'feature-list': FeatureGridComponent,
  'feature-zigzag': FeatureGridComponent,
  'feature-centered': FeatureGridComponent,
  'feature-icon-grid': FeatureGridComponent,
  'testimonial-grid': TestimonialComponent,
  'testimonial-masonry': TestimonialComponent,
  'pricing-comparison': PricingTableComponent,
  'pricing-toggle': PricingTableComponent,
  'tabs-vertical': TabsComponent,
  'tabs-pill': TabsComponent,
  'accordion-bordered': AccordionComponent,
  'collapse': AccordionComponent,
  'cta-split': GenericCard,
  'cta-centered': GenericCard,
  'cta-gradient': GenericCard,
  'logo-carousel': GenericPlaceholder,
  'partner-logos': GenericPlaceholder,
  'stats-animated': GenericPlaceholder,
  'stats-card': GenericMetric,
  'team-carousel': GenericPlaceholder,
  'team-card': GenericProfile,
  'timeline-horizontal': GenericPlaceholder,
  'step-wizard': GenericPlaceholder,
  'faq-two-column': AccordionComponent,
  'portfolio-grid': GenericPlaceholder,
  'portfolio-masonry': GenericPlaceholder,
  'services-grid': GenericPlaceholder,
  'awards-showcase': GenericPlaceholder,
  'process-steps': GenericPlaceholder,
  'split-content': GenericContainer,
  'offset-columns': GenericContainer,
  'bento-grid': GenericContainer,
  'asymmetric-grid': GenericContainer,

  // Form variants
  'input-email': GenericFormField,
  'input-password': GenericFormField,
  'input-number': GenericFormField,
  'input-phone': GenericFormField,
  'input-url': GenericFormField,
  'input-search': GenericFormField,
  'input-date': GenericFormField,
  'input-time': GenericFormField,
  'input-datetime': GenericFormField,
  'input-file': GenericFormField,
  'input-color': GenericFormField,
  'rich-text': GenericFormField,
  'markdown-editor': GenericFormField,
  'checkbox-group': GenericFormGroup,
  'radio-group': GenericFormGroup,
  'radio-cards': GenericFormGroup,
  'multi-select': GenericFormField,
  'combobox': GenericFormField,
  'autocomplete': GenericFormField,
  'tags-input': GenericFormField,
  'switch-group': GenericFormGroup,
  'dual-range': GenericFormField,
  'otp-input': GenericFormField,
  'pin-input': GenericFormField,
  'signature-pad': GenericPlaceholder,
  'star-rating-input': GenericPlaceholder,
  'emoji-picker': GenericPlaceholder,
  'date-picker': GenericFormField,
  'date-range-picker': GenericFormField,
  'time-picker': GenericFormField,
  'address-input': GenericFormField,
  'credit-card-input': GenericFormField,
  'feedback-form': GenericForm,
  'survey-form': GenericForm,
  'waitlist-form': GenericForm,
  'booking-form': GenericForm,
  'quote-request': GenericForm,
  'support-ticket': GenericForm,
  'job-application': GenericForm,
  'rsvp-form': GenericForm,
  'form-wizard': GenericForm,
  'form-group': GenericFormGroup,
  'fieldset': GenericFormGroup,

  // Widget variants
  'search-modal': GenericPlaceholder,
  'command-palette': GenericPlaceholder,
  'social-share': GenericPlaceholder,
  'social-follow': GenericPlaceholder,
  'event-calendar': GenericPlaceholder,
  'mini-calendar': GenericPlaceholder,
  'date-countdown': GenericPlaceholder,
  'weather': GenericPlaceholder,
  'clock': GenericPlaceholder,
  'world-clock': GenericPlaceholder,
  'currency-converter': GenericPlaceholder,
  'calculator': GenericPlaceholder,
  'poll': GenericPlaceholder,
  'quiz': GenericPlaceholder,
  'voting': GenericPlaceholder,
  'live-chat': GenericPlaceholder,
  'chatbot': GenericPlaceholder,
  'contact-card': GenericCard,
  'business-hours': GenericPlaceholder,
  'store-locator': GenericPlaceholder,
  'language-selector': GenericPlaceholder,
  'currency-selector': GenericPlaceholder,
  'dark-mode-toggle': GenericPlaceholder,
  'accessibility-menu': GenericPlaceholder,
  'print-button': GenericButton,
  'copy-button': GenericButton,
  'download-button': GenericButton,

  // Theme variants
  'site-description': GenericText,
  'post-grid': GenericPlaceholder,
  'post-carousel': GenericPlaceholder,
  'post-masonry': GenericPlaceholder,
  'post-title': GenericHeading,
  'post-excerpt': GenericParagraph,
  'post-content': GenericText,
  'post-date': GenericText,
  'post-author': GenericProfile,
  'post-categories': GenericBadge,
  'post-tags': GenericBadge,
  'post-featured-image': GenericImage,
  'comment-count': GenericText,
  'user-menu': GenericNav,
  'user-avatar': GenericProfile,
  'header': GenericContainer,
  'footer': GenericContainer,
  'sidebar': GenericContainer,
  'no-results': GenericPlaceholder,
  'author-archive': GenericPlaceholder,
  'tag-archive': GenericPlaceholder,
  'date-archive': GenericPlaceholder,

  // Embed variants (all map to GenericEmbed)
  'youtube-playlist': GenericEmbed,
  'youtube-shorts': GenericEmbed,
  'twitter-timeline': GenericEmbed,
  'instagram-reel': GenericEmbed,
  'instagram-feed': GenericEmbed,
  'facebook-embed': GenericEmbed,
  'facebook-video': GenericEmbed,
  'facebook-page': GenericEmbed,
  'linkedin-embed': GenericEmbed,
  'spotify-playlist': GenericEmbed,
  'spotify-album': GenericEmbed,
  'spotify-podcast': GenericEmbed,
  'apple-music': GenericEmbed,
  'apple-podcast': GenericEmbed,
  'dailymotion': GenericEmbed,
  'twitch-embed': GenericEmbed,
  'twitch-clip': GenericEmbed,
  'pinterest-board': GenericEmbed,
  'dribbble': GenericEmbed,
  'behance': GenericEmbed,
  'github-gist': GenericEmbed,
  'github-repo': GenericEmbed,
  'codepen': GenericEmbed,
  'codesandbox': GenericEmbed,
  'replit': GenericEmbed,
  'figma-embed': GenericEmbed,
  'sketch-embed': GenericEmbed,
  'canva-embed': GenericEmbed,
  'miro': GenericEmbed,
  'notion-embed': GenericEmbed,
  'airtable': GenericEmbed,
  'google-maps': GenericEmbed,
  'google-docs': GenericEmbed,
  'google-sheets': GenericEmbed,
  'google-slides': GenericEmbed,
  'google-forms': GenericEmbed,
  'google-calendar': GenericEmbed,
  'typeform': GenericEmbed,
  'jotform': GenericEmbed,
  'calendly': GenericEmbed,
  'cal-embed': GenericEmbed,
  'loom': GenericEmbed,
  'wistia': GenericEmbed,
  'vidyard': GenericEmbed,
  'slideshare': GenericEmbed,
  'prezi': GenericEmbed,
  'iframe': GenericEmbed,
  'oembed': GenericEmbed,
  'intercom': GenericEmbed,
  'crisp': GenericEmbed,
  'tawk': GenericEmbed,
  'hubspot-form': GenericEmbed,
  'mailchimp': GenericEmbed,
  'convertkit': GenericEmbed,

  // Ecommerce variants
  'product-card-minimal': GenericProductCard,
  'product-card-detailed': GenericProductCard,
  'product-list': GenericPlaceholder,
  'product-carousel': GenericPlaceholder,
  'product-gallery': GenericPlaceholder,
  'product-quick-view': GenericPlaceholder,
  'product-zoom': GenericPlaceholder,
  'product-variants': GenericPlaceholder,
  'size-selector': GenericPlaceholder,
  'color-selector': GenericPlaceholder,
  'quantity-selector': GenericPlaceholder,
  'add-to-cart': GenericButton,
  'buy-now': GenericButton,
  'wishlist-button': GenericButton,
  'compare-button': GenericButton,
  'mini-cart': GenericPlaceholder,
  'cart-icon': GenericPlaceholder,
  'cart-summary': GenericPlaceholder,
  'checkout-steps': GenericPlaceholder,
  'order-summary': GenericPlaceholder,
  'order-confirmation': GenericPlaceholder,
  'order-tracking': GenericPlaceholder,
  'payment-methods': GenericPlaceholder,
  'shipping-options': GenericPlaceholder,
  'shipping-calculator': GenericPlaceholder,
  'coupon-input': GenericFormField,
  'promo-code': GenericFormField,
  'gift-card': GenericPlaceholder,
  'review-form': GenericForm,
  'review-summary': GenericPlaceholder,
  'review-list': GenericPlaceholder,
  'related-products': GenericPlaceholder,
  'upsell': GenericPlaceholder,
  'cross-sell': GenericPlaceholder,
  'recently-viewed': GenericPlaceholder,
  'bestsellers': GenericPlaceholder,
  'new-arrivals': GenericPlaceholder,
  'sale-badge': GenericBadge,
  'stock-status': GenericBadge,
  'low-stock-alert': GenericAlertBox,
  'trust-badges': GenericPlaceholder,
  'guarantee-badge': GenericPlaceholder,
  'free-shipping': GenericBadge,
  'return-policy': GenericPlaceholder,
  'size-chart': GenericPlaceholder,
  'product-faq': AccordionComponent,
  'subscription-plan': GenericCard,
  'membership-card': GenericCard,
  'loyalty-card': GenericCard,
  'referral-block': GenericCard,
  'invoice': GenericPlaceholder,
  'receipt': GenericPlaceholder,

  // Navigation variants
  'navbar-transparent': GenericNav,
  'navbar-sticky': GenericNav,
  'navbar-centered': GenericNav,
  'navbar-minimal': GenericNav,
  'sidebar-nav-collapsible': GenericNav,
  'sidebar-nav-icons': GenericNav,
  'mega-nav': GenericNav,
  'dropdown-nav': GenericNav,
  'breadcrumbs-custom': GenericNav,
  'pagination-numbered': GenericPlaceholder,
  'pagination-infinite': GenericPlaceholder,
  'pagination-load-more': GenericButton,
  'back-to-top-custom': GenericButton,
  'scroll-to-section': GenericButton,
  'toc-sidebar': GenericPlaceholder,
  'toc-floating': GenericPlaceholder,
  'progress-nav': GenericPlaceholder,
  'page-indicator': GenericPlaceholder,
  'nav-search': GenericFormField,
  'nav-user': GenericProfile,
  'nav-cart': GenericPlaceholder,
  'nav-notifications': GenericPlaceholder,
  'tab-bar': GenericNav,
  'bottom-nav': GenericNav,
  'dock': GenericNav,
  'toolbar': GenericNav,
  'action-bar': GenericNav,
  'stepper-nav': GenericNav,
  'pill-nav': GenericNav,
  'icon-nav': GenericNav,
  'quick-links': GenericNav,
  'sitemap': GenericPlaceholder,
  'footer-nav': GenericNav,
  'footer-links': GenericNav,
  'footer-social': GenericPlaceholder,
  'footer-newsletter': GenericForm,
  'footer-contact': GenericPlaceholder,
  'drawer-trigger': GenericButton,
  'offcanvas-menu': GenericNav,
  'command-menu': GenericPlaceholder,
  'context-menu': GenericPlaceholder,

  // Advanced variants
  'javascript': GenericPlaceholder,
  'css': GenericPlaceholder,
  'api-data': GenericPlaceholder,
  'webhook': GenericPlaceholder,
  'data-table-sortable': GenericPlaceholder,
  'data-table-filterable': GenericPlaceholder,
  'data-table-pagination': GenericPlaceholder,
  'chart-bar': GenericPlaceholder,
  'chart-line': GenericPlaceholder,
  'chart-area': GenericPlaceholder,
  'chart-pie': GenericPlaceholder,
  'chart-donut': GenericPlaceholder,
  'chart-radar': GenericPlaceholder,
  'chart-sparkline': GenericPlaceholder,
  'gauge': GenericPlaceholder,
  'heatmap': GenericPlaceholder,
  'scroll-spy': GenericPlaceholder,
  'sticky-element': GenericContainer,
  'intersection-observer': GenericContainer,
  'parallax-section': GenericContainer,
  'animated-counter': GenericMetric,
  'typewriter': GenericText,
  'text-reveal': GenericText,
  'scroll-reveal': GenericContainer,
  'fade-in': GenericContainer,
  'slide-in': GenericContainer,
  'zoom-in': GenericContainer,
  'flip-card': GenericCard,
  'tilt-card': GenericCard,
  'glow-effect': GenericContainer,
  'glassmorphism': GenericContainer,
  'neumorphism': GenericContainer,
  'gradient-border': GenericContainer,
  'animated-gradient': GenericContainer,
  'blob': GenericPlaceholder,
  'wave': GenericPlaceholder,
  'particles': GenericPlaceholder,
  'confetti': GenericPlaceholder,
  'cursor-effect': GenericPlaceholder,
  'noise-overlay': GenericPlaceholder,
  'grain-overlay': GenericPlaceholder,
  'a11y-skip-link': GenericButton,
  'screen-reader': GenericText,
  'focus-trap': GenericContainer,

  // Blog variants
  'blog-post-minimal': GenericBlogCard,
  'blog-post-featured': GenericBlogCard,
  'blog-post-horizontal': GenericBlogCard,
  'blog-post-overlay': GenericBlogCard,
  'blog-grid': GenericPlaceholder,
  'blog-list': GenericPlaceholder,
  'blog-masonry': GenericPlaceholder,
  'blog-carousel': GenericPlaceholder,
  'author-card': GenericProfile,
  'author-box': GenericProfile,
  'author-list': GenericPlaceholder,
  'recommended-posts': GenericPlaceholder,
  'popular-posts': GenericPlaceholder,
  'trending-posts': GenericPlaceholder,
  'share-floating': GenericPlaceholder,
  'share-sidebar': GenericPlaceholder,
  'comment-list': GenericPlaceholder,
  'comment-thread': GenericPlaceholder,
  'newsletter-inline': GenericForm,
  'newsletter-popup': GenericForm,
  'newsletter-slide-in': GenericForm,
  'category-badge': GenericBadge,
  'tag-badges': GenericBadge,
  'reading-time': GenericText,
  'publish-date': GenericText,
  'views-count': GenericText,
  'likes-count': GenericText,
  'reaction-buttons': GenericPlaceholder,
  'clap-button': GenericButton,
  'save-button': GenericButton,
  'series-nav': GenericNav,
  'post-pagination': GenericPlaceholder,

  // Social variants
  'user-profile-mini': GenericProfile,
  'user-profile-detailed': GenericProfile,
  'user-banner': GenericPlaceholder,
  'user-stats': GenericMetric,
  'social-post': GenericCard,
  'social-story': GenericPlaceholder,
  'social-stories': GenericPlaceholder,
  'social-grid': GenericPlaceholder,
  'chat-bubble-received': GenericText,
  'chat-bubble-sent': GenericText,
  'chat-conversation': GenericPlaceholder,
  'chat-input': GenericFormField,
  'typing-indicator': GenericText,
  'notification-item': GenericCard,
  'notification-list': GenericPlaceholder,
  'activity-feed': GenericPlaceholder,
  'activity-item': GenericCard,
  'follow-button': GenericButton,
  'like-button': GenericButton,
  'share-button': GenericButton,
  'comment-button': GenericButton,
  'bookmark-button': GenericButton,
  'repost-button': GenericButton,
  'followers-list': GenericPlaceholder,
  'following-list': GenericPlaceholder,
  'friend-request': GenericCard,
  'mention': GenericText,
  'hashtag': GenericText,
  'trending-topics': GenericPlaceholder,
  'who-to-follow': GenericPlaceholder,
  'suggested-users': GenericPlaceholder,
  'leaderboard': GenericPlaceholder,
  'achievement-badge': GenericBadge,
  'points-display': GenericMetric,
  'level-indicator': GenericMetric,
  'streak-counter': GenericMetric,
};

// Register core + alias immediately
Object.entries(coreComponents).forEach(([type, component]) => {
  registry.set(type, component);
});
Object.entries(aliasComponents).forEach(([type, component]) => {
  registry.set(type, component);
});

// ─── Extended Components (loaded on demand) ────────────────

const loadExtendedComponents = async () => {
  if (extendedLoaded) return;
  if (extendedLoadingPromise) return extendedLoadingPromise;

  extendedLoadingPromise = (async () => {
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
      input: forms.InputComponent,
      textarea: forms.TextareaComponent,
      checkbox: forms.CheckboxComponent,
      radio: forms.RadioComponent,
      select: forms.SelectComponent,
      'login-form': forms.LoginFormComponent,
      'signup-form': forms.SignupFormComponent,
      'contact-form': forms.ContactFormComponent,
      navbar: navigation.NavbarComponent,
      'sidebar-nav': navigation.SidebarNavComponent,
      breadcrumbs: navigation.BreadcrumbComponent,
      'product-card': ecommerce.ProductCardComponent,
      'product-grid': ecommerce.ProductGridComponent,
      'shopping-cart': ecommerce.ShoppingCartComponent,
      checkout: ecommerce.CheckoutComponent,
      'payment-block': ecommerce.PaymentBlockComponent,
      'social-icons': widgets.SocialIconsComponent,
      countdown: widgets.CountdownComponent,
      'progress-bar': widgets.ProgressBarComponent,
      'star-rating': widgets.StarRatingComponent,
      map: widgets.MapComponent,
      badge: widgets.BadgeComponent,
      alert: widgets.AlertComponent,
      icon: widgets.IconComponent,
      'lucide-icon': widgets.LucideIconComponent,
      'hero-icon': widgets.HeroIconComponent,
      'universal-icon': widgets.UniversalIconComponent,
      avatar: widgets.AvatarComponent,
      tooltip: widgets.TooltipComponent,
      'cta-banner': widgets.CTABannerComponent,
      'logo-cloud': widgets.LogoCloudComponent,
      stats: widgets.StatsComponent,
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
      html: advanced.HtmlComponent,
      'custom-code': advanced.CustomCodeComponent,
      'api-placeholder': advanced.ApiPlaceholderComponent,
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
      'blog-post-card': blog.BlogPostCardComponent,
      'author-bio': blog.AuthorBioComponent,
      'related-posts': blog.RelatedPostsComponent,
      'share-buttons': blog.ShareButtonsComponent,
      toc: blog.TOCComponent,
      'reading-progress': blog.ReadingProgressComponent,
      'comment-item': blog.CommentItemComponent,
      'toggle-switch': interactive.ToggleSwitchComponent,
      'range-slider': interactive.RangeSliderComponent,
      stepper: interactive.StepperComponent,
      'chip-group': interactive.ChipGroupComponent,
      'mega-menu': interactive.MegaMenuComponent,
      notification: interactive.NotificationComponent,
      skeleton: interactive.SkeletonComponent,
      'empty-state': interactive.EmptyStateComponent,
      'data-table': dataDisplay.DataTableComponent,
      'metric-card': dataDisplay.MetricCardComponent,
      'chart-placeholder': dataDisplay.ChartPlaceholderComponent,
      'kpi-dashboard': dataDisplay.KPIDashboardComponent,
      'feature-card': contentBlocks.FeatureCardComponent,
      'feature-list': dataDisplay.FeatureListComponent,
      pagination: dataDisplay.PaginationComponent,
      'breadcrumb-trail': dataDisplay.BreadcrumbTrailComponent,
      'tag-list': dataDisplay.TagListComponent,
      'testimonial-carousel': social.TestimonialCarouselComponent,
      'social-feed-card': social.SocialFeedCardComponent,
      'user-profile-card': social.UserProfileCardComponent,
      'review-card': social.ReviewCardComponent,
      'chat-bubble': social.ChatBubbleComponent,
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

    extendedLoaded = true;
    // Notify all mounted components to re-render with real components
    listeners.forEach(cb => cb());
  })();

  return extendedLoadingPromise;
};

// ─── Fallback Cache (prevents React remount loops) ─────────

const fallbackCache: Map<string, React.FC<any>> = new Map();

const getFallback = (type: string): React.FC<any> => {
  let cached = fallbackCache.get(type);
  if (!cached) {
    cached = (props: any) => React.createElement(FallbackComponent, { type, content: props.content }, props.children);
    cached.displayName = `Fallback(${type})`;
    fallbackCache.set(type, cached);
  }
  return cached;
};

// ─── Public API ────────────────────────────────────────────

export const getComponent = (type: string): React.FC<any> => {
  const found = registry.get(type);
  if (found) return found;

  // Trigger async load if not started
  if (!extendedLoaded) {
    loadExtendedComponents();
  }

  // Return a CACHED fallback to prevent React remount loops
  return getFallback(type);
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

export const ensureAllComponentsLoaded = (): Promise<void> => {
  return loadExtendedComponents();
};
