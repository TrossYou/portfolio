import { Link } from 'react-router-dom';
import { Mark, MetaGrid, StatTile, Timeline } from '@ds';
import { findMetric, projects } from '@data/projects';
import { historyKinds, person, timeline } from '@data/site';
import Section from '../components/Section';
import FeaturedWork from '../components/FeaturedWork';
import AgentOps from '../components/AgentOps';
import SkillList from '../components/SkillList';
import HandCoded from '../components/HandCoded';
import Contact from '../components/Contact';
import { withBase } from '../lib/links';

export default function Home() {
  const [lead, ...rest] = projects.filter((p) => p.featured);
  const heroStats = person.heroStats.map(findMetric).filter((m) => m !== undefined);
  const history = timeline
    .filter((t) => historyKinds.includes(t.kind))
    .map((t) => ({ ...t, href: t.href ? (t.href.startsWith('/') ? withBase(t.href) : t.href) : undefined }));

  return (
    <main className="wrap home">
      <section className="hero">
        <span className="hero__kicker">{person.kicker}</span>
        <h1 className="hero__title">
          {person.intro[0]}
          <Mark>{person.intro[1]}</Mark>
          {person.intro[2]}
        </h1>
        <p className="hero__lead">{person.lead}</p>
        <div className="grid-3 hero__stats">
          {heroStats.map((m) => (
            <StatTile key={m.label} {...m} />
          ))}
        </div>
        <div className="hero__actions">
          <Link className="ty-btn ty-btn--primary" to="/work/glocare">
            글로케어 케이스 스터디
          </Link>
          <a className="ty-btn ty-btn--outline" href="#agents">
            AI 에이전트 운영 보기
          </a>
          <a className="ty-btn ty-btn--link" href={person.github} target="_blank" rel="noreferrer">
            GitHub →
          </a>
        </div>
      </section>

      <Section id="work" eyebrow="Selected Work" title="대표 프로젝트 셋">
        <div className="fw-list">
          {lead ? <FeaturedWork project={lead} wide eager exclude={person.heroStats} /> : null}
          <div className="fw-pair">
            {rest.map((p) => (
              <FeaturedWork key={p.slug} project={p} exclude={person.heroStats} />
            ))}
          </div>
        </div>
      </Section>

      <Section id="agents" eyebrow="How I Work" title="AI 에이전트를 역할별로 나눠 일하는 방식">
        <AgentOps />
      </Section>

      <Section id="skills" eyebrow="Skills" title="기술마다 할 수 있는 것">
        <SkillList />
      </Section>

      <Section id="history" eyebrow="Education" title="교육 · 학력 · 자격">
        <MetaGrid items={person.about} />
        <Timeline columns={2} items={history} />
      </Section>

      <Section id="earlier" eyebrow="Earlier" title="AI 에이전트 도입 전 프로젝트">
        <HandCoded />
      </Section>

      <Section id="contact" eyebrow="Contact" title="연락은 메일이 가장 빠릅니다">
        <Contact />
      </Section>
    </main>
  );
}
