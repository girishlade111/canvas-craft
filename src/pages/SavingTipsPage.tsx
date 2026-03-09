import React from 'react';
import { ArrowLeft, Lightbulb, Thermometer, Home, Cpu, Sun, Droplets, Timer, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SavingTipsPage = () => {
  const navigate = useNavigate();

  const categories = [
    {
      icon: Lightbulb,
      title: "Lighting",
      color: "bg-yellow-500",
      tips: [
        {
          title: "Switch to LED Bulbs",
          description: "Replace all incandescent and CFL bulbs with LED bulbs. LEDs use 80% less energy and last 25 times longer.",
          savings: "Save ₹200-500/month",
          difficulty: "Easy"
        },
        {
          title: "Use Natural Light",
          description: "Open curtains and blinds during the day. Position workspaces near windows to reduce the need for artificial lighting.",
          savings: "Save ₹100-200/month",
          difficulty: "Easy"
        },
        {
          title: "Install Motion Sensors",
          description: "Add motion sensor switches in bathrooms, corridors, and storage areas to automatically turn lights on/off.",
          savings: "Save ₹150-300/month",
          difficulty: "Medium"
        },
        {
          title: "Use Task Lighting",
          description: "Instead of lighting entire rooms, use focused task lighting for reading, cooking, and working.",
          savings: "Save ₹100-250/month",
          difficulty: "Easy"
        }
      ]
    },
    {
      icon: Thermometer,
      title: "Cooling & Heating",
      color: "bg-blue-500",
      tips: [
        {
          title: "Optimal AC Temperature",
          description: "Set your AC to 24°C or higher. Every degree lower increases energy consumption by 6-10%.",
          savings: "Save ₹500-1000/month",
          difficulty: "Easy"
        },
        {
          title: "Use Ceiling Fans with AC",
          description: "Use ceiling fans to circulate air, allowing you to set AC temperature 2-3°C higher while maintaining comfort.",
          savings: "Save ₹300-600/month",
          difficulty: "Easy"
        },
        {
          title: "Regular AC Maintenance",
          description: "Clean AC filters monthly and service annually. Dirty filters reduce efficiency by up to 15%.",
          savings: "Save ₹200-400/month",
          difficulty: "Easy"
        },
        {
          title: "Seal Air Leaks",
          description: "Use weatherstripping around doors and windows to prevent cool air from escaping.",
          savings: "Save ₹300-700/month",
          difficulty: "Medium"
        },
        {
          title: "Use Window Coverings",
          description: "Install curtains, blinds, or window films to block heat during summer and retain warmth in winter.",
          savings: "Save ₹200-500/month",
          difficulty: "Easy"
        }
      ]
    },
    {
      icon: Home,
      title: "Home Appliances",
      color: "bg-green-500",
      tips: [
        {
          title: "Unplug Devices When Not in Use",
          description: "Many electronics consume power even when turned off (phantom load). Unplug chargers, TVs, and computers.",
          savings: "Save ₹150-300/month",
          difficulty: "Easy"
        },
        {
          title: "Use Power Strips",
          description: "Connect multiple devices to power strips and turn them off when not in use to eliminate standby power.",
          savings: "Save ₹100-250/month",
          difficulty: "Easy"
        },
        {
          title: "Optimize Refrigerator Settings",
          description: "Set refrigerator to 3-4°C and freezer to -18°C. Avoid keeping the door open for long periods.",
          savings: "Save ₹200-400/month",
          difficulty: "Easy"
        },
        {
          title: "Use Cold Water for Washing",
          description: "Wash clothes in cold water when possible. 90% of energy used by washing machines goes to heating water.",
          savings: "Save ₹300-600/month",
          difficulty: "Easy"
        },
        {
          title: "Air Dry Clothes",
          description: "Use clotheslines or drying racks instead of electric dryers whenever weather permits.",
          savings: "Save ₹400-800/month",
          difficulty: "Easy"
        }
      ]
    },
    {
      icon: Cpu,
      title: "Electronics",
      color: "bg-purple-500",
      tips: [
        {
          title: "Enable Power Management",
          description: "Use sleep mode on computers and enable power-saving settings on all electronic devices.",
          savings: "Save ₹100-200/month",
          difficulty: "Easy"
        },
        {
          title: "Choose Energy-Efficient Devices",
          description: "When buying new appliances, look for 5-star energy rating and BEE certification.",
          savings: "Save ₹500-1500/month",
          difficulty: "Medium"
        },
        {
          title: "Optimize TV Settings",
          description: "Reduce screen brightness and enable energy-saving mode on TVs and monitors.",
          savings: "Save ₹50-150/month",
          difficulty: "Easy"
        },
        {
          title: "Use Laptops Over Desktops",
          description: "Laptops consume 50-80% less power than desktop computers for similar tasks.",
          savings: "Save ₹200-400/month",
          difficulty: "Medium"
        }
      ]
    },
    {
      icon: Sun,
      title: "Renewable Energy",
      color: "bg-orange-500",
      tips: [
        {
          title: "Install Solar Panels",
          description: "Solar panels can reduce your electricity bill by 70-90%. Government subsidies make them more affordable.",
          savings: "Save ₹2000-5000/month",
          difficulty: "Hard"
        },
        {
          title: "Solar Water Heaters",
          description: "Replace electric geysers with solar water heaters. They can meet 60-80% of hot water needs.",
          savings: "Save ₹800-1500/month",
          difficulty: "Hard"
        },
        {
          title: "Solar Lighting",
          description: "Use solar-powered outdoor lights for gardens, pathways, and security lighting.",
          savings: "Save ₹100-300/month",
          difficulty: "Easy"
        }
      ]
    },
    {
      icon: Droplets,
      title: "Water Heating",
      color: "bg-red-500",
      tips: [
        {
          title: "Reduce Geyser Temperature",
          description: "Set water heater to 50-55°C. Higher temperatures waste energy and can cause scalding.",
          savings: "Save ₹300-600/month",
          difficulty: "Easy"
        },
        {
          title: "Insulate Water Heater",
          description: "Wrap older water heaters with insulation blankets to reduce heat loss.",
          savings: "Save ₹200-400/month",
          difficulty: "Medium"
        },
        {
          title: "Take Shorter Showers",
          description: "Reduce shower time by 2-3 minutes to save both water and the energy used to heat it.",
          savings: "Save ₹200-500/month",
          difficulty: "Easy"
        },
        {
          title: "Fix Hot Water Leaks",
          description: "Repair leaky hot water faucets and pipes immediately to prevent energy waste.",
          savings: "Save ₹100-300/month",
          difficulty: "Medium"
        }
      ]
    }
  ];

  const quickWins = [
    "Switch to LED bulbs throughout your home",
    "Set AC temperature to 24°C or higher",
    "Unplug electronics when not in use",
    "Use ceiling fans with AC",
    "Wash clothes in cold water",
    "Air dry clothes instead of using dryer",
    "Keep refrigerator at optimal temperature",
    "Use natural light during the day"
  ];

  const difficultyColors = {
    "Easy": "bg-green-100 text-green-800",
    "Medium": "bg-yellow-100 text-yellow-800",
    "Hard": "bg-red-100 text-red-800"
  };

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
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Electricity Saving Tips</h1>
              <p className="text-muted-foreground">Practical ways to reduce your electricity bill and save money</p>
            </div>
          </div>

          {/* Quick Wins */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                Quick Wins (Start Here!)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                These simple changes can be implemented immediately and will start saving money right away:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quickWins.map((tip, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Tips by Category */}
          <div className="space-y-8">
            {categories.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.tips.map((tip, tipIndex) => (
                        <div key={tipIndex} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold">{tip.title}</h4>
                            <Badge className={difficultyColors[tip.difficulty as keyof typeof difficultyColors]}>
                              {tip.difficulty}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{tip.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-green-600 font-semibold text-sm">{tip.savings}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Energy Efficiency Standards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-semibold">BEE Star Rating</h4>
                  <p className="text-muted-foreground">Look for Bureau of Energy Efficiency (BEE) 5-star rated appliances</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-semibold">ISI Mark</h4>
                  <p className="text-muted-foreground">Ensure electrical appliances have ISI certification for safety</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-semibold">Energy Labels</h4>
                  <p className="text-muted-foreground">Check annual energy consumption labels before purchasing</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Potential Monthly Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Basic Changes (LED, AC temp, etc.)</span>
                    <span className="font-semibold text-green-600">₹1,000-2,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Appliance Upgrades</span>
                    <span className="font-semibold text-green-600">₹2,000-4,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Solar Installation</span>
                    <span className="font-semibold text-green-600">₹3,000-8,000</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold">
                    <span>Total Potential Savings</span>
                    <span className="text-green-600">₹6,000-14,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="mt-8 bg-primary text-primary-foreground">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Start Saving Today!</h3>
              <p className="mb-4">
                Implementing just 3-4 of these tips can reduce your electricity bill by 20-40%.
                Small changes lead to big savings!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/calculator')}
                  className="px-6 py-2 bg-primary-foreground text-primary rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Calculate Your Savings
                </button>
                <button
                  onClick={() => navigate('/appliance-calculator')}
                  className="px-6 py-2 border border-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground hover:text-primary transition-colors"
                >
                  Check Appliance Consumption
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SavingTipsPage;