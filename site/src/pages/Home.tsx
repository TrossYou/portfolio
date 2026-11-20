import { MetaGrid, Timeline } from '@ds';
import { projects } from '@data/projects';
import { checks, historyKinds, person, timeline } from '@data/site';
import Section from '../components/Section';
import Hero from '../components/Hero';
import WorkStages from '../components/WorkStages';
import GlocareBlock from '../components/GlocareBlock';
import ProjectTile from '../components/ProjectTile';
import SkillList from '../components/SkillList';
import HandCoded from '../components/HandCoded';
import Contact from '../components/Contact';
import { withBase } from '../lib/links';

export default function Home() {
  const others = projects.filter((p) => p.featured && p.slug !== 'glocare');
  const history = timeline
    .filter((t) => historyKinds.includes(t.kind))
    .map((t) => ({ ...t, href: t.href ? (t.href.startsWith('/') ? withBase(t.href) : t.href) : undefined }));

  return (
    <main className="home ty-root">
      <div className="wrap">
        <Hero />
      </div>

      <div id="how" className="band">
        <div className="wrap">
          <Section id="how-inner" eyebrow="일하는 방식" title="프로젝트마다 AI와 일을 나누는 폭을 한 단계씩 넓혔습니다">
            <WorkStages />
            <a className="ty-btn ty-btn--link" href={withBase('/harness')}>
              AI 팀을 어떻게 운영했는지 자세히 →
            </a>
          </Section>
        </div>
      </div>

      <div id="work" className="wrap home__stack">
        <GlocareBlock />
        <div className="tiles">
          {others.map((p) => (
            <ProjectTile key={p.slug} project={p} />
          ))}
        </div>

        <Section id="trust" eyebrow="AI가 쓴 코드를 믿는 법" title="그냥 믿지 않고, 네 번 거릅니다">
          <ol className="checks">
            {checks.map((c, i) => (
              <li key={c.title} className="check">
                <span className="check__no">{String(i + 1).padStart(2, '0')}</span>
                <strong className="check__title">{c.title}</strong>
                <span className="check__body">{c.body}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="earlier" eyebrow="AI를 쓰기 전" title="직접 짠 코드">
          <HandCoded />
        </Section>

        <Section id="skills" eyebrow="기술" title="기술마다 할 수 있는 것">
          <SkillList />
        </Section>

        <Section id="history" eyebrow="교육 · 학력 · 자격" title="배워 온 길">
          <MetaGrid items={person.about} />
          <Timeline columns={2} items={history} />
        </Section>

        <section id="contact" className="contact">
          <div className="contact__text">
            <h2 className="contact__title">함께 일할 자리가 있다면</h2>
            <span className="contact__sub">메일이 가장 빠릅니다</span>
          </div>
          <Contact />
        </section>
      </div>
    </main>
  );
}
