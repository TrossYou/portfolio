export type Chapter = { id: string; title: string };

export type ChapterNavProps = {
  chapters: Chapter[];
  /** 현재 보고 있는 장의 id */
  currentId?: string;
};

/** 장 목록. 케이스 스터디 h2를 번호와 함께 나열. 데스크톱에서는 본문 왼쪽에 고정. */
export function ChapterNav({ chapters, currentId }: ChapterNavProps) {
  return (
    <ol className="ty-chapternav">
      {chapters.map((c, i) => (
        <li key={c.id}>
          <a href={`#${c.id}`} aria-current={c.id === currentId ? 'true' : undefined}>
            <span className="n">{String(i + 1).padStart(2, '0')}</span>
            {c.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
