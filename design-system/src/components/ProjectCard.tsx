import type { MouseEvent, ReactNode } from 'react';

export type ProjectTag = { label: string; /** 대표작·수상 표시. 카드당 하나만 */ accent?: boolean };

export type ProjectCardProps = {
  /** 이름. 한 줄 소개 위에 작게 */
  name: string;
  /** 서비스 한 줄 소개. 카드의 제목(h3) */
  tagline: string;
  /** 소개 아래 한 문장. 없어도 된다 */
  summary?: string;
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
  /** 라우터로 이동할 때. 기본 동작을 막고 직접 이동한다 */
  onNavigate?: (e: MouseEvent<HTMLAnchorElement>) => void;
  /** 대표작 하나만. 이미지 왼쪽·글 오른쪽의 가로형 */
  featured?: boolean;
};

/** 프로젝트 카드. 스티커(ink 1.5px, radius-lg) 안에 태그·커버·이름(작게)·한 줄 소개(크게)·메타·배지. 카드 전체가 링크. 대표작은 featured. */
export function ProjectCard({ name, tagline, summary, meta, tags = [], cover, coverAlt = '', badges, href, onNavigate, featured = false }: ProjectCardProps) {
  // 카드 전체가 링크다. 제목 링크의 ::after 가 카드를 덮는다(components.css). 배지만 그 위에 뜬다.
  const title = href ? (
    <a className="ty-project__link" href={href} onClick={onNavigate}>
      {tagline}
    </a>
  ) : (
    tagline
  );
  const nameEl = <span className="ty-project__name">{name}</span>;
  const tagRow = tags.length ? (
    <div className="ty-project__tags">
      {tags.map((t) => <span key={t.label} className={`ty-tag ${t.accent ? 'ty-tag--accent' : ''}`.trim()}>{t.label}</span>)}
    </div>
  ) : null;
  // 캡처가 없으면 이름을 큰 글자로 놓는다. 가짜 화면을 그리지 않는다.
  const coverEl = cover ? (
    <span className="ty-project__cover">
      <img src={cover} alt={coverAlt} loading="lazy" />
    </span>
  ) : (
    <span className="ty-project__cover ty-project__cover--type" aria-hidden="true">
      <span>{name}</span>
    </span>
  );
  if (featured) {
    return (
      <article className="ty-sticker ty-project ty-project--featured">
        {coverEl}
        <div className="ty-project__body">
          {tagRow}
          {nameEl}
          <h3>{title}</h3>
          {summary ? <p>{summary}</p> : null}
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
      {nameEl}
      <h3>{title}</h3>
      {summary ? <p>{summary}</p> : null}
      <span className="ty-meta">{meta}</span>
      {badges ? <div className="ty-badges">{badges}</div> : null}
    </article>
  );
}
