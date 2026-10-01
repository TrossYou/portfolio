import type { ReactNode } from 'react';

/**
 * 케이스 스터디 본문에서 쓰는 최소 마크업만 처리한다.
 * **강조** 와 `코드` 두 가지.
 */
export default function RichText({ children }: { children: string }) {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(children)) !== null) {
    if (match.index > last) nodes.push(children.slice(last, match.index));
    const token = match[0];

    if (token.startsWith('**')) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(
        <code
          key={key++}
          className="rounded bg-[var(--color-accent-soft)] px-1.5 py-0.5 font-mono text-[0.85em] text-[var(--color-accent)]"
        >
          {token.slice(1, -1)}
        </code>,
      );
    }
    last = match.index + token.length;
  }
  if (last < children.length) nodes.push(children.slice(last));

  return <>{nodes}</>;
}
