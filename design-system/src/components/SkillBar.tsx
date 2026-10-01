import { Fragment } from 'react';

export type SkillLevel = 1 | 2 | 3 | 4;

export type Skill = { name: string; level: SkillLevel; /** 프론트엔드 · 백엔드 */ group: string };

export type SkillBarProps = {
  /** 묶음 순서는 처음 나타나는 순서 */
  skills: Skill[];
  /** 점 없이 한 줄로 내리는 기술들 */
  used?: string[];
  /** 등급 기준 한 줄. 구어체, 작게 */
  criteria?: string;
};

/** 스킬 표기. 묶음 머리 아래 항목이 두 열로 흐른다. 각 줄은 이름과 바로 옆 점 다섯 개. 4는 accent, 3 이하는 tint-strong. 5는 쓰지 않는다. */
export function SkillBar({ skills, used, criteria }: SkillBarProps) {
  const groups = [...new Set(skills.map((s) => s.group))];
  return (
    <div>
      <div className="ty-skills">
        {groups.map((g) => (
          <Fragment key={g}>
            <p className="ty-skill-group">{g}</p>
            {skills
              .filter((s) => s.group === g)
              .map((s) => (
                <div className="ty-skill" data-level={s.level} aria-label={`${s.name} ${s.level}/5`} key={s.name}>
                  <span className="ty-skill__name">{s.name}</span>
                  <span className="ty-skill__dots" aria-hidden="true">
                    <i /><i /><i /><i /><i />
                  </span>
                </div>
              ))}
          </Fragment>
        ))}
      </div>
      {(used && used.length) || criteria ? (
        <div className="ty-skill-notes">
          {used && used.length ? <p className="ty-skill-note">써 본 것: {used.join(' · ')}</p> : null}
          {criteria ? <p className="ty-skill-note">{criteria}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
