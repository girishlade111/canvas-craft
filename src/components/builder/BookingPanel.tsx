import { useState, useMemo } from 'react';
import {
  CalendarDays, Plus, X, Clock, Users, MapPin, Ticket, Star,
  ChevronLeft, ChevronRight, Edit3, Trash2, Gift, Video, Loader2,
  Search, Layers, Zap, ChevronDown, Settings, Eye,
  Phone, Mail, Globe, CreditCard, Tag, Award, Heart,
  MessageSquare, Shield, BookOpen, FileText, Target, BarChart3,
  Sparkles, ArrowRight, Copy, Info, CheckCircle2, AlertCircle,
  PanelTop, Smartphone, Monitor, Image, Type, AlignLeft,
  UserPlus, Bell, DollarSign, Percent, Hash,
} from 'lucide-react';
import { useServices, useCreateService, useDeleteService, useEvents, useCreateEvent, useDeleteEvent } from '@/hooks/useBookings';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useBuilderStore } from '@/store/builderStore';

// ─── Booking Components Library ────────────────────────────

const BOOKING_COMPONENTS: Record<string, { icon: any; items: { id: string; name: string; icon: any; description: string; preview: string }[] }> = {
  'Booking Widgets': {
    icon: CalendarDays,
    items: [
      { id: 'booking-calendar', name: 'Booking Calendar', icon: CalendarDays, description: 'Interactive date/time picker', preview: '📅' },
      { id: 'booking-form', name: 'Booking Form', icon: FileText, description: 'Full appointment form', preview: '📝' },
      { id: 'time-slot-picker', name: 'Time Slot Picker', icon: Clock, description: 'Available time slots grid', preview: '⏰' },
      { id: 'booking-widget', name: 'Compact Booking Widget', icon: Zap, description: 'Embeddable mini scheduler', preview: '⚡' },
      { id: 'booking-cta', name: 'Book Now Button', icon: Target, description: 'CTA with booking link', preview: '🎯' },
      { id: 'inline-scheduler', name: 'Inline Scheduler', icon: CalendarDays, description: 'In-page booking flow', preview: '📆' },
    ],
  },
  'Service Display': {
    icon: Tag,
    items: [
      { id: 'service-card', name: 'Service Card', icon: Tag, description: 'Single service with details', preview: '💳' },
      { id: 'service-grid', name: 'Service Grid', icon: Layers, description: 'Multi-service grid layout', preview: '🏗️' },
      { id: 'service-list', name: 'Service List', icon: AlignLeft, description: 'Vertical service listing', preview: '📋' },
      { id: 'pricing-menu', name: 'Service Menu', icon: DollarSign, description: 'Restaurant/spa style menu', preview: '🍽️' },
      { id: 'service-comparison', name: 'Service Comparison', icon: BarChart3, description: 'Compare service tiers', preview: '⚖️' },
      { id: 'featured-service', name: 'Featured Service', icon: Star, description: 'Highlighted service banner', preview: '🌟' },
      { id: 'service-categories', name: 'Service Categories', icon: Layers, description: 'Tabbed category filter', preview: '📂' },
    ],
  },
  'Staff & Team': {
    icon: Users,
    items: [
      { id: 'staff-grid', name: 'Staff Grid', icon: Users, description: 'Team member cards', preview: '👥' },
      { id: 'staff-profile', name: 'Staff Profile', icon: UserPlus, description: 'Individual bio card', preview: '👤' },
      { id: 'staff-picker', name: 'Staff Selector', icon: Users, description: 'Choose your provider', preview: '🔍' },
      { id: 'staff-availability', name: 'Staff Availability', icon: Clock, description: 'Real-time availability', preview: '🟢' },
      { id: 'staff-reviews', name: 'Staff Reviews', icon: Star, description: 'Provider ratings & reviews', preview: '⭐' },
    ],
  },
  'Events': {
    icon: Ticket,
    items: [
      { id: 'event-card', name: 'Event Card', icon: Ticket, description: 'Single event details', preview: '🎫' },
      { id: 'event-list', name: 'Event List', icon: AlignLeft, description: 'Upcoming events timeline', preview: '📋' },
      { id: 'event-calendar', name: 'Event Calendar', icon: CalendarDays, description: 'Monthly event view', preview: '📅' },
      { id: 'event-registration', name: 'Event Registration', icon: FileText, description: 'RSVP / signup form', preview: '📝' },
      { id: 'event-countdown', name: 'Event Countdown', icon: Clock, description: 'Days until event timer', preview: '⏳' },
      { id: 'event-hero', name: 'Event Hero Banner', icon: Image, description: 'Full-width event header', preview: '🎉' },
      { id: 'ticket-selector', name: 'Ticket Selector', icon: Ticket, description: 'Choose ticket type/qty', preview: '🎟️' },
      { id: 'event-speakers', name: 'Speaker Lineup', icon: Users, description: 'Speaker/performer cards', preview: '🎤' },
      { id: 'event-schedule', name: 'Event Schedule', icon: Clock, description: 'Day-of agenda/timetable', preview: '📊' },
      { id: 'event-venue', name: 'Venue Map', icon: MapPin, description: 'Location with map', preview: '📍' },
    ],
  },
  'Confirmation & Status': {
    icon: CheckCircle2,
    items: [
      { id: 'booking-confirmation', name: 'Booking Confirmation', icon: CheckCircle2, description: 'Success page with details', preview: '✅' },
      { id: 'booking-summary', name: 'Booking Summary', icon: FileText, description: 'Order recap before payment', preview: '📄' },
      { id: 'booking-status', name: 'Status Tracker', icon: BarChart3, description: 'Booking progress steps', preview: '📊' },
      { id: 'cancellation-form', name: 'Cancellation Form', icon: X, description: 'Cancel/reschedule flow', preview: '❌' },
      { id: 'waitlist-signup', name: 'Waitlist Signup', icon: Clock, description: 'Join waitlist form', preview: '⏳' },
    ],
  },
  'Reviews & Social Proof': {
    icon: Star,
    items: [
      { id: 'review-card', name: 'Review Card', icon: MessageSquare, description: 'Customer review display', preview: '💬' },
      { id: 'review-grid', name: 'Review Grid', icon: Layers, description: 'Multiple reviews layout', preview: '🌟' },
      { id: 'rating-summary', name: 'Rating Summary', icon: Star, description: 'Average rating + breakdown', preview: '⭐' },
      { id: 'review-form', name: 'Write a Review', icon: Edit3, description: 'Post-booking review form', preview: '✍️' },
      { id: 'testimonial-video', name: 'Video Testimonial', icon: Video, description: 'Customer video review', preview: '🎬' },
      { id: 'booking-count', name: 'Booking Counter', icon: BarChart3, description: '"500+ bookings" display', preview: '📈' },
    ],
  },
  'Payments & Checkout': {
    icon: CreditCard,
    items: [
      { id: 'payment-form', name: 'Payment Form', icon: CreditCard, description: 'Checkout with card input', preview: '💳' },
      { id: 'deposit-widget', name: 'Deposit Widget', icon: DollarSign, description: 'Partial payment option', preview: '💰' },
      { id: 'gift-card', name: 'Gift Card', icon: Gift, description: 'Gift certificate purchase', preview: '🎁' },
      { id: 'package-deal', name: 'Package Deal', icon: Sparkles, description: 'Bundle pricing display', preview: '✨' },
      { id: 'membership-card', name: 'Membership Plans', icon: Award, description: 'Subscription tiers', preview: '🏅' },
      { id: 'coupon-input', name: 'Coupon Code Input', icon: Percent, description: 'Discount code field', preview: '🏷️' },
    ],
  },
  'Notifications & Reminders': {
    icon: Bell,
    items: [
      { id: 'reminder-banner', name: 'Reminder Banner', icon: Bell, description: 'Upcoming appointment alert', preview: '🔔' },
      { id: 'sms-optin', name: 'SMS Opt-in', icon: Smartphone, description: 'Text reminder signup', preview: '📱' },
      { id: 'email-confirmation', name: 'Email Confirmation', icon: Mail, description: 'Booking email preview', preview: '📧' },
      { id: 'calendar-sync', name: 'Add to Calendar', icon: CalendarDays, description: 'Google/Outlook/iCal sync', preview: '🔗' },
    ],
  },
};

// ─── Booking Templates ─────────────────────────────────────

const BOOKING_TEMPLATES = [
  {
    id: 'salon-booking', name: 'Salon / Spa', icon: '💇', category: 'Beauty',
    description: 'Service menu + staff picker + time slots',
    components: ['service-grid', 'staff-picker', 'time-slot-picker', 'booking-form', 'payment-form'],
  },
  {
    id: 'medical-booking', name: 'Medical / Dental', icon: '🏥', category: 'Health',
    description: 'Doctor selection + appointment scheduler',
    components: ['staff-grid', 'booking-calendar', 'booking-form', 'booking-confirmation', 'reminder-banner'],
  },
  {
    id: 'restaurant-booking', name: 'Restaurant Reservation', icon: '🍽️', category: 'Food',
    description: 'Date/time/party size + table selection',
    components: ['booking-widget', 'time-slot-picker', 'booking-form', 'booking-confirmation'],
  },
  {
    id: 'fitness-booking', name: 'Fitness / Gym', icon: '💪', category: 'Fitness',
    description: 'Class schedule + membership + trainer booking',
    components: ['event-schedule', 'membership-card', 'staff-grid', 'booking-calendar', 'review-grid'],
  },
  {
    id: 'consulting-booking', name: 'Consulting / Coaching', icon: '💼', category: 'Professional',
    description: 'Session types + calendar + video call booking',
    components: ['service-list', 'booking-calendar', 'booking-form', 'payment-form', 'calendar-sync'],
  },
  {
    id: 'event-page', name: 'Event Landing Page', icon: '🎉', category: 'Events',
    description: 'Hero + schedule + speakers + tickets',
    components: ['event-hero', 'event-schedule', 'event-speakers', 'ticket-selector', 'event-venue'],
  },
  {
    id: 'workshop-booking', name: 'Workshop / Class', icon: '🎓', category: 'Education',
    description: 'Class listing + registration + payment',
    components: ['event-list', 'event-registration', 'payment-form', 'review-grid', 'calendar-sync'],
  },
  {
    id: 'venue-rental', name: 'Venue / Space Rental', icon: '🏠', category: 'Rental',
    description: 'Venue gallery + availability + booking form',
    components: ['featured-service', 'booking-calendar', 'package-deal', 'booking-form', 'deposit-widget'],
  },
  {
    id: 'pet-grooming', name: 'Pet Services', icon: '🐾', category: 'Pets',
    description: 'Pet service menu + groomer picker + schedule',
    components: ['service-categories', 'staff-picker', 'time-slot-picker', 'booking-form', 'review-grid'],
  },
  {
    id: 'tour-booking', name: 'Tours & Activities', icon: '🗺️', category: 'Travel',
    description: 'Activity cards + date picker + group booking',
    components: ['service-grid', 'event-card', 'ticket-selector', 'booking-form', 'gift-card'],
  },
  {
    id: 'photography', name: 'Photography Session', icon: '📸', category: 'Creative',
    description: 'Package selection + date + deposit',
    components: ['service-comparison', 'booking-calendar', 'deposit-widget', 'booking-form', 'testimonial-video'],
  },
  {
    id: 'music-lessons', name: 'Music / Tutoring', icon: '🎵', category: 'Education',
    description: 'Instructor profiles + recurring sessions',
    components: ['staff-grid', 'service-list', 'booking-calendar', 'membership-card', 'staff-reviews'],
  },
];

// ─── Section Component ─────────────────────────────────────

const Section = ({ title, icon: Icon, children, defaultOpen = false, badge }: { title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean; badge?: string | number }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-b border-border/30">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium">{title}</span>
          {badge !== undefined && <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{badge}</Badge>}
        </div>
        <ChevronRight className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

// ─── Main Component ────────────────────────────────────────

interface BookingPanelProps {
  projectId?: string | null;
  onClose?: () => void;
}

const BookingPanel = ({ projectId, onClose }: BookingPanelProps) => {
  const { schema, addComponent } = useBuilderStore();
  const [activeTab, setActiveTab] = useState<'components' | 'templates' | 'manage'>('components');
  const [manageTab, setManageTab] = useState<'services' | 'events' | 'calendar' | 'staff'>('services');
  const [currentMonth] = useState(new Date(2026, 2));
  const [showNewService, setShowNewService] = useState(false);
  const [newService, setNewService] = useState({ name: '', duration: '30 min', price: '', category: 'General' });
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', time: '', location: '', type: 'in-person', capacity: '50', price: '' });
  const [showNewStaff, setShowNewStaff] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', role: '', email: '' });
  const [componentSearch, setComponentSearch] = useState('');
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateFilter, setTemplateFilter] = useState('all');

  const { data: services = [], isLoading: servicesLoading } = useServices(projectId ?? null);
  const { data: events = [], isLoading: eventsLoading } = useEvents(projectId ?? null);
  const createService = useCreateService();
  const deleteService = useDeleteService();
  const createEvent = useCreateEvent();
  const deleteEvent = useDeleteEvent();

  const totalComponents = Object.values(BOOKING_COMPONENTS).reduce((sum, c) => sum + c.items.length, 0);
  const templateCategories = useMemo(() => ['all', ...new Set(BOOKING_TEMPLATES.map(t => t.category))], []);

  const filteredTemplates = useMemo(() =>
    BOOKING_TEMPLATES.filter(t => {
      const matchSearch = !templateSearch || t.name.toLowerCase().includes(templateSearch.toLowerCase()) || t.description.toLowerCase().includes(templateSearch.toLowerCase());
      const matchCat = templateFilter === 'all' || t.category === templateFilter;
      return matchSearch && matchCat;
    }),
  [templateSearch, templateFilter]);

  const filteredComponents = useMemo(() => {
    if (!componentSearch) return BOOKING_COMPONENTS;
    const result: typeof BOOKING_COMPONENTS = {};
    Object.entries(BOOKING_COMPONENTS).forEach(([cat, data]) => {
      const matching = data.items.filter(i =>
        i.name.toLowerCase().includes(componentSearch.toLowerCase()) ||
        i.description.toLowerCase().includes(componentSearch.toLowerCase())
      );
      if (matching.length) result[cat] = { ...data, items: matching };
    });
    return result;
  }, [componentSearch]);

  // Calendar
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  // ─── Handlers ──────────────────

  const handleAddComponent = (component: typeof BOOKING_COMPONENTS[string]['items'][0]) => {
    const bodySection = schema.sections.find(s => s.type === 'body');
    if (bodySection) {
      addComponent(bodySection.id, {
        id: `${component.id}-${Date.now()}`,
        type: component.id,
        category: 'booking',
        label: component.name,
        content: '',
        props: {},
        children: [],
        styles: { padding: '24px' },
      });
      toast.success(`Added "${component.name}" to page`);
    }
  };

  const handleApplyTemplate = (template: typeof BOOKING_TEMPLATES[0]) => {
    const bodySection = schema.sections.find(s => s.type === 'body');
    if (bodySection) {
      const allItems = Object.values(BOOKING_COMPONENTS).flatMap(c => c.items);
      template.components.forEach((compId, idx) => {
        const comp = allItems.find(i => i.id === compId);
        if (comp) {
          addComponent(bodySection.id, {
            id: `${compId}-${Date.now()}-${idx}`,
            type: compId,
            category: 'booking',
            label: comp.name,
            content: '',
            props: {},
            children: [],
            styles: { padding: '24px' },
          });
        }
      });
      toast.success(`Applied "${template.name}" (${template.components.length} components)`);
    }
  };

  const handleAddService = async () => {
    if (!newService.name.trim() || !projectId) return;
    try {
      await createService.mutateAsync({ projectId, name: newService.name, duration: newService.duration, price: parseFloat(newService.price) || 0 });
      setNewService({ name: '', duration: '30 min', price: '', category: 'General' });
      setShowNewService(false);
      toast.success('Service created!');
    } catch (err: any) { toast.error(err.message); }
  };

  const handleAddEvent = async () => {
    if (!newEvent.name.trim() || !projectId) return;
    try {
      await createEvent.mutateAsync({
        projectId, name: newEvent.name, date: newEvent.date || new Date().toISOString().split('T')[0],
        time: newEvent.time || '10:00', location: newEvent.location || 'TBD',
        type: newEvent.type, capacity: parseInt(newEvent.capacity) || 50, price: parseFloat(newEvent.price) || 0,
      });
      setNewEvent({ name: '', date: '', time: '', location: '', type: 'in-person', capacity: '50', price: '' });
      setShowNewEvent(false);
      toast.success('Event created!');
    } catch (err: any) { toast.error(err.message); }
  };

  return (
    <div className="builder-flyout flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <CalendarDays className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Bookings & Events</h2>
            <p className="text-[10px] text-muted-foreground">{totalComponents} components • {BOOKING_TEMPLATES.length} templates</p>
          </div>
        </div>
        {onClose && <button onClick={onClose} className="p-1.5 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-1.5 p-3 border-b border-border shrink-0">
        {[
          { label: 'Services', value: services.length.toString(), icon: Tag },
          { label: 'Bookings', value: services.reduce((s, sv) => s + sv.bookings, 0).toString(), icon: CalendarDays },
          { label: 'Events', value: events.length.toString(), icon: Ticket },
        ].map(s => (
          <div key={s.label} className="p-2 rounded-lg bg-muted/30 text-center">
            <s.icon className="w-3.5 h-3.5 mx-auto mb-1 text-primary" />
            <div className="text-sm font-bold">{s.value}</div>
            <div className="text-[9px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border shrink-0">
        {[
          { id: 'components' as const, label: 'Elements', icon: Zap },
          { id: 'templates' as const, label: 'Templates', icon: Layers },
          { id: 'manage' as const, label: 'Manage', icon: Settings },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
              activeTab === id ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground'
            }`}
          >
            <Icon className="w-3 h-3" /> {label}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        {/* ════════════════════════════════════════════════════ */}
        {/* COMPONENTS TAB */}
        {/* ════════════════════════════════════════════════════ */}
        {activeTab === 'components' && (
          <div className="divide-y divide-border/30">
            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={componentSearch}
                  onChange={e => setComponentSearch(e.target.value)}
                  placeholder="Search booking elements..."
                  className="w-full bg-muted/30 border-0 rounded-lg pl-8 pr-3 py-2 text-xs placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {Object.entries(filteredComponents).map(([category, data]) => (
              <Section key={category} title={category} icon={data.icon} badge={data.items.length} defaultOpen={category === 'Booking Widgets'}>
                <div className="space-y-1.5">
                  {data.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleAddComponent(item)}
                      className="w-full p-2.5 rounded-lg text-left transition-all hover:scale-[1.02] border border-border/50 hover:border-primary/50 hover:bg-primary/5 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-base shrink-0">
                          {item.preview}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-medium truncate group-hover:text-primary transition-colors">{item.name}</div>
                          <div className="text-[9px] text-muted-foreground truncate">{item.description}</div>
                        </div>
                        <Plus className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
                      </div>
                    </button>
                  ))}
                </div>
              </Section>
            ))}

            {Object.keys(filteredComponents).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-xs">No components match your search</p>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════ */}
        {/* TEMPLATES TAB */}
        {/* ════════════════════════════════════════════════════ */}
        {activeTab === 'templates' && (
          <div className="divide-y divide-border/30">
            <div className="p-3">
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={templateSearch}
                  onChange={e => setTemplateSearch(e.target.value)}
                  placeholder="Search booking templates..."
                  className="w-full bg-muted/30 border-0 rounded-lg pl-8 pr-3 py-2 text-xs placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {templateCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setTemplateFilter(cat)}
                    className={`px-2.5 py-1 rounded-full text-[9px] font-medium capitalize transition-colors ${
                      templateFilter === cat ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 space-y-2">
              {filteredTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => handleApplyTemplate(template)}
                  className="w-full p-3 rounded-lg text-left border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl shrink-0">
                      {template.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium group-hover:text-primary transition-colors">{template.name}</span>
                        <Badge variant="secondary" className="text-[8px]">{template.category}</Badge>
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{template.description}</div>
                      <div className="text-[9px] text-muted-foreground/60 mt-0.5">{template.components.length} components</div>
                    </div>
                    <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 text-primary shrink-0" />
                  </div>
                </button>
              ))}
              {filteredTemplates.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">No templates match your search</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════ */}
        {/* MANAGE TAB */}
        {/* ════════════════════════════════════════════════════ */}
        {activeTab === 'manage' && (
          <div>
            {/* Sub-tabs */}
            <div className="flex border-b border-border">
              {[
                { id: 'services' as const, label: 'Services', icon: Tag },
                { id: 'events' as const, label: 'Events', icon: Ticket },
                { id: 'calendar' as const, label: 'Calendar', icon: CalendarDays },
                { id: 'staff' as const, label: 'Staff', icon: Users },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setManageTab(id)}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors ${
                    manageTab === id ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  <Icon className="w-3 h-3" /> {label}
                </button>
              ))}
            </div>

            {/* Services */}
            {manageTab === 'services' && (
              <div className="p-3 space-y-2">
                {!projectId ? (
                  <div className="p-4 rounded-lg bg-muted/30 text-center">
                    <Info className="w-5 h-5 mx-auto mb-1.5 text-muted-foreground" />
                    <p className="text-[10px] text-muted-foreground">Save project first to manage services</p>
                  </div>
                ) : showNewService ? (
                  <div className="space-y-2 p-3 rounded-lg border border-border">
                    <input autoFocus value={newService.name} onChange={e => setNewService({ ...newService, name: e.target.value })} placeholder="Service name..." className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" />
                    <div className="grid grid-cols-2 gap-2">
                      <select value={newService.duration} onChange={e => setNewService({ ...newService, duration: e.target.value })} className="bg-muted/30 border-0 rounded-md px-3 py-2 text-xs">
                        {['15 min', '30 min', '45 min', '60 min', '90 min', '120 min', 'Half day', 'Full day'].map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <input value={newService.price} onChange={e => setNewService({ ...newService, price: e.target.value })} placeholder="Price ($)" className="bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" type="number" />
                    </div>
                    <select value={newService.category} onChange={e => setNewService({ ...newService, category: e.target.value })} className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs">
                      {['General', 'Consultation', 'Treatment', 'Class', 'Workshop', 'Tour', 'Rental'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div className="flex gap-1.5">
                      <button onClick={handleAddService} disabled={createService.isPending} className="flex-1 py-2 rounded-md text-xs font-medium bg-primary text-primary-foreground">
                        {createService.isPending ? 'Adding...' : 'Add Service'}
                      </button>
                      <button onClick={() => setShowNewService(false)} className="px-4 py-2 rounded-md text-xs hover:bg-muted">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowNewService(true)} className="w-full py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2 border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Add Service
                  </button>
                )}

                {servicesLoading ? (
                  <div className="py-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
                ) : services.length === 0 ? (
                  <div className="text-center py-6">
                    <Tag className="w-8 h-8 mx-auto mb-2 text-muted-foreground/30" />
                    <p className="text-xs text-muted-foreground">No services yet</p>
                  </div>
                ) : (
                  services.map(service => (
                    <div key={service.id} className="p-3 rounded-lg border border-border/50 hover:border-border transition-colors group">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">{service.name}</span>
                        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 rounded hover:bg-muted"><Edit3 className="w-3 h-3" /></button>
                          <button onClick={() => deleteService.mutateAsync(service.id)} className="p-1 rounded hover:bg-destructive/10"><Trash2 className="w-3 h-3 text-destructive" /></button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{service.duration}</span>
                        <span className="font-medium text-primary">{Number(service.price) > 0 ? `$${Number(service.price).toFixed(2)}` : 'Free'}</span>
                        <span>{service.bookings} booked</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Events */}
            {manageTab === 'events' && (
              <div className="p-3 space-y-2">
                {!projectId ? (
                  <div className="p-4 rounded-lg bg-muted/30 text-center">
                    <Info className="w-5 h-5 mx-auto mb-1.5 text-muted-foreground" />
                    <p className="text-[10px] text-muted-foreground">Save project first to manage events</p>
                  </div>
                ) : showNewEvent ? (
                  <div className="space-y-2 p-3 rounded-lg border border-border">
                    <input autoFocus value={newEvent.name} onChange={e => setNewEvent({ ...newEvent, name: e.target.value })} placeholder="Event name..." className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} className="bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" />
                      <input type="time" value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} className="bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" />
                    </div>
                    <input value={newEvent.location} onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} placeholder="Location" className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" />
                    <div className="grid grid-cols-3 gap-2">
                      <select value={newEvent.type} onChange={e => setNewEvent({ ...newEvent, type: e.target.value })} className="bg-muted/30 border-0 rounded-md px-3 py-2 text-xs">
                        <option value="in-person">In-person</option>
                        <option value="online">Online</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                      <input value={newEvent.capacity} onChange={e => setNewEvent({ ...newEvent, capacity: e.target.value })} placeholder="Capacity" type="number" className="bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" />
                      <input value={newEvent.price} onChange={e => setNewEvent({ ...newEvent, price: e.target.value })} placeholder="Price" type="number" className="bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" />
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={handleAddEvent} disabled={createEvent.isPending} className="flex-1 py-2 rounded-md text-xs font-medium bg-primary text-primary-foreground">
                        {createEvent.isPending ? 'Creating...' : 'Create Event'}
                      </button>
                      <button onClick={() => setShowNewEvent(false)} className="px-4 py-2 rounded-md text-xs hover:bg-muted">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowNewEvent(true)} className="w-full py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2 border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Create Event
                  </button>
                )}

                {eventsLoading ? (
                  <div className="py-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
                ) : events.length === 0 ? (
                  <div className="text-center py-6">
                    <Ticket className="w-8 h-8 mx-auto mb-2 text-muted-foreground/30" />
                    <p className="text-xs text-muted-foreground">No events yet</p>
                  </div>
                ) : (
                  events.map(event => (
                    <div key={event.id} className="p-3 rounded-lg border border-border/50 hover:border-border transition-colors group">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">{event.name}</span>
                        <div className="flex items-center gap-1.5">
                          <Badge variant={event.type === 'online' ? 'default' : 'secondary'} className="text-[8px] capitalize">{event.type}</Badge>
                          <button onClick={() => deleteEvent.mutateAsync(event.id)} className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-destructive/10 transition-all"><Trash2 className="w-3 h-3 text-destructive" /></button>
                        </div>
                      </div>
                      <div className="space-y-0.5 text-[10px] text-muted-foreground">
                        <div className="flex items-center gap-1"><CalendarDays className="w-2.5 h-2.5" />{new Date(event.date).toLocaleDateString()} at {event.time}</div>
                        <div className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{event.location}</div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1"><Users className="w-2.5 h-2.5" />{event.registered}/{event.capacity}</span>
                          <span className="font-medium text-primary">{Number(event.price) > 0 ? `$${Number(event.price)}` : 'Free'}</span>
                        </div>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full overflow-hidden bg-muted">
                        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min((event.registered / event.capacity) * 100, 100)}%` }} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Calendar */}
            {manageTab === 'calendar' && (
              <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <button className="p-1 rounded hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
                  <span className="text-xs font-semibold">March 2026</span>
                  <button className="p-1 rounded hover:bg-muted"><ChevronRight className="w-4 h-4" /></button>
                </div>
                <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={i} className="text-[9px] font-medium text-muted-foreground py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-0.5">
                  {calendarDays.map((day, i) => (
                    <div key={i} className={`aspect-square flex items-center justify-center text-[10px] rounded-md transition-colors cursor-pointer ${
                      day ? 'hover:bg-primary/10 hover:text-primary' : ''
                    } ${day === 8 ? 'bg-primary text-primary-foreground font-bold' : ''}`}>
                      {day || ''}
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  <label className="text-[11px] font-medium block">Today's Schedule</label>
                  <div className="p-3 rounded-lg bg-muted/30 text-center">
                    <p className="text-[10px] text-muted-foreground">No bookings for today</p>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-muted/30">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div className="text-[10px] text-muted-foreground">
                      Calendar shows scheduled bookings and events. Click a date to view or create appointments.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Staff */}
            {manageTab === 'staff' && (
              <div className="p-3 space-y-2">
                {!projectId ? (
                  <div className="p-4 rounded-lg bg-muted/30 text-center">
                    <Info className="w-5 h-5 mx-auto mb-1.5 text-muted-foreground" />
                    <p className="text-[10px] text-muted-foreground">Save project first to manage staff</p>
                  </div>
                ) : showNewStaff ? (
                  <div className="space-y-2 p-3 rounded-lg border border-border">
                    <input autoFocus value={newStaff.name} onChange={e => setNewStaff({ ...newStaff, name: e.target.value })} placeholder="Staff name..." className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" />
                    <input value={newStaff.role} onChange={e => setNewStaff({ ...newStaff, role: e.target.value })} placeholder="Role / Title" className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" />
                    <input type="email" value={newStaff.email} onChange={e => setNewStaff({ ...newStaff, email: e.target.value })} placeholder="Email" className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs" />
                    <div className="flex gap-1.5">
                      <button onClick={() => { setShowNewStaff(false); toast.success('Staff member added'); }} className="flex-1 py-2 rounded-md text-xs font-medium bg-primary text-primary-foreground">
                        Add Staff
                      </button>
                      <button onClick={() => setShowNewStaff(false)} className="px-4 py-2 rounded-md text-xs hover:bg-muted">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowNewStaff(true)} className="w-full py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2 border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Add Staff Member
                  </button>
                )}

                <div className="text-center py-6">
                  <Users className="w-8 h-8 mx-auto mb-2 text-muted-foreground/30" />
                  <p className="text-xs text-muted-foreground">No staff members yet</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1">Add team members to enable staff-based booking</p>
                </div>

                {/* Working Hours */}
                <div className="mt-4">
                  <label className="text-[11px] font-medium mb-2 block">Default Working Hours</label>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                    <div key={day} className="flex items-center justify-between py-1.5 border-b border-border/20">
                      <span className="text-[10px]">{day}</span>
                      <span className="text-[10px] text-muted-foreground">9:00 AM - 5:00 PM</span>
                    </div>
                  ))}
                  {['Saturday', 'Sunday'].map(day => (
                    <div key={day} className="flex items-center justify-between py-1.5 border-b border-border/20">
                      <span className="text-[10px]">{day}</span>
                      <span className="text-[10px] text-muted-foreground/50">Closed</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default BookingPanel;
