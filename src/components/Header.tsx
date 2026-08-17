import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Magnetic from './Magnetic';

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (document.documentElement.dataset.theme as 'light' | 'dark') ?? 'light',
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      aria-label="테마 전환"
      className="label hover:text-[var(--color-accent)] transition-colors"
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    let prev = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 200 && y > prev);
      prev = y;

      const max = document.body.scrollHeight - innerHeight;
      setProgress(max > 0 ? (y / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ transform: hidden ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      <div className="bg-[var(--color-paper)]/80 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
          <Magnetic strength={0.2}>
            <Link to="/" className="text-sm font-semibold tracking-tight">
              유승주<span className="text-[var(--color-accent)]">.</span>
            </Link>
          </Magnetic>

          <nav className="flex items-center gap-6 md:gap-8">
            {pathname !== '/' && (
              <Link to="/" className="label hover:text-[var(--color-accent)] transition-colors">
                Index
              </Link>
            )}
            <a href="#work" className="label hover:text-[var(--color-accent)] hidden transition-colors sm:block">
              Work
            </a>
            <a href="#contact" className="label hover:text-[var(--color-accent)] transition-colors">
              Contact
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </div>
      <div
        className="h-px origin-left bg-[var(--color-accent)]"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </header>
  );
}
