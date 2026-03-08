import { useState } from 'react';
import {
  CalendarDays, Plus, X, Clock, Users, MapPin, Ticket, Star,
  ChevronLeft, ChevronRight, Edit3, Trash2, Gift, Video, Loader2,
} from 'lucide-react';
import { useServices, useCreateService, useDeleteService, useEvents, useCreateEvent, useDeleteEvent } from '@/hooks/useBookings';
import { toast } from 'sonner';

interface BookingPanelProps {
  projectId?: string | null;
  onClose?: () => void;
}

const BookingPanel = ({ projectId, onClose }: BookingPanelProps) => {
  const [activeTab, setActiveTab] = useState<'services' | 'events' | 'calendar' | 'staff'>('services');
  const [currentMonth] = useState(new Date(2026, 2));
  const [showNewService, setShowNewService] = useState(false);
  const [newService, setNewService] = useState({ name: '', duration: '30 min', price: '' });

  const { data: services = [], isLoading: servicesLoading } = useServices(projectId ?? null);
  const { data: events = [], isLoading: eventsLoading } = useEvents(projectId ?? null);
  const createService = useCreateService();
  const deleteService = useDeleteService();

  const tabs = [
    { id: 'services' as const, label: 'Services', icon: Clock },
    { id: 'events' as const, label: 'Events', icon: Ticket },
    { id: 'calendar' as const, label: 'Calendar', icon: CalendarDays },
    { id: 'staff' as const, label: 'Staff', icon: Users },
  ];

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const handleAddService = async () => {
    if (!newService.name.trim() || !projectId) return;
    try {
      await createService.mutateAsync({ projectId, name: newService.name, duration: newService.duration, price: parseFloat(newService.price) || 0 });
      setNewService({ name: '', duration: '30 min', price: '' });
      setShowNewService(false);
      toast.success('Service created!');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (!projectId) {
    return (
      <div className="builder-flyout overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
            <h2 className="text-sm font-semibold">Bookings & Events</h2>
          </div>
          {onClose && <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
        </div>
        <div className="p-6 text-center text-xs opacity-50">Save your project first to manage bookings.</div>
      </div>
    );
  }

  return (
    <div className="builder-flyout overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-sm font-semibold">Bookings & Events</h2>
        </div>
        {onClose && <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
      </div>

      <div className="grid grid-cols-3 gap-1 p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {[
          { label: 'Services', value: services.length.toString(), sub: 'active' },
          { label: 'Bookings', value: services.reduce((s, sv) => s + sv.bookings, 0).toString(), sub: 'total' },
          { label: 'Events', value: events.length.toString(), sub: 'upcoming' },
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
            {showNewService ? (
              <div className="space-y-2">
                <input autoFocus value={newService.name} onChange={e => setNewService({ ...newService, name: e.target.value })} placeholder="Service name..." className="property-input text-xs" />
                <div className="flex gap-1.5">
                  <select value={newService.duration} onChange={e => setNewService({ ...newService, duration: e.target.value })} className="property-input text-[10px] flex-1">
                    {['15 min', '30 min', '45 min', '60 min', '90 min', '120 min'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <input value={newService.price} onChange={e => setNewService({ ...newService, price: e.target.value })} placeholder="Price" className="property-input text-[10px] flex-1" type="number" />
                </div>
                <div className="flex gap-1.5">
                  <button onClick={handleAddService} disabled={createService.isPending} className="flex-1 py-1.5 rounded text-[10px] font-semibold" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                    {createService.isPending ? 'Adding...' : 'Add Service'}
                  </button>
                  <button onClick={() => setShowNewService(false)} className="px-3 py-1.5 rounded text-[10px] hover:bg-muted">Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowNewService(true)} className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
                <Plus className="w-3 h-3" /> Add Service
              </button>
            )}
          </div>
          {servicesLoading ? (
            <div className="p-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin opacity-50" /></div>
          ) : (
            <div className="space-y-1 p-2">
              {services.map(service => (
                <div key={service.id} className="p-3 rounded-lg hover:bg-muted/30 transition-colors group" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-semibold">{service.name}</h3>
                    <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 rounded hover:bg-muted"><Edit3 className="w-3 h-3" /></button>
                      <button onClick={() => deleteService.mutateAsync(service.id)} className="p-1 rounded hover:bg-muted hover:text-destructive"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] opacity-50">
                    <span><Clock className="w-2.5 h-2.5 inline mr-0.5" />{service.duration}</span>
                    <span className="font-medium" style={{ color: Number(service.price) > 0 ? 'hsl(var(--primary))' : 'hsl(var(--success))' }}>
                      {Number(service.price) > 0 ? `$${Number(service.price).toFixed(2)}` : 'Free'}
                    </span>
                    <span>{service.bookings} booked</span>
                  </div>
                </div>
              ))}
              {services.length === 0 && <div className="p-6 text-center text-xs opacity-40">No services yet</div>}
            </div>
          )}
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
          {eventsLoading ? (
            <div className="p-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin opacity-50" /></div>
          ) : events.length === 0 ? (
            <div className="p-6 text-center text-xs opacity-40">No events yet</div>
          ) : (
            <div className="space-y-1 p-2">
              {events.map(event => (
                <div key={event.id} className="p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <h3 className="text-xs font-semibold flex-1">{event.name}</h3>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{
                      background: event.type === 'online' ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--success) / 0.1)',
                      color: event.type === 'online' ? 'hsl(var(--primary))' : 'hsl(var(--success))',
                    }}>{event.type}</span>
                  </div>
                  <div className="space-y-0.5 text-[10px] opacity-50">
                    <div><CalendarDays className="w-2.5 h-2.5 inline mr-1" />{new Date(event.date).toLocaleDateString()} at {event.time}</div>
                    <div><MapPin className="w-2.5 h-2.5 inline mr-1" />{event.location}</div>
                    <div className="flex items-center justify-between">
                      <span><Users className="w-2.5 h-2.5 inline mr-1" />{event.registered}/{event.capacity}</span>
                      <span className="font-medium" style={{ color: Number(event.price) > 0 ? 'hsl(var(--primary))' : 'hsl(var(--success))' }}>
                        {Number(event.price) > 0 ? `$${Number(event.price)}` : 'Free'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(var(--muted))' }}>
                    <div className="h-full rounded-full" style={{ width: `${(event.registered / event.capacity) * 100}%`, background: event.registered / event.capacity > 0.8 ? 'hsl(var(--warning, 45 93% 47%))' : 'hsl(var(--primary))' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
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
              <div key={i} className={`aspect-square flex items-center justify-center text-[10px] rounded-md transition-colors cursor-pointer ${day ? 'hover:bg-muted/50' : ''}`}>
                {day || ''}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Staff */}
      {activeTab === 'staff' && (
        <div className="p-3 space-y-2">
          <div className="p-6 text-center text-xs opacity-40">No staff members yet</div>
          <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
            <Plus className="w-3 h-3" /> Add Staff Member
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingPanel;
