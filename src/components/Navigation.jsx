import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="nav-container">
      <div className="logo">NIKO</div>
      <div className="links">
        <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
        <Link to="/manga" className={`nav-link ${isActive('/manga')}`}>Manga</Link>
        <Link to="/illustration" className={`nav-link ${isActive('/illustration')}`}>Illustration</Link>
        <Link to="/digital" className={`nav-link ${isActive('/digital')}`}>Digital</Link>
      </div>
    </nav>
  );
}
