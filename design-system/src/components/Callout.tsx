import type { ReactNode } from 'react';

export type CalloutProps = {
  /** 영문 아이브로우. 예: "Note" */
  label?: string;
  children: ReactNode;
};

/** 콜아웃. tint 바탕, radius-md, 왼쪽 색띠 없음. 마크다운 `> [!NOTE]`가 렌더되는 모습. */
export function Callout({ label = 'Note', children }: CalloutProps) {
  return (
    <div className="ty-callout">
      <span className="ty-eyebrow">{label}</span>
      {typeof children === 'string' ? <p>{children}</p> : children}
    </div>
  );
}
