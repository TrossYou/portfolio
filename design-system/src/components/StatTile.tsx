export type StatTileProps = {
  /** 강조할 값 하나. 큰 글자, accent-text. 예: "149" */
  value: string;
  /** 전후 비교의 이전 값. 화살표가 자동으로 붙는다. 예: "913ms" */
  from?: string;
  /** 분모. 예: "/ 692" */
  of?: string;
  /** 단위. 예: "ms", "건" */
  unit?: string;
  label: string;
  /** 무엇을 어떻게 셌는지. 없는 타일은 만들지 않는다. */
  source: string;
};

/** 통계 타일. 숫자(num, mono) · 설명 · 출처 세 층. 강조 값은 하나, 줄바꿈 없음. */
export function StatTile({ value, from, of, unit, label, source }: StatTileProps) {
  return (
    <div className="ty-card ty-stat">
      <span className="ty-stat__num">
        {from ? <span className="ty-stat__from">{from}</span> : null}
        {value}
        {unit ? <span className="ty-stat__unit">{unit}</span> : null}
        {of ? <span className="ty-stat__of">{of}</span> : null}
      </span>
      <span className="ty-stat__label">{label}</span>
      <span className="ty-stat__source">{source}</span>
    </div>
  );
}
