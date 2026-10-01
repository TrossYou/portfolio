export type SkillLevel = 1 | 2 | 3 | 4;

export type Skill = { name: string; level: SkillLevel };

export type SkillBarProps = {
  skills: Skill[];
  /** 막대 없이 한 줄로 내리는 기술들 */
  used?: string[];
  /** 등급을 매긴 기준 한 줄 */
  criteria?: string;
};

/** 스킬 막대 목록. 5칸 세그먼트, 4는 accent, 3 이하는 tint-strong. 5는 쓰지 않는다. */
export function SkillBar({ skills, used, criteria }: SkillBarProps) {
  return (
    <div className="col">
      {skills.map((s) => (
        <div className="ty-skill" data-level={s.level} key={s.name}>
          <span className="ty-skill__name">{s.name}</span>
          <span className="ty-skill__bar" aria-hidden="true">
            <i /><i /><i /><i /><i />
          </span>
          <span className="ty-skill__level">{s.level}/5</span>
        </div>
      ))}
      {used && used.length ? <p className="ty-skill-note">써 본 것: {used.join(' · ')}</p> : null}
      {criteria ? <p className="ty-skill-note">기준: {criteria}</p> : null}
    </div>
  );
}
