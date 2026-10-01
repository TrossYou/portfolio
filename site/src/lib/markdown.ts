/**
 * case-studies/*.md 를 읽어 사이트가 쓰는 모양으로 바꾼다.
 * - 머리 블록(첫 구분선까지)은 버린다. 사실은 data/ 에서 온다.
 * - h2 를 장으로 삼고, GitHub 와 같은 규칙으로 id 를 만든다.
 * - h2 끝의 <!-- kind: 결정|틀림|남김 --> 주석을 장의 종류로 읽는다.
 */

const files = import.meta.glob('../../../case-studies/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export type Kind = 'decision' | 'mistake' | 'residue';

export type Chapter = { id: string; title: string; kind?: Kind };

export type CaseStudy = { body: string; chapters: Chapter[] };

const KIND: Record<string, Kind> = { 결정: 'decision', 틀림: 'mistake', 남김: 'residue' };

/** GitHub 제목 앵커 규칙: 소문자, 글자·숫자·공백·하이픈만 남기고 공백은 하이픈 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** 제목 텍스트에서 종류 주석을 떼어 낸다 */
export function parseHeading(raw: string): { title: string; kind?: Kind } {
  const m = raw.match(/<!--\s*kind:\s*(결정|틀림|남김)\s*-->/);
  const title = raw.replace(/<!--[\s\S]*?-->/g, '').trim();
  return { title, kind: m ? KIND[m[1]] : undefined };
}

function stripHeader(text: string): string {
  const i = text.indexOf('\n---\n');
  return i === -1 ? text : text.slice(i + 5);
}

/** GitHub 의 > [!NOTE] 블록을 콜아웃 라벨로 바꾼다 */
function convertAlerts(text: string): string {
  return text.replace(/^> \[!(NOTE|TIP|IMPORTANT|WARNING)\]\s*$/gm, (_m, k: string) => {
    const label = k.charAt(0) + k.slice(1).toLowerCase();
    return `> <span class="ty-eyebrow">${label}</span>`;
  });
}

export function loadCaseStudy(slug: string): CaseStudy | null {
  const key = Object.keys(files).find((k) => k.endsWith(`/${slug}.md`));
  if (!key) return null;
  const body = convertAlerts(stripHeader(files[key]));
  const chapters: Chapter[] = [];
  for (const line of body.split('\n')) {
    if (!line.startsWith('## ')) continue;
    const { title, kind } = parseHeading(line.slice(3));
    chapters.push({ id: slugify(title), title, kind });
  }
  return { body, chapters };
}

/** md 안의 상대 링크를 사이트 경로로 */
export function mapHref(href: string): { to: string; external: boolean } {
  if (/^(https?:)?\/\//.test(href) || href.startsWith('mailto:')) return { to: href, external: true };
  if (href.startsWith('_archive/')) {
    return { to: `https://github.com/TrossYou/portfolio/blob/main/case-studies/${href}`, external: true };
  }
  const m = href.match(/^([a-z-]+)\.md(#.*)?$/);
  if (m) {
    const [, name, hash = ''] = m;
    const to = name === 'harness' ? `/harness${hash}` : `/work/${name}${hash}`;
    return { to, external: false };
  }
  return { to: href, external: false };
}

/** md 안의 ../assets/파일 을 사이트 자산 경로로 */
export function mapSrc(src: string): string {
  const m = src.match(/^(?:\.\.\/)+assets\/(.+)$/);
  return m ? `${import.meta.env.BASE_URL}${m[1]}` : src;
}
