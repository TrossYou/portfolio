import type { AnchorHTMLAttributes, ReactNode } from 'react';

export type BadgeKind = 'Live' | 'Demo' | 'Case Study' | 'Repo';

export type BadgeProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** 네 종류 중 하나. 다른 라벨은 quiet 변형에만 쓴다. */
  label: BadgeKind | string;
  /** tint 바탕의 조용한 변형. 외부가 아닌 안쪽 링크에. */
  quiet?: boolean;
};

/** 이동 배지. accent 채움에 on-accent 글자, eyebrow 스타일, radius-sm. */
export function Badge({ label, quiet = false, className = '', ...rest }: BadgeProps) {
  return (
    <a className={`ty-badge ${quiet ? 'ty-badge--quiet' : ''} ${className}`.trim()} {...rest}>
      {label}
    </a>
  );
}

export type BadgeRowProps = { children: ReactNode };
/** 배지를 가로로 묶는다. 카드와 케이스 스터디 머리에서 쓴다. */
export function BadgeRow({ children }: BadgeRowProps) {
  return <div className="ty-badges">{children}</div>;
}
