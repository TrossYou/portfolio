export type MetaItem = { label: string; value: string };

export type MetaGridProps = { items: MetaItem[] };

/** 사실 격자. 라벨(영문 아이브로우) 위에 값. 상세 머리(기간·역할·규모·기여)와 Contact에 쓴다. 폼 대신. */
export function MetaGrid({ items }: MetaGridProps) {
  return (
    <dl className="ty-metagrid">
      {items.map((it) => (
        <div key={it.label}>
          <dt>{it.label}</dt>
          <dd>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
