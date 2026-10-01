import { useCallback, useEffect, useRef, useState } from 'react';

/** 뷰포트에 들어오면 한 번만 is-visible을 붙인다. 처음 상태도 보이는 상태다 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** 현재 화면에 걸린 장의 id. 장 목록 하이라이트용 */
export function useScrollSpy(ids: string[], offset = 160) {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    const onScroll = () => {
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids, offset]);
  return active;
}

type Theme = 'light' | 'dark';

function readTheme(): Theme {
  const attr = document.documentElement.dataset.theme;
  if (attr === 'dark' || attr === 'light') return attr;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** 테마. 저장된 선택이 없으면 시스템을 따르고, 토글하면 저장한다 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readTheme());
  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* 저장 못 해도 화면은 바뀐다 */
    }
    setTheme(next);
  }, [theme]);
  return { theme, toggle };
}
