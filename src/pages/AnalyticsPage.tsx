import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BarChart3, TrendingUp, Users, Eye, Clock, Globe, ArrowLeft, Calendar,
  MousePointerClick, Monitor, Smartphone, Tablet, ArrowUpRight, ArrowDownRight,
  FileText, ExternalLink, Search, Share2,
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock analytics data
const trafficData = [
  { date: 'Mon', visitors: 1240, pageViews: 3200, bounceRate: 42 },
  { date: 'Tue', visitors: 1580, pageViews: 4100, bounceRate: 38 },
  { date: 'Wed', visitors: 1320, pageViews: 3600, bounceRate: 45 },
  { date: 'Thu', visitors: 1890, pageViews: 5200, bounceRate: 35 },
  { date: 'Fri', visitors: 2100, pageViews: 5800, bounceRate: 32 },
  { date: 'Sat', visitors: 1680, pageViews: 4500, bounceRate: 40 },
  { date: 'Sun', visitors: 1450, pageViews: 3900, bounceRate: 43 },
];

const deviceData = [
  { name: 'Desktop', value: 58, color: 'hsl(252, 85%, 60%)' },
  { name: 'Mobile', value: 34, color: 'hsl(200, 85%, 55%)' },
  { name: 'Tablet', value: 8, color: 'hsl(150, 60%, 50%)' },
];

const topPages = [
  { path: '/', title: 'Home', views: 12450, unique: 8920, avgTime: '2:34' },
  { path: '/about', title: 'About Us', views: 5680, unique: 4210, avgTime: '1:48' },
  { path: '/services', title: 'Services', views: 4320, unique: 3150, avgTime: '3:12' },
  { path: '/blog', title: 'Blog', views: 3890, unique: 2940, avgTime: '4:05' },
  { path: '/contact', title: 'Contact', views: 2100, unique: 1680, avgTime: '1:15' },
];

const trafficSources = [
  { source: 'Google Search', visitors: 4520, percentage: 42, icon: Search },
  { source: 'Direct', visitors: 2890, percentage: 27, icon: Globe },
  { source: 'Social Media', visitors: 1850, percentage: 17, icon: Share2 },
  { source: 'Referral', visitors: 980, percentage: 9, icon: ExternalLink },
  { source: 'Email', visitors: 540, percentage: 5, icon: FileText },
];

const conversionData = [
  { date: 'Mon', signups: 12, purchases: 3 },
  { date: 'Tue', signups: 18, purchases: 5 },
  { date: 'Wed', signups: 15, purchases: 4 },
  { date: 'Thu', signups: 24, purchases: 8 },
  { date: 'Fri', signups: 28, purchases: 11 },
  { date: 'Sat', signups: 20, purchases: 6 },
  { date: 'Sun', signups: 16, purchases: 4 },
];

const KPICard = ({ label, value, change, icon: Icon, positive = true }: { label: string; value: string; change: string; icon: typeof Users; positive?: boolean }) => (
  <div className="rounded-xl p-4" style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
        <Icon className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
      </div>
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className={`flex items-center gap-1 text-xs mt-1 ${positive ? 'text-green-500' : 'text-red-500'}`}>
      {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {change} vs last week
    </div>
  </div>
);

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [dateRange, setDateRange] = useState('7d');

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>
      {/* Header */}
      <div className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: 'hsl(var(--border))' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
              Analytics Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">Track your site performance and visitor behavior</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="text-xs rounded-md px-3 py-1.5" style={{ border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }}>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard label="Total Visitors" value="11,260" change="+12.5%" icon={Users} positive />
          <KPICard label="Page Views" value="30,300" change="+8.2%" icon={Eye} positive />
          <KPICard label="Avg. Session" value="2:45" change="-3.1%" icon={Clock} positive={false} />
          <KPICard label="Bounce Rate" value="39.3%" change="-5.2%" icon={MousePointerClick} positive />
        </div>

        {/* Traffic Chart */}
        <div className="rounded-xl p-5" style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
          <h3 className="text-sm font-semibold mb-4">Traffic Overview</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(252, 85%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(252, 85%, 60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(200, 85%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(200, 85%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid hsl(var(--border))' }} />
              <Area type="monotone" dataKey="visitors" stroke="hsl(252, 85%, 60%)" fillOpacity={1} fill="url(#colorVisitors)" strokeWidth={2} />
              <Area type="monotone" dataKey="pageViews" stroke="hsl(200, 85%, 55%)" fillOpacity={1} fill="url(#colorPageViews)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Device breakdown */}
          <div className="rounded-xl p-5" style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
            <h3 className="text-sm font-semibold mb-4">Devices</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={deviceData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                  {deviceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {deviceData.map(d => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  {d.name} ({d.value}%)
                </div>
              ))}
            </div>
          </div>

          {/* Traffic sources */}
          <div className="rounded-xl p-5 col-span-2" style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
            <h3 className="text-sm font-semibold mb-4">Traffic Sources</h3>
            <div className="space-y-3">
              {trafficSources.map(s => (
                <div key={s.source} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--muted))' }}>
                    <s.icon className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-xs font-medium flex-1">{s.source}</span>
                  <span className="text-xs text-muted-foreground">{s.visitors.toLocaleString()}</span>
                  <div className="w-24 h-2 rounded-full overflow-hidden" style={{ background: 'hsl(var(--muted))' }}>
                    <div className="h-full rounded-full" style={{ width: `${s.percentage}%`, background: 'hsl(var(--primary))' }} />
                  </div>
                  <span className="text-xs font-mono w-8 text-right">{s.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top pages */}
          <div className="rounded-xl p-5" style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
            <h3 className="text-sm font-semibold mb-4">Top Pages</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-[10px] uppercase tracking-wider text-muted-foreground pb-2" style={{ borderBottom: '1px solid hsl(var(--border))' }}>
                <span className="col-span-1">Page</span><span>Views</span><span>Unique</span><span>Avg Time</span>
              </div>
              {topPages.map(page => (
                <div key={page.path} className="grid grid-cols-4 gap-2 text-xs py-1.5">
                  <div className="col-span-1">
                    <div className="font-medium truncate">{page.title}</div>
                    <div className="text-[10px] text-muted-foreground">{page.path}</div>
                  </div>
                  <span>{page.views.toLocaleString()}</span>
                  <span>{page.unique.toLocaleString()}</span>
                  <span>{page.avgTime}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conversions */}
          <div className="rounded-xl p-5" style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
            <h3 className="text-sm font-semibold mb-4">Conversions</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="signups" fill="hsl(252, 85%, 60%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="purchases" fill="hsl(150, 60%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(252, 85%, 60%)' }} /> Signups
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(150, 60%, 50%)' }} /> Purchases
              </div>
            </div>
          </div>
        </div>

        {/* Real-time visitors (mock) */}
        <div className="rounded-xl p-5" style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Real-time Visitors
            </h3>
            <span className="text-2xl font-bold" style={{ color: 'hsl(var(--primary))' }}>47</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Active on Home', count: 18 },
              { label: 'Active on Blog', count: 12 },
              { label: 'Active on Shop', count: 17 },
            ].map(item => (
              <div key={item.label} className="text-center p-3 rounded-lg" style={{ background: 'hsl(var(--muted))' }}>
                <div className="text-lg font-bold">{item.count}</div>
                <div className="text-[10px] text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
