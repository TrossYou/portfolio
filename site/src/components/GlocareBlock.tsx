import { Link } from 'react-router-dom';
import { findMetric, projects } from '@data/projects';
import type { Metric } from '@data/projects';
import { glocareBars, glocareScale } from '@data/site';

const num = (v?: string) => Number((v ?? '').replace(/[^0-9.]/g, ''));
const defined = (m: Metric | undefined): m is Metric => m !== undefined;

/** 글로케어: 소개 · 스위치 14개 그림 · 속도 막대 · 작업 규모 */
export default function GlocareBlock() {
  const p = projects.find((x) => x.slug === 'glocare');
  const stage = findMetric('glocare-stage');
  const bars = glocareBars.map(findMetric).filter(defined);
  const scale = glocareScale.map(findMetric).filter(defined);
  if (!p || !stage) return null;
  const toggles = Number(stage.from);

  return (
    <div id="glocare" className="glocare">
      <div className="glocare__head">
        <div className="glocare__title">
          <span className="ty-eyebrow">해온 일 · {p.period}</span>
          <h2 className="glocare__h2">글로케어 — 외국인 요양보호사 교육 회사의 직원용 관리자 화면</h2>
        </div>
        {p.aiMode ? <span className="ty-badge ty-badge--quiet">{p.aiMode}</span> : null}
      </div>
      <p className="glocare__lead">{p.summary}</p>
      {p.roles ? (
        <ul className="roles" aria-label="글로케어에서 맡은 일">
          {p.roles.map((r) => (
            <li key={r.name} className="role">
              <strong className="role__name">{r.name}</strong>
              <span className="role__line">{r.line}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="glocare__cards">
        <div className="ty-card gcard">
          <span className="gcard__kicker">수동 업무 자동화</span>
          <strong className="gcard__title">결제 · 배정 기록이 쌓이면 진행 단계가 스스로 바뀌게</strong>
          <div className="toggles" aria-hidden="true">
            {Array.from({ length: toggles }, (_, i) => (
              <i key={i} />
            ))}
          </div>
          <div className="gcard__fromto">
            <span className="gcard__from">{stage.from}</span>
            <span className="gcard__arrow" aria-hidden="true">
              →
            </span>
            <span className="gcard__to">{stage.value}</span>
            <span className="gcard__unit">직원이 직접 켜는 칸</span>
          </div>
          <span className="gcard__basis">기준 · {stage.source}</span>
        </div>

        <div className="ty-card gcard">
          <span className="gcard__kicker">속도</span>
          <strong className="gcard__title">AI가 비교를 접자고 할 때 다시 재게 하고, 숫자로 확인된 것만 남겼습니다</strong>
          <ul className="bars">
            {bars.map((m) => {
              const pct = Math.round((num(m.value) / num(m.from)) * 100);
              const label = m.label.split('.')[0];
              return (
                <li key={m.label} className="bar">
                  <span className="bar__row">
                    <span className="bar__what">{label}</span>
                    <span className="bar__val">
                      <span className="bar__from">
                        {m.from}
                        {m.unit}
                      </span>{' '}
                      → <b>{m.value}{m.unit}</b>
                    </span>
                  </span>
                  <span className="bar__track">
                    <span className="bar__fill" style={{ width: `${pct}%` }} />
                  </span>
                  <span className="bar__basis">기준 · {m.source}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="glocare__foot">
        <Link className="glocare__more" to="/work/glocare">
          글로케어에서 정한 것과 틀린 것 →
        </Link>
        <span className="glocare__scale">
          머지된 MR {scale[0]?.value}건 · 완료한 작업 티켓 {scale[1]?.value}건 · 기준 SSAFY GitLab · Jira, 2026.11.20 조회
        </span>
      </div>
    </div>
  );
}
