import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>JEAN <span className="text-gold">BENAZIR</span></h3>
            <p>
              Registered Electrical Engineer specializing in complex photovoltaic solar systems design, Single Line Diagrams, and renewable energy compliance audits.
            </p>
            <div className="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Navigations</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Engineer</Link></li>
              <li><Link to="/projects" className="footer-link">Solar Projects</Link></li>
              <li><Link to="/contact" className="footer-link">Get In Touch</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Projects</h4>
            <ul className="footer-links">
              <li><Link to="/projects?filter=rooftop" className="footer-link">Rooftop Solar</Link></li>
              <li><Link to="/projects?filter=ground" className="footer-link">Ground Mounted</Link></li>
              <li><Link to="/projects?filter=planning" className="footer-link">MEPF Coordination</Link></li>
              <li><Link to="/projects?filter=planning" className="footer-link">Structured Cabling</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Contact Info</h4>
            <ul className="footer-links">
              <li className="footer-link" style={{ pointerEvents: 'none' }}>
                Las Piñas City,<br />
                Metro Manila, Philippines
              </li>
              <li className="footer-link" style={{ pointerEvents: 'none' }}>
                M: +63 997 364 7886
              </li>
              <li className="footer-link" style={{ pointerEvents: 'none' }}>
                E: jeanbenazirb@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Jean Benazir T. Buaya. All rights reserved.</p>
          <p>Registered Electrical Engineer (REE) Board Exam Passer – 2019</p>
        </div>
      </div>
    </footer>
  );
}
