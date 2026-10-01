import { useEffect, useRef, useState } from 'react';
import { useHasPointer } from '../lib/hooks';

/**
 * 커스텀 커서. 링크·버튼 위에서는 커지고, data-cursor 값이 있으면 문구를 띄운다.
 * 포인터가 없는 기기(터치)에서는 아예 렌더하지 않는다.
 */
export default function Cursor() {
  const hasPointer = useHasPointer();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [big, setBig] = useState(false);

  useEffect(() => {
    if (!hasPointer) return;

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const eased = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      const el = (e.target as HTMLElement)?.closest<HTMLElement>('a, button, [data-cursor]');
      setBig(!!el);
      setLabel(el?.dataset.cursor ?? '');
    };

    const loop = () => {
      eased.x += (target.x - eased.x) * 0.16;
      eased.y += (target.y - eased.y) * 0.16;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    document.documentElement.style.cursor = 'none';

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = '';
    };
  }, [hasPointer]);

  if (!hasPointer) return null;

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
      </div>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[99] hidden md:block"
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border transition-[width,height,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: big ? (label ? 84 : 52) : 28,
            height: big ? (label ? 84 : 52) : 28,
            borderColor: 'var(--color-accent)',
            backgroundColor: label ? 'var(--color-accent)' : 'transparent',
          }}
        >
          {label && (
            <span className="text-[10px] font-medium tracking-wider text-white uppercase">
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
