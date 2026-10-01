import { Link } from 'react-router-dom';
import type { Project } from '@data/projects';

/** Live · Demo · Case Study · Repo. 있는 것만, 이 순서로 */
export default function ProjectBadges({ project, withCaseStudy = true }: { project: Project; withCaseStudy?: boolean }) {
  const { links, caseStudy, slug } = project;
  return (
    <div className="ty-badges">
      {links.live ? <a className="ty-badge" href={links.live} target="_blank" rel="noreferrer">Live</a> : null}
      {links.demo ? <a className="ty-badge" href={links.demo} target="_blank" rel="noreferrer">Demo</a> : null}
      {withCaseStudy && caseStudy ? <Link className="ty-badge" to={`/work/${slug}`}>Case Study</Link> : null}
      <a className="ty-badge" href={links.repo} target="_blank" rel="noreferrer">Repo</a>
    </div>
  );
}
