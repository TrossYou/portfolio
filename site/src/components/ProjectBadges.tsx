import { Link } from 'react-router-dom';
import type { Project } from '@data/projects';

type Props = { project: Project; withCaseStudy?: boolean; withNotes?: boolean };

/** Live · Demo · Case Study · Repo. 있는 것만, 이 순서로. withNotes 면 링크 옆에 짧은 설명을 붙인다 */
export default function ProjectBadges({ project, withCaseStudy = true, withNotes = false }: Props) {
  const { links, linkNotes, caseStudy, slug } = project;
  const note = (k: 'live' | 'demo') =>
    withNotes && linkNotes?.[k] ? <span className="badge-note">{linkNotes[k]}</span> : null;
  const live = links.live ? (
    <a className="ty-badge" href={links.live} target="_blank" rel="noreferrer">
      Live
    </a>
  ) : null;
  const demo = links.demo ? (
    <a className="ty-badge" href={links.demo} target="_blank" rel="noreferrer">
      Demo
    </a>
  ) : null;
  return (
    <div className="ty-badges">
      {live ? (withNotes && linkNotes?.live ? <span className="badge-with-note">{live}{note('live')}</span> : live) : null}
      {demo ? (withNotes && linkNotes?.demo ? <span className="badge-with-note">{demo}{note('demo')}</span> : demo) : null}
      {withCaseStudy && caseStudy ? (
        <Link className="ty-badge" to={`/work/${slug}`}>
          Case Study
        </Link>
      ) : null}
      {links.repo ? (
        <a className="ty-badge" href={links.repo} target="_blank" rel="noreferrer">
          Repo
        </a>
      ) : null}
    </div>
  );
}
