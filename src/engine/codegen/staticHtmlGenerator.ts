/**
 * Layer 5 — Code Generation Engine: Static HTML
 * Converts builder schema into a standalone HTML file.
 */

import type { PageSchema, BuilderComponent } from '@/types/builder';

const HTML_TAG_MAP: Record<string, string> = {
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
  video: 'video',
  grid: 'div',
  columns: 'div',
};

const stylesToCss = (styles: Record<string, string | undefined>): string => {
  return Object.entries(styles)
    .filter(([k, v]) => v && !k.startsWith('custom'))
    .map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v}`)
    .join('; ');
};

const renderNode = (node: BuilderComponent): string => {
  const style = stylesToCss(node.styles || {});
  const classes = node.styles?.customClasses || '';
  const tag = HTML_TAG_MAP[node.type] || 'div';
  const childrenHtml = node.children?.map(renderNode).join('\n') || '';
  const content = node.content || '';

  if (tag === 'img') {
    return `<img class="${classes}" style="${style}" src="${node.props?.src || ''}" alt="${node.props?.alt || ''}" />`;
  }

  return `<${tag} class="${classes}" style="${style}">${content}${childrenHtml}</${tag}>`;
};

export const generateStaticHTML = (schema: PageSchema): string => {
  const body = schema.sections
    .map(section => {
      const sectionStyle = stylesToCss(section.styles || {});
      const children = section.components.map(renderNode).join('\n');
      return `<section style="${sectionStyle}">${children}</section>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${schema.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body>
${body}
</body>
</html>`;
};
