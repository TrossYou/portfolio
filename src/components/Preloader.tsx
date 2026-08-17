import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

/** 0 → 100 카운터 뒤 위로 걷히는 인트로. 세션당 한 번만 보여준다. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const seen = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('intro') === '1';
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(!seen);

  useEffect(() => {
    if (seen) {
      onDone();
      return;
    }
    const started = performance.now();
    const total = 1400;

    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - started) / total);
      // 끝으로 갈수록 느려지게
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem('intro', '1');
        setTimeout(() => {
          setOpen(false);
          onDone();
        }, 260);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, onDone]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-between bg-[var(--color-ink)] px-6 pb-8 md:px-12 md:pb-12"
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="text-[var(--color-paper)] text-sm tracking-widest uppercase opacity-60">
            Yoo Seungju — Frontend
          </span>
          <span
            className="text-[var(--color-paper)] leading-none font-medium tabular-nums"
            style={{ fontSize: 'clamp(4rem, 14vw, 12rem)' }}
          >
            {count}
          </span>
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-[var(--color-accent)]"
            style={{ width: `${count}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
