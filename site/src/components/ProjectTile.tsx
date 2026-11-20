import { Link } from 'react-router-dom';
import type { Project } from '@data/projects';

const asset = (f: string) => `${import.meta.env.BASE_URL}${f}`;

/** FINCH · PinLog 카드. 화면 · 이름과 단계 배지 · 한 줄 소개 · 제가 한 일 · 결과. 카드 전체가 케이스 스터디로 간다 */
export default function ProjectTile({ project: p }: { project: Project }) {
  const cover = p.cover ?? p.screens?.[0]?.src;
  const alt = p.screens?.find((s) => s.src === cover)?.alt ?? `${p.name} 화면`;
  return (
    <Link className="tile" to={`/work/${p.slug}`}>
      {cover ? <img className="tile__img" src={asset(cover)} alt={alt} loading="lazy" decoding="async" /> : null}
      <span className="tile__body">
        <span className="tile__top">
          <span className="tile__name">{p.name}</span>
          {p.aiMode ? <span className="ty-badge ty-badge--quiet">{p.aiMode}</span> : null}
        </span>
        <span className="tile__what">
          {p.tagline} · {p.period} · {p.team}
        </span>
        {p.did ? (
          <span className="tile__did">
            <span className="tile__did-label">제가 한 일 · {p.did}</span>
            {p.result ? <span className="tile__result">{p.result}</span> : null}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
