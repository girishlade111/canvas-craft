import { Zap, Globe, Github, Mail } from 'lucide-react';

const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Calculator', target: 'calculator' },
    { label: 'Appliance Calculator', target: 'appliance-calculator' },
    { label: 'Saving Tips', target: 'saving-tips' },
    { label: 'State Tariff Rates', target: 'tariff-table' },
    { label: 'FAQ', target: 'faq' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                BillMeter
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-1">
              Free electricity bill estimator for India
            </p>
            <p className="text-gray-500 text-sm mb-5">
              A product by{' '}
              <a
                href="https://ladestack.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors underline underline-offset-2"
              >
                Lade Stack
              </a>{' '}
              — ladestack.in
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://ladestack.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                title="Website"
              >
                <Globe className="w-4 h-4 text-gray-400" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4 text-gray-400" />
              </a>
              <a
                href="mailto:contact@ladestack.in"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.target}>
                  <button
                    onClick={() => scrollTo(link.target)}
                    className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — About */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              About This Tool
            </h3>
            <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
              <p>
                BillMeter is a free, ad-free, no-login electricity bill calculator
                built by{' '}
                <a
                  href="https://ladestack.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors underline underline-offset-2"
                >
                  Lade Stack
                </a>
                .
              </p>
              <p>
                Tariff data sourced from official MSEDCL and state DISCOM tariff
                orders.
              </p>
              <p className="text-gray-500">Updated: March 2026</p>
              <p>Built with ❤️ in Solapur, Maharashtra, India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <p className="text-gray-500 text-xs">
              © 2026{' '}
              <a
                href="https://ladestack.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Lade Stack
              </a>{' '}
              (ladestack.in) — Free forever. No ads. No login.
            </p>
            <p className="text-gray-600 text-xs">
              Disclaimer: Estimates only. Verify with your DISCOM for exact
              tariffs.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
