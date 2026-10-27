import { useMemo, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Link } from 'react-router-dom';
import { KindTag } from '@ds';
import { mapHref, mapSrc, parseHeading, slugify, type Chapter } from '../lib/markdown';

function toText(children: ReactNode): string {
  if (children == null || typeof children === 'boolean') return '';
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(toText).join('');
  if (typeof children === 'object' && 'props' in children) {
    return toText((children as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

type MdNode = {
  type: string;
  children?: MdNode[];
  position?: { start: { line: number }; end: { line: number } };
  data?: { hProperties?: Record<string, unknown> };
};

/** 개조식 본문은 빈 줄로 불릿 묶음을 나눈다. 렌더하면 한 목록으로 합쳐지므로 묶음의 첫 항목에 표시를 붙인다 */
function remarkListGroups() {
  return (tree: MdNode) => {
    const walk = (node: MdNode) => {
      if (node.type === 'list' && node.children) {
        node.children.forEach((item, i) => {
          const prev = node.children?.[i - 1];
          if (prev?.position && item.position && item.position.start.line - prev.position.end.line > 1) {
            item.data = { ...item.data, hProperties: { ...item.data?.hProperties, className: 'li-gap' } };
          }
        });
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}

/** 장의 종류는 렌더 전에 주석이 지워지므로, 미리 뽑아 둔 장 목록에서 id 로 찾는다 */
function buildComponents(chapters: Chapter[]): Components {
  const kinds = new Map(chapters.map((c) => [c.id, c.kind]));
  return {
    h2({ children }) {
      const { title } = parseHeading(toText(children));
      const id = slugify(title);
      const kind = kinds.get(id);
      return (
        <>
          {kind ? <KindTag kind={kind} /> : null}
          <h2 id={id} style={kind ? { marginTop: 'var(--space-2)' } : undefined}>
            {title}
          </h2>
        </>
      );
    },
    h3({ children }) {
      const { title } = parseHeading(toText(children));
      return <h3 id={slugify(title)}>{title}</h3>;
    },
    a({ href = '', children }) {
      const { to, external } = mapHref(href);
      if (external) {
        return (
          <a href={to} target="_blank" rel="noreferrer">
            {children}
          </a>
        );
      }
      return <Link to={to}>{children}</Link>;
    },
    img({ src = '', alt = '', width }) {
      return <img src={mapSrc(String(src))} alt={alt} width={width} loading="lazy" />;
    },
    table({ children }) {
      return (
        <div style={{ overflowX: 'auto' }}>
          <table>{children}</table>
        </div>
      );
    },
  };
}

export default function Markdown({ body, chapters }: { body: string; chapters: Chapter[] }) {
  const components = useMemo(() => buildComponents(chapters), [chapters]);
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm, remarkListGroups]} rehypePlugins={[rehypeRaw]} components={components}>
      {body}
    </ReactMarkdown>
  );
}
