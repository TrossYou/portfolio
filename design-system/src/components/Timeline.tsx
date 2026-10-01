export type TimelineItem = {
  /** "2026.01.07 – 06" 같은 날짜 범위 */
  date: string;
  title: string;
  desc?: string;
  /** 진행 중이면 점을 채운다 */
  now?: boolean;
};

export type TimelineProps = { items: TimelineItem[] };

/** 세로 타임라인. tint-strong 레일 하나에 accent 점. 가로 타임라인은 만들지 않는다. */
export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="ty-timeline">
      {items.map((it) => (
        <li className={it.now ? 'now' : undefined} key={it.date + it.title}>
          <span className="ty-timeline__date">{it.date}</span>
          <p className="ty-timeline__title">{it.title}</p>
          {it.desc ? <p className="ty-timeline__desc">{it.desc}</p> : null}
        </li>
      ))}
    </ol>
  );
}
