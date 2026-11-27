import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { useInternalLinks } from './lib/links';

// 상세 페이지는 마크다운 렌더러를 끌고 오므로 홈과 분리해 지연 로딩한다.
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const NotePage = lazy(() => import('./pages/NotePage'));

/**
 * 라우트가 바뀌면 맨 위로. 해시가 있으면 그 자리로.
 * 다른 페이지의 장으로 갈 때(홈의 판단 카드 → 케이스 스터디)는 상세 페이지가 지연 로딩이라
 * 처음에는 그 장이 없고, 생긴 뒤에도 위쪽 화면 이미지가 늦게 들어와 장이 밀린다.
 * 맨 위로 올린 뒤 3초 동안 장이 생기거나 밀리면 그 자리로 다시 옮긴다. 사용자가 스크롤하면 멈춘다.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const id = hash ? decodeURIComponent(hash.slice(1)) : '';
    const el = id ? document.getElementById(id) : null;
    if (el) {
      el.scrollIntoView({ block: 'start' });
      return;
    }
    window.scrollTo(0, 0);
    if (!id) return;
    let tries = 0;
    const stop = () => window.clearInterval(timer);
    const timer = window.setInterval(() => {
      const found = document.getElementById(id);
      if (found && Math.abs(found.getBoundingClientRect().top) > 4) found.scrollIntoView({ block: 'start' });
      if (++tries > 30) stop();
    }, 100);
    const userEvents = ['wheel', 'touchstart', 'keydown'] as const;
    userEvents.forEach((e) => window.addEventListener(e, stop, { once: true, passive: true }));
    return () => {
      stop();
      userEvents.forEach((e) => window.removeEventListener(e, stop));
    };
  }, [pathname, hash]);
  return null;
}

/** 지연 로딩 중 빈 화면 대신 자리만 잡아 둔다 */
function Loading() {
  return (
    <main className="wrap detail" aria-busy="true">
      <section className="detail-head">
        <span className="ty-eyebrow">불러오는 중</span>
      </section>
    </main>
  );
}

export default function App() {
  useInternalLinks();
  return (
    <>
      <Header />
      <ScrollManager />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/harness" element={<NotePage slug="harness" />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}
