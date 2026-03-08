import { useBuilderStore } from '@/store/builderStore';
import Editor from '@monaco-editor/react';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { useState, useMemo } from 'react';

const CodeEditorPanel = () => {
  const { codeEditorComponentId, closeCodeEditor, schema, updateComponent } = useBuilderStore();
  const [expanded, setExpanded] = useState(false);
  const [language, setLanguage] = useState<'html' | 'css' | 'javascript'>('html');

  const component = useMemo(() => {
    if (!codeEditorComponentId) return null;
    for (const section of schema.sections) {
      const found = section.components.find(c => c.id === codeEditorComponentId);
      if (found) return found;
    }
    return null;
  }, [codeEditorComponentId, schema]);

  if (!component) return null;

  const getCode = () => {
    if (language === 'html') {
      return component.content || `<div>${component.label}</div>`;
    }
    if (language === 'css') {
      return Object.entries(component.styles)
        .filter(([, v]) => v)
        .map(([k, v]) => {
          const prop = k.replace(/([A-Z])/g, '-$1').toLowerCase();
          return `  ${prop}: ${v};`;
        })
        .join('\n') || '/* No styles */';
    }
    return `// React JSX for ${component.label}\nexport const ${component.label.replace(/\s/g, '')} = () => {\n  return (\n    <div>\n      ${component.content || component.label}\n    </div>\n  );\n};`;
  };

  const handleChange = (value: string | undefined) => {
    if (!value || !codeEditorComponentId) return;
    if (language === 'html') {
      updateComponent(codeEditorComponentId, { content: value });
    }
  };

  return (
    <div
      className={`border-t border-builder-panel-border bg-builder-sidebar flex flex-col ${
        expanded ? 'h-[60vh]' : 'h-64'
      } transition-all`}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-builder-panel-border shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider opacity-60">Code Editor</span>
          <span className="text-xs opacity-40">— {component.label}</span>
        </div>
        <div className="flex items-center gap-2">
          {(['html', 'css', 'javascript'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${
                language === lang ? 'bg-primary text-primary-foreground' : 'hover:bg-builder-component'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
          <div className="w-px h-4 bg-builder-panel-border mx-1" />
          <button onClick={() => setExpanded(!expanded)} className="p-1 rounded hover:bg-builder-component">
            {expanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button onClick={closeCodeEditor} className="p-1 rounded hover:bg-builder-component">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language={language === 'javascript' ? 'typescript' : language}
          theme="vs-dark"
          value={getCode()}
          onChange={handleChange}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: 'JetBrains Mono, monospace',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            padding: { top: 12 },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditorPanel;
