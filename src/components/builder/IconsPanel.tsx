/**
 * Icons Panel - Browse and insert icons from various icon libraries
 */

import { useState, useMemo, lazy, Suspense } from 'react';
import { useDraggable } from '@dnd-kit/core';
import {
  X, Search, Grid3x3, List, ChevronDown, Copy, Check, Loader2,
  // Lucide sample icons for different categories
  Home, User, Settings, Mail, Phone, MapPin, Calendar, Clock, Heart,
  Star, Bell, Camera, Image, Video, Music, File, Folder, Download,
  Upload, Share, Link, ExternalLink, Eye, EyeOff, Lock, Unlock,
  Key, Shield, CheckCircle, XCircle, AlertCircle, Info, HelpCircle,
  MessageCircle, MessageSquare, Send, Inbox, Archive, Trash2, Edit,
  Pencil, PenTool, Brush, Palette, Layers, Grid2x2, LayoutGrid,
  LayoutList, LayoutDashboard, Menu, MoreHorizontal, MoreVertical,
  ChevronLeft, ChevronRight, ChevronUp, ArrowLeft, ArrowRight,
  ArrowUp, ArrowDown, RefreshCw, RotateCw, Maximize2, Minimize2,
  ZoomIn, ZoomOut, Search as SearchIcon, Filter, SlidersHorizontal,
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Wifi, WifiOff, Bluetooth, Battery, BatteryCharging, Cpu, Monitor,
  Smartphone, Tablet, Laptop, Tv, Watch, Headphones, Speaker,
  Mic, MicOff, Sun, Moon, Cloud, CloudRain, Umbrella, Thermometer,
  Zap, Flame, Droplet, Wind, Mountain, TreePine, Flower2,
  Bug, Code, Terminal, Database, Server, Globe, Rss, Hash, AtSign,
  DollarSign, CreditCard, ShoppingCart, ShoppingBag, Package, Gift,
  Truck, Car, Plane, Train, Ship, Bike, Footprints, Flag,
  Bookmark, Tag, Tags, Award, Trophy, Medal, Crown, Gem, Diamond,
  Sparkles, PartyPopper, Rocket, Target, Crosshair, Compass,
  Navigation, Map, Building, Building2, Factory, Store, Hospital,
  School, GraduationCap, BookOpen, Library, Newspaper, FileText,
  ClipboardList, Briefcase, Lightbulb, Puzzle, Gamepad2, Dice1,
  Coffee, Pizza, Utensils, Wine, Beer, Cake, Apple, Banana,
  Carrot, Leaf, Sprout, Skull, Ghost, Bot, Smile, Frown, Meh,
  Angry, Laugh, ThumbsUp, ThumbsDown, Hand, Handshake, Users,
  UserPlus, UserMinus, UserCheck, UserX, Baby, Accessibility,
  Activity, Anchor, Aperture, Box, Boxes, Braces, BrainCircuit,
  Cable, Calculator, CalendarCheck, CalendarDays, CircleDot,
  Clapperboard, Clipboard, CloudCog, Codesandbox, Cog, Coins,
  Command, Contrast, Cookie, CopyCheck, CornerDownLeft,
  CornerDownRight, CornerLeftDown, CornerLeftUp, CornerRightDown,
  CornerRightUp, CornerUpLeft, CornerUpRight, Crop, Crown as CrownIcon,
  Disc, Divide, DoorClosed, DoorOpen, Dribbble, Droplets,
  Ear, EarOff, Egg, Equal, Eraser, Euro, Expand, Facebook,
  FastForward, Feather, Figma, FileBadge, FileBarChart, FileCheck,
  FileCode, FileCog, FileDiff, FileDigit, FileHeart, FileImage,
  FileInput, FileJson, FileKey, FileLock, FileMinus, FileMusic,
  FileOutput, FilePlus, FileQuestion, FileScan, FileSearch, FileSpreadsheet,
  FileStar, FileTerminal, FileType, FileVideo, FileVolume, FileWarning,
  FileX, Files, Film, Fingerprint, Fish, FlagOff, FlameKindling,
  Flashlight, FlaskConical, FlaskRound, FlipHorizontal, FlipVertical,
  Focus, FolderArchive, FolderCheck, FolderClock, FolderClosed,
  FolderCog, FolderDot, FolderDown, FolderEdit, FolderGit, FolderGit2,
  FolderHeart, FolderInput, FolderKanban, FolderKey, FolderLock,
  FolderMinus, FolderOpen, FolderOutput, FolderPlus, FolderRoot,
  FolderSearch, FolderSymlink, FolderSync, FolderTree, FolderUp,
  FolderX, Folders, Footprints as FootprintsIcon, Forklift, FormInput,
  Forward, Frame, Framer, Frown as FrownIcon, Fuel, Fullscreen,
  FunctionSquare, Gauge, Gavel, Github, Gitlab, GlassWater, Glasses,
  GlobeLock, Grab, GraduationCap as GradCapIcon, Grape, Grip, GripHorizontal,
  GripVertical, Group, Hammer, HandMetal, HardDrive, HardHat,
  Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6,
  Headset, HeartCrack, HeartHandshake, HeartOff, HeartPulse, HelpingHand,
  Hexagon, Highlighter, History, HopOff, Hop, Hourglass, IceCream,
  ImageDown, ImageMinus, ImageOff, ImagePlus, Import, Indent,
  IndianRupee, Infinity, InspectionPanel, Instagram, Italic, IterationCcw,
  IterationCw, JapaneseYen, Joystick, Kanban, KeyRound, KeySquare,
  Lamp, LampCeiling, LampDesk, LampFloor, LampWallDown, LampWallUp,
  LandPlot, Languages, LaptopMinimal, Lasso, LassoSelect, Laugh as LaughIcon,
  Layers2, Layers3, LayoutPanelLeft, LayoutPanelTop, LayoutTemplate,
} from 'lucide-react';
import { toast } from 'sonner';

// Icon categories with sample icons
const ICON_CATEGORIES = {
  'Interface': [
    { name: 'Home', icon: Home },
    { name: 'Settings', icon: Settings },
    { name: 'Menu', icon: Menu },
    { name: 'Search', icon: SearchIcon },
    { name: 'Filter', icon: Filter },
    { name: 'Grid', icon: Grid2x2 },
    { name: 'List', icon: LayoutList },
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Eye', icon: Eye },
    { name: 'EyeOff', icon: EyeOff },
    { name: 'Lock', icon: Lock },
    { name: 'Unlock', icon: Unlock },
    { name: 'Key', icon: Key },
    { name: 'Shield', icon: Shield },
    { name: 'Layers', icon: Layers },
    { name: 'MoreHorizontal', icon: MoreHorizontal },
    { name: 'MoreVertical', icon: MoreVertical },
    { name: 'Sliders', icon: SlidersHorizontal },
    { name: 'Command', icon: Command },
    { name: 'Terminal', icon: Terminal },
  ],
  'Actions': [
    { name: 'Download', icon: Download },
    { name: 'Upload', icon: Upload },
    { name: 'Share', icon: Share },
    { name: 'Copy', icon: Copy },
    { name: 'Edit', icon: Edit },
    { name: 'Trash', icon: Trash2 },
    { name: 'Archive', icon: Archive },
    { name: 'Send', icon: Send },
    { name: 'RefreshCw', icon: RefreshCw },
    { name: 'RotateCw', icon: RotateCw },
    { name: 'Maximize', icon: Maximize2 },
    { name: 'Minimize', icon: Minimize2 },
    { name: 'ZoomIn', icon: ZoomIn },
    { name: 'ZoomOut', icon: ZoomOut },
    { name: 'Link', icon: Link },
    { name: 'ExternalLink', icon: ExternalLink },
    { name: 'Bookmark', icon: Bookmark },
    { name: 'Save', icon: CheckCircle },
    { name: 'Expand', icon: Expand },
    { name: 'Fullscreen', icon: Fullscreen },
  ],
  'Arrows': [
    { name: 'ArrowLeft', icon: ArrowLeft },
    { name: 'ArrowRight', icon: ArrowRight },
    { name: 'ArrowUp', icon: ArrowUp },
    { name: 'ArrowDown', icon: ArrowDown },
    { name: 'ChevronLeft', icon: ChevronLeft },
    { name: 'ChevronRight', icon: ChevronRight },
    { name: 'ChevronUp', icon: ChevronUp },
    { name: 'ChevronDown', icon: ChevronDown },
    { name: 'CornerDownLeft', icon: CornerDownLeft },
    { name: 'CornerDownRight', icon: CornerDownRight },
    { name: 'CornerLeftDown', icon: CornerLeftDown },
    { name: 'CornerLeftUp', icon: CornerLeftUp },
    { name: 'CornerRightDown', icon: CornerRightDown },
    { name: 'CornerRightUp', icon: CornerRightUp },
    { name: 'CornerUpLeft', icon: CornerUpLeft },
    { name: 'CornerUpRight', icon: CornerUpRight },
    { name: 'Forward', icon: Forward },
    { name: 'IterationCcw', icon: IterationCcw },
    { name: 'IterationCw', icon: IterationCw },
    { name: 'Navigation', icon: Navigation },
  ],
  'Communication': [
    { name: 'Mail', icon: Mail },
    { name: 'Phone', icon: Phone },
    { name: 'MessageCircle', icon: MessageCircle },
    { name: 'MessageSquare', icon: MessageSquare },
    { name: 'Inbox', icon: Inbox },
    { name: 'Bell', icon: Bell },
    { name: 'AtSign', icon: AtSign },
    { name: 'Hash', icon: Hash },
    { name: 'Rss', icon: Rss },
    { name: 'Globe', icon: Globe },
    { name: 'Mic', icon: Mic },
    { name: 'MicOff', icon: MicOff },
    { name: 'Headphones', icon: Headphones },
    { name: 'Headset', icon: Headset },
    { name: 'Speaker', icon: Speaker },
    { name: 'Video', icon: Video },
    { name: 'Camera', icon: Camera },
    { name: 'Wifi', icon: Wifi },
    { name: 'WifiOff', icon: WifiOff },
    { name: 'Bluetooth', icon: Bluetooth },
  ],
  'Users & People': [
    { name: 'User', icon: User },
    { name: 'Users', icon: Users },
    { name: 'UserPlus', icon: UserPlus },
    { name: 'UserMinus', icon: UserMinus },
    { name: 'UserCheck', icon: UserCheck },
    { name: 'UserX', icon: UserX },
    { name: 'Baby', icon: Baby },
    { name: 'Accessibility', icon: Accessibility },
    { name: 'Hand', icon: Hand },
    { name: 'HandMetal', icon: HandMetal },
    { name: 'Handshake', icon: Handshake },
    { name: 'HelpingHand', icon: HelpingHand },
    { name: 'ThumbsUp', icon: ThumbsUp },
    { name: 'ThumbsDown', icon: ThumbsDown },
    { name: 'Smile', icon: Smile },
    { name: 'Frown', icon: Frown },
    { name: 'Meh', icon: Meh },
    { name: 'Angry', icon: Angry },
    { name: 'Laugh', icon: Laugh },
    { name: 'Fingerprint', icon: Fingerprint },
  ],
  'Alerts & Status': [
    { name: 'CheckCircle', icon: CheckCircle },
    { name: 'XCircle', icon: XCircle },
    { name: 'AlertCircle', icon: AlertCircle },
    { name: 'Info', icon: Info },
    { name: 'HelpCircle', icon: HelpCircle },
    { name: 'Flag', icon: Flag },
    { name: 'FlagOff', icon: FlagOff },
    { name: 'Activity', icon: Activity },
    { name: 'Zap', icon: Zap },
    { name: 'Target', icon: Target },
    { name: 'Crosshair', icon: Crosshair },
    { name: 'Bug', icon: Bug },
    { name: 'Lightbulb', icon: Lightbulb },
    { name: 'Sparkles', icon: Sparkles },
    { name: 'Flame', icon: Flame },
    { name: 'FlameKindling', icon: FlameKindling },
    { name: 'Flashlight', icon: Flashlight },
    { name: 'Rocket', icon: Rocket },
    { name: 'History', icon: History },
    { name: 'Hourglass', icon: Hourglass },
  ],
  'Files & Folders': [
    { name: 'File', icon: File },
    { name: 'FileText', icon: FileText },
    { name: 'FileCode', icon: FileCode },
    { name: 'FileImage', icon: FileImage },
    { name: 'FileVideo', icon: FileVideo },
    { name: 'FileMusic', icon: FileMusic },
    { name: 'FileSpreadsheet', icon: FileSpreadsheet },
    { name: 'FilePlus', icon: FilePlus },
    { name: 'FileMinus', icon: FileMinus },
    { name: 'FileCheck', icon: FileCheck },
    { name: 'FileX', icon: FileX },
    { name: 'Files', icon: Files },
    { name: 'Folder', icon: Folder },
    { name: 'FolderOpen', icon: FolderOpen },
    { name: 'FolderPlus', icon: FolderPlus },
    { name: 'FolderMinus', icon: FolderMinus },
    { name: 'FolderTree', icon: FolderTree },
    { name: 'Folders', icon: Folders },
    { name: 'Clipboard', icon: Clipboard },
    { name: 'ClipboardList', icon: ClipboardList },
  ],
  'Media & Design': [
    { name: 'Image', icon: Image },
    { name: 'ImagePlus', icon: ImagePlus },
    { name: 'ImageMinus', icon: ImageMinus },
    { name: 'ImageOff', icon: ImageOff },
    { name: 'Film', icon: Film },
    { name: 'Clapperboard', icon: Clapperboard },
    { name: 'Music', icon: Music },
    { name: 'Play', icon: Play },
    { name: 'Pause', icon: Pause },
    { name: 'SkipBack', icon: SkipBack },
    { name: 'SkipForward', icon: SkipForward },
    { name: 'Volume2', icon: Volume2 },
    { name: 'VolumeX', icon: VolumeX },
    { name: 'Palette', icon: Palette },
    { name: 'Brush', icon: Brush },
    { name: 'PenTool', icon: PenTool },
    { name: 'Pencil', icon: Pencil },
    { name: 'Eraser', icon: Eraser },
    { name: 'Crop', icon: Crop },
    { name: 'Frame', icon: Frame },
  ],
  'Devices': [
    { name: 'Monitor', icon: Monitor },
    { name: 'Laptop', icon: Laptop },
    { name: 'LaptopMinimal', icon: LaptopMinimal },
    { name: 'Tablet', icon: Tablet },
    { name: 'Smartphone', icon: Smartphone },
    { name: 'Tv', icon: Tv },
    { name: 'Watch', icon: Watch },
    { name: 'Cpu', icon: Cpu },
    { name: 'HardDrive', icon: HardDrive },
    { name: 'Server', icon: Server },
    { name: 'Database', icon: Database },
    { name: 'Battery', icon: Battery },
    { name: 'BatteryCharging', icon: BatteryCharging },
    { name: 'Gamepad', icon: Gamepad2 },
    { name: 'Joystick', icon: Joystick },
    { name: 'Printer', icon: FileOutput },
    { name: 'Cable', icon: Cable },
    { name: 'Calculator', icon: Calculator },
    { name: 'Gauge', icon: Gauge },
    { name: 'Contrast', icon: Contrast },
  ],
  'Commerce': [
    { name: 'ShoppingCart', icon: ShoppingCart },
    { name: 'ShoppingBag', icon: ShoppingBag },
    { name: 'CreditCard', icon: CreditCard },
    { name: 'DollarSign', icon: DollarSign },
    { name: 'Euro', icon: Euro },
    { name: 'IndianRupee', icon: IndianRupee },
    { name: 'JapaneseYen', icon: JapaneseYen },
    { name: 'Coins', icon: Coins },
    { name: 'Package', icon: Package },
    { name: 'Gift', icon: Gift },
    { name: 'Truck', icon: Truck },
    { name: 'Store', icon: Store },
    { name: 'Tag', icon: Tag },
    { name: 'Tags', icon: Tags },
    { name: 'Receipt', icon: ClipboardList },
    { name: 'Briefcase', icon: Briefcase },
    { name: 'Building', icon: Building },
    { name: 'Building2', icon: Building2 },
    { name: 'Factory', icon: Factory },
    { name: 'Forklift', icon: Forklift },
  ],
  'Nature & Weather': [
    { name: 'Sun', icon: Sun },
    { name: 'Moon', icon: Moon },
    { name: 'Cloud', icon: Cloud },
    { name: 'CloudRain', icon: CloudRain },
    { name: 'Umbrella', icon: Umbrella },
    { name: 'Thermometer', icon: Thermometer },
    { name: 'Wind', icon: Wind },
    { name: 'Droplet', icon: Droplet },
    { name: 'Droplets', icon: Droplets },
    { name: 'Mountain', icon: Mountain },
    { name: 'TreePine', icon: TreePine },
    { name: 'Flower', icon: Flower2 },
    { name: 'Leaf', icon: Leaf },
    { name: 'Sprout', icon: Sprout },
    { name: 'Apple', icon: Apple },
    { name: 'Banana', icon: Banana },
    { name: 'Carrot', icon: Carrot },
    { name: 'Grape', icon: Grape },
    { name: 'Fish', icon: Fish },
    { name: 'Bug', icon: Bug },
  ],
  'Social & Brands': [
    { name: 'Github', icon: Github },
    { name: 'Gitlab', icon: Gitlab },
    { name: 'Facebook', icon: Facebook },
    { name: 'Instagram', icon: Instagram },
    { name: 'Dribbble', icon: Dribbble },
    { name: 'Figma', icon: Figma },
    { name: 'Framer', icon: Framer },
    { name: 'Codesandbox', icon: Codesandbox },
    { name: 'Heart', icon: Heart },
    { name: 'HeartOff', icon: HeartOff },
    { name: 'HeartPulse', icon: HeartPulse },
    { name: 'HeartCrack', icon: HeartCrack },
    { name: 'HeartHandshake', icon: HeartHandshake },
    { name: 'Star', icon: Star },
    { name: 'Award', icon: Award },
    { name: 'Trophy', icon: Trophy },
    { name: 'Medal', icon: Medal },
    { name: 'Crown', icon: Crown },
    { name: 'Gem', icon: Gem },
    { name: 'Diamond', icon: Diamond },
  ],
  'Shapes & Symbols': [
    { name: 'Circle', icon: CircleDot },
    { name: 'Square', icon: Box },
    { name: 'Hexagon', icon: Hexagon },
    { name: 'Compass', icon: Compass },
    { name: 'Anchor', icon: Anchor },
    { name: 'Aperture', icon: Aperture },
    { name: 'Box', icon: Box },
    { name: 'Boxes', icon: Boxes },
    { name: 'Braces', icon: Braces },
    { name: 'Code', icon: Code },
    { name: 'Puzzle', icon: Puzzle },
    { name: 'Kanban', icon: Kanban },
    { name: 'Infinity', icon: Infinity },
    { name: 'Equal', icon: Equal },
    { name: 'Divide', icon: Divide },
    { name: 'Focus', icon: Focus },
    { name: 'Group', icon: Group },
    { name: 'Grip', icon: Grip },
    { name: 'GripHorizontal', icon: GripHorizontal },
    { name: 'GripVertical', icon: GripVertical },
  ],
  'Travel & Places': [
    { name: 'Map', icon: Map },
    { name: 'MapPin', icon: MapPin },
    { name: 'Compass', icon: Compass },
    { name: 'Navigation', icon: Navigation },
    { name: 'Car', icon: Car },
    { name: 'Plane', icon: Plane },
    { name: 'Train', icon: Train },
    { name: 'Ship', icon: Ship },
    { name: 'Bike', icon: Bike },
    { name: 'Fuel', icon: Fuel },
    { name: 'HardHat', icon: HardHat },
    { name: 'Building', icon: Building },
    { name: 'Hospital', icon: Hospital },
    { name: 'School', icon: School },
    { name: 'Library', icon: Library },
    { name: 'Hotel', icon: Building2 },
    { name: 'LandPlot', icon: LandPlot },
    { name: 'DoorOpen', icon: DoorOpen },
    { name: 'DoorClosed', icon: DoorClosed },
    { name: 'Footprints', icon: Footprints },
  ],
  'Food & Drink': [
    { name: 'Coffee', icon: Coffee },
    { name: 'Pizza', icon: Pizza },
    { name: 'Utensils', icon: Utensils },
    { name: 'Wine', icon: Wine },
    { name: 'Beer', icon: Beer },
    { name: 'Cake', icon: Cake },
    { name: 'IceCream', icon: IceCream },
    { name: 'Cookie', icon: Cookie },
    { name: 'Egg', icon: Egg },
    { name: 'Apple', icon: Apple },
    { name: 'Banana', icon: Banana },
    { name: 'Carrot', icon: Carrot },
    { name: 'Grape', icon: Grape },
    { name: 'GlassWater', icon: GlassWater },
    { name: 'FlaskConical', icon: FlaskConical },
    { name: 'FlaskRound', icon: FlaskRound },
    { name: 'Glasses', icon: Glasses },
  ],
  'Fun & Entertainment': [
    { name: 'PartyPopper', icon: PartyPopper },
    { name: 'Sparkles', icon: Sparkles },
    { name: 'Ghost', icon: Ghost },
    { name: 'Skull', icon: Skull },
    { name: 'Bot', icon: Bot },
    { name: 'Gamepad', icon: Gamepad2 },
    { name: 'Dice', icon: Dice1 },
    { name: 'Joystick', icon: Joystick },
    { name: 'Film', icon: Film },
    { name: 'Clapperboard', icon: Clapperboard },
    { name: 'Music', icon: Music },
    { name: 'Disc', icon: Disc },
    { name: 'Headphones', icon: Headphones },
    { name: 'Feather', icon: Feather },
    { name: 'Lasso', icon: Lasso },
    { name: 'LassoSelect', icon: LassoSelect },
    { name: 'Lamp', icon: Lamp },
    { name: 'LampCeiling', icon: LampCeiling },
    { name: 'LampDesk', icon: LampDesk },
    { name: 'LampFloor', icon: LampFloor },
  ],
};

// Icon libraries info
const ICON_LIBRARIES = [
  { name: 'Lucide', count: '1000+', description: 'Beautiful & consistent icons', url: 'https://lucide.dev', color: '#f56565' },
  { name: 'Heroicons', count: '450+', description: 'By the makers of Tailwind CSS', url: 'https://heroicons.com', color: '#8b5cf6' },
  { name: 'Phosphor', count: '6000+', description: 'Flexible icon family', url: 'https://phosphoricons.com', color: '#10b981' },
  { name: 'Tabler', count: '4500+', description: 'Free and open source', url: 'https://tabler-icons.io', color: '#3b82f6' },
  { name: 'Feather', count: '287', description: 'Simply beautiful', url: 'https://feathericons.com', color: '#06b6d4' },
  { name: 'Ionicons', count: '1300+', description: 'Premium designed icons', url: 'https://ionic.io/ionicons', color: '#6366f1' },
  { name: 'Bootstrap', count: '1800+', description: 'Official Bootstrap icons', url: 'https://icons.getbootstrap.com', color: '#7c3aed' },
  { name: 'Font Awesome', count: '16000+', description: 'The iconic library', url: 'https://fontawesome.com', color: '#f59e0b' },
];

interface IconsPanelProps {
  onClose?: () => void;
  onInsertIcon?: (iconName: string) => void;
}

const DraggableIcon = ({ name, Icon }: { name: string; Icon: React.ComponentType<any> }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `icon-${name}`,
    data: { type: 'icon', iconName: name, fromLibrary: true },
  });
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`<${name} />`);
    setCopied(true);
    toast.success(`Copied <${name} />`);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`group relative flex flex-col items-center justify-center p-2 rounded-lg cursor-grab transition-all hover:scale-105 ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
      style={{ background: 'hsl(var(--builder-component-bg))' }}
      title={name}
    >
      <Icon className="w-5 h-5" />
      <span className="text-[9px] mt-1 truncate max-w-full opacity-60">{name}</span>
      <button
        onClick={handleCopy}
        className="absolute top-0.5 right-0.5 p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'hsl(var(--background))' }}
      >
        {copied ? <Check className="w-2.5 h-2.5 text-green-500" /> : <Copy className="w-2.5 h-2.5 opacity-50" />}
      </button>
    </div>
  );
};

const IconsPanel: React.FC<IconsPanelProps> = ({ onClose, onInsertIcon }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [iconSize, setIconSize] = useState(20);

  const categories = Object.keys(ICON_CATEGORIES);

  const filteredIcons = useMemo(() => {
    const searchLower = search.toLowerCase();
    
    if (selectedCategory) {
      const catIcons = ICON_CATEGORIES[selectedCategory as keyof typeof ICON_CATEGORIES] || [];
      return searchLower
        ? catIcons.filter(i => i.name.toLowerCase().includes(searchLower))
        : catIcons;
    }

    if (searchLower) {
      return Object.values(ICON_CATEGORIES)
        .flat()
        .filter(i => i.name.toLowerCase().includes(searchLower));
    }

    return [];
  }, [search, selectedCategory]);

  return (
    <div className="builder-flyout max-w-[420px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          Icons Library
        </h2>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded hover:bg-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search & Controls */}
      <div className="px-3 py-2 space-y-2 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search 1000+ icons..."
            className="property-input pl-8 text-xs"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-muted' : 'hover:bg-muted/50'}`}
            >
              <Grid3x3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-muted' : 'hover:bg-muted/50'}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] opacity-50">Size:</span>
            <input
              type="range"
              min="16"
              max="32"
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
              className="w-16 h-1"
            />
          </div>
        </div>
      </div>

      {/* Icon Libraries Info */}
      {!selectedCategory && !search && (
        <div className="px-3 py-2 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
          <div className="text-[10px] font-semibold uppercase tracking-wider mb-2 opacity-50">
            Compatible Libraries
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {ICON_LIBRARIES.slice(0, 4).map((lib) => (
              <a
                key={lib.name}
                href={lib.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                style={{ background: 'hsl(var(--builder-bg))' }}
              >
                <div
                  className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: lib.color }}
                >
                  {lib.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-medium truncate">{lib.name}</div>
                  <div className="text-[9px] opacity-50">{lib.count} icons</div>
                </div>
              </a>
            ))}
          </div>
          <button
            className="w-full mt-2 py-1.5 text-[10px] text-center rounded-lg hover:bg-muted transition-colors"
            style={{ color: 'hsl(var(--primary))' }}
          >
            View all 8 libraries →
          </button>
        </div>
      )}

      {/* Categories */}
      <div className="flex-1 overflow-y-auto">
        {!search && !selectedCategory && (
          <div className="p-2 space-y-1">
            <div className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 opacity-50">
              Categories
            </div>
            {categories.map((cat) => {
              const icons = ICON_CATEGORIES[cat as keyof typeof ICON_CATEGORIES];
              const FirstIcon = icons[0]?.icon;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
                >
                  {FirstIcon && <FirstIcon className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />}
                  <span className="flex-1 text-left text-xs font-medium">{cat}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'hsl(var(--builder-component-bg))', color: 'hsl(var(--muted-foreground))' }}>
                    {icons.length}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </button>
              );
            })}
          </div>
        )}

        {/* Category Back Button */}
        {selectedCategory && (
          <div className="px-3 py-2 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-xs font-medium hover:opacity-70"
              style={{ color: 'hsl(var(--primary))' }}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Back to Categories
            </button>
            <div className="mt-1 text-sm font-semibold">{selectedCategory}</div>
          </div>
        )}

        {/* Icons Grid */}
        {(search || selectedCategory) && (
          <div className="p-3">
            {filteredIcons.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-5 gap-1.5' : 'space-y-1'}>
                {filteredIcons.map(({ name, icon: Icon }) => (
                  viewMode === 'grid' ? (
                    <DraggableIcon key={name} name={name} Icon={Icon} />
                  ) : (
                    <div
                      key={name}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors cursor-grab"
                    >
                      <Icon className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                      <span className="flex-1 text-xs">{name}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`<${name} />`);
                          toast.success(`Copied <${name} />`);
                        }}
                        className="p-1 rounded hover:bg-background"
                      >
                        <Copy className="w-3 h-3 opacity-40" />
                      </button>
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
                <p className="text-xs opacity-50">No icons found for "{search}"</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t text-center" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <p className="text-[10px] opacity-50">
          Drag icons to canvas or click to copy • Powered by Lucide
        </p>
      </div>
    </div>
  );
};

export default IconsPanel;
