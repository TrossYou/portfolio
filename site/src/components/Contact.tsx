import { useEffect, useState } from 'react';
import { person } from '@data/site';

/** 이메일은 복사 버튼과 메일 링크, GitHub 는 링크. 폼은 없다 */
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
    <dl className="ty-metagrid">
      <div>
        <dt>Email</dt>
        <dd>
          <a id="contact-email" href={`mailto:${person.email}`}>
            {person.email}
          </a>
          <button type="button" className="ty-copy" data-done={done} onClick={copy} aria-live="polite">
            {done ? '복사됨' : '복사'}
          </button>
        </dd>
      </div>
      <div>
        <dt>GitHub</dt>
        <dd>
          <a href={person.github} target="_blank" rel="noreferrer">
            github.com/{person.handle}
          </a>
        </dd>
      </div>
    </dl>
  );
}
