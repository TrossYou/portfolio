import { found, person } from '@data/site';
import { withBase } from '../lib/links';

const href = (h: string) => (h.startsWith('/') ? withBase(h) : h);

/** 첫 화면. 왼쪽 큰 글씨 · 보조 문장 · 버튼, 오른쪽 「받았던 부탁」 창 */
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__text">
        <h1 className="hero__title">
          {person.title.map((line, i) => (
            <span key={line} className={`hero__line${i === person.title.length - 1 ? ' hero__line--mark' : ''}`}>
              {line}
            </span>
          ))}
        </h1>
        <p className="hero__lead">{person.lead}</p>
        <div className="hero__actions">
          <a className="ty-btn ty-btn--primary" href="#work">
            해온 일 보기
          </a>
          <a className="ty-btn ty-btn--outline" href="#how">
            AI와 일하는 방식
          </a>
        </div>
      </div>

      <div className="asks" aria-label="해결한 문제와 결과">
        <div className="asks__head">
          <strong>해결한 문제</strong>
          <span>{found.length}건</span>
        </div>
        <ul className="asks__list">
          {found.map((f) => (
            <li key={f.problem}>
              <a className="asks__row" href={href(f.href)}>
                <span className="asks__what">
                  <span className="asks__project">{f.project}</span>
                  <span>{f.problem}</span>
                </span>
                <span className="asks__result">
                  {f.from ? (
                    <>
                      <span className="asks__from">{f.from}</span>
                      <span className="asks__arrow" aria-label="에서">→</span>
                      <span className="asks__to">{f.to}</span>
                      <span className="asks__unit">{f.unit}</span>
                    </>
                  ) : (
                    <span className="asks__text">{f.to}</span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
