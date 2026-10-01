export type DataTableProps = {
  head: string[];
  rows: string[][];
  /** mono·tabular로 정렬할 열의 인덱스 */
  numericColumns?: number[];
};

/** 표. 머리글은 eyebrow 스타일에 tint 바탕. overflow-x 컨테이너에 싸여 있다. */
export function DataTable({ head, rows, numericColumns = [] }: DataTableProps) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="ty-table">
        <thead>
          <tr>{head.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => <td key={j} className={numericColumns.includes(j) ? 'num' : undefined}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
