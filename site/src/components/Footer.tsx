import { person } from '@data/site';

export default function Footer() {
  return (
    <footer className="wrap site-footer">
      <span className="ty-meta">© 2026 {person.name}</span>
    </footer>
  );
}
