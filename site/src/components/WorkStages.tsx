import type { Stage } from '@data/site';
import { stages } from '@data/site';

/** 단계마다 작은 그림. 「나」 상자 하나에서 AI 상자가 늘어나는 모양 */
function Diagram({ kind }: { kind: Stage['kind'] }) {
  return (
    <div className="stage__fig" aria-hidden="true">
      <span className="stage__me">나</span>
      {kind === 'one' ? (
        <>
          <span className="stage__arrow">→</span>
          <span className="stage__col">
            <i className="stage__box stage__box--wide" />
            <i className="stage__box stage__box--wide" />
          </span>
        </>
      ) : null}
      {kind === 'roles' ? (
        <>
          <span className="stage__arrow">→</span>
          <span className="stage__col">
            <i className="stage__tag">지시 · 검토</i>
            <i className="stage__tag">실행</i>
            <i className="stage__tag stage__tag--study">공부</i>
          </span>
        </>
      ) : null}
      {kind === 'team' ? (
        <>
          <i className="stage__gate" title="허가" />
          <span className="stage__grid">
            {[0, 1, 2].map((i) => (
              <i key={`r${i}`} className="stage__box" />
            ))}
            {[0, 1, 2, 3, 4].map((i) => (
              <i key={`f${i}`} className="stage__box stage__box--on" />
            ))}
          </span>
        </>
      ) : null}
    </div>
  );
}

/** 일하는 방식: 프로젝트마다 AI와 일을 나눈 폭이 넓어진 네 단계 */
export default function WorkStages() {
  return (
    <ol className="stages">
      {stages.map((s, i) => (
        <li key={s.title} className={`stage${i === stages.length - 1 ? ' stage--now' : ''}`}>
          <span className="stage__when">{s.when}</span>
          <Diagram kind={s.kind} />
          <strong className="stage__title">{s.title}</strong>
          <p className="stage__body">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
