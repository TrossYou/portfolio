import { Link } from 'react-router-dom';
import type { Project } from '@data/projects';
import { metaLine } from '@data/projects';
import Screen from './Screen';
import MetricValue from './MetricValue';
import ProjectBadges from './ProjectBadges';

/** exclude: 히어로에 이미 오른 숫자의 key. 카드에서는 그다음 숫자를 쓴다 */
type Props = { project: Project; wide?: boolean; eager?: boolean; exclude?: string[] };

/**
 * 대표 셋 카드. 실제 화면 · 이름과 한 줄 소개 · 한 문장 · 역할 · 숫자 둘 · 링크.
 * 제목이 케이스 스터디로 가는 링크이고, 링크 배지는 따로 눌린다.
 */
export default function FeaturedWork({ project: p, wide = false, eager = false, exclude = [] }: Props) {
  const cover = p.screens?.[0];
  const stats = p.metrics.filter((m) => !m.key || !exclude.includes(m.key)).slice(0, 2);
  return (
    <article className={`ty-sticker fw${wide ? ' fw--wide' : ''}`}>
      {cover ? <Screen screen={cover} eager={eager} className="fw__screen" showCaption={false} /> : null}
      <div className="fw__body">
        {p.tags.length ? (
          <div className="ty-project__tags">
            {p.tags.map((t) => (
              <span key={t.label} className={`ty-tag${t.accent ? ' ty-tag--accent' : ''}`}>
                {t.label}
              </span>
            ))}
          </div>
        ) : null}
        <span className="ty-project__name">{p.name}</span>
        <h3 className="fw__title">
          {p.caseStudy ? <Link to={`/work/${p.slug}`}>{p.tagline}</Link> : p.tagline}
        </h3>
        {p.summary ? <p className="fw__summary">{p.summary}</p> : null}
        <span className="ty-meta">{metaLine(p)}</span>
        {stats.length ? (
          <dl className="fw__stats">
            {stats.map((m) => (
              <div key={m.label} className="fw__stat">
                <dt className="visually-hidden">{m.label}</dt>
                <dd>
                  <MetricValue m={m} />
                  <span className="fw__stat-label">{m.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        <ProjectBadges project={p} withNotes={wide} />
      </div>
    </article>
  );
}
