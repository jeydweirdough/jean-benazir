export default function Footer() {
  return (
    <footer className="footer" style={{ background: '#0A1931', color: '#ffffff', padding: '4rem 0 2.5rem', borderTop: 'none' }}>
      <div className="container">
        <div className="footer-grid" style={{ marginBottom: '2.5rem' }}>
          
          {/* Column 1: Brand & Bio */}
          <div className="footer-brand">
            <h3 style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.85rem' }}>Jean</h3>
            <p style={{ color: '#a8cce8', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '1.2rem' }}>
              Registered Electrical Engineer specializing in solar layout designs, yield performance simulations, and electrical engineering coordination.
            </p>
            <div className="social-links" style={{ display: 'flex', gap: '0.75rem' }}>
              <a 
                href="https://linkedin.com/in/jean-benazir" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-btn" 
                aria-label="LinkedIn"
                style={{ 
                  borderRadius: '8px', 
                  width: '32px', 
                  height: '32px', 
                  borderColor: 'rgba(168, 204, 232, 0.25)', 
                  color: '#a8cce8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(168, 204, 232, 0.25)',
                  transition: 'all 0.2s ease',
                  background: 'transparent'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#ffffff';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(168, 204, 232, 0.25)';
                  e.currentTarget.style.color = '#a8cce8';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a 
                href="mailto:jeanbenazirb@gmail.com" 
                className="social-btn" 
                aria-label="Email"
                style={{ 
                  borderRadius: '8px', 
                  width: '32px', 
                  height: '32px', 
                  borderColor: 'rgba(168, 204, 232, 0.25)', 
                  color: '#a8cce8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(168, 204, 232, 0.25)',
                  transition: 'all 0.2s ease',
                  background: 'transparent'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#ffffff';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(168, 204, 232, 0.25)';
                  e.currentTarget.style.color = '#a8cce8';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-links-col">
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.2rem' }}>Navigation</h4>
            <ul className="footer-links" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <a 
                  href="#hero" 
                  className="footer-link" 
                  style={{ textDecoration: 'none', color: '#a8cce8', fontSize: '0.82rem', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#a8cce8'}
                >Home</a>
              </li>
              <li>
                <a 
                  href="#journey" 
                  className="footer-link" 
                  style={{ textDecoration: 'none', color: '#a8cce8', fontSize: '0.82rem', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#a8cce8'}
                >Journey</a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className="footer-link" 
                  style={{ textDecoration: 'none', color: '#a8cce8', fontSize: '0.82rem', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#a8cce8'}
                >Projects</a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="footer-link" 
                  style={{ textDecoration: 'none', color: '#a8cce8', fontSize: '0.82rem', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#a8cce8'}
                >Service</a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="footer-link" 
                  style={{ textDecoration: 'none', color: '#a8cce8', fontSize: '0.82rem', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#a8cce8'}
                >Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="footer-links-col">
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.2rem' }}>Contact Info</h4>
            <ul className="footer-links" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li style={{ color: '#a8cce8', fontSize: '0.82rem', lineHeight: 1.5 }}>
                Las Piñas City, Metro Manila, Philippines
              </li>
              <li>
                <a 
                  href="mailto:jeanbenazirb@gmail.com" 
                  className="footer-link" 
                  style={{ textDecoration: 'none', color: '#a8cce8', fontSize: '0.82rem', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#a8cce8'}
                >
                  jeanbenazirb@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Call to action */}
          <div className="footer-links-col">
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.2rem' }}>Get In Touch</h4>
            <p style={{ color: '#a8cce8', fontSize: '0.8rem', marginBottom: '1rem', lineHeight: 1.5 }}>
              Ready to design your next PV installation or coordinate electrical systems?
            </p>
            <a 
              href="#contact" 
              className="navbar-cta-btn" 
              style={{ 
                background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '9999px',
                display: 'inline-block',
                textDecoration: 'none',
                padding: '0.65rem 1.3rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                textAlign: 'center'
              }}
            >
              Consult Now
            </a>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(168, 204, 232, 0.15)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: '#a8cce8' }}>
          <p style={{ margin: 0, fontSize: '0.8rem' }}>© {new Date().getFullYear()} Jean Benazir T. Buaya. All rights reserved.</p>
          <p style={{ margin: 0, fontSize: '0.8rem' }}>Registered Electrical Engineer (REE — Board Passer 2019)</p>
        </div>

      </div>
    </footer>
  );
}
