import React, { useState } from 'react';
import { ArrowLeft, MapPin, Building, Home, Factory } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const TariffRatesPage = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('maharashtra');

  const tariffData = {
    maharashtra: {
      name: "Maharashtra (MSEDCL)",
      lastUpdated: "March 2026",
      domestic: {
        slabs: [
          { range: "0-100", rate: "₹2.61", fixedCharge: "₹25" },
          { range: "101-300", rate: "₹3.45", fixedCharge: "₹25" },
          { range: "301-500", rate: "₹4.60", fixedCharge: "₹25" },
          { range: "500+", rate: "₹6.20", fixedCharge: "₹25" }
        ],
        additionalCharges: [
          { name: "Electricity Duty", rate: "5% of bill amount" },
          { name: "Fuel Adjustment Charge", rate: "Variable (±₹0.20/unit)" },
          { name: "Green Energy Cess", rate: "₹0.05/unit" }
        ]
      },
      commercial: {
        slabs: [
          { range: "All consumption", rate: "₹8.50", fixedCharge: "₹100" }
        ],
        additionalCharges: [
          { name: "Electricity Duty", rate: "7.5% of bill amount" },
          { name: "Fuel Adjustment Charge", rate: "Variable (±₹0.30/unit)" },
          { name: "Demand Charge", rate: "₹350/kW" }
        ]
      },
      industrial: {
        slabs: [
          { range: "LT Industrial", rate: "₹7.80", fixedCharge: "₹150" },
          { range: "HT Industrial", rate: "₹6.90", fixedCharge: "₹500" }
        ],
        additionalCharges: [
          { name: "Electricity Duty", rate: "10% of bill amount" },
          { name: "Fuel Adjustment Charge", rate: "Variable (±₹0.40/unit)" },
          { name: "Demand Charge", rate: "₹450/kW" },
          { name: "Power Factor Penalty", rate: "Up to 20% surcharge" }
        ]
      },
      agricultural: {
        slabs: [
          { range: "Subsidized connection", rate: "₹1.50", fixedCharge: "₹10" }
        ],
        additionalCharges: [
          { name: "Government Subsidy", rate: "70% of actual cost" },
          { name: "Minimum Bill", rate: "₹50/month" }
        ]
      }
    },
    gujarat: {
      name: "Gujarat (GUVNL)",
      lastUpdated: "February 2026",
      domestic: {
        slabs: [
          { range: "0-50", rate: "₹2.25", fixedCharge: "₹20" },
          { range: "51-200", rate: "₹3.00", fixedCharge: "₹20" },
          { range: "201-400", rate: "₹4.25", fixedCharge: "₹20" },
          { range: "400+", rate: "₹5.75", fixedCharge: "₹20" }
        ],
        additionalCharges: [
          { name: "Electricity Duty", rate: "5% of bill amount" },
          { name: "Fuel & Power Purchase Cost", rate: "Variable" },
          { name: "Grid Support Charge", rate: "₹0.03/unit" }
        ]
      },
      commercial: {
        slabs: [
          { range: "All consumption", rate: "₹7.80", fixedCharge: "₹80" }
        ],
        additionalCharges: [
          { name: "Electricity Duty", rate: "8% of bill amount" },
          { name: "Fuel Adjustment", rate: "Variable" },
          { name: "Demand Charge", rate: "₹300/kW" }
        ]
      },
      industrial: {
        slabs: [
          { range: "LT Industrial", rate: "₹7.20", fixedCharge: "₹120" },
          { range: "HT Industrial", rate: "₹6.50", fixedCharge: "₹400" }
        ],
        additionalCharges: [
          { name: "Electricity Duty", rate: "12% of bill amount" },
          { name: "Fuel Adjustment", rate: "Variable" },
          { name: "Demand Charge", rate: "₹400/kW" }
        ]
      },
      agricultural: {
        slabs: [
          { range: "Subsidized connection", rate: "₹1.20", fixedCharge: "₹5" }
        ],
        additionalCharges: [
          { name: "Government Subsidy", rate: "80% of actual cost" },
          { name: "Solar Incentive", rate: "Net metering available" }
        ]
      }
    },
    karnataka: {
      name: "Karnataka (BESCOM/GESCOM/HESCOM/MESCOM)",
      lastUpdated: "January 2026",
      domestic: {
        slabs: [
          { range: "0-30", rate: "₹2.50", fixedCharge: "₹30" },
          { range: "31-100", rate: "₹3.75", fixedCharge: "₹30" },
          { range: "101-200", rate: "₹5.20", fixedCharge: "₹30" },
          { range: "200+", rate: "₹6.75", fixedCharge: "₹30" }
        ],
        additionalCharges: [
          { name: "Electricity Tax", rate: "9% of bill amount" },
          { name: "Fuel Adjustment", rate: "Variable" },
          { name: "Green Energy Cess", rate: "₹0.10/unit" }
        ]
      },
      commercial: {
        slabs: [
          { range: "All consumption", rate: "₹9.20", fixedCharge: "₹110" }
        ],
        additionalCharges: [
          { name: "Electricity Tax", rate: "10% of bill amount" },
          { name: "Demand Charge", rate: "₹380/kW" }
        ]
      },
      industrial: {
        slabs: [
          { range: "LT Industrial", rate: "₹8.10", fixedCharge: "₹160" },
          { range: "HT Industrial", rate: "₹7.30", fixedCharge: "₹550" }
        ],
        additionalCharges: [
          { name: "Electricity Tax", rate: "15% of bill amount" },
          { name: "Demand Charge", rate: "₹500/kW" }
        ]
      },
      agricultural: {
        slabs: [
          { range: "Subsidized connection", rate: "₹0.00", fixedCharge: "₹0" }
        ],
        additionalCharges: [
          { name: "Free Electricity", rate: "Up to 200 units/month" },
          { name: "Solar Subsidy", rate: "Available for installations" }
        ]
      }
    }
  };

  const categoryIcons = {
    domestic: Home,
    commercial: Building,
    industrial: Factory,
    agricultural: MapPin
  };

  const categoryLabels = {
    domestic: "Domestic/Residential",
    commercial: "Commercial/Office",
    industrial: "Industrial",
    agricultural: "Agricultural"
  };

  const states = Object.keys(tariffData);
  const currentData = tariffData[selectedState];

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
              <MapPin className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">State Electricity Tariff Rates</h1>
              <p className="text-muted-foreground">Current electricity rates across Indian states</p>
            </div>
          </div>

          {/* State Selector */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Select State</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {states.map((state) => (
                  <button
                    key={state}
                    onClick={() => setSelectedState(state)}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      selectedState === state
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-semibold">{tariffData[state].name}</div>
                    <div className="text-sm text-muted-foreground">
                      Updated: {tariffData[state].lastUpdated}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tariff Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{currentData.name} - Tariff Rates</CardTitle>
                <Badge variant="secondary">Updated: {currentData.lastUpdated}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="domestic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  {Object.keys(categoryLabels).map((category) => {
                    const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
                    return (
                      <TabsTrigger key={category} value={category} className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        <span className="hidden sm:inline">{categoryLabels[category as keyof typeof categoryLabels]}</span>
                        <span className="sm:hidden">{category}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {Object.keys(categoryLabels).map((category) => {
                  const categoryData = currentData[category as keyof typeof currentData];
                  const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
                  
                  return (
                    <TabsContent key={category} value={category} className="space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <IconComponent className="w-5 h-5" />
                        <h3 className="text-xl font-semibold">{categoryLabels[category as keyof typeof categoryLabels]} Rates</h3>
                      </div>

                      {/* Rate Slabs */}
                      <div>
                        <h4 className="font-semibold mb-3">Energy Charges (per unit/kWh)</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-border">
                            <thead>
                              <tr className="bg-muted">
                                <th className="border border-border p-3 text-left">Consumption Range (Units)</th>
                                <th className="border border-border p-3 text-left">Rate per Unit</th>
                                <th className="border border-border p-3 text-left">Fixed Charge (Monthly)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {categoryData.slabs.map((slab: any, index: number) => (
                                <tr key={index}>
                                  <td className="border border-border p-3 font-mono">{slab.range}</td>
                                  <td className="border border-border p-3 font-semibold">{slab.rate}</td>
                                  <td className="border border-border p-3">{slab.fixedCharge}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Additional Charges */}
                      <div>
                        <h4 className="font-semibold mb-3">Additional Charges & Taxes</h4>
                        <div className="space-y-2">
                          {categoryData.additionalCharges.map((charge: any, index: number) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                              <span className="font-medium">{charge.name}</span>
                              <span className="text-muted-foreground">{charge.rate}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
                <h4 className="font-semibold text-yellow-800">Fuel Adjustment Charges</h4>
                <p className="text-yellow-700">
                  Fuel adjustment charges are variable and can change monthly based on fuel costs. 
                  They can add or subtract ₹0.20-₹0.50 per unit to your bill.
                </p>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-400">
                <h4 className="font-semibold text-blue-800">Time of Day (TOD) Tariffs</h4>
                <p className="text-blue-700">
                  Many states offer Time of Day tariffs for industrial and large commercial consumers 
                  with different rates for peak, normal, and off-peak hours.
                </p>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-400">
                <h4 className="font-semibold text-green-800">Solar Net Metering</h4>
                <p className="text-green-700">
                  Most states support solar net metering for domestic and commercial consumers. 
                  Excess solar power can be fed back to the grid for credit.
                </p>
              </div>
              <div className="p-3 bg-red-50 border-l-4 border-red-400">
                <h4 className="font-semibold text-red-800">Rate Revisions</h4>
                <p className="text-red-700">
                  Electricity tariffs are revised annually by State Electricity Regulatory Commissions (SERCs). 
                  Always check with your local DISCOM for the latest rates.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Compare States */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick State Comparison (Domestic 200 units)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {states.map((state) => {
                  // Simple calculation for 200 units
                  const stateData = tariffData[state];
                  let cost = 0;
                  let remaining = 200;
                  
                  for (const slab of stateData.domestic.slabs) {
                    if (remaining <= 0) break;
                    const range = slab.range.split('-');
                    const max = range[1] === '+' ? 200 : parseInt(range[1]);
                    const min = parseInt(range[0]);
                    const units = Math.min(remaining, max - min + 1);
                    const rate = parseFloat(slab.rate.replace('₹', ''));
                    cost += units * rate;
                    remaining -= units;
                  }
                  
                  const fixedCharge = parseFloat(stateData.domestic.slabs[0].fixedCharge.replace('₹', ''));
                  cost += fixedCharge;
                  
                  return (
                    <div key={state} className="p-4 border rounded-lg">
                      <h4 className="font-semibold">{stateData.name}</h4>
                      <p className="text-2xl font-bold text-primary">₹{cost.toFixed(0)}</p>
                      <p className="text-sm text-muted-foreground">for 200 units</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TariffRatesPage;