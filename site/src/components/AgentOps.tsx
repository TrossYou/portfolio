import { Link } from 'react-router-dom';
import { StatTile } from '@ds';
import { findMetric } from '@data/projects';
import { agentOps } from '@data/site';

/**
 * AI 에이전트 운영 섹션. 세션 구성 그림 · 사람이 쥔 관문 · AI가 쓴 코드를 검증한 방법 · 작업 규모.
 * 그림은 SVG 대신 격자로 그려 좁은 화면에서도 글자가 줄지 않게 한다.
 */
export default function AgentOps() {
  const scale = agentOps.scale.map(findMetric).filter((m) => m !== undefined);
  return (
    <div className="ops">
      <p className="lead ops__lead">{agentOps.lead}</p>

      <figure className="ops-diagram" aria-label="세션 구성">
        <div className="ops-node ops-node--human">
          <strong>{agentOps.human.name}</strong>
          <span>{agentOps.human.does}</span>
        </div>
        <span className="ops-wire" aria-hidden="true" />
        <ol className="ops-sessions">
          {agentOps.sessions.map((s) => (
            <li key={s.name} className="ops-node">
              <span className="ops-node__head">
                <strong>{s.name}</strong>
                <span className="ops-count">{s.count}</span>
              </span>
              <span>{s.does}</span>
            </li>
          ))}
        </ol>
        <span className="ops-wire" aria-hidden="true" />
        <div className="ops-gate">
          <span className="ty-eyebrow">Gate</span>
          <strong>관문 훅 — 아래 명령은 허가 창에서 멈추고 제 클릭을 기다림</strong>
          <ul className="ops-gate__list">
            {agentOps.gates.map((g) => (
              <li key={g} className="ty-chip ty-chip--outline">
                {g}
              </li>
            ))}
          </ul>
        </div>
        <span className="ops-wire" aria-hidden="true" />
        <div className="ops-node ops-node--repo">
          <strong>팀 레포 · GitLab · Jira</strong>
        </div>
      </figure>

      <div className="ops-block">
        <h3 className="h3 ops-block__title">AI가 쓴 코드를 어떻게 검증했나</h3>
        <div className="ops-checks">
          {agentOps.checks.map((c) => (
            <div key={c.title} className="ty-card ops-check">
              <strong className="ops-check__title">{c.title}</strong>
              <p>{c.body}</p>
            </div>
          ))}
          <StatTile {...agentOps.reviewStat} />
        </div>
      </div>

      <div className="ops-block">
        <h3 className="h3 ops-block__title">작업 규모</h3>
        <div className="grid-4">
          {scale.map((m) => (
            <StatTile key={m.label} {...m} />
          ))}
        </div>
        <p className="body-sm note ops__note">{agentOps.scaleNote}</p>
      </div>

      <p>
        <Link className="ty-btn ty-btn--link" to="/harness">
          에이전트 하네스 케이스 스터디 읽기 →
        </Link>
      </p>
    </div>
  );
}
