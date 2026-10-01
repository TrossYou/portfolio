import type { ReactNode } from 'react';
import { SectionHeader } from '@ds';
import { useReveal } from '../lib/hooks';

type Props = { id: string; eyebrow: string; title: ReactNode; children: ReactNode };

/** 홈의 섹션 하나. 머리와 본문, 등장 효과 */
export default function Section({ id, eyebrow, title, children }: Props) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id={id} ref={ref} className="section reveal">
      <SectionHeader eyebrow={eyebrow}>{title}</SectionHeader>
      {children}
    </section>
  );
}
