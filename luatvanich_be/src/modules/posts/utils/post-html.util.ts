import { DomUtils, parseDocument } from 'htmlparser2';
import sanitizeHtml from 'sanitize-html';
import { LangCode } from '../../../common/enums/lang.enum';
import { generatePostSlug } from './post-slug.util';

export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'figure', 'figcaption', 'caption'],
    allowedAttributes: { a: ['href', 'title'], img: ['src', 'alt', 'title', 'width', 'height'], th: ['scope', 'colspan', 'rowspan'], td: ['colspan', 'rowspan'] },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedSchemesAppliedToAttributes: ['href', 'src'],
    allowedSchemesByTag: { img: ['http', 'https'] },
    allowProtocolRelative: false,
    nestingLimit: 40,
  });
}

export function hasPostContent(html: string): boolean {
  const document = parseDocument(html);
  return !!DomUtils.textContent(document).trim() || DomUtils.findAll(
    (element) => element.name === 'img' && !!element.attribs.src, document.children,
  ).length > 0;
}

export function toPostContent(html: string, lang: LangCode) {
  const document = parseDocument(sanitizePostHtml(html));
  const headings = DomUtils.findAll((element) => /^h[1-6]$/.test(element.name), document.children);
  const usedIds = new Set<string>();
  const tableOfContents = headings.flatMap((heading, index) => {
    const title = DomUtils.textContent(heading).replace(/\s+/gu, ' ').trim();
    if (!title) return [];
    const base = 'muc-' + generatePostSlug(title, lang, 100, String(index + 1));
    let id = base;
    let suffix = 2;
    while (usedIds.has(id)) id = `${base}-${suffix++}`;
    usedIds.add(id);
    heading.attribs.id = id;
    return [{ id, title, level: Number(heading.name[1]) }];
  });

  const blockTags = new Set(['br', 'p', 'li', 'div', 'td', 'th', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
  const fragments: string[] = [];
  const collectText = (nodes: typeof document.children) => {
    for (const node of nodes) {
      if (node.type === 'text') fragments.push(node.data);
      if (!DomUtils.hasChildren(node)) continue;
      const block = DomUtils.isTag(node) && blockTags.has(node.name);
      if (block) fragments.push(' ');
      collectText(node.children);
      if (block) fragments.push(' ');
    }
  };
  collectText(document.children);
  const visible = fragments.join('');
  const hanCount = visible.match(/\p{Script=Han}/gu)?.length ?? 0;
  const wordCount = visible.replace(/\p{Script=Han}/gu, ' ').match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
  return {
    contentHtml: DomUtils.getInnerHTML(document),
    tableOfContents,
    readingTimeMinutes: Math.max(1, Math.ceil(hanCount / 400 + wordCount / 200)),
  };
}
