import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ChapterNav, MetaGrid, Prose, StatTile } from '@ds';
import { caseStudyOrder, metaLine, projects } from '@data/projects';
import { loadCaseStudy } from '../lib/markdown';
import { useScrollSpy } from '../lib/hooks';
import Markdown from '../components/Markdown';
import ProjectBadges from '../components/ProjectBadges';
import ProjectHighlights from '../components/ProjectHighlights';
import Screen from '../components/Screen';

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
  const [main, ...more] = project.screens ?? [];

  return (
    <main className="wrap detail">
      <section className="detail-head">
        <div className="detail-head__title">
          <span className="ty-eyebrow">케이스 스터디</span>
          {project.keywords?.length ? (
            <ul className="kw" aria-label="키워드">
              {project.keywords.map((k) => (
                <li key={k} className="kw__item">
                  {k}
                </li>
              ))}
            </ul>
          ) : null}
          <h1 className="display">{project.tagline}</h1>
          <span className="detail-head__name">{project.name}</span>
          <span className="ty-meta">{metaLine(project)}</span>
          <ProjectBadges project={project} withCaseStudy={false} withNotes />
        </div>

        <div className={`head-grid${main ? '' : ' head-grid--single'}`}>
          <div className="head-facts">
            <MetaGrid items={project.meta} />
            <div className="head-stack">
              <span className="ty-eyebrow">쓴 기술</span>
              <ul className="head-stack__list">
                {project.stack.map((s) => (
                  <li key={s} className="ty-chip">
                    {s}
                  </li>
                ))}
              </ul>
              {project.stackNote ? <p className="body-sm head-stack__note">{project.stackNote}</p> : null}
            </div>
          </div>
          {main ? <Screen screen={main} eager className="head-screen" /> : null}
        </div>

        {more.length ? (
          <div className="screen-strip">
            {more.map((s) => (
              <Screen key={s.src} screen={s} />
            ))}
          </div>
        ) : null}

        {project.metrics.length ? (
          <div className="head-block">
            <span className="ty-eyebrow">결과</span>
            <div className="grid-3">
              {project.metrics.map((m) => (
                <StatTile key={m.label} {...m} />
              ))}
            </div>
          </div>
        ) : null}

        {project.scale?.length ? (
          <div className="head-block">
            <span className="ty-eyebrow">작업 규모</span>
            <div className="grid-4">
              {project.scale.map((m) => (
                <StatTile key={m.label} {...m} />
              ))}
            </div>
          </div>
        ) : null}

        <div className="head-block">
          <span className="ty-eyebrow">내린 판단</span>
          <ProjectHighlights project={project} more={false} />
        </div>
      </section>

      <div className="detail-body">
        <nav className="detail-nav" aria-label="장 목록">
          <span className="ty-eyebrow">목차</span>
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
              <span className="ty-eyebrow">이전</span>
              <span className="h3">{prev.name}</span>
              <span className="ty-meta">{metaLine(prev)}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/work/${next.slug}`} className="ty-card pager__card pager__card--next">
              <span className="ty-eyebrow">다음</span>
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
