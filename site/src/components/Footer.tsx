import { person } from '@data/site';

export default function Footer() {
  return (
    <footer className="wrap site-footer">
      <span className="ty-meta">© 2026 {person.name}</span>
      <span className="ty-meta">
        <a href={person.github}>github.com/{person.handle}</a>
      </span>
    </footer>
  );
}
