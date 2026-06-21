import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      {/* Background SVG Grid and Electrical Trace Wires */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        <svg width="100%" height="100%" style={{ opacity: 0.08 }}>
          {/* Engineering grid lines */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e5b13a" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Dynamic Circuit Trace Wires linking sections */}
        <svg className="hero-circuit-svg" width="100%" height="1200" viewBox="0 0 1200 1200" fill="none" style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Trace 1 - Left Margin Frame */}
          <path
            d="M 50,50 L 50,600 L 90,640 L 90,1100"
            stroke="#e5b13a"
            strokeWidth="1.5"
            strokeDasharray="5, 5"
          />
          {/* Pulsing signal nodes for Trace 1 */}
          <circle cx="50" cy="50" r="4" fill="#e5b13a" />
          <circle cx="50" cy="600" r="4" fill="#e5b13a" />
          <circle cx="90" cy="640" r="4" fill="#e5b13a" />
          <circle cx="90" cy="1100" r="4" fill="#e5b13a" />

          {/* Trace 2 - Right Margin Frame */}
          <path
            d="M 1150,50 L 1150,500 L 1110,540 L 1110,1100"
            stroke="#e5b13a"
            strokeWidth="1.5"
          />
          {/* Pulsing signal nodes for Trace 2 */}
          <circle cx="1150" cy="50" r="4" fill="#e5b13a" />
          <circle cx="1150" cy="500" r="4" fill="#e5b13a" />
          <circle cx="1110" cy="540" r="4" fill="#e5b13a" />
          <circle cx="1110" cy="1100" r="4" fill="#e5b13a" />

          {/* Trace 3 (vertical wire running down center) */}
          <path
            d="M 600,0 L 600,1200"
            stroke="rgba(229, 177, 58, 0.15)"
            strokeWidth="1"
            strokeDasharray="10, 15"
          />
        </svg>
      </div>

      {/* Decorative vertical stripe */}
      <div className="stripe-v" style={{ opacity: 0.5 }}></div>

      {/* Hero Section */}
      <section className="section-padding container" style={{ position: 'relative', zIndex: 5 }}>
        <div className="hero-wrapper">
          <div className="hero-content animate-slide-up">
            <span className="hero-subtitle">Jean Benazir T. Buaya</span>
            <h1 className="hero-title">
              Registered <br />
              <span className="text-gold">Electrical Engineer</span>
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: '0.2rem 0 1.75rem 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <circle cx="10" cy="9" r="1"></circle>
                </svg>
                <span>REE License No. 0084321</span>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+63 997 364 7886</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <a href="mailto:jeanbenazirb@gmail.com" style={{ transition: 'var(--transition)' }}>jeanbenazirb@gmail.com</a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ transition: 'var(--transition)', textDecoration: 'underline' }}>linkedin.com/in/jean-benazir</a>
                </div>
              </div>
            </div>
            <p className="hero-desc">
              Specializing in Power Systems, Building Wiring, and Solar PV Systems Design. Over 6 years of experience in utility-scale ground-mounted solar (up to 3,500 MWp) and commercial rooftop installations (up to 528 kWp).
            </p>
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">
                View Solar Projects
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Enquire Services
              </Link>
            </div>
          </div>

          <div className="hero-image-container" style={{ width: '100%' }}>
            <div className="offset-border-frame" style={{ width: '100%' }}>
              <div className="hero-image-frame" style={{ borderRadius: '4px', border: 'none' }}>
                <img
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
                  alt="Jean Benazir T. Buaya - Registered Electrical Engineer on site"
                  className="hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Logic Pillars */}
      <section className="section-padding container" style={{ position: 'relative', zIndex: 5 }}>
        <div className="section-header">
          <span className="section-subtitle">Core Capabilities</span>
          <h2 className="section-title">Engineering Pillars</h2>
          <div className="section-divider"></div>
        </div>

        <div className="philosophy-grid">
          {/* Capability 1 */}
          <div className="brochure-card philosophy-card offset-border-frame">
            <div className="philosophy-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            </div>
            <h3>Solar PV Design</h3>
            <p>
              Basic to complex PV designs including array layouts, shading analysis, PV-inverter sizing, PVSyst, PVCase and Helioscope simulations.
            </p>
          </div>

          {/* Capability 2 */}
          <div className="brochure-card philosophy-card offset-border-frame">
            <div className="philosophy-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
                <path d="M7 2v20M17 2v20M2 7h20M2 17h20"/>
              </svg>
            </div>
            <h3>Electrical Planning</h3>
            <p>
              Single Line Diagrams (SLD), DC/AC cable routing optimization, auxiliary cabling systems, and wiring diagrams for residential & commercial sites.
            </p>
          </div>

          {/* Capability 3 */}
          <div className="brochure-card philosophy-card offset-border-frame">
            <div className="philosophy-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <h3>DOE Resource Policy</h3>
            <p>
              Auditing developer books, formulating solar resource Recommendations, and evaluating financial capabilities for solar RE contracts.
            </p>
          </div>

          {/* Capability 4 */}
          <div className="brochure-card philosophy-card offset-border-frame">
            <div className="philosophy-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3> MEPF Supervision</h3>
            <p>
              Coordinating on-site MEPF subcontractor progress, reviewing as-built drawings, on-site assessments, and managing timelines.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Quote Section */}
      <section className="section-padding" style={{ background: 'var(--bg-dark)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', position: 'relative', zIndex: 5 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', maxWidth: '800px' }}>
            Advancing Renewable Solar Infrastructure.
          </h2>
          <p style={{ maxWidth: '600px', marginBottom: '2.5rem', fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            Through simulation, detailed calculation, and on-site audit compliance, we design systems that maximize power yield and guarantee standard safety.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/about" className="btn btn-primary">Profile Story</Link>
            <Link to="/projects" className="btn btn-outline">Solar Projects</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
