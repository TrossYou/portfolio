import { handCoded } from '@data/site';
import { withBase } from '../lib/links';

/** 손으로 코딩하던 때. 이름 · 기간 · 한 줄. 사이트 안 링크는 라우터가, 바깥 링크는 새 탭으로 */
export default function HandCoded() {
  return (
    <ul className="hand">
      {handCoded.map((h) => {
        const internal = h.href.startsWith('/');
        return (
          <li key={h.name} className="hand__item">
            <span className="ty-meta hand__period">{h.period}</span>
            <span className="hand__name">
              <a
                href={internal ? withBase(h.href) : h.href}
                {...(internal ? {} : { target: '_blank', rel: 'noreferrer' })}
              >
                {h.name}
              </a>
            </span>
            <span className="hand__line">{h.line}</span>
          </li>
        );
      })}
    </ul>
  );
}
