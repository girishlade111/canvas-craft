import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

const TermsOfServicePage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing or using DevBuilder ("the Service"), operated by LadeStack ("we", "us", "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Service.

These terms apply to all users, visitors, and others who access or use DevBuilder, including the website builder, editor, dashboard, API, and all related services.

We reserve the right to update these terms at any time. Continued use after changes constitutes acceptance. Material changes will be communicated via email or in-app notification.`,
    },
    {
      title: '2. Account Registration',
      content: `To use DevBuilder, you must create an account. When registering, you agree to:

- **Provide accurate information**: Your email address and any profile details must be truthful and current
- **Maintain security**: You are responsible for safeguarding your password and account credentials
- **Notify us of breaches**: Immediately inform us at admin@ladestack.in if you suspect unauthorized access to your account
- **One person per account**: Accounts are for individual use; sharing login credentials is prohibited
- **Age requirement**: You must be at least 13 years old (16 in the EU/EEA) to create an account

We reserve the right to suspend or terminate accounts that violate these terms or remain inactive for extended periods.`,
    },
    {
      title: '3. Use of the Service',
      content: `DevBuilder grants you a non-exclusive, non-transferable, revocable license to use the platform for creating, editing, and publishing websites. You agree to use the Service responsibly and lawfully.

**You MAY**:
- Create unlimited website projects (subject to plan limits)
- Use all built-in templates, components, and design tools
- Export your website code in React, HTML, or ZIP format
- Publish websites to live URLs
- Use the CMS, eCommerce, blog, and marketing tools
- Access the API for programmatic integrations

**You MAY NOT**:
- Use the Service for any illegal, harmful, or fraudulent purposes
- Upload or distribute malware, viruses, or malicious code
- Attempt to reverse-engineer, decompile, or hack the Service
- Scrape, crawl, or collect data from other users' projects without permission
- Impersonate other individuals or organizations
- Use the Service to send spam, phishing, or unsolicited communications
- Create websites that promote hate speech, violence, harassment, or discrimination
- Violate any applicable local, state, national, or international laws`,
    },
    {
      title: '4. Intellectual Property',
      content: `**Your Content**: You retain full ownership of all content, designs, code, and materials you create using DevBuilder. We claim no intellectual property rights over your projects, websites, or exported code. You own 100% of what you build.

**Our Platform**: DevBuilder's platform, including its software, design, branding, templates (as structural starting points), UI components, documentation, and APIs, is the intellectual property of LadeStack and is protected by copyright, trademark, and other intellectual property laws.

**Templates**: Pre-built templates are provided as starting points. You may freely modify and use them in your projects. However, you may not redistribute unmodified templates as your own product or resell them as template packs.

**Open Source**: Exported website code uses open-source technologies (React, Vite, Tailwind CSS) under their respective licenses. You are free to use, modify, and distribute your exported code without restriction.`,
    },
    {
      title: '5. Payment & Billing',
      content: `DevBuilder may offer free and paid plans. For paid plans:

- **Billing Cycle**: Subscriptions are billed monthly or annually as selected at checkout
- **Payment Methods**: We accept credit cards, debit cards, and other payment methods as available
- **Auto-Renewal**: Paid subscriptions automatically renew unless cancelled before the renewal date
- **Refunds**: We offer a 14-day money-back guarantee for new paid subscriptions. After 14 days, refunds are handled on a case-by-case basis
- **Price Changes**: We may change pricing with 30 days' notice. Existing subscribers will be notified before any price increase takes effect
- **Cancellation**: You can cancel your subscription at any time from your account settings. You will retain access until the end of your current billing period

Free tier features are provided as-is and may be modified at any time.`,
    },
    {
      title: '6. Data & Privacy',
      content: `Your use of DevBuilder is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.

Key points:
- All data is encrypted in transit (HTTPS/TLS) and at rest
- Row-Level Security (RLS) ensures users can only access their own data
- We do not sell your personal data to third parties
- You can export or delete your data at any time
- We comply with GDPR and applicable data protection regulations

For full details, see our Privacy Policy at /privacy.`,
    },
    {
      title: '7. Service Availability & Uptime',
      content: `We strive to maintain 99.9% uptime for DevBuilder. However:

- **Maintenance Windows**: We may schedule brief maintenance periods for updates and improvements. We will provide advance notice when possible.
- **No Guarantee**: While we work hard to minimize downtime, we cannot guarantee uninterrupted access. The Service is provided "as is" and "as available."
- **Force Majeure**: We are not liable for service interruptions caused by events beyond our control, including natural disasters, internet outages, cyberattacks, or government actions.
- **Data Loss**: While we maintain regular backups, we recommend you export your projects regularly as an additional safeguard.`,
    },
    {
      title: '8. Limitation of Liability',
      content: `To the maximum extent permitted by law:

- DevBuilder and LadeStack shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service
- Our total liability for any claim related to the Service shall not exceed the amount you paid us in the 12 months preceding the claim
- We are not responsible for third-party services, integrations, or content accessed through the platform
- We make no warranties about the accuracy, reliability, or completeness of any content or functionality

This limitation applies regardless of the legal theory (contract, tort, strict liability, or otherwise).`,
    },
    {
      title: '9. Termination',
      content: `**By You**: You may close your account at any time by contacting us at admin@ladestack.in. Upon account closure:
- All your projects and data will be permanently deleted within 30 days
- Any active paid subscriptions will be cancelled
- You may export your data before closing your account

**By Us**: We may suspend or terminate your account if:
- You violate these Terms of Service
- You engage in abusive, fraudulent, or illegal activity
- Your account remains inactive for more than 12 months (free tier only)
- Required by law or regulatory action

We will provide reasonable notice before termination when possible, except in cases of severe violations.`,
    },
    {
      title: '10. Dispute Resolution',
      content: `In the event of a dispute:

1. **Informal Resolution**: Contact us at admin@ladestack.in to attempt to resolve the issue informally. Most disputes can be resolved through direct communication.
2. **Governing Law**: These terms are governed by the laws of India, without regard to conflict of law principles.
3. **Jurisdiction**: Any legal proceedings shall be conducted in the courts of India.
4. **Class Action Waiver**: To the extent permitted by law, you agree to resolve disputes individually and waive any right to participate in class action lawsuits or class-wide arbitration.`,
    },
    {
      title: '11. General Provisions',
      content: `- **Entire Agreement**: These Terms, together with our Privacy Policy, constitute the entire agreement between you and LadeStack regarding DevBuilder
- **Severability**: If any provision is found to be unenforceable, the remaining provisions remain in full effect
- **Waiver**: Our failure to enforce any right or provision does not constitute a waiver of that right
- **Assignment**: You may not assign your rights under these Terms without our prior written consent. We may assign our rights at any time.
- **Notices**: We may send notices via email, in-app notifications, or by posting on the Service. You may send notices to admin@ladestack.in`,
    },
    {
      title: '12. Contact Information',
      content: `For questions about these Terms of Service, contact us:

- **Email**: admin@ladestack.in
- **Website**: https://ladestack.in
- **Response Time**: We aim to respond within 48 hours on business days`,
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
            <FileText className="w-5 h-5 text-primary" />
            <h1 className="font-bold text-lg">Terms of Service</h1>
          </div>
        </div>
      </header>

      <section className="py-20 px-6 text-center border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Terms of Service</h2>
          <p className="text-lg text-muted-foreground">
            Last updated: March 8, 2026 · Effective immediately
          </p>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed max-w-2xl mx-auto">
            Please read these Terms of Service carefully before using DevBuilder. By creating an account or using our platform, you agree to these terms in full.
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

export default TermsOfServicePage;
