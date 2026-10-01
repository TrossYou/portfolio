import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { useInternalLinks } from './lib/links';

// 상세 페이지는 마크다운 렌더러를 끌고 오므로 홈과 분리해 지연 로딩한다.
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const NotePage = lazy(() => import('./pages/NotePage'));

/** 라우트가 바뀌면 맨 위로. 해시가 있으면 그 자리로 */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

/** 지연 로딩 중 빈 화면 대신 자리만 잡아 둔다 */
function Loading() {
  return (
    <main className="wrap detail" aria-busy="true">
      <section className="detail-head">
        <span className="ty-eyebrow">Loading</span>
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
