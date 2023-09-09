import { Github } from 'lucide-react';
import { poppins } from '../pages/_app';

export default function Footer() {
  return (
    <footer className={poppins.className}>
      <a href="https://github.com/rikster-r/super-store">
        &copy; 2022 rikster-r
        <Github size={20} />
      </a>
    </footer>
  );
}
