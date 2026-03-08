import React from 'react';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  background: 'hsl(var(--background))',
  color: 'inherit',
  fontSize: '14px',
  transition: 'border-color 0.2s',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '14px',
  marginBottom: '6px',
  fontWeight: 500,
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  background: 'hsl(var(--primary))',
  color: 'hsl(var(--primary-foreground))',
  borderRadius: '8px',
  border: 'none',
  fontWeight: 600,
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'opacity 0.2s',
};

export const InputComponent: React.FC<{
  placeholder?: string;
  label?: string;
  inputType?: string;
  required?: boolean;
  disabled?: boolean;
}> = ({ placeholder, label, inputType = 'text', required, disabled }) => (
  <div>
    {label && (
      <label style={labelStyle}>
        {label}
        {required && <span style={{ color: 'hsl(var(--destructive))' }}> *</span>}
      </label>
    )}
    <input
      type={inputType}
      placeholder={placeholder || 'Enter text...'}
      style={{ ...inputStyle, opacity: disabled ? 0.5 : 1 }}
      readOnly
      disabled={disabled}
    />
  </div>
);

export const TextareaComponent: React.FC<{
  placeholder?: string;
  label?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
}> = ({ placeholder, label, rows = 4, required, disabled }) => (
  <div>
    {label && (
      <label style={labelStyle}>
        {label}
        {required && <span style={{ color: 'hsl(var(--destructive))' }}> *</span>}
      </label>
    )}
    <textarea
      placeholder={placeholder || 'Enter text...'}
      style={{ ...inputStyle, minHeight: `${rows * 24}px`, resize: 'vertical' }}
      readOnly
      disabled={disabled}
    />
  </div>
);

export const CheckboxComponent: React.FC<{
  label?: string;
  required?: boolean;
  disabled?: boolean;
}> = ({ label, disabled }) => (
  <label
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    }}
  >
    <input type="checkbox" readOnly style={{ width: '18px', height: '18px', accentColor: 'hsl(var(--primary))' }} />
    <span style={{ fontSize: '14px' }}>{label || 'Check me'}</span>
  </label>
);

export const RadioComponent: React.FC<{
  label?: string;
  disabled?: boolean;
}> = ({ label, disabled }) => (
  <label
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    }}
  >
    <input type="radio" readOnly style={{ width: '18px', height: '18px', accentColor: 'hsl(var(--primary))' }} />
    <span style={{ fontSize: '14px' }}>{label || 'Option'}</span>
  </label>
);

export const SelectComponent: React.FC<{
  label?: string;
  required?: boolean;
  disabled?: boolean;
}> = ({ label, required, disabled }) => (
  <div>
    {label && (
      <label style={labelStyle}>
        {label}
        {required && <span style={{ color: 'hsl(var(--destructive))' }}> *</span>}
      </label>
    )}
    <select style={{ ...inputStyle, opacity: disabled ? 0.5 : 1 }} disabled={disabled}>
      <option>Select an option...</option>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </select>
  </div>
);

export const LoginFormComponent: React.FC = () => (
  <div style={{ maxWidth: '400px' }}>
    <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Welcome back</h3>
    <p style={{ opacity: 0.6, fontSize: '14px', marginBottom: '24px' }}>Sign in to your account</p>
    <div style={{ display: 'grid', gap: '16px' }}>
      <div>
        <label style={labelStyle}>Email</label>
        <input type="email" placeholder="name@example.com" style={inputStyle} readOnly />
      </div>
      <div>
        <label style={labelStyle}>Password</label>
        <input type="password" placeholder="••••••••" style={inputStyle} readOnly />
      </div>
      <button style={buttonStyle}>Sign In</button>
      <p style={{ textAlign: 'center', fontSize: '13px', opacity: 0.6 }}>
        Don't have an account? <span style={{ color: 'hsl(var(--primary))', cursor: 'pointer' }}>Sign up</span>
      </p>
    </div>
  </div>
);

export const SignupFormComponent: React.FC = () => (
  <div style={{ maxWidth: '400px' }}>
    <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Create account</h3>
    <p style={{ opacity: 0.6, fontSize: '14px', marginBottom: '24px' }}>Get started with your free account</p>
    <div style={{ display: 'grid', gap: '16px' }}>
      <div>
        <label style={labelStyle}>Full Name</label>
        <input placeholder="John Doe" style={inputStyle} readOnly />
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input type="email" placeholder="name@example.com" style={inputStyle} readOnly />
      </div>
      <div>
        <label style={labelStyle}>Password</label>
        <input type="password" placeholder="••••••••" style={inputStyle} readOnly />
      </div>
      <button style={buttonStyle}>Create Account</button>
    </div>
  </div>
);

export const ContactFormComponent: React.FC = () => (
  <div style={{ maxWidth: '600px' }}>
    <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Get in touch</h3>
    <p style={{ opacity: 0.6, fontSize: '14px', marginBottom: '24px' }}>We'd love to hear from you</p>
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Name</label>
          <input placeholder="Your name" style={inputStyle} readOnly />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input type="email" placeholder="name@example.com" style={inputStyle} readOnly />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Subject</label>
        <input placeholder="How can we help?" style={inputStyle} readOnly />
      </div>
      <div>
        <label style={labelStyle}>Message</label>
        <textarea placeholder="Tell us more..." style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} readOnly />
      </div>
      <button style={buttonStyle}>Send Message</button>
    </div>
  </div>
);
