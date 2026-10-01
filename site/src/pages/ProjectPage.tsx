import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { projects, projectBySlug, type Block } from '../data/projects';
import RichText from '../components/RichText';
import { useReveal, useScrollSpy, scrollToSection } from '../lib/hooks';

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

const gallery = [
  { src: 'assets/pinlog-natural-search.gif', caption: '자연어 검색 — 저장한 맥락을 문장으로 다시 찾는다' },
  { src: 'assets/pinlog-add-place-image.gif', caption: '장소 추가 — 사진에서 장소를 추출해 기록' },
  { src: 'assets/pinlog-map-marker.gif', caption: '지도 마커 → 레코드 상세' },
  { src: 'assets/pinlog-feed.gif', caption: '피드 — 레코드 저장과 팔로우' },
  { src: 'assets/pinlog-library.gif', caption: '라이브러리' },
  { src: 'assets/pinlog-search-empty.jpg', caption: '검색 결과 없음 — 빈 상태 처리' },
];

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'lead':
      return (
        <p className="text-[var(--color-ink)] my-8 text-lg leading-relaxed font-medium tracking-tight md:text-xl">
          <RichText>{block.body}</RichText>
        </p>
      );
    case 'text':
      return (
        <p className="prose-ko my-6">
          <RichText>{block.body}</RichText>
        </p>
      );
    case 'quote':
      return (
        <blockquote className="border-[var(--color-accent)] my-10 border-l-2 py-1 pl-6">
          <p className="text-lg leading-relaxed font-medium tracking-tight md:text-xl">
            <RichText>{block.body}</RichText>
          </p>
        </blockquote>
      );
    case 'code':
      return (
        <pre className="bg-[var(--color-raised)] my-8 overflow-x-auto rounded-lg border p-5 text-[13px] leading-relaxed">
          <code className="font-mono">{block.body}</code>
        </pre>
      );
    case 'list':
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="prose-ko flex gap-3">
              <span className="text-[var(--color-accent)] mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-current" />
              <span>
                <RichText>{item}</RichText>
              </span>
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="my-8 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b">
                {block.head.map((h) => (
                  <th key={h} className="label pb-3 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b last:border-0">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`py-3.5 pr-6 align-top leading-relaxed ${
                        j === 0 ? 'font-medium' : 'text-[var(--color-muted)]'
                      }`}
                    >
                      <RichText>{cell}</RichText>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default function ProjectPage() {
  const { slug = '' } = useParams();
  const project = projectBySlug(slug);
  const ids = useMemo(() => project?.chapters.map((c) => `ch-${c.no}`) ?? [], [project]);
  const active = useScrollSpy(ids);
  const galleryRef = useReveal<HTMLDivElement>();

  if (!project) return <Navigate to="/" replace />;

  return (
    <article>
      {/* 표지 */}
      <header className="mx-auto max-w-[1400px] px-6 pt-32 pb-16 md:px-12 md:pt-44 md:pb-24">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="label text-[var(--color-accent)]">{project.context}</span>
          <span className="label">{project.period}</span>
        </div>

        <h1
          className="mt-6 font-semibold tracking-[-0.045em]"
          style={{ fontSize: 'clamp(3rem, 11vw, 10rem)', lineHeight: 0.9 }}
        >
          <span className="rise-line">
            <span>{project.name}</span>
          </span>
        </h1>

        <p className="prose-ko mt-8 max-w-2xl text-lg md:text-xl">{project.tagline}</p>

        <div className="mt-16 grid gap-10 border-t pt-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="prose-ko">{project.summary}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Open"
                  className="hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] rounded-full border px-5 py-2.5 text-sm transition-colors"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
            {project.note && <p className="label mt-6">{project.note}</p>}
          </div>

          <div className="md:col-span-5">
            <dl className="grid grid-cols-3 gap-4">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dd
                    className="font-semibold tracking-tight"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
                  >
                    {m.value}
                  </dd>
                  <dt className="text-[var(--color-muted)] mt-1 text-xs leading-snug">{m.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="text-[var(--color-muted)] rounded border px-2.5 py-1 text-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 대표 이미지 */}
      {project.cover && (
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[1400px] px-6 md:px-12"
        >
          <img
            src={asset(project.cover)}
            alt={`${project.name} 화면`}
            className="w-full rounded-lg border object-cover"
          />
        </motion.div>
      )}

      {/* 본문 + 목차 */}
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:grid-cols-12 md:px-12 md:py-32">
        <aside className="hidden md:col-span-3 md:block">
          <nav className="sticky top-28">
            <span className="label mb-4 block">Contents</span>
            <ul className="space-y-1">
              {project.chapters.map((c) => (
                <li key={c.no}>
                  <button
                    onClick={() => scrollToSection(`ch-${c.no}`)}
                    className="block w-full py-1.5 text-left text-sm transition-colors duration-300"
                    style={{
                      color:
                        active === `ch-${c.no}` ? 'var(--color-accent)' : 'var(--color-faint)',
                    }}
                  >
                    <span className="font-mono text-xs">{c.no}</span>
                    <span className="ml-3">{c.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="md:col-span-8 md:col-start-5">
          {project.chapters.map((c) => (
            <section key={c.no} id={`ch-${c.no}`} className="scroll-mt-28 pb-20">
              <div className="mb-8 flex items-baseline gap-4">
                <span className="label text-[var(--color-accent)]">{c.no}</span>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{c.title}</h2>
              </div>
              {c.blocks.map((b, i) => (
                <BlockView key={i} block={b} />
              ))}
            </section>
          ))}
        </div>
      </div>

      {/* 화면 갤러리 — PinLog만 자산이 있다 */}
      {project.slug === 'pinlog' && (
        <section ref={galleryRef} className="reveal border-t">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
            <div className="mb-12 flex items-baseline gap-4 border-b pb-4">
              <span className="label text-[var(--color-accent)]">07</span>
              <h2 className="text-xl font-medium tracking-tight md:text-2xl">화면</h2>
            </div>
            <p className="label mb-10">AI 응답 대기와 타이핑 구간은 배속 처리했습니다</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g) => (
                <figure key={g.src} className="group">
                  <div className="overflow-hidden rounded-lg border">
                    <img
                      src={asset(g.src)}
                      alt={g.caption}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="text-[var(--color-muted)] mt-3 text-xs leading-relaxed">
                    {g.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 다른 프로젝트로 — 목록 전체를 두어 한 번에 건너뛸 수 있게 한다 */}
      <nav className="border-t">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-20">
          <div className="mb-8 flex items-center justify-between">
            <span className="label">다른 프로젝트</span>
            <Link
              to="/"
              className="label hover:text-[var(--color-accent)] transition-colors"
            >
              ← 전체 보기
            </Link>
          </div>

          <ul className="border-t">
            {projects.map((p) => {
              const current = p.slug === slug;
              return (
                <li key={p.slug} className="border-b">
                  <Link
                    to={`/work/${p.slug}`}
                    data-cursor={current ? undefined : 'View'}
                    aria-current={current ? 'page' : undefined}
                    className={`group flex items-baseline justify-between gap-6 py-6 transition-opacity ${
                      current ? 'pointer-events-none opacity-35' : ''
                    }`}
                  >
                    <span className="flex min-w-0 items-baseline gap-4 md:gap-6">
                      <span
                        className="group-hover:text-[var(--color-accent)] font-semibold tracking-tight transition-colors duration-300"
                        style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)' }}
                      >
                        {p.name}
                      </span>
                      <span className="text-[var(--color-muted)] hidden truncate text-sm sm:block">
                        {p.tagline}
                      </span>
                    </span>
                    <span className="label shrink-0">
                      {current ? '보는 중' : `${p.role} · ${p.year}`}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </article>
  );
}
