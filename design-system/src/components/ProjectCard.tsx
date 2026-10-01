import type { ReactNode } from 'react';

export type ProjectTag = { label: string; /** 대표작·수상 표시. 카드당 하나만 */ accent?: boolean };

export type ProjectCardProps = {
  name: string;
  /** 서비스 한 줄 설명. 두 문장 이상 쓰지 않는다. */
  tagline: string;
  /** "2026.08–09 · 6주 · 5인 · SSAFY · 역할" 순서 고정 */
  meta: string;
  /** 맥락 태그(SSAFY · 공모전 · 수업)와 대표작·수상 표시 */
  tags?: ProjectTag[];
  /** 16:9 캡처 또는 GIF 경로. featured는 4:3 */
  cover?: string;
  coverAlt?: string;
  /** <Badge> 들 */
  badges?: ReactNode;
  href?: string;
  /** 대표작 하나만. 이미지 왼쪽·글 오른쪽의 가로형 */
  featured?: boolean;
};

/** 프로젝트 카드. 스티커(ink 1.5px, radius-lg) 안에 태그·커버·이름·설명·메타·배지. 대표작은 featured. */
export function ProjectCard({ name, tagline, meta, tags = [], cover, coverAlt = '', badges, href, featured = false }: ProjectCardProps) {
  const title = href ? <a href={href}>{name}</a> : name;
  const tagRow = tags.length ? (
    <div className="ty-project__tags">
      {tags.map((t) => <span key={t.label} className={`ty-tag ${t.accent ? 'ty-tag--accent' : ''}`.trim()}>{t.label}</span>)}
    </div>
  ) : null;
  const coverEl = (
    <span className="ty-project__cover" aria-hidden={cover ? undefined : true}>
      {cover ? <img src={cover} alt={coverAlt} loading="lazy" /> : null}
    </span>
  );
  if (featured) {
    return (
      <article className="ty-sticker ty-project ty-project--featured">
        {coverEl}
        <div className="ty-project__body">
          {tagRow}
          <h3>{title}</h3>
          <p>{tagline}</p>
          <span className="ty-meta">{meta}</span>
          {badges ? <div className="ty-badges">{badges}</div> : null}
        </div>
      </article>
    );
  }
  return (
    <article className="ty-sticker ty-project">
      {tagRow}
      {coverEl}
      <h3>{title}</h3>
      <p>{tagline}</p>
      <span className="ty-meta">{meta}</span>
      {badges ? <div className="ty-badges">{badges}</div> : null}
    </article>
  );
}
