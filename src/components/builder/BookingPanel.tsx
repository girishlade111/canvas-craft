import { useState } from 'react';
import {
  CalendarDays, Plus, X, Clock, Users, MapPin, Ticket, Star,
  ChevronLeft, ChevronRight, Edit3, Trash2, Gift, Video,
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  category: string;
  bookings: number;
}

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  price: number;
  type: 'in-person' | 'online' | 'hybrid';
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  availability: string;
  avatar: string;
}

const MOCK_SERVICES: Service[] = [
  { id: '1', name: 'Initial Consultation', duration: '30 min', price: 0, category: 'Consultation', bookings: 45 },
  { id: '2', name: 'Full Strategy Session', duration: '60 min', price: 150, category: 'Strategy', bookings: 28 },
  { id: '3', name: 'Design Review', duration: '45 min', price: 75, category: 'Design', bookings: 32 },
  { id: '4', name: 'Group Workshop', duration: '120 min', price: 50, category: 'Workshop', bookings: 85 },
];

const MOCK_EVENTS: Event[] = [
  { id: '1', name: 'Web Design Masterclass', date: '2026-03-20', time: '10:00 AM', location: 'Online', capacity: 100, registered: 67, price: 49, type: 'online' },
  { id: '2', name: 'Spring Networking Mixer', date: '2026-03-25', time: '6:00 PM', location: 'Downtown Hub', capacity: 50, registered: 42, price: 0, type: 'in-person' },
  { id: '3', name: 'Product Launch Party', date: '2026-04-01', time: '7:00 PM', location: 'Studio', capacity: 75, registered: 30, price: 25, type: 'hybrid' },
];

const MOCK_STAFF: StaffMember[] = [
  { id: '1', name: 'Alex Johnson', role: 'Lead Designer', availability: 'Mon-Fri 9-5', avatar: '👨‍💻' },
  { id: '2', name: 'Sarah Park', role: 'Consultant', availability: 'Tue-Sat 10-6', avatar: '👩‍💼' },
  { id: '3', name: 'Mike Chen', role: 'Workshop Lead', availability: 'Mon,Wed,Fri', avatar: '👨‍🏫' },
];

interface BookingPanelProps {
  onClose?: () => void;
}

const BookingPanel = ({ onClose }: BookingPanelProps) => {
  const [activeTab, setActiveTab] = useState<'services' | 'events' | 'calendar' | 'staff'>('services');
  const [currentMonth] = useState(new Date(2026, 2)); // March 2026

  const tabs = [
    { id: 'services' as const, label: 'Services', icon: Clock },
    { id: 'events' as const, label: 'Events', icon: Ticket },
    { id: 'calendar' as const, label: 'Calendar', icon: CalendarDays },
    { id: 'staff' as const, label: 'Staff', icon: Users },
  ];

  // Simple calendar grid
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });
  const bookedDays = [5, 8, 10, 12, 15, 18, 20, 22, 25, 28];

  return (
    <div className="builder-flyout overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-sm font-semibold">Bookings & Events</h2>
        </div>
        {onClose && <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-1 p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {[
          { label: 'This Week', value: '12', sub: 'bookings' },
          { label: 'Revenue', value: '$2.4k', sub: 'this month' },
          { label: 'Events', value: MOCK_EVENTS.length.toString(), sub: 'upcoming' },
        ].map(s => (
          <div key={s.label} className="p-2 rounded text-center" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-sm font-bold">{s.value}</div>
            <div className="text-[9px] opacity-50">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="flex border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1 px-2 py-2.5 text-[10px] font-medium transition-colors ${
              activeTab === id ? 'border-b-2 opacity-100' : 'opacity-50 hover:opacity-80'
            }`} style={activeTab === id ? { borderColor: 'hsl(var(--primary))' } : undefined}>
            <Icon className="w-3 h-3" />{label}
          </button>
        ))}
      </div>

      {/* Services */}
      {activeTab === 'services' && (
        <div>
          <div className="p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
              <Plus className="w-3 h-3" /> Add Service
            </button>
          </div>
          <div className="space-y-1 p-2">
            {MOCK_SERVICES.map(service => (
              <div key={service.id} className="p-3 rounded-lg hover:bg-muted/30 transition-colors group" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs font-semibold">{service.name}</h3>
                  <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 rounded hover:bg-muted"><Edit3 className="w-3 h-3" /></button>
                    <button className="p-1 rounded hover:bg-muted hover:text-destructive"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[10px] opacity-50">
                  <span><Clock className="w-2.5 h-2.5 inline mr-0.5" />{service.duration}</span>
                  <span className="font-medium" style={{ color: service.price > 0 ? 'hsl(var(--primary))' : 'hsl(var(--success))' }}>
                    {service.price > 0 ? `$${service.price}` : 'Free'}
                  </span>
                  <span>{service.bookings} booked</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Events */}
      {activeTab === 'events' && (
        <div>
          <div className="p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
              <Plus className="w-3 h-3" /> Create Event
            </button>
          </div>
          <div className="space-y-1 p-2">
            {MOCK_EVENTS.map(event => (
              <div key={event.id} className="p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-xs font-semibold flex-1">{event.name}</h3>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{
                    background: event.type === 'online' ? 'hsl(var(--primary) / 0.1)' : event.type === 'hybrid' ? 'hsl(var(--warning, 45 93% 47%) / 0.1)' : 'hsl(var(--success) / 0.1)',
                    color: event.type === 'online' ? 'hsl(var(--primary))' : event.type === 'hybrid' ? 'hsl(var(--warning, 45 93% 47%))' : 'hsl(var(--success))',
                  }}>
                    {event.type === 'online' && <Video className="w-2.5 h-2.5 inline mr-0.5" />}
                    {event.type}
                  </span>
                </div>
                <div className="space-y-0.5 text-[10px] opacity-50">
                  <div><CalendarDays className="w-2.5 h-2.5 inline mr-1" />{event.date} at {event.time}</div>
                  <div><MapPin className="w-2.5 h-2.5 inline mr-1" />{event.location}</div>
                  <div className="flex items-center justify-between">
                    <span><Users className="w-2.5 h-2.5 inline mr-1" />{event.registered}/{event.capacity} registered</span>
                    <span className="font-medium" style={{ color: event.price > 0 ? 'hsl(var(--primary))' : 'hsl(var(--success))' }}>
                      {event.price > 0 ? `$${event.price}` : 'Free'}
                    </span>
                  </div>
                </div>
                {/* Capacity bar */}
                <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(var(--muted))' }}>
                  <div className="h-full rounded-full transition-all" style={{
                    width: `${(event.registered / event.capacity) * 100}%`,
                    background: event.registered / event.capacity > 0.8 ? 'hsl(var(--warning, 45 93% 47%))' : 'hsl(var(--primary))',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calendar */}
      {activeTab === 'calendar' && (
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <button className="p-1 rounded hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-xs font-semibold">March 2026</span>
            <button className="p-1 rounded hover:bg-muted"><ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={i} className="text-[9px] font-medium opacity-40 py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {calendarDays.map((day, i) => (
              <div key={i} className={`aspect-square flex items-center justify-center text-[10px] rounded-md transition-colors cursor-pointer ${
                day ? 'hover:bg-muted/50' : ''
              } ${day === 8 ? 'font-bold' : ''}`}
                style={day && bookedDays.includes(day) ? { background: 'hsl(var(--primary) / 0.15)', color: 'hsl(var(--primary))', fontWeight: 600 } : undefined}>
                {day || ''}
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1">
            <div className="text-[10px] font-medium opacity-60 mb-1">March 8 — Today</div>
            {[
              { time: '10:00 AM', title: 'Strategy Session — John', duration: '60 min' },
              { time: '2:00 PM', title: 'Design Review — Sarah', duration: '45 min' },
            ].map((appt, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded text-[10px]" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                <span className="font-mono opacity-50 w-14">{appt.time}</span>
                <span className="flex-1 font-medium">{appt.title}</span>
                <span className="opacity-30">{appt.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Staff */}
      {activeTab === 'staff' && (
        <div className="p-3 space-y-2">
          {MOCK_STAFF.map(staff => (
            <div key={staff.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: 'hsl(var(--primary) / 0.1)' }}>{staff.avatar}</div>
              <div className="flex-1">
                <h3 className="text-xs font-semibold">{staff.name}</h3>
                <div className="text-[10px] opacity-50">{staff.role}</div>
                <div className="text-[10px] opacity-30"><Clock className="w-2.5 h-2.5 inline mr-0.5" />{staff.availability}</div>
              </div>
              <button className="p-1.5 rounded hover:bg-muted"><Edit3 className="w-3 h-3 opacity-40" /></button>
            </div>
          ))}
          <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
            <Plus className="w-3 h-3" /> Add Staff Member
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingPanel;
