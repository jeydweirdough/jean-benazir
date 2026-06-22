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
          <img src="/logo.jpg" alt="Logo" style={{ height: '48px', width: 'auto', display: 'block' }} />
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
            <NavLink to="/contact" className="navbar-cta-btn" onClick={closeMobileMenu}>
              Consult Now
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
