import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <NavLink to="/" className="nav-logo" onClick={closeMobileMenu}>
          {/* Integrated Circuit Chip SVG Emblem */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e5b13a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: '10px' }}
          >
            <rect x="5" y="5" width="14" height="14" rx="2" />
            <line x1="9" y1="1" x2="9" y2="5" />
            <line x1="15" y1="1" x2="15" y2="5" />
            <line x1="9" y1="19" x2="9" y2="23" />
            <line x1="15" y1="19" x2="15" y2="23" />
            <line x1="20" y1="9" x2="24" y2="9" />
            <line x1="20" y1="15" x2="24" y2="15" />
            <line x1="1" y1="9" x2="5" y2="9" />
            <line x1="1" y1="15" x2="5" y2="15" />
            <circle cx="12" cy="12" r="2.5" fill="#e5b13a" />
          </svg>
          JEAN <span>BENAZIR</span>
        </NavLink>

        {/* Mobile Hamburger Icon */}
        <button
          className="mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {isMobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        {/* Links */}
        <ul className={`nav-links ${isMobileOpen ? 'mobile-active' : ''}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={closeMobileMenu}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={closeMobileMenu}
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={closeMobileMenu}
            >
              Contact
            </NavLink>
          </li>
          <li style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center' }}>
            <NavLink to="/contact" className="btn btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.7rem' }} onClick={closeMobileMenu}>
              Consult Now
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
