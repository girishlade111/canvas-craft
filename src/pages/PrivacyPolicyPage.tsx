import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: '1. Information We Collect',
      content: `We collect information you provide directly when using DevBuilder:

**Account Information**: When you create an account, we collect your email address and password (securely hashed). We do not store passwords in plain text.

**Project Data**: Websites, pages, components, blog posts, products, orders, and other content you create within the platform are stored securely in our database.

**Usage Data**: We automatically collect information about how you interact with DevBuilder, including pages visited, features used, and timestamps. This helps us improve the platform.

**Device Information**: We collect browser type, operating system, screen resolution, and IP address for security and analytics purposes.

**Uploaded Files**: Images, videos, documents, and other assets you upload to your projects are stored in secure cloud storage.`,
    },
    {
      title: '2. How We Use Your Information',
      content: `We use the information we collect to:

- **Provide Services**: Operate, maintain, and improve DevBuilder's website building platform
- **Account Management**: Create and manage your user account, authenticate your identity, and provide customer support
- **Communication**: Send you important updates about your account, service changes, and security notifications
- **Analytics**: Understand usage patterns to improve features, fix bugs, and optimize performance
- **Security**: Detect, prevent, and address technical issues, fraud, and security threats
- **Legal Compliance**: Comply with applicable laws, regulations, and legal processes

We do **not** sell your personal information to third parties. We do **not** use your content or designs for any purpose other than providing the service to you.`,
    },
    {
      title: '3. Data Storage & Security',
      content: `Your data security is our top priority:

- **Encryption**: All data is transmitted over HTTPS/TLS encrypted connections
- **Database Security**: We use Supabase with Row-Level Security (RLS) policies ensuring users can only access their own data
- **Authentication**: Secure password hashing with bcrypt; optional two-factor authentication
- **Backups**: Regular automated backups of all project data
- **Access Control**: Strict internal access policies; only essential personnel can access production systems
- **Infrastructure**: Hosted on enterprise-grade cloud infrastructure with DDoS protection and 99.9% uptime

We retain your data for as long as your account is active. If you delete your account, all associated data will be permanently removed within 30 days.`,
    },
    {
      title: '4. Data Sharing & Third Parties',
      content: `We may share your information in the following limited circumstances:

- **Service Providers**: We use trusted third-party services for hosting (Supabase, Vercel), authentication, and analytics. These providers are bound by data processing agreements.
- **Legal Requirements**: We may disclose your information if required by law, regulation, legal process, or government request.
- **Business Transfers**: In the event of a merger, acquisition, or asset sale, user data may be transferred. We will notify you before your data is subject to a different privacy policy.
- **With Your Consent**: We may share information for any other purpose with your explicit consent.

We do **not** share, sell, or rent your personal data to advertisers or data brokers.`,
    },
    {
      title: '5. Your Rights & Choices',
      content: `You have the following rights regarding your personal data:

- **Access**: Request a copy of all personal data we hold about you
- **Correction**: Update or correct inaccurate personal information
- **Deletion**: Request permanent deletion of your account and all associated data
- **Export**: Download your project data, including source code, at any time
- **Opt-Out**: Unsubscribe from marketing emails at any time (service-critical emails cannot be opted out)
- **Data Portability**: Export your website code in React, HTML, or ZIP format — you own 100% of what you build

To exercise any of these rights, contact us at admin@ladestack.in.`,
    },
    {
      title: '6. Cookies & Tracking',
      content: `DevBuilder uses minimal cookies and tracking:

- **Essential Cookies**: Authentication session tokens required for the platform to function
- **Preference Cookies**: Store your editor settings, theme preference (light/dark), and layout choices
- **Analytics**: We may use privacy-respecting analytics to understand aggregate usage patterns

We do **not** use third-party advertising cookies or cross-site tracking. We do **not** participate in retargeting or behavioral advertising networks.`,
    },
    {
      title: '7. Children\'s Privacy',
      content: `DevBuilder is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided us with personal information, we will delete it immediately. If you believe a child has provided us with personal data, please contact us at admin@ladestack.in.`,
    },
    {
      title: '8. International Data Transfers',
      content: `Your data may be processed and stored in servers located outside your country of residence. We ensure appropriate safeguards are in place for international data transfers, including standard contractual clauses and compliance with applicable data protection regulations (including GDPR for EU/EEA users).`,
    },
    {
      title: '9. Changes to This Policy',
      content: `We may update this Privacy Policy from time to time. We will notify you of material changes by:

- Posting a notice on the DevBuilder website
- Sending an email to your registered email address
- Displaying an in-app notification

Your continued use of DevBuilder after changes are posted constitutes acceptance of the updated policy. We encourage you to review this page periodically.`,
    },
    {
      title: '10. Contact Us',
      content: `If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, contact us:

- **Email**: admin@ladestack.in
- **Website**: https://ladestack.in
- **Response Time**: We aim to respond to all privacy-related inquiries within 48 hours`,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h1 className="font-bold text-lg">Privacy Policy</h1>
          </div>
        </div>
      </header>

      <section className="py-20 px-6 text-center border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Privacy Policy</h2>
          <p className="text-lg text-muted-foreground">
            Last updated: March 8, 2026 · Effective immediately
          </p>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed max-w-2xl mx-auto">
            At DevBuilder (operated by LadeStack), we are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, store, and protect your data.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {sections.map((section, i) => (
            <section key={i}>
              <h3 className="text-xl font-bold mb-4">{section.title}</h3>
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
