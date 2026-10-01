import type { ReactNode } from 'react';

export type SectionHeaderProps = {
  /** 영문 대문자 아이브로우. 예: "Selected Work" */
  eyebrow: string;
  /** 한국어 제목 한 줄. 핵심 단어 하나에만 <Mark>를 감쌀 수 있다. */
  children: ReactNode;
  id?: string;
};

/** 섹션 머리. 아이브로우, h2, tint-strong 48×6 막대. 왼쪽 정렬. */
export function SectionHeader({ eyebrow, children, id }: SectionHeaderProps) {
  return (
    <div className="ty-section-head" id={id}>
      <span className="ty-eyebrow">{eyebrow}</span>
      <h2>{children}</h2>
    </div>
  );
}

/** 제목 단어 뒤 페리윙클 띠. 한 화면에 하나. */
export function Mark({ children }: { children: ReactNode }) {
  return <span className="ty-mark">{children}</span>;
}
