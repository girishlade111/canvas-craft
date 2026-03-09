import React, { useState } from 'react';
import { ArrowLeft, Cpu, Plus, Trash2, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface Appliance {
  id: string;
  name: string;
  watts: number;
  hoursPerDay: number;
  quantity: number;
}

const ApplianceCalculatorPage = () => {
  const navigate = useNavigate();
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [newAppliance, setNewAppliance] = useState({
    name: '',
    watts: '',
    hoursPerDay: '',
    quantity: '1'
  });

  const commonAppliances = [
    { name: 'LED Bulb (9W)', watts: 9 },
    { name: 'CFL Bulb (15W)', watts: 15 },
    { name: 'Incandescent Bulb (60W)', watts: 60 },
    { name: 'Ceiling Fan', watts: 75 },
    { name: 'Air Conditioner (1.5 Ton)', watts: 1500 },
    { name: 'Refrigerator (Double Door)', watts: 300 },
    { name: 'Washing Machine', watts: 1000 },
    { name: 'Microwave Oven', watts: 1200 },
    { name: 'Electric Iron', watts: 1000 },
    { name: 'Water Heater (Geyser)', watts: 2000 },
    { name: 'Television (LED 32")', watts: 80 },
    { name: 'Desktop Computer', watts: 300 },
    { name: 'Laptop', watts: 65 },
    { name: 'Room Heater', watts: 2000 },
    { name: 'Mixer Grinder', watts: 750 },
    { name: 'Induction Cooktop', watts: 2000 }
  ];

  const addAppliance = () => {
    if (newAppliance.name && newAppliance.watts && newAppliance.hoursPerDay) {
      const appliance: Appliance = {
        id: Date.now().toString(),
        name: newAppliance.name,
        watts: parseInt(newAppliance.watts),
        hoursPerDay: parseFloat(newAppliance.hoursPerDay),
        quantity: parseInt(newAppliance.quantity)
      };
      setAppliances([...appliances, appliance]);
      setNewAppliance({ name: '', watts: '', hoursPerDay: '', quantity: '1' });
    }
  };

  const removeAppliance = (id: string) => {
    setAppliances(appliances.filter(a => a.id !== id));
  };

  const addCommonAppliance = (name: string, watts: number) => {
    setNewAppliance(prev => ({ ...prev, name, watts: watts.toString() }));
  };

  const calculateTotalConsumption = () => {
    return appliances.reduce((total, appliance) => {
      const dailyKWh = (appliance.watts * appliance.hoursPerDay * appliance.quantity) / 1000;
      return total + (dailyKWh * 30); // Monthly consumption
    }, 0);
  };

  const calculateMonthlyCost = (monthlyKWh: number) => {
    // Using Maharashtra domestic rates as example
    let cost = 0;
    let remainingUnits = monthlyKWh;

    const slabs = [
      { max: 100, rate: 2.61 },
      { max: 300, rate: 3.45 },
      { max: 500, rate: 4.60 },
      { max: Infinity, rate: 6.20 }
    ];

    let currentMin = 0;
    for (const slab of slabs) {
      if (remainingUnits <= 0) break;
      const slabUnits = Math.min(remainingUnits, slab.max - currentMin);
      cost += slabUnits * slab.rate;
      remainingUnits -= slabUnits;
      currentMin = slab.max;
    }

    return cost + 25; // Add fixed charge
  };

  const monthlyConsumption = calculateTotalConsumption();
  const monthlyCost = calculateMonthlyCost(monthlyConsumption);

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
              <Cpu className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Appliance Power Calculator</h1>
              <p className="text-muted-foreground">Calculate electricity consumption based on your home appliances</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Appliance Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Appliances</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Appliance Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., LED Bulb"
                        value={newAppliance.name}
                        onChange={(e) => setNewAppliance(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="watts">Power (Watts)</Label>
                      <Input
                        id="watts"
                        type="number"
                        placeholder="e.g., 9"
                        value={newAppliance.watts}
                        onChange={(e) => setNewAppliance(prev => ({ ...prev, watts: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hours">Hours/Day</Label>
                      <Input
                        id="hours"
                        type="number"
                        step="0.5"
                        placeholder="e.g., 6"
                        value={newAppliance.hoursPerDay}
                        onChange={(e) => setNewAppliance(prev => ({ ...prev, hoursPerDay: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="e.g., 2"
                        value={newAppliance.quantity}
                        onChange={(e) => setNewAppliance(prev => ({ ...prev, quantity: e.target.value }))}
                      />
                    </div>
                  </div>
                  <Button onClick={addAppliance} className="w-full md:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Appliance
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Add Common Appliances */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Add Common Appliances</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {commonAppliances.map((appliance, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => addCommonAppliance(appliance.name, appliance.watts)}
                        className="justify-start"
                      >
                        {appliance.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Added Appliances List */}
              {appliances.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Appliances</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {appliances.map((appliance) => {
                        const dailyKWh = (appliance.watts * appliance.hoursPerDay * appliance.quantity) / 1000;
                        const monthlyKWh = dailyKWh * 30;
                        return (
                          <div key={appliance.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <div className="font-medium">{appliance.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {appliance.watts}W × {appliance.hoursPerDay}h × {appliance.quantity} = {dailyKWh.toFixed(2)} kWh/day ({monthlyKWh.toFixed(2)} kWh/month)
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAppliance(appliance.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Results Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Consumption Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Consumption</span>
                      <span className="font-semibold">{monthlyConsumption.toFixed(2)} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Monthly Cost</span>
                      <span className="font-semibold">₹{monthlyCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-muted-foreground">Daily Consumption</span>
                      <span className="font-semibold">{(monthlyConsumption / 30).toFixed(2)} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Annual Consumption</span>
                      <span className="font-semibold">{(monthlyConsumption * 12).toFixed(0)} kWh</span>
                    </div>
                  </div>

                  {appliances.length > 0 && (
                    <Button
                      onClick={() => navigate('/calculator', { 
                        state: { prefillUnits: Math.round(monthlyConsumption) }
                      })}
                      className="w-full"
                    >
                      Calculate Detailed Bill
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Energy Efficiency Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Energy Efficiency Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-semibold">Replace with LEDs</h4>
                    <p className="text-muted-foreground">LED bulbs use 80% less energy than incandescent bulbs</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-semibold">Optimize AC Usage</h4>
                    <p className="text-muted-foreground">Set temperature to 24°C for optimal efficiency</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-semibold">Unplug Devices</h4>
                    <p className="text-muted-foreground">Many devices consume power even when turned off</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplianceCalculatorPage;