import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Header from './components/Header';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import { scrollToTop, useSmoothScroll } from './lib/hooks';

/**
 * 라우트가 바뀌면 맨 위로.
 * AnimatePresence가 이전 페이지를 빼는 동안 문서 높이가 줄어 스크롤이 되밀리므로,
 * 전환이 끝난 다음 프레임에 한 번 더 맞춘다.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
    const id = requestAnimationFrame(scrollToTop);
    const t = setTimeout(scrollToTop, 550);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(t);
    };
  }, [pathname]);

  return null;
}

export default function App() {
  const [ready, setReady] = useState(false);
  const location = useLocation();
  useSmoothScroll();

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Header />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: ready ? 1 : 0, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<ProjectPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </>
  );
}
