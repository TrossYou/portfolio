import type { HTMLAttributes, ReactNode } from 'react';

export type ProseProps = HTMLAttributes<HTMLElement> & {
  /** 마크다운 렌더 결과(h1~h3, p, a, blockquote, code, pre, table, img, hr) */
  children: ReactNode;
};

/** 케이스 스터디 본문. 최대 폭 680px, body 16/27. md의 첫 구분선 이후부터 넣는다. */
export function Prose({ children, className = '', ...rest }: ProseProps) {
  return (
    <article className={`ty-prose ${className}`.trim()} {...rest}>
      {children}
    </article>
  );
}
