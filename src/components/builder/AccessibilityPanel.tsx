import { useState, useMemo } from 'react';
import {
  X, Accessibility, Check, AlertTriangle, XCircle, Eye, Type,
  Image, Link, MousePointer, Keyboard, Volume2, Monitor,
  Search, ChevronRight, RefreshCw, Download, Info,
  CheckCircle2, AlertCircle, Contrast, Focus, Layers,
} from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useBuilderStore } from '@/store/builderStore';

interface AccessibilityPanelProps {
  onClose?: () => void;
}

interface A11yIssue {
  id: string;
  severity: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  element?: string;
  fix?: string;
  wcag?: string;
}

const AccessibilityPanel = ({ onClose }: AccessibilityPanelProps) => {
  const [activeTab, setActiveTab] = useState<'audit' | 'checklist' | 'settings'>('audit');
  const [scanning, setScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const { schema } = useBuilderStore();

  // Simulate scanning components for a11y issues
  const [issues, setIssues] = useState<A11yIssue[]>([]);

  const runAudit = () => {
    setScanning(true);
    setTimeout(() => {
      const foundIssues: A11yIssue[] = [];
      let componentCount = 0;

      const scanComponents = (components: any[]) => {
        for (const comp of components) {
          componentCount++;
          // Check images for alt text
          if (comp.type === 'image' && !comp.props?.alt) {
            foundIssues.push({
              id: `${comp.id}-alt`,
              severity: 'error',
              category: 'Images',
              message: `Image "${comp.label}" missing alt text`,
              element: comp.label,
              fix: 'Add descriptive alt text to the image',
              wcag: '1.1.1',
            });
          }
          // Check headings
          if (['heading', 'h1', 'h2', 'h3'].includes(comp.type) && !comp.content?.trim()) {
            foundIssues.push({
              id: `${comp.id}-empty`,
              severity: 'warning',
              category: 'Content',
              message: `Heading "${comp.label}" has no content`,
              element: comp.label,
              fix: 'Add meaningful text to the heading',
              wcag: '2.4.6',
            });
          }
          // Check contrast (simulated)
          if (comp.styles?.color && comp.styles?.backgroundColor) {
            foundIssues.push({
              id: `${comp.id}-contrast`,
              severity: 'warning',
              category: 'Color',
              message: `Check color contrast for "${comp.label}"`,
              element: comp.label,
              fix: 'Ensure 4.5:1 contrast ratio for normal text',
              wcag: '1.4.3',
            });
          }
          // Check links
          if (comp.type === 'link' && !comp.props?.link) {
            foundIssues.push({
              id: `${comp.id}-link`,
              severity: 'error',
              category: 'Links',
              message: `Link "${comp.label}" has no href`,
              element: comp.label,
              fix: 'Add a valid URL to the link',
              wcag: '2.4.4',
            });
          }
          if (comp.children) scanComponents(comp.children);
        }
      };

      for (const section of schema.sections) {
        scanComponents(section.components);
      }

      // Add general checks
      if (componentCount === 0) {
        foundIssues.push({
          id: 'empty-page',
          severity: 'info',
          category: 'Structure',
          message: 'Page has no components to audit',
          fix: 'Add content to your page',
        });
      }

      // Check for page title
      if (!schema.metaTitle) {
        foundIssues.push({
          id: 'no-title',
          severity: 'error',
          category: 'Document',
          message: 'Page is missing a title',
          fix: 'Add a descriptive page title in SEO settings',
          wcag: '2.4.2',
        });
      }

      // Check for language attribute
      foundIssues.push({
        id: 'lang-attr',
        severity: 'info',
        category: 'Document',
        message: 'Ensure HTML lang attribute is set',
        fix: 'Set the language in page settings',
        wcag: '3.1.1',
      });

      setIssues(foundIssues);
      setScanning(false);
      setHasScanned(true);
      toast.success(`Audit complete: ${foundIssues.length} issue${foundIssues.length !== 1 ? 's' : ''} found`);
    }, 1500);
  };

  const errorCount = issues.filter(i => i.severity === 'error').length;
  const warningCount = issues.filter(i => i.severity === 'warning').length;
  const infoCount = issues.filter(i => i.severity === 'info').length;
  const score = hasScanned ? Math.max(0, 100 - (errorCount * 15) - (warningCount * 5)) : 0;

  const CHECKLIST = [
    { category: 'Perceivable', items: [
      { label: 'All images have alt text', wcag: '1.1.1' },
      { label: 'Video has captions', wcag: '1.2.2' },
      { label: 'Color is not the only way to convey info', wcag: '1.4.1' },
      { label: 'Text has sufficient contrast (4.5:1)', wcag: '1.4.3' },
      { label: 'Text can be resized to 200%', wcag: '1.4.4' },
      { label: 'No images of text', wcag: '1.4.5' },
    ]},
    { category: 'Operable', items: [
      { label: 'All functions available via keyboard', wcag: '2.1.1' },
      { label: 'No keyboard traps', wcag: '2.1.2' },
      { label: 'Skip navigation link available', wcag: '2.4.1' },
      { label: 'Pages have descriptive titles', wcag: '2.4.2' },
      { label: 'Focus order is logical', wcag: '2.4.3' },
      { label: 'Link purpose is clear', wcag: '2.4.4' },
      { label: 'Focus is visible', wcag: '2.4.7' },
    ]},
    { category: 'Understandable', items: [
      { label: 'Page language is set', wcag: '3.1.1' },
      { label: 'Navigation is consistent', wcag: '3.2.3' },
      { label: 'Error identification is clear', wcag: '3.3.1' },
      { label: 'Form labels are descriptive', wcag: '3.3.2' },
    ]},
    { category: 'Robust', items: [
      { label: 'Valid HTML markup', wcag: '4.1.1' },
      { label: 'ARIA attributes are correct', wcag: '4.1.2' },
      { label: 'Status messages use ARIA live regions', wcag: '4.1.3' },
    ]},
  ];

  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const tabs = [
    { id: 'audit' as const, label: 'Audit' },
    { id: 'checklist' as const, label: 'Checklist' },
    { id: 'settings' as const, label: 'Settings' },
  ];

  const severityIcon = (severity: string) => {
    if (severity === 'error') return <XCircle className="w-3.5 h-3.5" style={{ color: 'hsl(var(--destructive))' }} />;
    if (severity === 'warning') return <AlertTriangle className="w-3.5 h-3.5" style={{ color: 'hsl(45 93% 47%)' }} />;
    return <Info className="w-3.5 h-3.5" style={{ color: 'hsl(210 100% 50%)' }} />;
  };

  return (
    <div className="builder-flyout-panel" style={{ width: 320 }}>
      <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
        <div className="flex items-center gap-2">
          <Accessibility className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <span className="font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>Accessibility</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded hover:bg-accent/10">
            <X className="w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
          </button>
        )}
      </div>

      <div className="flex border-b" style={{ borderColor: 'hsl(var(--border))' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-2 text-xs font-medium transition-colors"
            style={{
              color: activeTab === tab.id ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
              borderBottom: activeTab === tab.id ? '2px solid hsl(var(--primary))' : '2px solid transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1" style={{ height: 'calc(100vh - 160px)' }}>
        {/* Audit Tab */}
        {activeTab === 'audit' && (
          <div className="p-3 space-y-3">
            {/* Score */}
            {hasScanned && (
              <div className="text-center p-4 rounded-lg border" style={{ borderColor: 'hsl(var(--border))' }}>
                <div className="text-4xl font-bold mb-1" style={{
                  color: score >= 90 ? 'hsl(142 70% 45%)' : score >= 70 ? 'hsl(45 93% 47%)' : 'hsl(var(--destructive))'
                }}>{score}</div>
                <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Accessibility Score</div>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <span className="text-[10px] flex items-center gap-1">
                    <XCircle className="w-3 h-3" style={{ color: 'hsl(var(--destructive))' }} /> {errorCount} errors
                  </span>
                  <span className="text-[10px] flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" style={{ color: 'hsl(45 93% 47%)' }} /> {warningCount} warnings
                  </span>
                  <span className="text-[10px] flex items-center gap-1">
                    <Info className="w-3 h-3" style={{ color: 'hsl(210 100% 50%)' }} /> {infoCount} info
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={runAudit}
              disabled={scanning}
              className="w-full py-2.5 text-xs font-medium rounded-lg flex items-center justify-center gap-2"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
            >
              {scanning ? (
                <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Scanning...</>
              ) : (
                <><Search className="w-3.5 h-3.5" /> {hasScanned ? 'Re-run Audit' : 'Run Accessibility Audit'}</>
              )}
            </button>

            {/* Issues */}
            {issues.length > 0 && (
              <div className="space-y-1.5">
                {issues.map(issue => (
                  <div key={issue.id} className="p-2.5 rounded-lg border" style={{ borderColor: 'hsl(var(--border))' }}>
                    <div className="flex items-start gap-2">
                      {severityIcon(issue.severity)}
                      <div className="flex-1">
                        <div className="text-xs font-medium" style={{ color: 'hsl(var(--foreground))' }}>{issue.message}</div>
                        {issue.element && (
                          <div className="text-[10px] mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>Element: {issue.element}</div>
                        )}
                        {issue.fix && (
                          <div className="text-[10px] mt-1 p-1.5 rounded" style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}>
                            💡 {issue.fix}
                          </div>
                        )}
                        {issue.wcag && (
                          <Badge variant="outline" className="text-[9px] mt-1">WCAG {issue.wcag}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Checklist Tab */}
        {activeTab === 'checklist' && (
          <div className="p-3 space-y-3">
            <p className="text-[11px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
              WCAG 2.1 AA Compliance Checklist — {checkedItems.size}/{CHECKLIST.reduce((a, c) => a + c.items.length, 0)} complete
            </p>
            {CHECKLIST.map(section => (
              <Collapsible key={section.category} defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-1.5 text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                  <span>{section.category}</span>
                  <Badge variant="secondary" className="text-[10px]">
                    {section.items.filter(i => checkedItems.has(i.wcag)).length}/{section.items.length}
                  </Badge>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-1">
                  {section.items.map(item => (
                    <button
                      key={item.wcag}
                      onClick={() => setCheckedItems(prev => {
                        const next = new Set(prev);
                        next.has(item.wcag) ? next.delete(item.wcag) : next.add(item.wcag);
                        return next;
                      })}
                      className="w-full flex items-center gap-2 p-2 rounded-lg text-left hover:bg-accent/10 transition-colors"
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0`}
                        style={{
                          borderColor: checkedItems.has(item.wcag) ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                          background: checkedItems.has(item.wcag) ? 'hsl(var(--primary))' : 'transparent',
                        }}>
                        {checkedItems.has(item.wcag) && <Check className="w-3 h-3" style={{ color: 'hsl(var(--primary-foreground))' }} />}
                      </div>
                      <div className="flex-1">
                        <span className="text-xs" style={{ color: 'hsl(var(--foreground))' }}>{item.label}</span>
                      </div>
                      <Badge variant="outline" className="text-[9px] flex-shrink-0">{item.wcag}</Badge>
                    </button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="p-3 space-y-4">
            <div className="space-y-3">
              <h4 className="text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Accessibility Features</h4>
              {[
                { label: 'Skip to Content Link', desc: 'Add skip navigation for keyboard users' },
                { label: 'Focus Indicators', desc: 'Visible focus outlines on interactive elements' },
                { label: 'ARIA Landmarks', desc: 'Semantic landmarks for screen readers' },
                { label: 'Reduced Motion', desc: 'Respect prefers-reduced-motion setting' },
                { label: 'High Contrast Mode', desc: 'Support system high contrast' },
                { label: 'Font Scaling', desc: 'Allow text size adjustments' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-2 rounded-lg border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <div>
                    <div className="text-xs font-medium" style={{ color: 'hsl(var(--foreground))' }}>{item.label}</div>
                    <div className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.desc}</div>
                  </div>
                  <Check className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default AccessibilityPanel;
