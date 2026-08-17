import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Marquee from '../components/Marquee';
import Magnetic from '../components/Magnetic';
import WorkIndex from '../components/WorkIndex';
import { useReveal } from '../lib/hooks';

const EMAIL = 'youseungjua@gmail.com';
const GITHUB = 'https://github.com/TrossYou';

function Section({
  id,
  no,
  title,
  children,
}: {
  id?: string;
  no: string;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id={id} ref={ref} className="reveal mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-36">
      <div className="mb-12 flex items-baseline gap-4 border-b pb-4 md:mb-16">
        <span className="label text-[var(--color-accent)]">{no}</span>
        <h2 className="text-xl font-medium tracking-tight md:text-2xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const lines = ['기록을', '남기는', '프론트엔드'];

  return (
    <div className="relative flex min-h-svh flex-col justify-end overflow-hidden pt-28 md:pt-32" ref={ref}>
      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-[1400px] px-6 pb-20 md:px-12 md:pb-28">
        <div className="mb-8 flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          </span>
          <span className="label">2026 하반기 신입 지원 중</span>
        </div>

        <h1
          className="font-semibold tracking-[-0.04em]"
          style={{ fontSize: 'clamp(2.75rem, 9vw, 8.5rem)', lineHeight: 0.95 }}
        >
          {lines.map((line, i) => (
            <span key={line} className="rise-line">
              <span style={{ animationDelay: `${0.15 + i * 0.11}s` }}>
                {i === 2 ? (
                  <>
                    {line}
                    <span className="text-[var(--color-accent)]">.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-12 flex flex-col justify-between gap-8 border-t pt-8 md:flex-row md:items-end">
          <p className="prose-ko max-w-md text-base md:text-lg">
            무엇을 결정했고, 무엇이 틀렸고, 무엇을 남겼는지 적어둡니다. 그 기록이 다음 사람이 같은
            곳에서 멈추지 않게 하는 유일한 자산이라고 생각합니다.
          </p>
          <div className="flex shrink-0 items-center gap-8">
            <div>
              <span className="label block">Name</span>
              <span className="text-sm">유승주 · Yoo Seungju</span>
            </div>
            <div>
              <span className="label block">Base</span>
              <span className="text-sm">Seoul, KR</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute right-6 bottom-6 hidden md:right-12 md:block">
        <span className="label animate-pulse">Scroll ↓</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <div className="border-y">
        <Marquee
          items={['React', 'TypeScript', 'Next.js', 'Vite', 'TanStack Query', 'Tailwind CSS']}
          speed={38}
        />
      </div>

      <Section id="about" no="01" title="About">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <p
              className="font-medium tracking-tight"
              style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.5rem)', lineHeight: 1.35 }}
            >
              혼자서 5주 안에 끝내야 하는 일정이었습니다. 그래서 코드를 더 빨리 쓰는 대신,
              <span className="text-[var(--color-accent)]"> 규칙과 관문을 먼저 </span>
              만들었습니다.
            </p>
            <p className="prose-ko mt-10">
              formalBridge에서는 "이 에러 고쳐줘" 식으로 AI를 썼고, 왜 그렇게 동작하는지 설명할 수
              없는 코드가 남았습니다. PinLog에서는 반대로 규칙 문서를 먼저 만들고 실패를{' '}
              <strong>트러블슈팅 문서 15건</strong>으로 남겼습니다. 도구를 Codex로 옮겼을 때 그대로
              따라온 것은 코드가 아니라 그 문서들이었습니다.
            </p>
          </div>

          <div className="md:col-span-5 md:pt-3">
            <dl className="space-y-0 border-t">
              {[
                ['교육', 'SSAFY 15기 · 925시간 (2026.01–06)'],
                ['학력', '숭실대학교 컴퓨터학부 졸업'],
                ['자격', 'SQLD · TOPCIT 수준3 · 정보처리기사(필기)'],
                ['어학', 'TOEIC 635 · TOEIC Speaking IM2'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 border-b py-4">
                  <dt className="label shrink-0">{k}</dt>
                  <dd className="text-right text-sm">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10">
              <span className="label mb-4 block">Stack</span>
              <div className="flex flex-wrap gap-2">
                {[
                  'React 19',
                  'TypeScript',
                  'Vite',
                  'TanStack Router/Query',
                  'Tailwind CSS',
                  'Vitest',
                  'Remix',
                  'Prisma',
                  'PostgreSQL',
                  'Docker',
                  'Kubernetes',
                  'GitHub Actions',
                  'Java',
                  'Spring Boot',
                ].map((s) => (
                  <span
                    key={s}
                    className="hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] rounded-full border px-3 py-1.5 text-xs transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="work" no="02" title="Selected Work">
        <WorkIndex />
      </Section>

      <section id="contact" className="border-t">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-36">
          <span className="label">03 — Contact</span>
          <a
            href={`mailto:${EMAIL}`}
            data-cursor="Mail"
            className="group mt-8 block"
          >
            <Magnetic strength={0.12}>
              <h2
                className="group-hover:text-[var(--color-accent)] font-semibold tracking-[-0.04em] transition-colors duration-500"
                style={{ fontSize: 'clamp(2rem, 8vw, 7rem)', lineHeight: 1 }}
              >
                같이 일해요 ↗
              </h2>
            </Magnetic>
          </a>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-8 border-t pt-8">
            <div className="flex flex-wrap gap-8">
              <a href={`mailto:${EMAIL}`} className="link text-sm">
                {EMAIL}
              </a>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="link text-sm">
                github.com/TrossYou
              </a>
            </div>
            <span className="label">© 2026 Yoo Seungju</span>
          </div>
        </div>
      </section>
    </>
  );
}
