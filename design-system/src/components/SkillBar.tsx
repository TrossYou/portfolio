export type SkillLevel = 1 | 2 | 3 | 4;

export type Skill = { name: string; level: SkillLevel; /** 핵심 · 프론트엔드 · 백엔드 */ group?: string };

export type SkillBarProps = {
  /** group이 있으면 묶음 머리를 사이에 넣는다. 순서는 배열 순서 */
  skills: Skill[];
  /** 막대 없이 한 줄로 내리는 기술들 */
  used?: string[];
  /** 등급을 매긴 기준 한 줄 */
  criteria?: string;
};

/** 스킬 막대 목록. 묶음 머리 아래 5칸 세그먼트, 4는 accent, 3 이하는 tint-strong. 5는 쓰지 않는다. */
export function SkillBar({ skills, used, criteria }: SkillBarProps) {
  let lastGroup: string | undefined;
  return (
    <div className="col">
      {skills.map((s) => {
        const head = s.group && s.group !== lastGroup ? <p className="ty-skill-group">{s.group}</p> : null;
        lastGroup = s.group ?? lastGroup;
        return (
          <div key={s.name}>
            {head}
            <div className="ty-skill" data-level={s.level}>
              <span className="ty-skill__name">{s.name}</span>
              <span className="ty-skill__bar" aria-hidden="true">
                <i /><i /><i /><i /><i />
              </span>
              <span className="ty-skill__level">{s.level}/5</span>
            </div>
          </div>
        );
      })}
      {used && used.length ? <p className="ty-skill-note">써 본 것: {used.join(' · ')}</p> : null}
      {criteria ? <p className="ty-skill-note">기준: {criteria}</p> : null}
    </div>
  );
}
