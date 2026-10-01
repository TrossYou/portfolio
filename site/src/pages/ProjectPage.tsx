import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ChapterNav, MetaGrid, Prose, StatTile } from '@ds';
import { caseStudyOrder, metaLine, projects } from '@data/projects';
import { loadCaseStudy } from '../lib/markdown';
import { useScrollSpy } from '../lib/hooks';
import Markdown from '../components/Markdown';
import ProjectBadges from '../components/ProjectBadges';

export default function ProjectPage() {
  const { slug = '' } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const doc = useMemo(() => (project?.caseStudy ? loadCaseStudy(project.caseStudy) : null), [project]);
  const ids = useMemo(() => doc?.chapters.map((c) => c.id) ?? [], [doc]);
  const active = useScrollSpy(ids);

  if (!project || !doc) return <Navigate to="/" replace />;

  const i = caseStudyOrder.indexOf(slug);
  const prev = i > 0 ? projects.find((p) => p.slug === caseStudyOrder[i - 1]) : undefined;
  const next = i >= 0 && i < caseStudyOrder.length - 1 ? projects.find((p) => p.slug === caseStudyOrder[i + 1]) : undefined;

  return (
    <main className="wrap detail">
      <section className="detail-head">
        <div className="detail-head__title">
          <span className="ty-eyebrow">Case Study</span>
          <h1 className="display">{project.tagline}</h1>
          <span className="detail-head__name">{project.name}</span>
          <span className="ty-meta">{metaLine(project)}</span>
          <ProjectBadges project={project} withCaseStudy={false} />
        </div>
        <MetaGrid items={project.meta} />
        {project.metrics.length ? (
          <div className="grid-3">
            {project.metrics.map((m) => (
              <StatTile key={m.label} {...m} />
            ))}
          </div>
        ) : null}
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

      <nav className="pager" aria-label="프로젝트 이동">
        <div className="pager__cards">
          {prev ? (
            <Link to={`/work/${prev.slug}`} className="ty-card pager__card">
              <span className="ty-eyebrow">Prev</span>
              <span className="h3">{prev.name}</span>
              <span className="ty-meta">{metaLine(prev)}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/work/${next.slug}`} className="ty-card pager__card pager__card--next">
              <span className="ty-eyebrow">Next</span>
              <span className="h3">{next.name}</span>
              <span className="ty-meta">{metaLine(next)}</span>
            </Link>
          ) : null}
        </div>
        <div>
          <Link to="/" className="ty-btn ty-btn--outline">
            홈으로
          </Link>
        </div>
      </nav>
    </main>
  );
}
