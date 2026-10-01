import type { ReactNode } from 'react';

export type ChipProps = {
  children: ReactNode;
  /** 등급이 없는 '써 본 것' 항목은 outline. */
  outline?: boolean;
  className?: string;
};

/** 스택·태그 칩. tint 바탕, radius-pill, 28px. 한 줄에 8개까지. */
export function Chip({ children, outline = false, className = '' }: ChipProps) {
  return <span className={`ty-chip ${outline ? 'ty-chip--outline' : ''} ${className}`.trim()}>{children}</span>;
}
