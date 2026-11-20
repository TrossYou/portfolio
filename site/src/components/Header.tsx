import { Link, useLocation } from 'react-router-dom';
import { person } from '@data/site';
import { useTheme } from '../lib/hooks';
import { withBase } from '../lib/links';

export default function Header() {
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  // 홈 밖에서는 홈의 해당 자리로 돌아간다
  const to = (hash: string) => (pathname === '/' ? hash : withBase(`/${hash}`));
  return (
    <header className="wrap site-header">
      <Link to="/" className="brand">
        {person.name}
        <span className="brand__role">{person.role}</span>
      </Link>
      <nav className="site-nav" aria-label="주 메뉴">
        <a href={to('#work')}>해온 일</a>
        <a href={to('#how')}>일하는 방식</a>
        <a href={to('#contact')}>연락하기</a>
        <button type="button" className="ty-chip theme-toggle" onClick={toggle} aria-label="테마 전환">
          {theme === 'dark' ? '라이트' : '다크'}
        </button>
      </nav>
    </header>
  );
}
