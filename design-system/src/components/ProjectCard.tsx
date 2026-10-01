import type { ReactNode } from 'react';

export type ProjectCardProps = {
  name: string;
  /** 서비스 한 줄 설명. 두 문장 이상 쓰지 않는다. */
  tagline: string;
  /** "2026.08–09 · 6주 · 5인 · SSAFY" 순서 고정 */
  meta: string;
  /** 16:9 캡처 또는 GIF 경로 */
  cover?: string;
  coverAlt?: string;
  /** <Badge> 들 */
  badges?: ReactNode;
  href?: string;
};

/** 프로젝트 카드. 스티커(ink 1.5px, radius-lg) 안에 커버·이름·설명·메타·배지. 한 화면에 네 장까지. */
export function ProjectCard({ name, tagline, meta, cover, coverAlt = '', badges, href }: ProjectCardProps) {
  const title = href ? <a href={href}>{name}</a> : name;
  return (
    <article className="ty-sticker ty-project">
      <span className="ty-project__cover" aria-hidden={cover ? undefined : true}>
        {cover ? <img src={cover} alt={coverAlt} loading="lazy" /> : null}
      </span>
      <h3>{title}</h3>
      <p>{tagline}</p>
      <span className="ty-meta">{meta}</span>
      {badges ? <div className="ty-badges">{badges}</div> : null}
    </article>
  );
}
