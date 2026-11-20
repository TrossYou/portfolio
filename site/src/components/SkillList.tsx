import { Fragment } from 'react';
import skills from '@data/skills.json';

type Rated = { group: string; name: string; level: number; evidence: string; can?: string };

/**
 * 스킬. 묶음마다 기술 이름 · 점 다섯 · 「할 수 있는 것」 한 줄.
 * 점 모양은 디자인 시스템 SkillBar 와 같은 클래스를 쓰고, 설명 줄만 더한다.
 */
export default function SkillList() {
  const rated = skills.rated as Rated[];
  const groups = [...new Set(rated.map((s) => s.group))];
  return (
    <div className="skills">
      <div className="skills__grid">
        {groups.map((g) => (
          <Fragment key={g}>
            <p className="ty-skill-group">{g}</p>
            {rated
              .filter((s) => s.group === g)
              .map((s) => (
                <div key={s.name} className="skill">
                  <div className="ty-skill" data-level={s.level} aria-label={`${s.name} ${s.level}/5`}>
                    <span className="ty-skill__name">{s.name}</span>
                    <span className="ty-skill__dots" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                  </div>
                  {s.can ? <p className="skill__can">{s.can}</p> : null}
                </div>
              ))}
          </Fragment>
        ))}
      </div>
      <div className="ty-skill-notes">
        <p className="ty-skill-note">써 본 것: {skills.used.join(' · ')}</p>
        <p className="ty-skill-note">{skills.scale}</p>
      </div>
    </div>
  );
}
