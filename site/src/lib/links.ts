import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** 라우터 경로("/work/finch")를 실제 href("/portfolio/work/finch")로 */
export const withBase = (path: string) => `${BASE}${path}`;

/**
 * 디자인 시스템 컴포넌트는 라우터를 모르고 <a href> 만 그린다.
 * 같은 사이트 안으로 가는 클릭을 한 곳에서 가로채 라우터로 보낸다.
 */
export function useInternalLinks() {
  const navigate = useNavigate();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (!url.pathname.startsWith(`${BASE}/`) && url.pathname !== BASE) return;
      e.preventDefault();
      const path = url.pathname.slice(BASE.length) || '/';
      navigate(`${path}${url.search}${url.hash}`);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);
}
