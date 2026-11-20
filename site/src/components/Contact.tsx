import { useEffect, useState } from 'react';
import { person } from '@data/site';

/** 메일 버튼 · 복사 · GitHub. 폼은 없다 */
export default function Contact() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), 1600);
    return () => clearTimeout(t);
  }, [done]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setDone(true);
    } catch {
      // 클립보드가 막힌 환경: 글자를 선택해 두어 사용자가 직접 복사하게 한다
      const el = document.getElementById('contact-email');
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  };

  return (
    <div className="contact__actions">
      <a id="contact-email" className="ty-btn ty-btn--primary contact__mail" href={`mailto:${person.email}`}>
        {person.email}
      </a>
      <button type="button" className="ty-copy" data-done={done} onClick={copy} aria-live="polite">
        {done ? '복사됨' : '주소 복사'}
      </button>
      <a className="ty-btn ty-btn--link" href={person.github} target="_blank" rel="noreferrer">
        github.com/{person.handle}
      </a>
    </div>
  );
}
