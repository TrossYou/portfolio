export type TimelineKind = '교육' | '프로젝트' | '자격' | '수상' | '활동';

export type TimelineItem = {
  /** "2026.01.07 – 06" 같은 날짜 범위 */
  date: string;
  /** 날짜 옆 종류 태그 */
  kind?: TimelineKind;
  title: string;
  desc?: string;
  /** 두세 줄까지. 그 이상은 케이스 스터디로 */
  details?: string[];
  /** 진행 중이면 점을 채운다 */
  now?: boolean;
};

export type TimelineProps = { items: TimelineItem[] };

/** 활동 타임라인. tint-strong 레일 하나에 accent 점, 날짜 옆 종류 태그. 가로 타임라인은 만들지 않는다. */
export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="ty-timeline">
      {items.map((it) => (
        <li className={it.now ? 'now' : undefined} data-kind={it.kind} key={it.date + it.title}>
          <span className="ty-timeline__date">
            {it.date}
            {it.kind ? <span className="ty-tag">{it.kind}</span> : null}
          </span>
          <p className="ty-timeline__title">{it.title}</p>
          {it.desc ? <p className="ty-timeline__desc">{it.desc}</p> : null}
          {it.details && it.details.length ? (
            <ul className="ty-timeline__details">{it.details.map((d) => <li key={d}>{d}</li>)}</ul>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
