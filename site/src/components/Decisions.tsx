import { decisions } from '@data/site';
import { withBase } from '../lib/links';
import { slugify } from '../lib/slug';

/** 기능보다 먼저 정한 기준. 카드마다 질문 · 접은 안 · 고른 안 · 몫, 근거 장으로 가는 링크 */
export default function Decisions() {
  return (
    <ol className="decisions">
      {decisions.map((d) => (
        <li key={d.question} className="decision">
          <span className="decision__project">{d.project}</span>
          <strong className="decision__q">{d.question}</strong>
          <p className="decision__opt decision__opt--no">
            <span className="decision__mark" aria-label="접은 안">✕</span>
            <span>{d.rejected}</span>
          </p>
          <p className="decision__opt decision__opt--yes">
            <span className="decision__mark" aria-label="고른 안">✓</span>
            <span>{d.chosen}</span>
          </p>
          {d.result ? <p className="decision__result">{d.result}</p> : null}
          <p className="decision__share">{d.share}</p>
          <a className="decision__link" href={withBase(`/work/${d.slug}#${slugify(d.chapter)}`)}>
            케이스 스터디에서 보기 →
          </a>
        </li>
      ))}
    </ol>
  );
}
