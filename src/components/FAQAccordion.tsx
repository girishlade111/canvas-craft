import { useState } from 'react';
import { ChevronDown, Zap } from 'lucide-react';

const FAQ_DATA = [
  {
    q: "How is electricity bill calculated in Maharashtra?",
    a: "Maharashtra uses a progressive slab system by MSEDCL. First 100 units cost ₹4.43/unit. Units 101–300 cost ₹9.64/unit. Units 301–500 cost ₹12.83/unit. Above 500 units cost ₹14.33/unit. These are cumulative — each slab rate applies only to units in that range. Then Fixed Charges (₹75–₹200/kW/month), Fuel Surcharge (₹0.41/unit), and Electricity Duty (16% of energy charges) are added."
  },
  {
    q: "What is the minimum bill in MSEDCL if I consume 0 units?",
    a: "Even with zero consumption, MSEDCL charges a minimum Fixed Charge based on your sanctioned/connected load. For loads up to 1kW: ₹75/month. For 1–3kW: ₹130/month. For 3–10kW: ₹200/month. This covers meter rent and maintenance."
  },
  {
    q: "What is Electricity Duty in Maharashtra?",
    a: "Electricity Duty (ED) is a state government tax levied on electricity consumption. In Maharashtra, it is approximately 16% of energy charges for residential consumers. It is charged on top of energy charges and fixed charges. This is separate from GST (electricity itself is exempt from GST)."
  },
  {
    q: "What is Fuel Surcharge (Fuel Adjustment Charge)?",
    a: "Fuel Adjustment Charge (FAC) or Fuel Surcharge is levied by MSEDCL to recover the variable cost of fuel (coal, gas) used in power generation. In Maharashtra, it is currently ₹0.41/unit for residential consumers. This amount changes quarterly based on actual fuel costs."
  },
  {
    q: "How do I check my MSEDCL bill online?",
    a: "Visit mahadiscom.in → Consumer Services → View/Pay Bill. Enter your 12-digit consumer number printed on your bill. You can also: (1) Use the Mahadiscom mobile app, (2) WhatsApp your consumer number to 9930099300, (3) Call helpline 1800-200-3435 (toll-free), (4) Use Paytm/PhonePe/BHIM with consumer number."
  },
  {
    q: "Why is my bill so high even with fewer units this month?",
    a: "This can happen due to: (1) Minimum Fixed Charges regardless of usage, (2) Fuel Surcharge increases, (3) Regulatory Surcharge revisions, (4) Meter reading gap — if the meter reader skipped last month, this month's bill covers 2 months. Check if 'Billing Units' vs 'Consumed Units' differ on your bill. Also verify your meter reading online."
  },
  {
    q: "What is the difference between Units (kWh) and Load (kW)?",
    a: "kW (kilowatt) is power — how fast you use electricity. A 1000W = 1kW appliance. kWh (kilowatt-hour) is energy — total electricity used over time. 1 kWh = 1 Unit. If you run a 1000W AC for 5 hours, it uses 5 kWh (5 units). Your Fixed Charge is based on your sanctioned load (kW), while energy charges are based on units consumed (kWh)."
  },
  {
    q: "Is this BillMeter calculator 100% accurate?",
    a: "BillMeter uses the latest publicly available MSEDCL and State DISCOM tariff orders. It provides accurate estimates for standard residential consumers. Your actual bill may vary due to: meter rent, special subsidies (BPL/farmer exemptions), regulatory surcharges, billing cycle differences, or recent tariff revisions not yet reflected. Use as a close estimate — typically within 2–5% of actual bill."
  },
  {
    q: "Which Indian state has the cheapest electricity?",
    a: "As of 2026, Tamil Nadu and Telangana offer FREE electricity for the first 100–50 units respectively for residential consumers. For consumers using 200–300 units, Madhya Pradesh (₹3.34–₹5.10/unit) and Gujarat (₹3.10–₹4.90/unit) are among the cheapest. Maharashtra is mid-range but has a higher slab penalty for usage above 300 units."
  },
  {
    q: "What is PM Surya Ghar Muft Bijli Yojana?",
    a: "PM Surya Ghar Muft Bijli Yojana is a central government scheme providing up to 300 units of free solar electricity per month to households. Subsidy: ₹30,000 for 1–2kW system, ₹78,000 for 3kW system. Apply at pmsuryagarh.gov.in. MSEDCL provides net metering connection within 30 days of installation."
  }
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="faq" className="py-16 px-4 bg-[#F8FAFC] dark:bg-[#0F172A]">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-semibold text-amber-600 dark:text-amber-400 tracking-wide uppercase mb-2">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            ❓ Frequently Asked Questions
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base">
            Everything you need to know about electricity billing in India
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden"
              >
                {/* Question Header */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-100 pr-4 text-[15px]">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer Panel */}
                <div
                  className="transition-all duration-300 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isOpen ? '500px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-4 pb-4">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Still have questions? Try the calculator or visit{' '}
            <a
              href="https://ladestack.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              ladestack.in
            </a>
          </p>
          <button
            onClick={scrollToCalculator}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5"
          >
            <Zap className="w-5 h-5" />
            Calculate My Bill
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
