import { asks, person } from '@data/site';
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

      <div className="asks" aria-label="받았던 부탁과 결과">
        <div className="asks__head">
          <strong>받았던 부탁</strong>
          <span>{asks.length}건 완료</span>
        </div>
        <div className="asks__body">
          <p className="asks__bubble">승주 씨, 이것 좀 봐줄 수 있어요?</p>
          <ul className="asks__list">
            {asks.map((a) => (
              <li key={a.ask}>
                <a className="asks__row" href={href(a.href)}>
                  <span className="asks__what">
                    <span className="asks__project">{a.project}</span>
                    <span>{a.ask}</span>
                  </span>
                  <span className="asks__result">{a.result}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
