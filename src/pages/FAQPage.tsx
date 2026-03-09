import React from 'react';
import { ArrowLeft, HelpCircle, Calculator, Zap, Home, IndianRupee, FileText, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQPage = () => {
  const navigate = useNavigate();

  const faqCategories = [
    {
      title: "Using the Calculator",
      icon: Calculator,
      faqs: [
        {
          question: "How accurate is the electricity bill calculator?",
          answer: "Our calculator provides estimates based on official tariff rates from state DISCOMs. The accuracy is typically within 5-10% of actual bills. However, actual bills may vary due to additional local charges, subsidies, seasonal adjustments, or meter reading differences. Always verify with your electricity board for exact rates."
        },
        {
          question: "Which states are supported by the calculator?",
          answer: "Currently, we support Maharashtra (MSEDCL), Gujarat (GUVNL), and Karnataka (BESCOM/GESCOM/HESCOM/MESCOM). We're continuously adding more states. The tariff data is updated regularly based on the latest notifications from State Electricity Regulatory Commissions (SERCs)."
        },
        {
          question: "How do I read my electricity meter?",
          answer: "For digital meters, note down the reading displayed. For analog meters with dials, read from left to right, taking the lower number when the pointer is between two digits. The units consumed = current reading - previous reading. Most meters show cumulative consumption in kWh (kilowatt-hours)."
        },
        {
          question: "What's the difference between kW and kWh?",
          answer: "kW (kilowatt) measures power - how much electricity an appliance uses at any moment. kWh (kilowatt-hour) measures energy - the total electricity consumed over time. For billing, you're charged for kWh. Example: A 1000W (1kW) appliance running for 1 hour consumes 1 kWh of energy."
        }
      ]
    },
    {
      title: "Electricity Tariffs & Billing",
      icon: IndianRupee,
      faqs: [
        {
          question: "What are slab-based electricity tariffs?",
          answer: "Slab-based tariffs mean different rates for different consumption levels. For example, the first 100 units might cost ₹2.50/unit, the next 200 units ₹4.00/unit, and so on. This progressive pricing encourages energy conservation and ensures lower bills for minimal users."
        },
        {
          question: "What are fixed charges in electricity bills?",
          answer: "Fixed charges (also called standing charges) are monthly fees for maintaining your electricity connection, regardless of consumption. They cover infrastructure costs like poles, wires, transformers, and meter reading. Domestic connections typically have lower fixed charges (₹20-50) compared to commercial (₹100-200)."
        },
        {
          question: "What are fuel adjustment charges (FAC)?",
          answer: "Fuel adjustment charges are variable costs that electricity boards add or subtract based on fuel price fluctuations. When coal, gas, or oil prices increase, FAC increases your bill. When fuel prices drop, it decreases. FAC can range from -₹0.50 to +₹1.00 per unit and changes monthly."
        },
        {
          question: "Why does my bill have electricity duty and other taxes?",
          answer: "Electricity duty is a state tax on electricity consumption (usually 5-15% of bill amount). Additional charges may include Green Energy Cess, Grid Support charges, Cross Subsidy Surcharge, and local body taxes. These support infrastructure development and renewable energy initiatives."
        }
      ]
    },
    {
      title: "Appliance Consumption",
      icon: Home,
      faqs: [
        {
          question: "Which appliances consume the most electricity?",
          answer: "Major electricity consumers in Indian homes: Air Conditioners (1500-3000W), Electric Water Heaters/Geysers (2000-4000W), Electric Irons (1000W), Washing Machines (500-1000W), Refrigerators (150-400W), and Induction Cooktops (1200-2000W). AC and geysers typically account for 60-70% of home electricity bills."
        },
        {
          question: "How much electricity does an AC consume per hour?",
          answer: "A 1.5-ton AC typically consumes 1.2-1.8 kWh per hour depending on efficiency (3-5 star rating), room size, and temperature settings. At ₹4/unit, running for 8 hours costs ₹38-58 daily. Using a 5-star AC and setting temperature to 24°C can reduce consumption by 20-30%."
        },
        {
          question: "Are LED bulbs really more efficient?",
          answer: "Yes! LED bulbs use 80-90% less energy than incandescent bulbs. A 9W LED gives the same light as a 60W incandescent bulb. Over 10,000 hours, an LED bulb costs ₹360 in electricity vs ₹2,400 for incandescent (at ₹4/unit). LEDs also last 25 times longer."
        },
        {
          question: "How can I reduce my refrigerator's electricity consumption?",
          answer: "Set temperature to 3-4°C (fridge) and -18°C (freezer), keep it away from heat sources, ensure door seals are tight, don't overload, minimize door opening frequency, defrost regularly if not frost-free, and maintain 6-inch clearance around the unit for ventilation."
        }
      ]
    },
    {
      title: "Energy Saving & Efficiency",
      icon: Zap,
      faqs: [
        {
          question: "What are the easiest ways to reduce my electricity bill?",
          answer: "Quick wins: Switch to LED bulbs, set AC to 24°C or higher, use ceiling fans with AC, unplug devices when not in use, use cold water for washing clothes, air-dry clothes instead of using dryer, keep refrigerator at optimal temperature, and use natural light during the day."
        },
        {
          question: "How much can solar panels reduce my electricity bill?",
          answer: "Solar panels can reduce bills by 70-90% depending on system size and consumption patterns. A typical 3kW system generates 12-15 units/day, covering most residential needs. With net metering, excess power is fed back to the grid. ROI is typically 4-6 years with 25-year system life."
        },
        {
          question: "What is the 5-star energy rating system?",
          answer: "The Bureau of Energy Efficiency (BEE) star rating indicates appliance efficiency. 5-star appliances are most efficient, consuming least electricity. For ACs, a 5-star unit uses 20-30% less power than a 3-star unit. Though initial cost is higher, savings over the appliance's lifetime offset the extra cost."
        },
        {
          question: "Should I opt for Time of Day (ToD) tariffs?",
          answer: "ToD tariffs offer different rates for peak (6-10 PM), normal, and off-peak hours. Beneficial if you can shift heavy consumption (washing machine, dishwasher, EV charging) to off-peak hours when rates are 30-50% lower. Most suitable for smart homes with automation or flexible usage patterns."
        }
      ]
    },
    {
      title: "Technical & General",
      icon: FileText,
      faqs: [
        {
          question: "What should I do if my electricity bill seems too high?",
          answer: "First, verify meter reading accuracy and check for any estimation vs actual reading. Look for unusual appliance behavior, check for electrical leakages with a multimeter, compare with previous months, and verify tariff calculations. If issues persist, contact your electricity board for meter testing and energy audit."
        },
        {
          question: "How often are electricity tariffs revised?",
          answer: "State Electricity Regulatory Commissions (SERCs) typically revise tariffs annually, usually effective from April 1st. Revisions consider fuel costs, infrastructure investments, subsidy policies, and cross-subsidy requirements. Mid-year adjustments may occur for significant fuel cost changes through Fuel & Power Purchase Cost Adjustment (FPPCA)."
        },
        {
          question: "What is net metering for solar power?",
          answer: "Net metering allows solar panel owners to feed excess electricity back to the grid and receive credit on their bills. During sunny days, excess solar power goes to the grid. During nights/cloudy days, you draw from the grid. The net difference is billed monthly. Most states support net metering up to certain capacity limits."
        },
        {
          question: "Can I change my electricity connection type?",
          answer: "Yes, you can convert between domestic, commercial, and industrial connections by applying to your local DISCOM with required documents. Note that commercial and industrial connections have higher rates but may offer better reliability and higher load capacity. Processing typically takes 15-30 days."
        },
        {
          question: "What happens during power cuts? Do I still pay fixed charges?",
          answer: "Yes, fixed charges apply regardless of power supply quality or duration. However, many states offer compensation for prolonged outages. You can claim rebates if outages exceed specified limits (typically 2-4 hours/day for urban areas, 6-8 hours for rural). Contact your DISCOM for the compensation process."
        },
        {
          question: "How accurate are smart meters?",
          answer: "Smart meters are typically more accurate than conventional meters, with accuracy of ±2%. They provide real-time consumption data, eliminate human reading errors, enable remote monitoring, and support time-based billing. They also help detect power theft and technical losses more effectively."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h1>
              <p className="text-muted-foreground">Everything you need to know about electricity billing and savings</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-muted rounded-lg text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="font-semibold">Updated Daily</div>
              <div className="text-sm text-muted-foreground">Latest tariff rates</div>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="font-semibold">3+ States</div>
              <div className="text-sm text-muted-foreground">Supported regions</div>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <Zap className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="font-semibold">95%+ Accuracy</div>
              <div className="text-sm text-muted-foreground">Bill estimation</div>
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                  </div>
                  <FAQAccordion faqs={category.faqs} />
                </div>
              );
            })}
          </div>

          {/* Still Have Questions */}
          <div className="mt-12 p-6 bg-primary text-primary-foreground rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="mb-4">
              Can't find what you're looking for? Contact us for personalized help with your electricity bill calculations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.open('mailto:contact@ladestack.in', '_blank')}
                className="px-6 py-2 bg-primary-foreground text-primary rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Email Support
              </button>
              <button
                onClick={() => navigate('/calculator')}
                className="px-6 py-2 border border-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                Try Calculator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;