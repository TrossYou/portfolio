export type TraitEvidenceProps = {
  /** 공고의 인재상 표현 그대로 짧게. 예: "스스로 일을 찾아서 한다" */
  trait: string;
  /** 실제로 한 일 한 문장 */
  evidence: string;
  /** 케이스 스터디의 해당 절 */
  sourceLabel: string;
  sourceHref: string;
};

/** 성향 카드. 점수 대신 근거 문장과 링크. 한 줄에 세 장까지. */
export function TraitEvidence({ trait, evidence, sourceLabel, sourceHref }: TraitEvidenceProps) {
  return (
    <div className="ty-card ty-trait">
      <span className="ty-chip ty-trait__label">{trait}</span>
      <p className="ty-trait__evidence">{evidence}</p>
      <p className="ty-trait__source">
        근거: <a href={sourceHref}>{sourceLabel}</a>
      </p>
    </div>
  );
}
