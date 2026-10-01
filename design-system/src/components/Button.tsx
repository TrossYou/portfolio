import type { AnchorHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** primary: 채움(한 화면에 하나) · outline: ink 1.5px 테두리 · link: 문장 끝 링크 */
  variant?: 'primary' | 'outline' | 'link';
  children: ReactNode;
};

/** 행동 버튼. 44px 높이의 알약형. 아이콘은 "→" 글자 하나만 허용한다. */
export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  return (
    <a className={`ty-btn ty-btn--${variant} ${className}`.trim()} {...rest}>
      {children}
    </a>
  );
}
