import type { PageSchema, BuilderComponent } from '@/types/builder';

// Generates a static HTML export from the component tree
export const exportToStaticHTML = (schema: PageSchema): string => {
  const css = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; }
  `;

  const renderNode = (node: BuilderComponent): string => {
    const style = Object.entries(node.styles || {})
      .filter(([k, v]) => v && !k.startsWith('custom'))
      .map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v}`)
      .join('; ');

    const classes = node.styles?.customClasses || '';
    const tag = getHtmlTag(node.type);
    const childrenHtml = node.children?.map(renderNode).join('\n') || '';
    const content = node.content || '';

    return `<${tag} class="${classes}" style="${style}">${content}${childrenHtml}</${tag}>`;
  };

  const body = schema.sections.map(section => {
    const sectionStyle = Object.entries(section.styles || {})
      .filter(([k, v]) => v && !k.startsWith('custom'))
      .map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v}`)
      .join('; ');
    const children = section.components.map(renderNode).join('\n');
    return `<section style="${sectionStyle}">${children}</section>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${schema.name}</title>
  <style>${css}</style>
</head>
<body>
${body}
</body>
</html>`;
};

// Generates a React component export
export const exportToReact = (schema: PageSchema): Record<string, string> => {
  const files: Record<string, string> = {};

  const renderNodeJSX = (node: BuilderComponent, indent = 2): string => {
    const pad = ' '.repeat(indent);
    const style = Object.entries(node.styles || {})
      .filter(([k, v]) => v && !k.startsWith('custom'))
      .map(([k, v]) => `${k}: '${v}'`)
      .join(', ');

    const childrenJSX = node.children?.map(c => renderNodeJSX(c, indent + 2)).join('\n') || '';
    const content = node.content ? node.content : '';

    return `${pad}<div style={{${style}}}>
${content ? `${pad}  ${content}` : ''}
${childrenJSX}
${pad}</div>`;
  };

  const pageComponent = `import React from 'react';

const ${schema.name.replace(/\s+/g, '')}Page = () => {
  return (
    <div>
${schema.sections.map(section => {
  const children = section.components.map(c => renderNodeJSX(c, 6)).join('\n');
  return `      <section>\n${children}\n      </section>`;
}).join('\n')}
    </div>
  );
};

export default ${schema.name.replace(/\s+/g, '')}Page;
`;

  files[`${schema.name.replace(/\s+/g, '')}Page.tsx`] = pageComponent;
  return files;
};

// Download a file
export const downloadFile = (filename: string, content: string, type = 'text/html') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const getHtmlTag = (type: string): string => {
  const map: Record<string, string> = {
    heading: 'h2',
    subheading: 'h3',
    paragraph: 'p',
    list: 'ul',
    quote: 'blockquote',
    image: 'img',
    navbar: 'nav',
    section: 'section',
    container: 'div',
    hero: 'div',
    card: 'div',
    button: 'button',
  };
  return map[type] || 'div';
};
