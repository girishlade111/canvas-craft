import { useState } from 'react';
import {
  ShoppingBag, Plus, Search, Package, CreditCard, Tag, Truck,
  BarChart3, X, Edit3, Trash2, Eye, DollarSign, Gift, Percent,
  ShoppingCart, Users, TrendingUp, ArrowUpRight,
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  status: 'active' | 'draft' | 'out-of-stock';
  inventory: number;
  category: string;
  image: string;
  variants: number;
  sales: number;
}

interface Order {
  id: string;
  customer: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  items: number;
}

interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  usageCount: number;
  active: boolean;
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Headphones', price: 299.99, comparePrice: 399.99, status: 'active', inventory: 45, category: 'Electronics', image: '🎧', variants: 3, sales: 128 },
  { id: '2', name: 'Organic Cotton T-Shirt', price: 39.99, status: 'active', inventory: 200, category: 'Apparel', image: '👕', variants: 5, sales: 342 },
  { id: '3', name: 'Designer Watch', price: 599.99, comparePrice: 799.99, status: 'active', inventory: 12, category: 'Accessories', image: '⌚', variants: 2, sales: 56 },
  { id: '4', name: 'Wireless Keyboard', price: 89.99, status: 'out-of-stock', inventory: 0, category: 'Electronics', image: '⌨️', variants: 1, sales: 89 },
  { id: '5', name: 'Digital Course: Web Design', price: 149.99, status: 'active', inventory: 999, category: 'Digital', image: '📚', variants: 0, sales: 210 },
];

const MOCK_ORDERS: Order[] = [
  { id: 'ORD-001', customer: 'John Smith', total: 339.98, status: 'shipped', date: '2026-03-07', items: 2 },
  { id: 'ORD-002', customer: 'Sarah Wilson', total: 599.99, status: 'processing', date: '2026-03-07', items: 1 },
  { id: 'ORD-003', customer: 'Mike Johnson', total: 79.98, status: 'pending', date: '2026-03-06', items: 2 },
  { id: 'ORD-004', customer: 'Emily Davis', total: 149.99, status: 'delivered', date: '2026-03-05', items: 1 },
];

const MOCK_COUPONS: Coupon[] = [
  { id: '1', code: 'WELCOME20', type: 'percentage', value: 20, usageCount: 45, active: true },
  { id: '2', code: 'SAVE10', type: 'fixed', value: 10, usageCount: 120, active: true },
  { id: '3', code: 'SUMMER30', type: 'percentage', value: 30, usageCount: 0, active: false },
];

const orderStatusColors: Record<string, string> = {
  pending: 'hsl(var(--warning, 45 93% 47%))',
  processing: 'hsl(var(--primary))',
  shipped: 'hsl(210 70% 50%)',
  delivered: 'hsl(var(--success))',
  cancelled: 'hsl(var(--destructive))',
};

interface EcommercePanelProps {
  onClose?: () => void;
}

const EcommercePanel = ({ onClose }: EcommercePanelProps) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'coupons' | 'analytics'>('products');
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [search, setSearch] = useState('');
  const [showNewProduct, setShowNewProduct] = useState(false);

  const totalRevenue = MOCK_ORDERS.reduce((s, o) => s + o.total, 0);
  const totalSales = products.reduce((s, p) => s + p.sales, 0);

  const filteredProducts = products.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    { id: 'products' as const, label: 'Products', icon: Package, count: products.length },
    { id: 'orders' as const, label: 'Orders', icon: ShoppingCart, count: MOCK_ORDERS.length },
    { id: 'coupons' as const, label: 'Coupons', icon: Percent, count: MOCK_COUPONS.length },
    { id: 'analytics' as const, label: 'Revenue', icon: BarChart3 },
  ];

  return (
    <div className="builder-flyout overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-sm font-semibold">Store</h2>
        </div>
        {onClose && <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-1 p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {[
          { label: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, trend: '+12%' },
          { label: 'Orders', value: MOCK_ORDERS.length.toString(), icon: ShoppingCart, trend: '+5%' },
          { label: 'Products', value: products.length.toString(), icon: Package, trend: '' },
        ].map(s => (
          <div key={s.label} className="p-2 rounded text-center" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-sm font-bold">{s.value}</div>
            <div className="text-[9px] opacity-50">{s.label}</div>
            {s.trend && <div className="text-[9px] font-medium" style={{ color: 'hsl(var(--success))' }}>{s.trend}</div>}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {tabs.map(({ id, label, icon: Icon, count }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1 px-2 py-2.5 text-[10px] font-medium transition-colors ${
              activeTab === id ? 'border-b-2 opacity-100' : 'opacity-50 hover:opacity-80'
            }`} style={activeTab === id ? { borderColor: 'hsl(var(--primary))' } : undefined}>
            <Icon className="w-3 h-3" />
            {label}
            {count !== undefined && <span className="text-[9px] opacity-40">({count})</span>}
          </button>
        ))}
      </div>

      {/* Products */}
      {activeTab === 'products' && (
        <div>
          <div className="p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            <div className="relative mb-2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'hsl(var(--muted-foreground))' }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="property-input pl-8 text-xs" />
            </div>
            <button onClick={() => setShowNewProduct(!showNewProduct)} className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
              <Plus className="w-3 h-3" /> Add Product
            </button>
          </div>
          <div className="divide-y" style={{ borderColor: 'hsl(var(--builder-panel-border) / 0.3)' }}>
            {filteredProducts.map(prod => (
              <div key={prod.id} className="p-3 hover:bg-muted/30 transition-colors group">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>{prod.image}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-medium truncate">{prod.name}</h3>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: prod.status === 'active' ? 'hsl(var(--success))' : prod.status === 'out-of-stock' ? 'hsl(var(--destructive))' : 'hsl(var(--muted-foreground))' }} />
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="font-semibold">${prod.price}</span>
                      {prod.comparePrice && <span className="line-through opacity-30">${prod.comparePrice}</span>}
                      <span className="opacity-30">•</span>
                      <span className="opacity-50">{prod.inventory} in stock</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 rounded hover:bg-muted"><Edit3 className="w-3 h-3" /></button>
                    <button onClick={() => setProducts(products.filter(p => p.id !== prod.id))} className="p-1 rounded hover:bg-muted hover:text-destructive"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders */}
      {activeTab === 'orders' && (
        <div className="divide-y" style={{ borderColor: 'hsl(var(--builder-panel-border) / 0.3)' }}>
          {MOCK_ORDERS.map(order => (
            <div key={order.id} className="p-3 hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-medium">{order.id}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: `${orderStatusColors[order.status]}20`, color: orderStatusColors[order.status] }}>
                  {order.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] opacity-60">
                <span>{order.customer}</span>
                <span className="font-semibold">${order.total}</span>
              </div>
              <div className="text-[10px] opacity-30 mt-0.5">{order.date} • {order.items} items</div>
            </div>
          ))}
        </div>
      )}

      {/* Coupons */}
      {activeTab === 'coupons' && (
        <div className="p-3 space-y-2">
          {MOCK_COUPONS.map(coupon => (
            <div key={coupon.id} className="p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold" style={{ color: 'hsl(var(--primary))' }}>{coupon.code}</span>
                <span className={`text-[10px] ${coupon.active ? 'opacity-100' : 'opacity-40'}`}>
                  {coupon.active ? '✓ Active' : 'Inactive'}
                </span>
              </div>
              <div className="text-[10px] opacity-50">
                {coupon.type === 'percentage' ? `${coupon.value}% off` : `$${coupon.value} off`} • Used {coupon.usageCount}x
              </div>
            </div>
          ))}
          <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
            <Plus className="w-3 h-3" /> Create Coupon
          </button>
        </div>
      )}

      {/* Analytics */}
      {activeTab === 'analytics' && (
        <div className="p-3 space-y-3">
          <div className="p-4 rounded-lg text-center" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <DollarSign className="w-6 h-6 mx-auto mb-1 opacity-50" />
            <div className="text-xl font-bold">${totalRevenue.toLocaleString()}</div>
            <div className="text-[10px] opacity-50">Total Revenue</div>
            <div className="flex items-center justify-center gap-1 text-[10px] mt-1" style={{ color: 'hsl(var(--success))' }}>
              <TrendingUp className="w-3 h-3" /> +12.5% from last month
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Total Sales', value: totalSales, icon: ShoppingCart },
              { label: 'Avg Order', value: `$${(totalRevenue / MOCK_ORDERS.length).toFixed(0)}`, icon: BarChart3 },
              { label: 'Customers', value: '284', icon: Users },
              { label: 'Conversion', value: '3.2%', icon: ArrowUpRight },
            ].map(s => (
              <div key={s.label} className="p-3 rounded-lg text-center" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                <s.icon className="w-4 h-4 mx-auto mb-1 opacity-40" />
                <div className="text-sm font-bold">{s.value}</div>
                <div className="text-[9px] opacity-40">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-lg text-xs" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="font-medium mb-2">Top Products</div>
            {products.sort((a, b) => b.sales - a.sales).slice(0, 3).map((p, i) => (
              <div key={p.id} className="flex items-center justify-between py-1.5">
                <span className="text-[10px]">{i + 1}. {p.name}</span>
                <span className="text-[10px] font-mono opacity-50">{p.sales} sold</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommercePanel;
