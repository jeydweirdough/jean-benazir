import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'journey', 'projects', 'services', 'contact'];
      const scrollPosition = window.scrollY + 120; // threshold offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar" style={{ background: 'var(--bg-darker)', borderBottom: '1px solid var(--border)' }}>
      <div className="container navbar-container">
        <a href="#hero" className="nav-logo" onClick={closeMobileMenu} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.5px' }}>
          Jean
        </a>

        {/* Mobile Hamburger Icon */}
        <button
          className="mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          style={{ color: 'var(--text-primary)' }}
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
            <a
              href="#hero"
              className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
              onClick={closeMobileMenu}
              style={{ color: activeSection === 'hero' ? 'var(--gold)' : 'var(--text-secondary)' }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#journey"
              className={`nav-link ${activeSection === 'journey' ? 'active' : ''}`}
              onClick={closeMobileMenu}
              style={{ color: activeSection === 'journey' ? 'var(--gold)' : 'var(--text-secondary)' }}
            >
              Journey
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={closeMobileMenu}
              style={{ color: activeSection === 'projects' ? 'var(--gold)' : 'var(--text-secondary)' }}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#services"
              className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
              onClick={closeMobileMenu}
              style={{ color: activeSection === 'services' ? 'var(--gold)' : 'var(--text-secondary)' }}
            >
              Service
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={closeMobileMenu}
              style={{ color: activeSection === 'contact' ? 'var(--gold)' : 'var(--text-secondary)' }}
            >
              Contact
            </a>
          </li>
          <li style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center' }}>
            <a href="#contact" className="navbar-cta-btn" onClick={closeMobileMenu} style={{ background: 'var(--text-primary)', color: 'var(--bg-darker)', border: 'none' }}>
              Consult Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
