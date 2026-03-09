import React, { useState } from 'react';
import { ArrowLeft, Calculator, Zap, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CalculatorPage = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState('');
  const [state, setState] = useState('');
  const [category, setCategory] = useState('');
  const [result, setResult] = useState<any>(null);

  const stateRates = {
    'maharashtra': {
      'domestic': [
        { min: 0, max: 100, rate: 2.61, fixedCharge: 25 },
        { min: 101, max: 300, rate: 3.45, fixedCharge: 25 },
        { min: 301, max: 500, rate: 4.60, fixedCharge: 25 },
        { min: 501, max: Infinity, rate: 6.20, fixedCharge: 25 }
      ],
      'commercial': [
        { min: 0, max: Infinity, rate: 8.50, fixedCharge: 100 }
      ]
    },
    'gujarat': {
      'domestic': [
        { min: 0, max: 50, rate: 2.25, fixedCharge: 20 },
        { min: 51, max: 200, rate: 3.00, fixedCharge: 20 },
        { min: 201, max: 400, rate: 4.25, fixedCharge: 20 },
        { min: 401, max: Infinity, rate: 5.75, fixedCharge: 20 }
      ],
      'commercial': [
        { min: 0, max: Infinity, rate: 7.80, fixedCharge: 80 }
      ]
    }
  };

  const calculateBill = () => {
    if (!units || !state || !category) return;
    
    const unitsNum = parseInt(units);
    const rates = stateRates[state]?.[category];
    if (!rates) return;

    let totalBill = 0;
    let remainingUnits = unitsNum;
    let breakdown = [];

    for (const slab of rates) {
      if (remainingUnits <= 0) break;
      
      const slabUnits = Math.min(remainingUnits, slab.max - slab.min + 1);
      const slabAmount = slabUnits * slab.rate;
      
      breakdown.push({
        range: `${slab.min}-${slab.max === Infinity ? '∞' : slab.max}`,
        units: slabUnits,
        rate: slab.rate,
        amount: slabAmount
      });
      
      totalBill += slabAmount;
      remainingUnits -= slabUnits;
    }

    const fixedCharge = rates[0].fixedCharge;
    const subtotal = totalBill + fixedCharge;
    const tax = subtotal * 0.05; // 5% electricity duty
    const finalAmount = subtotal + tax;

    setResult({
      breakdown,
      energyCharges: totalBill,
      fixedCharge,
      subtotal,
      tax,
      finalAmount,
      unitsConsumed: unitsNum
    });
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
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Electricity Bill Calculator</h1>
              <p className="text-muted-foreground">Calculate your monthly electricity bill based on units consumed</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Enter Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Connection Type</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select connection type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="domestic">Domestic</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="units">Units Consumed (kWh)</Label>
                  <Input
                    id="units"
                    type="number"
                    placeholder="Enter units consumed"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={calculateBill} 
                  className="w-full"
                  disabled={!units || !state || !category}
                >
                  Calculate Bill
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>Bill Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Slab-wise Calculation:</h4>
                    {result.breakdown.map((slab: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{slab.range} units: {slab.units} × ₹{slab.rate}</span>
                        <span>₹{slab.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Energy Charges</span>
                      <span>₹{result.energyCharges.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fixed Charges</span>
                      <span>₹{result.fixedCharge.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{result.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Electricity Duty (5%)</span>
                      <span>₹{result.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total Amount</span>
                      <span>₹{result.finalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Information Alert */}
          <Alert className="mt-8">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Disclaimer:</strong> This calculator provides estimates based on standard tariff rates. 
              Actual bills may vary due to additional charges, subsidies, or updated rates. 
              Please verify with your local DISCOM for exact tariffs.
            </AlertDescription>
          </Alert>

          {/* How It Works */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>How the Calculator Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Slab-based Billing</h4>
                  <p className="text-muted-foreground text-sm">
                    Electricity is billed in slabs where different rates apply to different consumption ranges. 
                    Lower consumption gets cheaper rates.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Components</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Energy charges (per unit consumed)</li>
                    <li>• Fixed charges (monthly connection fee)</li>
                    <li>• Electricity duty (usually 5-10%)</li>
                    <li>• Other government taxes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;