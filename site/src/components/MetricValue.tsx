import type { Metric } from '@data/projects';

/** 숫자 한 줄. 이전 값 → 값 단위 / 분모. 모양은 디자인 시스템의 통계 타일 숫자와 같다 */
export default function MetricValue({ m }: { m: Pick<Metric, 'value' | 'from' | 'unit' | 'of'> }) {
  return (
    <span className="ty-stat__num">
      {m.from ? <span className="ty-stat__from">{m.from}</span> : null}
      {m.value}
      {m.unit ? <span className="ty-stat__unit">{m.unit}</span> : null}
      {m.of ? <span className="ty-stat__of">{m.of}</span> : null}
    </span>
  );
}
