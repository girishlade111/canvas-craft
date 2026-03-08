import { useState } from 'react';
import {
  ShoppingBag, Plus, Search, Package, CreditCard, Tag, Truck,
  BarChart3, X, Edit3, Trash2, Eye, DollarSign, Gift, Percent,
  ShoppingCart, Users, TrendingUp, ArrowUpRight, Loader2,
} from 'lucide-react';
import { useProducts, useCreateProduct, useDeleteProduct, useOrders, useCoupons, useCreateCoupon } from '@/hooks/useProducts';
import { toast } from 'sonner';

const orderStatusColors: Record<string, string> = {
  pending: 'hsl(var(--warning, 45 93% 47%))',
  processing: 'hsl(var(--primary))',
  shipped: 'hsl(210 70% 50%)',
  delivered: 'hsl(var(--success))',
  cancelled: 'hsl(var(--destructive))',
};

interface EcommercePanelProps {
  projectId?: string | null;
  onClose?: () => void;
}

const EcommercePanel = ({ projectId, onClose }: EcommercePanelProps) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'coupons' | 'analytics'>('products');
  const [search, setSearch] = useState('');
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'General' });

  const { data: products = [], isLoading: productsLoading } = useProducts(projectId ?? null);
  const { data: orders = [], isLoading: ordersLoading } = useOrders(projectId ?? null);
  const { data: coupons = [], isLoading: couponsLoading } = useCoupons(projectId ?? null);
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();
  const createCoupon = useCreateCoupon();

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

  const tabs = [
    { id: 'products' as const, label: 'Products', icon: Package, count: products.length },
    { id: 'orders' as const, label: 'Orders', icon: ShoppingCart, count: orders.length },
    { id: 'coupons' as const, label: 'Coupons', icon: Percent, count: coupons.length },
    { id: 'analytics' as const, label: 'Revenue', icon: BarChart3 },
  ];

  if (!projectId) {
    return (
      <div className="builder-flyout overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
            <h2 className="text-sm font-semibold">Store</h2>
          </div>
          {onClose && <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
        </div>
        <div className="p-6 text-center text-xs opacity-50">Save your project first to manage your store.</div>
      </div>
    );
  }

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
          { label: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign },
          { label: 'Orders', value: orders.length.toString(), icon: ShoppingCart },
          { label: 'Products', value: products.length.toString(), icon: Package },
        ].map(s => (
          <div key={s.label} className="p-2 rounded text-center" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-sm font-bold">{s.value}</div>
            <div className="text-[9px] opacity-50">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {tabs.map(({ id, label, icon: Icon, count }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1 px-2 py-2.5 text-[10px] font-medium transition-colors ${
              activeTab === id ? 'border-b-2 opacity-100' : 'opacity-50 hover:opacity-80'
            }`} style={activeTab === id ? { borderColor: 'hsl(var(--primary))' } : undefined}>
            <Icon className="w-3 h-3" />{label}
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
            {showNewProduct ? (
              <div className="space-y-2">
                <input autoFocus value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Product name..." className="property-input text-xs" />
                <input value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="Price..." className="property-input text-xs" type="number" step="0.01" />
                <div className="flex gap-1.5">
                  <button onClick={handleAddProduct} disabled={createProduct.isPending} className="flex-1 py-1.5 rounded text-[10px] font-semibold" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                    {createProduct.isPending ? 'Adding...' : 'Add Product'}
                  </button>
                  <button onClick={() => setShowNewProduct(false)} className="px-3 py-1.5 rounded text-[10px] hover:bg-muted">Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowNewProduct(true)} className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
                <Plus className="w-3 h-3" /> Add Product
              </button>
            )}
          </div>
          {productsLoading ? (
            <div className="p-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin opacity-50" /></div>
          ) : (
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
                        <span className="font-semibold">${Number(prod.price).toFixed(2)}</span>
                        {prod.compare_price && <span className="line-through opacity-30">${Number(prod.compare_price).toFixed(2)}</span>}
                        <span className="opacity-30">•</span>
                        <span className="opacity-50">{prod.inventory} in stock</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 rounded hover:bg-muted"><Edit3 className="w-3 h-3" /></button>
                      <button onClick={() => deleteProduct.mutateAsync(prod.id)} className="p-1 rounded hover:bg-muted hover:text-destructive"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && <div className="p-6 text-center text-xs opacity-40">No products found</div>}
            </div>
          )}
        </div>
      )}

      {/* Orders */}
      {activeTab === 'orders' && (
        <div>
          {ordersLoading ? (
            <div className="p-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin opacity-50" /></div>
          ) : orders.length === 0 ? (
            <div className="p-6 text-center text-xs opacity-40">No orders yet</div>
          ) : (
            <div className="divide-y" style={{ borderColor: 'hsl(var(--builder-panel-border) / 0.3)' }}>
              {orders.map(order => (
                <div key={order.id} className="p-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-medium">{order.id.slice(0, 8)}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: `${orderStatusColors[order.status] || orderStatusColors.pending}20`, color: orderStatusColors[order.status] || orderStatusColors.pending }}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] opacity-60">
                    <span>{order.customer}</span>
                    <span className="font-semibold">${Number(order.total).toFixed(2)}</span>
                  </div>
                  <div className="text-[10px] opacity-30 mt-0.5">{new Date(order.created_at).toLocaleDateString()} • {order.items} items</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Coupons */}
      {activeTab === 'coupons' && (
        <div className="p-3 space-y-2">
          {couponsLoading ? (
            <div className="flex justify-center"><Loader2 className="w-5 h-5 animate-spin opacity-50" /></div>
          ) : (
            <>
              {coupons.map(coupon => (
                <div key={coupon.id} className="p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold" style={{ color: 'hsl(var(--primary))' }}>{coupon.code}</span>
                    <span className={`text-[10px] ${coupon.active ? 'opacity-100' : 'opacity-40'}`}>
                      {coupon.active ? '✓ Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="text-[10px] opacity-50">
                    {coupon.type === 'percentage' ? `${coupon.value}% off` : `$${coupon.value} off`} • Used {coupon.usage_count}x
                  </div>
                </div>
              ))}
            </>
          )}
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
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Total Sales', value: totalSales, icon: ShoppingCart },
              { label: 'Avg Order', value: orders.length ? `$${(totalRevenue / orders.length).toFixed(0)}` : '$0', icon: BarChart3 },
              { label: 'Products', value: products.length, icon: Package },
              { label: 'Coupons', value: coupons.length, icon: Percent },
            ].map(s => (
              <div key={s.label} className="p-3 rounded-lg text-center" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                <s.icon className="w-4 h-4 mx-auto mb-1 opacity-40" />
                <div className="text-sm font-bold">{s.value}</div>
                <div className="text-[9px] opacity-40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommercePanel;
