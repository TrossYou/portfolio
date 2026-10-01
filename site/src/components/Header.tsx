import { Link } from 'react-router-dom';
import { person } from '@data/site';
import { useTheme } from '../lib/hooks';

export default function Header() {
  const { theme, toggle } = useTheme();
  return (
    <header className="wrap site-header">
      <Link to="/" className="brand">
        {person.name}
      </Link>
      <div className="site-header__right">
        <a className="ty-btn ty-btn--link" href={person.github} style={{ fontSize: 14 }}>
          GitHub →
        </a>
        <button type="button" className="ty-chip theme-toggle" onClick={toggle} aria-label="테마 전환">
          {theme === 'dark' ? '라이트' : '다크'}
        </button>
      </div>
    </header>
  );
}
