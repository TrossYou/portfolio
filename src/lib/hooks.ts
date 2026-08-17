import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

/**
 * Lenis가 스크롤 위치를 직접 관리하므로 window.scrollTo는 무시된다.
 * 라우트 전환에서 맨 위로 보내려면 반드시 이 인스턴스를 거쳐야 한다.
 */
let lenisInstance: Lenis | null = null;

export function scrollToTop() {
  // Lenis가 없을 때(모션 축소 설정)를 위해 네이티브도 같이 호출한다.
  window.scrollTo(0, 0);
  lenisInstance?.scrollTo(0, { immediate: true, force: true });
}

/** 헤더 고정 높이만큼 띄워서 섹션으로 보낸다. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -80, duration: 1.1 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/** 관성 스크롤. 라우트가 바뀌어도 인스턴스는 하나만 유지한다. */
export function useSmoothScroll() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // anchors: 목차·헤더의 #링크를 Lenis가 직접 처리하게 한다(네이티브 점프와 충돌 방지)
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: true });
    lenisInstance = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}

/** 뷰포트에 들어오면 한 번만 is-visible을 붙인다. */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 섹션이 뷰포트보다 큰 경우가 많아 비율(threshold) 대신 진입 여부만 본다.
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

/** 현재 화면에 걸린 섹션 id — 목차 하이라이트용 */
export function useScrollSpy(ids: string[], offset = 140) {
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

/** 포인터가 있는 기기인지 — 커서 연출을 켤지 판단 */
export function useHasPointer() {
  const [has, setHas] = useState(false);
  useEffect(() => {
    setHas(matchMedia('(pointer: fine)').matches);
  }, []);
  return has;
}
