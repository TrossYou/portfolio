import { Link } from 'react-router-dom';
import { KindTag, type Kind } from '@ds';
import type { Project } from '@data/projects';
import highlights from '@data/highlights.json';

/** data/highlights.json 의 장면 하나. source 는 내부 대조용이라 그리지 않는다 */
type Scene = { problem: string; decision: string; result: string; kind: string; source: string };

const scenesBySlug = highlights as Record<string, Scene[] | undefined>;

/** 케이스 스터디 장 표시와 같은 값. 모르는 값이면 표시 없이 그린다 */
const KIND: Record<string, Kind> = { 결정: 'decision', 틀림: 'mistake', 남김: 'residue' };

/**
 * 첫 화면 프로젝트 카드 아래의 장면 셋. 장면마다 종류 표시와 문제 · 판단 · 결과 세 줄.
 * 결과 줄이 가장 크다. 장면이 없는 프로젝트는 아무것도 그리지 않는다.
 */
export default function ProjectHighlights({ project }: { project: Pick<Project, 'slug' | 'name' | 'caseStudy'> }) {
  const scenes = scenesBySlug[project.slug];
  if (!scenes?.length) return null;
  return (
    <div className="highlights">
      <ol className="highlights__list" aria-label={`${project.name}에서 내린 판단`}>
        {scenes.map((s) => {
          const kind = KIND[s.kind];
          return (
            <li key={s.result} className="highlight">
              {kind ? <KindTag kind={kind} /> : null}
              <dl className="highlight__lines">
                <div>
                  <dt>문제</dt>
                  <dd>{s.problem}</dd>
                </div>
                <div>
                  <dt>판단</dt>
                  <dd>{s.decision}</dd>
                </div>
                <div className="highlight__result">
                  <dt>결과</dt>
                  <dd>{s.result}</dd>
                </div>
              </dl>
            </li>
          );
        })}
      </ol>
      {project.caseStudy ? (
        <Link
          className="ty-btn ty-btn--link highlights__more"
          to={`/work/${project.slug}`}
          aria-label={`${project.name} 케이스 스터디 더 읽기`}
        >
          케이스 스터디 더 읽기 →
        </Link>
      ) : null}
    </div>
  );
}
