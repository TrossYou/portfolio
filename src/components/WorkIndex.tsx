import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { projects } from '../data/projects';

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

/**
 * 프로젝트 목록. 행에 커서를 올리면 미리보기가 커서를 따라온다.
 * 터치 기기에서는 미리보기 대신 카드 안에 이미지를 그대로 둔다.
 */
export default function WorkIndex() {
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.4 });
  const wrap = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left - 190);
    y.set(e.clientY - r.top - 130);
  };

  return (
    <div ref={wrap} onPointerMove={onMove} className="relative">
      {/* 커서를 따라다니는 미리보기 */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute top-0 left-0 z-20 hidden lg:block"
      >
        <motion.div
          animate={{
            opacity: hover !== null ? 1 : 0,
            scale: hover !== null ? 1 : 0.85,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-[260px] w-[380px] overflow-hidden rounded-lg shadow-2xl"
        >
          {projects.map((p, i) =>
            p.hoverPreview || p.cover ? (
              <img
                key={p.slug}
                src={asset(p.hoverPreview ?? p.cover!)}
                alt=""
                className="h-full w-full object-cover"
                style={{ display: hover === i ? 'block' : 'none' }}
              />
            ) : (
              <div
                key={p.slug}
                className="flex h-full w-full items-center justify-center text-5xl font-semibold text-white"
                style={{ background: p.accent, display: hover === i ? 'flex' : 'none' }}
              >
                {p.name}
              </div>
            ),
          )}
        </motion.div>
      </motion.div>

      <ul className="border-t">
        {projects.map((p, i) => (
          <li key={p.slug} className="border-b">
            <Link
              to={`/work/${p.slug}`}
              data-cursor="View"
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              className="group relative block overflow-hidden py-8 md:py-12"
            >
              {/* 호버 시 차오르는 배경 */}
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--color-ink)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
              />

              <div className="relative flex items-baseline gap-5 px-1 transition-colors duration-500 group-hover:text-[var(--color-paper)] md:gap-10">
                <span className="label w-8 shrink-0 group-hover:text-[var(--color-accent)]">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="min-w-0 flex-1">
                  <h3
                    className="font-semibold tracking-tight"
                    style={{ fontSize: 'clamp(1.75rem, 5vw, 4rem)', lineHeight: 1.05 }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-[var(--color-muted)] mt-2 max-w-xl text-sm group-hover:text-[var(--color-faint)] md:text-base">
                    {p.tagline}
                  </p>
                </div>

                <div className="hidden shrink-0 text-right md:block">
                  <span className="label block group-hover:text-[var(--color-faint)]">{p.role}</span>
                  <span className="label block group-hover:text-[var(--color-faint)]">
                    {p.year}
                  </span>
                </div>

                <span className="shrink-0 text-xl transition-transform duration-500 group-hover:translate-x-1 md:text-2xl">
                  ↗
                </span>
              </div>

              {/* 모바일 미리보기 */}
              {(p.hoverPreview || p.cover) && (
                <div className="relative mt-5 overflow-hidden rounded-md lg:hidden">
                  <img
                    src={asset(p.hoverPreview ?? p.cover!)}
                    alt=""
                    loading="lazy"
                    className="h-44 w-full object-cover"
                  />
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
