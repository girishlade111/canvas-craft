/**
 * Export Dialog - Comprehensive export options for created websites
 * - Push to GitHub
 * - Download source code (VS Code ready)
 * - Download static HTML
 */

import { useState } from 'react';
import { useBuilderStore } from '@/store/builderStore';
import { generateMultiPageProject, generateReactProject } from '@/engine/codegen/reactGenerator';
import { generateStaticHTML, generateMultiPageHTML } from '@/engine/codegen/staticHtmlGenerator';
import { downloadZip, createProjectZip } from '@/engine/codegen/zipExporter';
import { downloadFile } from '@/engine/codegen';
import type { PageSchema } from '@/types/builder';
import {
  X, Github, Download, Code2, FileArchive, Folder, Check, Copy,
  ExternalLink, Terminal, ChevronRight, Loader2, Globe, Monitor,
  FileCode, FolderOpen, Zap, Settings, ArrowRight, CheckCircle2,
  AlertCircle, Info, Package, GitBranch, Rocket, Eye, Play,
} from 'lucide-react';
import { toast } from 'sonner';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
  pages?: { name: string; slug: string; schema: PageSchema }[];
}

type ExportTab = 'github' | 'vscode' | 'html';
type ExportStatus = 'idle' | 'preparing' | 'downloading' | 'done' | 'error';

const ExportDialog: React.FC<ExportDialogProps> = ({ isOpen, onClose, projectId, pages }) => {
  const schema = useBuilderStore((s) => s.schema);
  const [activeTab, setActiveTab] = useState<ExportTab>('vscode');
  const [status, setStatus] = useState<ExportStatus>('idle');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const projectName = schema.name || 'my-website';
  const safeName = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

  // Generate files based on pages or current schema
  const generateFiles = () => {
    if (pages && pages.length > 0) {
      return generateMultiPageProject(pages, projectName);
    }
    return generateReactProject(schema);
  };

  // Copy command to clipboard
  const copyCommand = (command: string, id: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2000);
    toast.success('Command copied!');
  };

  // Download ZIP for VS Code
  const handleDownloadVSCode = async () => {
    try {
      setStatus('preparing');
      const files = generateFiles();
      
      setStatus('downloading');
      await downloadZip(files, projectName);
      
      setStatus('done');
      toast.success('ZIP downloaded! Open in VS Code and run npm install');
    } catch (err: any) {
      setStatus('error');
      toast.error('Download failed: ' + err.message);
    }
  };

  // Download static HTML
  const handleDownloadHTML = async () => {
    try {
      setStatus('preparing');
      
      if (pages && pages.length > 1) {
        // Multi-page: download as ZIP
        const htmlFiles = generateMultiPageHTML(pages);
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();
        const folder = zip.folder(safeName);
        if (folder) {
          Object.entries(htmlFiles).forEach(([path, content]) => {
            folder.file(path, content);
          });
        }
        const blob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${safeName}-html.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // Single page: download as HTML file
        setStatus('downloading');
        const html = generateStaticHTML(schema);
        downloadFile(html, `${safeName}.html`, 'text/html');
      }
      
      setStatus('done');
      toast.success('HTML downloaded!');
    } catch (err: any) {
      setStatus('error');
      toast.error('Download failed: ' + err.message);
    }
  };

  // Open GitHub to create new repo
  const handlePushToGitHub = () => {
    // Open GitHub new repo page in new tab
    window.open('https://github.com/new', '_blank');
    toast.info('Create a new repository, then follow the instructions below');
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'vscode' as const, label: 'VS Code', icon: Code2, description: 'Download & edit locally' },
    { id: 'github' as const, label: 'GitHub', icon: Github, description: 'Push to repository' },
    { id: 'html' as const, label: 'HTML', icon: Globe, description: 'Static HTML file' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{
          background: 'hsl(var(--builder-sidebar))',
          border: '1px solid hsl(var(--builder-panel-border))',
          color: 'hsl(var(--builder-toolbar-foreground))',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b shrink-0" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
              <Download className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Export Project</h2>
              <p className="text-xs opacity-60">{projectName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b shrink-0" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
          {tabs.map(({ id, label, icon: Icon, description }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setStatus('idle'); }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === id ? 'border-b-2 opacity-100' : 'opacity-50 hover:opacity-80'
              }`}
              style={activeTab === id ? { borderColor: 'hsl(var(--primary))' } : undefined}
            >
              <Icon className="w-4 h-4" />
              <div className="text-left hidden sm:block">
                <div>{label}</div>
                <div className="text-[10px] font-normal opacity-60">{description}</div>
              </div>
              <span className="sm:hidden">{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* ════════════════ VS CODE TAB ════════════════ */}
          {activeTab === 'vscode' && (
            <div className="space-y-4">
              {/* What's included */}
              <div className="rounded-lg p-4" style={{ background: 'hsl(var(--builder-bg))' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  <span className="text-sm font-semibold">What's Included</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { icon: FileCode, label: 'React + TypeScript source' },
                    { icon: Zap, label: 'Vite build system' },
                    { icon: Settings, label: 'ESLint & VS Code config' },
                    { icon: Globe, label: 'Multi-platform deploy configs' },
                    { icon: Folder, label: 'Complete project structure' },
                    { icon: GitBranch, label: 'Git-ready with .gitignore' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 p-2 rounded" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
                      <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: 'hsl(var(--primary))' }} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform configs */}
              <div className="rounded-lg p-4" style={{ background: 'hsl(var(--builder-bg))' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  <span className="text-sm font-semibold">Deploy Anywhere</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Vercel', 'Netlify', 'GitHub Pages', 'Cloudflare', 'Docker', 'Railway', 'Render', 'AWS S3'].map(platform => (
                    <span key={platform} className="px-2 py-1 rounded text-[10px] font-medium flex items-center gap-1"
                      style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
                      <CheckCircle2 className="w-2.5 h-2.5" /> {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick start */}
              <div className="rounded-lg p-4" style={{ background: 'hsl(var(--builder-bg))' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  <span className="text-sm font-semibold">Quick Start</span>
                </div>
                <ol className="space-y-3 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>1</span>
                    <div className="flex-1">
                      <span>Download & extract the ZIP</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>2</span>
                    <div className="flex-1">
                      <span>Open in VS Code:</span>
                      <button onClick={() => copyCommand(`code ${safeName}`, 'vscode')}
                        className="ml-2 px-2 py-0.5 rounded font-mono text-[10px] inline-flex items-center gap-1 hover:opacity-80"
                        style={{ background: 'hsl(var(--muted))' }}>
                        code {safeName}
                        {copiedCommand === 'vscode' ? <Check className="w-2.5 h-2.5 text-green-500" /> : <Copy className="w-2.5 h-2.5 opacity-50" />}
                      </button>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>3</span>
                    <div className="flex-1">
                      <span>Install dependencies:</span>
                      <button onClick={() => copyCommand('npm install', 'install')}
                        className="ml-2 px-2 py-0.5 rounded font-mono text-[10px] inline-flex items-center gap-1 hover:opacity-80"
                        style={{ background: 'hsl(var(--muted))' }}>
                        npm install
                        {copiedCommand === 'install' ? <Check className="w-2.5 h-2.5 text-green-500" /> : <Copy className="w-2.5 h-2.5 opacity-50" />}
                      </button>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>4</span>
                    <div className="flex-1">
                      <span>Start development server:</span>
                      <button onClick={() => copyCommand('npm run dev', 'dev')}
                        className="ml-2 px-2 py-0.5 rounded font-mono text-[10px] inline-flex items-center gap-1 hover:opacity-80"
                        style={{ background: 'hsl(var(--muted))' }}>
                        npm run dev
                        {copiedCommand === 'dev' ? <Check className="w-2.5 h-2.5 text-green-500" /> : <Copy className="w-2.5 h-2.5 opacity-50" />}
                      </button>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Status indicator */}
              {status !== 'idle' && (
                <div className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
                  status === 'done' ? 'bg-green-500/10 text-green-500' :
                  status === 'error' ? 'bg-red-500/10 text-red-500' : ''
                }`} style={status === 'preparing' || status === 'downloading' ? { background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' } : undefined}>
                  {status === 'preparing' && <><Loader2 className="w-4 h-4 animate-spin" /> Generating files...</>}
                  {status === 'downloading' && <><Loader2 className="w-4 h-4 animate-spin" /> Downloading...</>}
                  {status === 'done' && <><CheckCircle2 className="w-4 h-4" /> Download complete!</>}
                  {status === 'error' && <><AlertCircle className="w-4 h-4" /> Download failed</>}
                </div>
              )}
            </div>
          )}

          {/* ════════════════ GITHUB TAB ════════════════ */}
          {activeTab === 'github' && (
            <div className="space-y-4">
              {/* GitHub workflow */}
              <div className="rounded-lg p-4" style={{ background: 'hsl(var(--builder-bg))' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Github className="w-4 h-4" />
                  <span className="text-sm font-semibold">Push to GitHub</span>
                </div>
                <ol className="space-y-4 text-xs">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                      style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>1</span>
                    <div className="flex-1">
                      <div className="font-medium mb-1">Download the source code</div>
                      <p className="opacity-60 mb-2">Get the complete project files first</p>
                      <button onClick={handleDownloadVSCode}
                        className="px-3 py-1.5 rounded text-[11px] font-medium flex items-center gap-1.5"
                        style={{ background: 'hsl(var(--muted))' }}>
                        <FileArchive className="w-3.5 h-3.5" /> Download ZIP
                      </button>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                      style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>2</span>
                    <div className="flex-1">
                      <div className="font-medium mb-1">Create a new GitHub repository</div>
                      <p className="opacity-60 mb-2">Create an empty repo (without README)</p>
                      <button onClick={handlePushToGitHub}
                        className="px-3 py-1.5 rounded text-[11px] font-medium flex items-center gap-1.5"
                        style={{ background: 'hsl(var(--muted))' }}>
                        <Github className="w-3.5 h-3.5" /> Create Repository <ExternalLink className="w-3 h-3 opacity-50" />
                      </button>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                      style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>3</span>
                    <div className="flex-1">
                      <div className="font-medium mb-2">Initialize & push code</div>
                      <div className="space-y-1.5">
                        {[
                          { cmd: `cd ${safeName}`, id: 'cd' },
                          { cmd: 'git init', id: 'init' },
                          { cmd: 'git add .', id: 'add' },
                          { cmd: 'git commit -m "Initial commit"', id: 'commit' },
                          { cmd: 'git branch -M main', id: 'branch' },
                          { cmd: 'git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git', id: 'remote' },
                          { cmd: 'git push -u origin main', id: 'push' },
                        ].map(({ cmd, id }) => (
                          <button key={id} onClick={() => copyCommand(cmd, id)}
                            className="w-full text-left px-2.5 py-1.5 rounded font-mono text-[10px] flex items-center justify-between hover:opacity-80"
                            style={{ background: 'hsl(var(--muted))' }}>
                            <span className="truncate">{cmd}</span>
                            {copiedCommand === id ? <Check className="w-3 h-3 text-green-500 shrink-0" /> : <Copy className="w-3 h-3 opacity-40 shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Deploy after push */}
              <div className="rounded-lg p-4" style={{ background: 'hsl(var(--primary) / 0.08)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Rocket className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  <span className="text-sm font-semibold" style={{ color: 'hsl(var(--primary))' }}>Deploy from GitHub</span>
                </div>
                <p className="text-xs opacity-70 mb-3">After pushing, deploy instantly on any platform:</p>
                <div className="flex flex-wrap gap-2">
                  <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded text-[11px] font-medium flex items-center gap-1.5 hover:opacity-80"
                    style={{ background: '#000', color: '#fff' }}>
                    ▲ Vercel <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                  <a href="https://app.netlify.com/start" target="_blank" rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded text-[11px] font-medium flex items-center gap-1.5 hover:opacity-80"
                    style={{ background: '#00AD9F', color: '#fff' }}>
                    Netlify <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                  <a href="https://pages.cloudflare.com/" target="_blank" rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded text-[11px] font-medium flex items-center gap-1.5 hover:opacity-80"
                    style={{ background: '#F48120', color: '#fff' }}>
                    Cloudflare <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════ HTML TAB ════════════════ */}
          {activeTab === 'html' && (
            <div className="space-y-4">
              <div className="rounded-lg p-4" style={{ background: 'hsl(var(--builder-bg))' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  <span className="text-sm font-semibold">Static HTML Export</span>
                </div>
                <p className="text-xs opacity-60 mb-4">
                  Download your website as a standalone HTML file. Perfect for simple hosting or quick sharing.
                </p>
                
                <div className="space-y-2 mb-4">
                  {[
                    { icon: CheckCircle2, text: 'No build step required', color: 'text-green-500' },
                    { icon: CheckCircle2, text: 'Works on any web server', color: 'text-green-500' },
                    { icon: CheckCircle2, text: 'Self-contained with inline styles', color: 'text-green-500' },
                    { icon: Info, text: 'Best for simple static pages', color: 'opacity-50' },
                  ].map(({ icon: Icon, text, color }) => (
                    <div key={text} className={`flex items-center gap-2 text-xs ${color}`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                {pages && pages.length > 1 && (
                  <div className="p-2 rounded text-[10px] flex items-center gap-2 mb-4" style={{ background: 'hsl(var(--muted) / 0.5)' }}>
                    <Info className="w-3.5 h-3.5 opacity-50" />
                    <span>Multi-page site will be downloaded as a ZIP with {pages.length} HTML files</span>
                  </div>
                )}
              </div>

              {/* Use cases */}
              <div className="rounded-lg p-4" style={{ background: 'hsl(var(--builder-bg))' }}>
                <div className="text-sm font-semibold mb-3">Best For</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { icon: Globe, label: 'Simple hosting (FTP, cPanel)' },
                    { icon: Eye, label: 'Quick previews & sharing' },
                    { icon: FileCode, label: 'Email templates' },
                    { icon: Folder, label: 'Local file viewing' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 p-2 rounded" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
                      <Icon className="w-3.5 h-3.5 shrink-0 opacity-60" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status indicator */}
              {status !== 'idle' && (
                <div className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
                  status === 'done' ? 'bg-green-500/10 text-green-500' :
                  status === 'error' ? 'bg-red-500/10 text-red-500' : ''
                }`} style={status === 'preparing' || status === 'downloading' ? { background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' } : undefined}>
                  {status === 'preparing' && <><Loader2 className="w-4 h-4 animate-spin" /> Generating HTML...</>}
                  {status === 'downloading' && <><Loader2 className="w-4 h-4 animate-spin" /> Downloading...</>}
                  {status === 'done' && <><CheckCircle2 className="w-4 h-4" /> Download complete!</>}
                  {status === 'error' && <><AlertCircle className="w-4 h-4" /> Download failed</>}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t shrink-0" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors">
            Cancel
          </button>
          
          <button
            onClick={activeTab === 'html' ? handleDownloadHTML : handleDownloadVSCode}
            disabled={status === 'preparing' || status === 'downloading'}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-50"
            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
          >
            {(status === 'preparing' || status === 'downloading') ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Exporting...</>
            ) : activeTab === 'github' ? (
              <><FileArchive className="w-4 h-4" /> Download ZIP</>
            ) : activeTab === 'html' ? (
              <><Download className="w-4 h-4" /> Download HTML</>
            ) : (
              <><Download className="w-4 h-4" /> Download for VS Code</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportDialog;
