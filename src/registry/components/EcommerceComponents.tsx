import React from 'react';

export const ProductCardComponent: React.FC<{ content?: string }> = ({ content }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ background: 'hsl(var(--muted))', paddingBottom: '100%', borderRadius: '8px', marginBottom: '12px', position: 'relative' }}>
      <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '32px' }}>🛍️</span>
    </div>
    <p style={{ fontWeight: 600, marginBottom: '4px' }}>{content || 'Product Name'}</p>
    <p style={{ opacity: 0.7 }}>$49.99</p>
  </div>
);

export const ProductGridComponent: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} style={{ textAlign: 'center' }}>
        <div style={{ background: 'hsl(var(--muted))', paddingBottom: '100%', borderRadius: '8px', marginBottom: '12px', position: 'relative' }}>
          <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '24px' }}>🛍️</span>
        </div>
        <p style={{ fontWeight: 600, fontSize: '14px' }}>Product {i}</p>
        <p style={{ opacity: 0.7, fontSize: '14px' }}>${(19.99 + i * 10).toFixed(2)}</p>
      </div>
    ))}
  </div>
);

export const ShoppingCartComponent: React.FC = () => (
  <div>
    <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Shopping Cart</h3>
    {[1, 2].map((i) => (
      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid hsl(var(--border))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '48px', height: '48px', background: 'hsl(var(--muted))', borderRadius: '6px' }} />
          <div>
            <p style={{ fontWeight: 500, fontSize: '14px' }}>Product {i}</p>
            <p style={{ opacity: 0.6, fontSize: '12px' }}>Qty: 1</p>
          </div>
        </div>
        <span style={{ fontWeight: 600 }}>${(29.99 * i).toFixed(2)}</span>
      </div>
    ))}
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontWeight: 700 }}>
      <span>Total</span><span>$89.97</span>
    </div>
  </div>
);

export const CheckoutComponent: React.FC = () => (
  <div style={{ maxWidth: '500px' }}>
    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Checkout</h3>
    <div style={{ display: 'grid', gap: '12px' }}>
      <input placeholder="Full Name" style={{ padding: '10px', border: '1px solid hsl(var(--border))', borderRadius: '6px', background: 'hsl(var(--background))' }} readOnly />
      <input placeholder="Card Number" style={{ padding: '10px', border: '1px solid hsl(var(--border))', borderRadius: '6px', background: 'hsl(var(--background))' }} readOnly />
      <div style={{ display: 'flex', gap: '12px' }}>
        <input placeholder="MM/YY" style={{ flex: 1, padding: '10px', border: '1px solid hsl(var(--border))', borderRadius: '6px', background: 'hsl(var(--background))' }} readOnly />
        <input placeholder="CVC" style={{ flex: 1, padding: '10px', border: '1px solid hsl(var(--border))', borderRadius: '6px', background: 'hsl(var(--background))' }} readOnly />
      </div>
      <button style={{ padding: '12px', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', borderRadius: '6px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Pay $89.97</button>
    </div>
  </div>
);

export const PaymentBlockComponent: React.FC = () => (
  <div style={{ padding: '24px', border: '1px solid hsl(var(--border))', borderRadius: '12px', textAlign: 'center' }}>
    <p style={{ fontWeight: 600, marginBottom: '12px' }}>Secure Payment</p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '16px', fontSize: '24px' }}>
      💳 🔒
    </div>
    <p style={{ opacity: 0.6, fontSize: '12px' }}>Your payment is secured with 256-bit encryption</p>
  </div>
);
