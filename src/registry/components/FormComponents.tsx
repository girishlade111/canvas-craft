import React from 'react';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', border: '1px solid hsl(var(--border))',
  borderRadius: '6px', background: 'hsl(var(--background))', color: 'inherit', fontSize: '14px',
};

export const InputComponent: React.FC<{ placeholder?: string; label?: string }> = ({ placeholder, label }) => (
  <div>
    {label && <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 500 }}>{label}</label>}
    <input type="text" placeholder={placeholder || 'Enter text...'} style={inputStyle} readOnly />
  </div>
);

export const TextareaComponent: React.FC<{ placeholder?: string; label?: string }> = ({ placeholder, label }) => (
  <div>
    {label && <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 500 }}>{label}</label>}
    <textarea placeholder={placeholder || 'Enter text...'} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} readOnly />
  </div>
);

export const CheckboxComponent: React.FC<{ label?: string }> = ({ label }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
    <input type="checkbox" readOnly style={{ width: '16px', height: '16px' }} />
    <span style={{ fontSize: '14px' }}>{label || 'Check me'}</span>
  </label>
);

export const RadioComponent: React.FC<{ label?: string }> = ({ label }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
    <input type="radio" readOnly style={{ width: '16px', height: '16px' }} />
    <span style={{ fontSize: '14px' }}>{label || 'Option'}</span>
  </label>
);

export const SelectComponent: React.FC<{ label?: string }> = ({ label }) => (
  <div>
    {label && <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 500 }}>{label}</label>}
    <select style={inputStyle} disabled>
      <option>Select an option...</option>
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
  </div>
);

export const LoginFormComponent: React.FC = () => (
  <div style={{ maxWidth: '400px' }}>
    <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Login</h3>
    <div style={{ display: 'grid', gap: '12px' }}>
      <input placeholder="Email" style={inputStyle} readOnly />
      <input placeholder="Password" type="password" style={inputStyle} readOnly />
      <button style={{ width: '100%', padding: '10px', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', borderRadius: '6px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Sign In</button>
    </div>
  </div>
);

export const SignupFormComponent: React.FC = () => (
  <div style={{ maxWidth: '400px' }}>
    <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Create Account</h3>
    <div style={{ display: 'grid', gap: '12px' }}>
      <input placeholder="Full Name" style={inputStyle} readOnly />
      <input placeholder="Email" style={inputStyle} readOnly />
      <input placeholder="Password" type="password" style={inputStyle} readOnly />
      <button style={{ width: '100%', padding: '10px', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', borderRadius: '6px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Sign Up</button>
    </div>
  </div>
);

export const ContactFormComponent: React.FC = () => (
  <div style={{ maxWidth: '600px' }}>
    <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Contact Us</h3>
    <div style={{ display: 'grid', gap: '12px' }}>
      <input placeholder="Name" style={inputStyle} readOnly />
      <input placeholder="Email" style={inputStyle} readOnly />
      <textarea placeholder="Message" style={{ ...inputStyle, minHeight: '100px' }} readOnly />
      <button style={{ padding: '10px', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', borderRadius: '6px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Send Message</button>
    </div>
  </div>
);
