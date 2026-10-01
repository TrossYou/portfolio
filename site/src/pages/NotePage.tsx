import { useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ChapterNav, Prose } from '@ds';
import { notes } from '@data/projects';
import { loadCaseStudy } from '../lib/markdown';
import { useScrollSpy } from '../lib/hooks';
import Markdown from '../components/Markdown';

/** 프로젝트가 아닌 글. 가로지르는 기록 */
export default function NotePage({ slug }: { slug: string }) {
  const note = notes.find((n) => n.slug === slug);
  const doc = useMemo(() => (note ? loadCaseStudy(note.caseStudy) : null), [note]);
  const ids = useMemo(() => doc?.chapters.map((c) => c.id) ?? [], [doc]);
  const active = useScrollSpy(ids);

  if (!note || !doc) return <Navigate to="/" replace />;

  return (
    <main className="wrap detail">
      <section className="detail-head">
        <div className="detail-head__title">
          <span className="ty-eyebrow">Note</span>
          <h1 className="display">{note.tagline}</h1>
          <span className="detail-head__name">{note.name}</span>
          <span className="ty-meta">{[note.period, note.context].join(' · ')}</span>
        </div>
      </section>

      <div className="detail-body">
        <nav className="detail-nav" aria-label="장 목록">
          <span className="ty-eyebrow">Chapters</span>
          <ChapterNav chapters={doc.chapters} currentId={active} />
        </nav>
        <Prose className="detail-prose">
          <Markdown body={doc.body} chapters={doc.chapters} />
        </Prose>
      </div>

      <nav className="pager" aria-label="이동">
        <div>
          <Link to="/" className="ty-btn ty-btn--outline">
            홈으로
          </Link>
        </div>
      </nav>
    </main>
  );
}
