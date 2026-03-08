import React from 'react';

export const ProductCardComponent: React.FC<{
  content?: string;
  productName?: string;
  price?: string;
  imageUrl?: string;
  badge?: string;
}> = ({ content, productName, price = '$49.99', imageUrl, badge }) => (
  <div style={{ overflow: 'hidden' }}>
    <div
      style={{
        background: 'hsl(var(--muted))',
        paddingBottom: '100%',
        borderRadius: '12px',
        marginBottom: '12px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={productName || content || 'Product'}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '36px' }}>🛍️</span>
      )}
      {badge && (
        <span
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            background: 'hsl(var(--destructive))',
            color: 'hsl(var(--destructive-foreground))',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
          }}
        >
          {badge}
        </span>
      )}
    </div>
    <p style={{ fontWeight: 600, marginBottom: '4px', fontSize: '15px' }}>{productName || content || 'Product Name'}</p>
    <p style={{ opacity: 0.7, fontSize: '16px', fontWeight: 700 }}>{price}</p>
  </div>
);

export const ProductGridComponent: React.FC<{
  columns?: number;
  productCount?: number;
}> = ({ columns = 3, productCount = 6 }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '24px',
    }}
  >
    {Array.from({ length: productCount }).map((_, i) => (
      <div key={i}>
        <div
          style={{
            background: 'hsl(var(--muted))',
            paddingBottom: '100%',
            borderRadius: '12px',
            marginBottom: '12px',
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '28px',
            }}
          >
            🛍️
          </span>
        </div>
        <p style={{ fontWeight: 600, fontSize: '14px' }}>Product {i + 1}</p>
        <p style={{ opacity: 0.7, fontSize: '14px', fontWeight: 600 }}>${(19.99 + i * 10).toFixed(2)}</p>
      </div>
    ))}
  </div>
);

export const ShoppingCartComponent: React.FC = () => (
  <div>
    <h3 style={{ fontWeight: 700, marginBottom: '20px', fontSize: '20px' }}>Shopping Cart</h3>
    {[
      { name: 'Premium Widget', qty: 1, price: 29.99 },
      { name: 'Super Gadget', qty: 2, price: 49.99 },
    ].map((item, i) => (
      <div
        key={i}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 0',
          borderBottom: '1px solid hsl(var(--border))',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              background: 'hsl(var(--muted))',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            🛍️
          </div>
          <div>
            <p style={{ fontWeight: 500, fontSize: '14px' }}>{item.name}</p>
            <p style={{ opacity: 0.5, fontSize: '12px' }}>Qty: {item.qty}</p>
          </div>
        </div>
        <span style={{ fontWeight: 600 }}>${(item.price * item.qty).toFixed(2)}</span>
      </div>
    ))}
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        paddingTop: '16px',
        borderTop: '2px solid hsl(var(--border))',
        fontWeight: 700,
        fontSize: '18px',
      }}
    >
      <span>Total</span>
      <span>$129.97</span>
    </div>
  </div>
);

export const CheckoutComponent: React.FC = () => {
  const inputStyle: React.CSSProperties = {
    padding: '12px 14px',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    background: 'hsl(var(--background))',
    fontSize: '14px',
    width: '100%',
    color: 'inherit',
  };

  return (
    <div style={{ maxWidth: '500px' }}>
      <h3 style={{ fontWeight: 700, marginBottom: '24px', fontSize: '20px' }}>Checkout</h3>
      <div style={{ display: 'grid', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '6px' }}>Full Name</label>
          <input placeholder="John Doe" style={inputStyle} readOnly />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '6px' }}>Card Number</label>
          <input placeholder="4242 4242 4242 4242" style={inputStyle} readOnly />
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '6px' }}>Expiry</label>
            <input placeholder="MM/YY" style={inputStyle} readOnly />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '6px' }}>CVC</label>
            <input placeholder="123" style={inputStyle} readOnly />
          </div>
        </div>
        <button
          style={{
            padding: '14px',
            background: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '15px',
            marginTop: '8px',
          }}
        >
          💳 Pay $129.97
        </button>
      </div>
    </div>
  );
};

export const PaymentBlockComponent: React.FC = () => (
  <div
    style={{
      padding: '32px',
      border: '1px solid hsl(var(--border))',
      borderRadius: '16px',
      textAlign: 'center',
      background: 'hsl(var(--muted) / 0.3)',
    }}
  >
    <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔒</div>
    <p style={{ fontWeight: 600, marginBottom: '8px', fontSize: '16px' }}>Secure Payment</p>
    <p style={{ opacity: 0.55, fontSize: '13px', lineHeight: 1.5 }}>
      Your payment is secured with 256-bit SSL encryption.
      <br />
      We support Visa, Mastercard, and PayPal.
    </p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px', fontSize: '28px' }}>
      💳 🏦 📱
    </div>
  </div>
);
