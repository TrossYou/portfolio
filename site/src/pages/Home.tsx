import { Link } from 'react-router-dom';
import { Button, Callout, Mark, MetaGrid, ProjectCard, SkillBar, Timeline, TraitEvidence } from '@ds';
import type { Skill } from '@ds';
import { metaLine, projects } from '@data/projects';
import { harnessSummary, person, timeline, traits } from '@data/site';
import skills from '@data/skills.json';
import Section from '../components/Section';
import ProjectBadges from '../components/ProjectBadges';
import { withBase } from '../lib/links';

const asset = (f: string) => `${import.meta.env.BASE_URL}${f}`;

export default function Home() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const rated: Skill[] = skills.rated.map((s) => ({ name: s.name, level: s.level as Skill['level'], group: s.group }));

  /** 케이스 스터디가 있으면 사이트 안으로(클릭은 App 의 가로채기가 라우터로 보낸다), 없으면 저장소로 */
  const cardHref = (p: (typeof projects)[number]) => (p.caseStudy ? withBase(`/work/${p.slug}`) : p.links.repo);

  return (
    <main className="wrap home">
      <section className="hero">
        <h1 className="display-xl">
          {person.thesis[0]}
          <Mark>{person.thesis[1]}</Mark>
          {person.thesis[2]}
        </h1>
        <p className="lead">{person.lead}</p>
        <div className="hero__actions">
          <Link className="ty-btn ty-btn--primary" to="/work/finch">
            케이스 스터디 읽기
          </Link>
          <Button variant="outline" href={person.github}>
            GitHub →
          </Button>
        </div>
        <MetaGrid items={person.about} />
      </section>

      <Section id="work" eyebrow="Selected Work" title="판단이 기록으로 남은 프로젝트">
        {featured ? (
          <ProjectCard
            featured
            name={featured.name}
            tagline={featured.tagline}
            meta={metaLine(featured)}
            tags={featured.tags}
            cover={featured.cover ? asset(featured.cover) : undefined}
            coverAlt={featured.coverAlt}
            href={cardHref(featured)}
            badges={<ProjectBadges project={featured} />}
          />
        ) : null}
        <div className="grid-projects">
          {rest.map((p) => (
            <ProjectCard
              key={p.slug}
              name={p.name}
              tagline={p.tagline}
              meta={metaLine(p)}
              tags={p.tags}
              cover={p.cover ? asset(p.cover) : undefined}
              coverAlt={p.coverAlt}
              href={cardHref(p)}
              badges={<ProjectBadges project={p} />}
            />
          ))}
        </div>
        <p className="body-sm note">
          더 많은 프로젝트는 <a href={person.github}>GitHub에서</a> 볼 수 있습니다.
        </p>
      </Section>

      <Section id="activity" eyebrow="Activity" title="배운 순서대로 적었습니다">
        <div className="narrow">
          <Timeline items={timeline.map((t) => ({ ...t, href: t.href ? withBase(t.href) : undefined }))} />
        </div>
      </Section>

      <Section id="skills" eyebrow="Skills" title="자주 쓴 것과 써 본 것을 나눴습니다">
        <SkillBar skills={rated} used={skills.used} criteria={skills.scale} />
      </Section>

      <Section id="how" eyebrow="How I Work" title="성향마다 근거를 하나씩 붙였습니다">
        <div className="grid-3">
          {traits.map((t) => (
            <TraitEvidence key={t.trait} {...t} sourceHref={withBase(t.sourceHref)} />
          ))}
        </div>
        <Callout label="Agent Harness">
          <p>
            <strong>30초 요약.</strong> {harnessSummary}
          </p>
          <p>
            <Link to="/harness">에이전트 하네스 — 일은 맡기고, 판단은 남겼다 →</Link>
          </p>
        </Callout>
      </Section>

      <Section id="contact" eyebrow="Contact" title="연락은 메일이 가장 빠릅니다">
        <MetaGrid
          items={[
            { label: 'Email', value: person.email },
            { label: 'GitHub', value: `github.com/${person.handle}` },
          ]}
        />
      </Section>
    </main>
  );
}
