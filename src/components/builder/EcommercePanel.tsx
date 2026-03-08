import { useState } from 'react';
import {
  Plus, Search, Package, CreditCard, Truck,
  X, Edit3, Trash2, Eye, DollarSign, Gift, Percent,
  ShoppingCart, Users, Loader2,
  Store, Layout, Grid3X3, Layers, Image, Star, Heart, Box,
  Palette, Settings, ChevronRight, Download, Upload,
  MapPin, Clock,
  Shield, Lock, Zap, Sparkles, Crown, Gem, Target,
  LayoutGrid, LayoutList, Columns, Rows, SplitSquareHorizontal,
  Filter, SortAsc,
  Share2,
  Wallet, Receipt, FileText,
  Ticket, BadgePercent, Timer, Bell, MessageSquare,
  ListOrdered, ClipboardList, BarChart2, MoreHorizontal, Bookmark,
  Megaphone, FolderOpen, Archive,
} from 'lucide-react';
import { useProducts, useCreateProduct, useDeleteProduct, useOrders, useCoupons } from '@/hooks/useProducts';
import { useBuilderStore } from '@/store/builderStore';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const orderStatusColors: Record<string, string> = {
  pending: 'hsl(var(--warning))',
  processing: 'hsl(var(--primary))',
  shipped: 'hsl(var(--info))',
  delivered: 'hsl(var(--success))',
  cancelled: 'hsl(var(--destructive))',
};

// ─── Store Components Library ──────────────────────────────

const STORE_COMPONENTS = {
  'Product Display': [
    { id: 'product-card', name: 'Product Card', icon: Box, description: 'Single product with image, title, price', preview: '📦' },
    { id: 'product-grid', name: 'Product Grid', icon: Grid3X3, description: '4-column responsive grid', preview: '🔲' },
    { id: 'product-list', name: 'Product List', icon: LayoutList, description: 'Horizontal list layout', preview: '📋' },
    { id: 'product-carousel', name: 'Product Carousel', icon: Columns, description: 'Scrollable product slider', preview: '🎠' },
    { id: 'featured-product', name: 'Featured Product', icon: Star, description: 'Large hero product display', preview: '⭐' },
    { id: 'product-quick-view', name: 'Quick View Modal', icon: Eye, description: 'Product preview modal', preview: '👁️' },
    { id: 'product-compare', name: 'Compare Products', icon: SplitSquareHorizontal, description: 'Side-by-side comparison', preview: '⚖️' },
    { id: 'recently-viewed', name: 'Recently Viewed', icon: Clock, description: 'Recently viewed products', preview: '🕐' },
  ],
  'Shopping Cart': [
    { id: 'cart-icon', name: 'Cart Icon', icon: ShoppingCart, description: 'Floating cart with counter', preview: '🛒' },
    { id: 'cart-drawer', name: 'Cart Drawer', icon: Layers, description: 'Slide-out cart sidebar', preview: '📥' },
    { id: 'cart-page', name: 'Full Cart Page', icon: Layout, description: 'Complete cart page layout', preview: '📄' },
    { id: 'mini-cart', name: 'Mini Cart', icon: Package, description: 'Compact dropdown cart', preview: '📦' },
    { id: 'cart-item', name: 'Cart Item Row', icon: Rows, description: 'Single cart item component', preview: '➖' },
    { id: 'cart-summary', name: 'Order Summary', icon: Receipt, description: 'Subtotal, tax, total', preview: '🧾' },
  ],
  'Checkout': [
    { id: 'checkout-form', name: 'Checkout Form', icon: FileText, description: 'Complete checkout flow', preview: '📝' },
    { id: 'shipping-form', name: 'Shipping Address', icon: MapPin, description: 'Address input form', preview: '📍' },
    { id: 'payment-form', name: 'Payment Form', icon: CreditCard, description: 'Card payment fields', preview: '💳' },
    { id: 'order-review', name: 'Order Review', icon: ClipboardList, description: 'Final order summary', preview: '✅' },
    { id: 'payment-methods', name: 'Payment Methods', icon: Wallet, description: 'Multiple payment options', preview: '💰' },
    { id: 'guest-checkout', name: 'Guest Checkout', icon: Users, description: 'No account required', preview: '👤' },
    { id: 'express-checkout', name: 'Express Checkout', icon: Zap, description: 'One-click purchase', preview: '⚡' },
  ],
  'Promotions': [
    { id: 'sale-banner', name: 'Sale Banner', icon: Megaphone, description: 'Promotional header banner', preview: '📢' },
    { id: 'discount-badge', name: 'Discount Badge', icon: BadgePercent, description: 'Product sale tag', preview: '🏷️' },
    { id: 'countdown-timer', name: 'Countdown Timer', icon: Timer, description: 'Limited time offer', preview: '⏰' },
    { id: 'coupon-input', name: 'Coupon Input', icon: Ticket, description: 'Promo code field', preview: '🎟️' },
    { id: 'free-shipping', name: 'Free Shipping Bar', icon: Truck, description: 'Shipping threshold progress', preview: '🚚' },
    { id: 'flash-sale', name: 'Flash Sale Section', icon: Sparkles, description: 'Time-limited deals', preview: '✨' },
    { id: 'bundle-deal', name: 'Bundle Deal', icon: Gift, description: 'Multi-product discount', preview: '🎁' },
  ],
  'Product Details': [
    { id: 'image-gallery', name: 'Image Gallery', icon: Image, description: 'Zoomable product images', preview: '🖼️' },
    { id: 'variant-selector', name: 'Variant Selector', icon: Palette, description: 'Size/color picker', preview: '🎨' },
    { id: 'quantity-picker', name: 'Quantity Picker', icon: ListOrdered, description: 'Add to cart quantity', preview: '🔢' },
    { id: 'add-to-cart-btn', name: 'Add to Cart Button', icon: Plus, description: 'Primary CTA button', preview: '➕' },
    { id: 'buy-now-btn', name: 'Buy Now Button', icon: Zap, description: 'Instant checkout', preview: '⚡' },
    { id: 'wishlist-btn', name: 'Add to Wishlist', icon: Heart, description: 'Save for later', preview: '❤️' },
    { id: 'share-product', name: 'Share Product', icon: Share2, description: 'Social share buttons', preview: '📤' },
    { id: 'stock-indicator', name: 'Stock Indicator', icon: Package, description: 'Availability status', preview: '📊' },
  ],
  'Reviews & Social': [
    { id: 'star-rating', name: 'Star Rating', icon: Star, description: 'Product rating display', preview: '⭐' },
    { id: 'review-list', name: 'Review List', icon: MessageSquare, description: 'Customer reviews', preview: '💬' },
    { id: 'write-review', name: 'Write Review', icon: Edit3, description: 'Review submission form', preview: '✍️' },
    { id: 'review-summary', name: 'Review Summary', icon: BarChart2, description: 'Rating distribution', preview: '📊' },
    { id: 'social-proof', name: 'Social Proof', icon: Users, description: 'Recent purchases popup', preview: '👥' },
    { id: 'trust-badges', name: 'Trust Badges', icon: Shield, description: 'Security & guarantee icons', preview: '🛡️' },
  ],
  'Navigation': [
    { id: 'category-menu', name: 'Category Menu', icon: FolderOpen, description: 'Product categories nav', preview: '📁' },
    { id: 'search-bar', name: 'Product Search', icon: Search, description: 'Search with suggestions', preview: '🔍' },
    { id: 'filter-sidebar', name: 'Filter Sidebar', icon: Filter, description: 'Product filters panel', preview: '⚙️' },
    { id: 'sort-dropdown', name: 'Sort Dropdown', icon: SortAsc, description: 'Sorting options', preview: '↕️' },
    { id: 'breadcrumbs', name: 'Breadcrumbs', icon: ChevronRight, description: 'Navigation path', preview: '›' },
    { id: 'pagination', name: 'Pagination', icon: MoreHorizontal, description: 'Page navigation', preview: '...' },
  ],
  'Account & Orders': [
    { id: 'login-form', name: 'Login Form', icon: Lock, description: 'Customer login', preview: '🔐' },
    { id: 'register-form', name: 'Register Form', icon: Users, description: 'New account signup', preview: '📝' },
    { id: 'account-dashboard', name: 'Account Dashboard', icon: Layout, description: 'Customer dashboard', preview: '📊' },
    { id: 'order-history', name: 'Order History', icon: Archive, description: 'Past orders list', preview: '📜' },
    { id: 'order-tracking', name: 'Order Tracking', icon: Truck, description: 'Shipment status', preview: '📍' },
    { id: 'address-book', name: 'Address Book', icon: Bookmark, description: 'Saved addresses', preview: '📖' },
    { id: 'wishlist-page', name: 'Wishlist Page', icon: Heart, description: 'Saved items page', preview: '❤️' },
  ],
};

// ─── Store Templates ───────────────────────────────────────

const STORE_TEMPLATES = [
  { id: 'minimal-store', name: 'Minimal Store', description: 'Clean, modern e-commerce', icon: Layout, style: 'Minimalist' },
  { id: 'fashion-boutique', name: 'Fashion Boutique', description: 'Clothing & accessories', icon: Crown, style: 'Elegant' },
  { id: 'electronics-shop', name: 'Electronics Shop', description: 'Tech & gadgets store', icon: Zap, style: 'Modern' },
  { id: 'organic-market', name: 'Organic Market', description: 'Food & wellness', icon: Sparkles, style: 'Natural' },
  { id: 'luxury-brand', name: 'Luxury Brand', description: 'High-end products', icon: Gem, style: 'Premium' },
  { id: 'sports-gear', name: 'Sports & Fitness', description: 'Athletic equipment', icon: Target, style: 'Dynamic' },
];

// ─── Payment Providers ─────────────────────────────────────

const PAYMENT_PROVIDERS = [
  { id: 'stripe', name: 'Stripe', icon: '💳', status: 'available' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️', status: 'available' },
  { id: 'apple-pay', name: 'Apple Pay', icon: '🍎', status: 'coming' },
  { id: 'google-pay', name: 'Google Pay', icon: '🔵', status: 'coming' },
  { id: 'shop-pay', name: 'Shop Pay', icon: '🛍️', status: 'coming' },
  { id: 'klarna', name: 'Klarna', icon: '🟣', status: 'coming' },
];

// ─── Shipping Options ──────────────────────────────────────

const SHIPPING_OPTIONS = [
  { id: 'free', name: 'Free Shipping', description: 'Orders over $50', icon: Gift },
  { id: 'flat', name: 'Flat Rate', description: 'Fixed shipping cost', icon: DollarSign },
  { id: 'calculated', name: 'Calculated', description: 'Based on location', icon: MapPin },
  { id: 'local-pickup', name: 'Local Pickup', description: 'In-store collection', icon: Store },
];

// ─── Section Component ─────────────────────────────────────

const Section = ({ title, icon: Icon, children, defaultOpen = true, badge }: { title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean; badge?: string | number }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-b border-border/30">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium">{title}</span>
          {badge !== undefined && <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{badge}</Badge>}
        </div>
        <ChevronRight className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

// ─── Component Card ────────────────────────────────────────

const ComponentCard = ({ component, onAdd }: { component: any; onAdd: () => void }) => (
  <button
    onClick={onAdd}
    className="w-full p-2.5 rounded-lg text-left transition-all hover:scale-[1.02] border border-border/50 hover:border-primary/50 hover:bg-primary/5 group"
  >
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-base shrink-0">
        {component.preview}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-medium truncate group-hover:text-primary transition-colors">{component.name}</div>
        <div className="text-[9px] text-muted-foreground truncate">{component.description}</div>
      </div>
      <Plus className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
    </div>
  </button>
);

interface EcommercePanelProps {
  projectId?: string | null;
  onClose?: () => void;
}

const EcommercePanel = ({ projectId, onClose }: EcommercePanelProps) => {
  const [activeTab, setActiveTab] = useState<'components' | 'products' | 'orders' | 'settings'>('components');
  const [search, setSearch] = useState('');
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'General' });
  const [componentSearch, setComponentSearch] = useState('');

  const addComponent = useBuilderStore(s => s.addComponent);
  const { data: products = [], isLoading: productsLoading } = useProducts(projectId ?? null);
  const { data: orders = [], isLoading: ordersLoading } = useOrders(projectId ?? null);
  const { data: coupons = [], isLoading: couponsLoading } = useCoupons(projectId ?? null);
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();

  const totalRevenue = orders.reduce((s, o) => s + Number(o.total), 0);
  const totalSales = products.reduce((s, p) => s + p.sales, 0);

  const filteredProducts = products.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddProduct = async () => {
    if (!newProduct.name.trim() || !projectId) return;
    try {
      await createProduct.mutateAsync({ projectId, name: newProduct.name, price: parseFloat(newProduct.price) || 0, category: newProduct.category });
      setNewProduct({ name: '', price: '', category: 'General' });
      setShowNewProduct(false);
      toast.success('Product created!');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleAddComponent = (component: any) => {
    const schema = useBuilderStore.getState().schema;
    const bodySection = schema.sections.find(s => s.type === 'body');
    if (bodySection) {
      addComponent(bodySection.id, {
        id: `${component.id}-${Date.now()}`,
        type: component.id,
        category: 'ecommerce',
        label: component.name,
        props: {},
        children: [],
        styles: {},
      });
      toast.success(`Added ${component.name}`);
    } else {
      toast.error('No body section found');
    }
  };

  const tabs = [
    { id: 'components' as const, label: 'Components', icon: LayoutGrid },
    { id: 'products' as const, label: 'Products', icon: Package, count: products.length },
    { id: 'orders' as const, label: 'Orders', icon: ShoppingCart, count: orders.length },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  // Filter components based on search
  const getFilteredComponents = () => {
    if (!componentSearch) return STORE_COMPONENTS;
    const filtered: Record<string, typeof STORE_COMPONENTS[keyof typeof STORE_COMPONENTS]> = {};
    Object.entries(STORE_COMPONENTS).forEach(([category, components]) => {
      const matchingComponents = components.filter(c =>
        c.name.toLowerCase().includes(componentSearch.toLowerCase()) ||
        c.description.toLowerCase().includes(componentSearch.toLowerCase())
      );
      if (matchingComponents.length > 0) {
        filtered[category] = matchingComponents;
      }
    });
    return filtered;
  };

  return (
    <div className="builder-flyout flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Store className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Store</h2>
            <p className="text-[10px] text-muted-foreground">E-commerce & Products</p>
          </div>
        </div>
        {onClose && <button onClick={onClose} className="p-1.5 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-1 p-2 border-b border-border shrink-0">
        {[
          { label: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-500' },
          { label: 'Orders', value: orders.length.toString(), icon: ShoppingCart, color: 'text-blue-500' },
          { label: 'Products', value: products.length.toString(), icon: Package, color: 'text-purple-500' },
          { label: 'Coupons', value: coupons.length.toString(), icon: Percent, color: 'text-orange-500' },
        ].map(s => (
          <div key={s.label} className="p-2 rounded-lg text-center bg-muted/30">
            <s.icon className={`w-3.5 h-3.5 mx-auto mb-0.5 ${s.color}`} />
            <div className="text-xs font-bold">{s.value}</div>
            <div className="text-[8px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border shrink-0">
        {tabs.map(({ id, label, icon: Icon, count }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1 px-2 py-2.5 text-[10px] font-medium transition-colors ${
              activeTab === id ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="w-3 h-3" />
            {label}
            {count !== undefined && <span className="text-[9px] opacity-50">({count})</span>}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        {/* ════════════════════════════════════════════════════════ */}
        {/* COMPONENTS TAB */}
        {/* ════════════════════════════════════════════════════════ */}
        {activeTab === 'components' && (
          <div className="divide-y divide-border/30">
            {/* Search */}
            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={componentSearch}
                  onChange={e => setComponentSearch(e.target.value)}
                  placeholder="Search store components..."
                  className="w-full bg-muted/30 border-0 rounded-lg pl-8 pr-3 py-2 text-xs placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* Store Templates */}
            <Section title="Store Templates" icon={Layout} badge={STORE_TEMPLATES.length}>
              <div className="grid grid-cols-2 gap-2">
                {STORE_TEMPLATES.map(template => (
                  <button
                    key={template.id}
                    onClick={() => toast.success(`${template.name} template applied`)}
                    className="p-3 rounded-lg text-left border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <template.icon className="w-5 h-5 mb-2 text-primary group-hover:scale-110 transition-transform" />
                    <div className="text-[11px] font-medium">{template.name}</div>
                    <div className="text-[9px] text-muted-foreground">{template.style}</div>
                  </button>
                ))}
              </div>
            </Section>

            {/* Component Categories */}
            {Object.entries(getFilteredComponents()).map(([category, components]) => (
              <Section key={category} title={category} icon={Box} badge={components.length} defaultOpen={category === 'Product Display'}>
                <div className="space-y-1.5">
                  {components.map(component => (
                    <ComponentCard
                      key={component.id}
                      component={component}
                      onAdd={() => handleAddComponent(component)}
                    />
                  ))}
                </div>
              </Section>
            ))}

            {/* Payment Providers */}
            <Section title="Payment Providers" icon={CreditCard} defaultOpen={false}>
              <div className="space-y-2">
                {PAYMENT_PROVIDERS.map(provider => (
                  <div
                    key={provider.id}
                    className={`flex items-center justify-between p-2.5 rounded-lg border ${
                      provider.status === 'available' ? 'border-border/50 hover:border-primary/50' : 'border-border/30 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{provider.icon}</span>
                      <span className="text-xs font-medium">{provider.name}</span>
                    </div>
                    {provider.status === 'available' ? (
                      <button className="text-[10px] px-2 py-1 rounded bg-primary text-primary-foreground font-medium">
                        Connect
                      </button>
                    ) : (
                      <Badge variant="secondary" className="text-[9px]">Coming Soon</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Section>

            {/* Shipping Options */}
            <Section title="Shipping Options" icon={Truck} defaultOpen={false}>
              <div className="space-y-2">
                {SHIPPING_OPTIONS.map(option => (
                  <div key={option.id} className="flex items-center gap-2.5 p-2.5 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                      <option.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[11px] font-medium">{option.name}</div>
                      <div className="text-[9px] text-muted-foreground">{option.description}</div>
                    </div>
                    <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary" />
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════ */}
        {/* PRODUCTS TAB */}
        {/* ════════════════════════════════════════════════════════ */}
        {activeTab === 'products' && (
          <div className="divide-y divide-border/30">
            <div className="p-3">
              <div className="relative mb-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-muted/30 border-0 rounded-lg pl-8 pr-3 py-2 text-xs"
                />
              </div>
              {showNewProduct ? (
                <div className="space-y-2 p-3 rounded-lg bg-muted/30">
                  <input
                    autoFocus
                    value={newProduct.name}
                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Product name..."
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-xs"
                  />
                  <input
                    value={newProduct.price}
                    onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="Price..."
                    type="number"
                    step="0.01"
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-xs"
                  />
                  <select
                    value={newProduct.category}
                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-xs"
                  >
                    <option>General</option>
                    <option>Clothing</option>
                    <option>Electronics</option>
                    <option>Home & Garden</option>
                    <option>Sports</option>
                    <option>Beauty</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddProduct}
                      disabled={createProduct.isPending}
                      className="flex-1 py-2 rounded-md text-xs font-semibold bg-primary text-primary-foreground"
                    >
                      {createProduct.isPending ? 'Adding...' : 'Add Product'}
                    </button>
                    <button onClick={() => setShowNewProduct(false)} className="px-4 py-2 rounded-md text-xs hover:bg-muted">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewProduct(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-medium border-2 border-dashed border-border hover:border-primary hover:text-primary transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add New Product
                </button>
              )}
            </div>

            {/* Product List */}
            {productsLoading ? (
              <div className="p-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
            ) : filteredProducts.length === 0 ? (
              <div className="p-8 text-center">
                <Package className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
                <div className="text-sm font-medium mb-1">No products yet</div>
                <div className="text-xs text-muted-foreground">Add your first product to get started</div>
              </div>
            ) : (
              <div>
                {filteredProducts.map(prod => (
                  <div key={prod.id} className="p-3 hover:bg-muted/30 transition-colors group border-b border-border/30 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-lg shrink-0">
                        {prod.image || '📦'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-medium truncate">{prod.name}</h3>
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{
                              background: prod.status === 'active' ? 'hsl(var(--success))' : prod.status === 'out-of-stock' ? 'hsl(var(--destructive))' : 'hsl(var(--muted-foreground))'
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span className="font-semibold text-foreground">${Number(prod.price).toFixed(2)}</span>
                          {prod.compare_price && <span className="line-through">${Number(prod.compare_price).toFixed(2)}</span>}
                          <span>•</span>
                          <span>{prod.inventory} in stock</span>
                          <span>•</span>
                          <span>{prod.sales} sold</span>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="p-1.5 rounded hover:bg-muted"><Eye className="w-3.5 h-3.5" /></button>
                            </TooltipTrigger>
                            <TooltipContent>Preview</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="p-1.5 rounded hover:bg-muted"><Edit3 className="w-3.5 h-3.5" /></button>
                            </TooltipTrigger>
                            <TooltipContent>Edit</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button onClick={() => deleteProduct.mutateAsync(prod.id)} className="p-1.5 rounded hover:bg-destructive/10 hover:text-destructive">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>Delete</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════════ */}
        {/* ORDERS TAB */}
        {/* ════════════════════════════════════════════════════════ */}
        {activeTab === 'orders' && (
          <div>
            {/* Order Stats */}
            <div className="grid grid-cols-3 gap-2 p-3 border-b border-border/30">
              {[
                { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: 'bg-yellow-500/10 text-yellow-600' },
                { label: 'Processing', value: orders.filter(o => o.status === 'processing').length, color: 'bg-blue-500/10 text-blue-600' },
                { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: 'bg-green-500/10 text-green-600' },
              ].map(s => (
                <div key={s.label} className={`p-2.5 rounded-lg text-center ${s.color}`}>
                  <div className="text-lg font-bold">{s.value}</div>
                  <div className="text-[9px]">{s.label}</div>
                </div>
              ))}
            </div>

            {ordersLoading ? (
              <div className="p-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
            ) : orders.length === 0 ? (
              <div className="p-8 text-center">
                <ShoppingCart className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
                <div className="text-sm font-medium mb-1">No orders yet</div>
                <div className="text-xs text-muted-foreground">Orders will appear here when customers purchase</div>
              </div>
            ) : (
              <div>
                {orders.map(order => (
                  <div key={order.id} className="p-3 hover:bg-muted/30 transition-colors border-b border-border/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-medium">#{order.id.slice(0, 8)}</span>
                      <Badge
                        variant="secondary"
                        className="text-[9px]"
                        style={{
                          background: `${orderStatusColors[order.status]}20`,
                          color: orderStatusColors[order.status],
                        }}
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-muted-foreground">{order.customer}</span>
                      <span className="font-semibold">${Number(order.total).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1">
                      <span>{new Date(order.created_at).toLocaleDateString()}</span>
                      <span>{order.items} items</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════════ */}
        {/* SETTINGS TAB */}
        {/* ════════════════════════════════════════════════════════ */}
        {activeTab === 'settings' && (
          <div className="divide-y divide-border/30">
            <Section title="Store Settings" icon={Store}>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1 block">Store Name</label>
                  <input className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" placeholder="My Store" />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1 block">Currency</label>
                  <select className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>CAD ($)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1 block">Tax Rate (%)</label>
                  <input type="number" className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" placeholder="0" />
                </div>
              </div>
            </Section>

            <Section title="Notifications" icon={Bell} defaultOpen={false}>
              <div className="space-y-2">
                {[
                  { label: 'New Order Alerts', description: 'Get notified on new orders' },
                  { label: 'Low Stock Alerts', description: 'When inventory is low' },
                  { label: 'Review Notifications', description: 'New customer reviews' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30">
                    <div>
                      <div className="text-[11px] font-medium">{item.label}</div>
                      <div className="text-[9px] text-muted-foreground">{item.description}</div>
                    </div>
                    <input type="checkbox" className="w-4 h-4 rounded accent-primary" defaultChecked />
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Security" icon={Shield} defaultOpen={false}>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[11px]">SSL Certificate</span>
                  </div>
                  <Badge variant="secondary" className="text-[9px] bg-green-500/10 text-green-600">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[11px]">Fraud Protection</span>
                  </div>
                  <Badge variant="secondary" className="text-[9px]">Enabled</Badge>
                </div>
              </div>
            </Section>

            <Section title="Import / Export" icon={Download} defaultOpen={false}>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 py-3 rounded-lg border border-border/50 hover:border-primary/50 text-xs font-medium">
                  <Upload className="w-4 h-4" /> Import CSV
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-lg border border-border/50 hover:border-primary/50 text-xs font-medium">
                  <Download className="w-4 h-4" /> Export Data
                </button>
              </div>
            </Section>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default EcommercePanel;
