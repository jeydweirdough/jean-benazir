import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Home() {
  const LINE1 = 'Jean Benazir';
  const LINE2 = 'T. Buaya';
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let intervalId: ReturnType<typeof setInterval>;
    const total = LINE1.length + LINE2.length;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        i++;
        if (i <= LINE1.length) {
          setLine1(LINE1.slice(0, i));
        } else if (i <= total) {
          setLine2(LINE2.slice(0, i - LINE1.length));
        } else {
          clearInterval(intervalId);
          setTypingDone(true);
        }
      }, 75);
    }, 1100);
    return () => { clearTimeout(timeoutId); clearInterval(intervalId); };
  }, []);

  const cursorOnLine1 = !typingDone && line1.length < LINE1.length;
  const cursorOnLine2 = !typingDone && line1.length === LINE1.length;

  const [showScrollNav, setShowScrollNav] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollNav(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.style.transitionDelay = el.dataset.delay ?? '0s';
            el.classList.add('is-visible');
            el.classList.remove('is-exit');
          } else if (entry.boundingClientRect.top < 0) {
            el.style.transitionDelay = '0s';
            el.classList.remove('is-visible');
            el.classList.add('is-exit');
          } else {
            el.style.transitionDelay = '0s';
            el.classList.remove('is-visible', 'is-exit');
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div>

      {/* ── SCROLL NAVBAR ── */}
      <nav className={`scroll-navbar${showScrollNav ? ' scroll-navbar--visible' : ''}`}>
        <NavLink to="/" className="scroll-nav-logo">
          <img src="/logo.jpg" alt="Logo" style={{ height: '44px', width: 'auto', display: 'block' }} />
        </NavLink>
        <ul className="scroll-nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/projects">Projects</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li>
            <NavLink to="/contact" className="scroll-nav-cta">Consult Now</NavLink>
          </li>
        </ul>
      </nav>

      {/* ── HERO SPLIT ── */}
      <section className="hero-split">

        {/* LEFT — blue panel (logo + name + buttons only) */}
        <div className="hsplit-left">
          <div className="hsplit-logo-area hanim-left" style={{ animationDelay: '0s' }}>
            <NavLink to="/" className="hsplit-logo">
              <div style={{ background: '#1340b8', borderRadius: '6px', overflow: 'hidden', display: 'inline-flex' }}>
                <img src="/logo.jpg" alt="Logo" style={{ height: '48px', width: 'auto', display: 'block', mixBlendMode: 'multiply' }} />
              </div>
            </NavLink>
          </div>

          <div className="hsplit-body">
            <p className="hsplit-greeting hanim-up" style={{ animationDelay: '0.2s' }}>Hi, I am</p>
            <h1 className="hsplit-name hanim-fade" style={{ animationDelay: '0.35s' }}>
              {line1}{cursorOnLine1 && <span className="hsplit-typing-cursor" />}
              <br />
              <span className="hsplit-name-gold">
                {line2}{cursorOnLine2 && <span className="hsplit-typing-cursor" />}
              </span>
            </h1>
            <div className="hsplit-actions hanim-up" style={{ animationDelay: '0.55s' }}>
              <Link to="/projects" className="hsplit-btn-primary">View Projects</Link>
            </div>
            <div className="hsplit-contact-list hanim-up" style={{ animationDelay: '0.75s' }}>
              <a href="tel:+639973647886" className="hsplit-contact-item">
                <span className="hsplit-contact-icon-box">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12 19.79 19.79 0 0 1 1.14 3.38 2 2 0 0 1 3.11 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </span>
                +63 997 364 7886
              </a>
              <a href="mailto:jeanbenazirb@gmail.com" className="hsplit-contact-item">
                <span className="hsplit-contact-icon-box">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                jeanbenazirb@gmail.com
              </a>
              <a href="https://linkedin.com/in/jean-benazir" className="hsplit-contact-item" target="_blank" rel="noopener noreferrer">
                <span className="hsplit-contact-icon-box">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </span>
                linkedin.com/in/jean-benazir
              </a>
            </div>
          </div>
        </div>

        {/* CENTER — jean.png floating at the grid split boundary */}
        <div className="hsplit-center-img">
          <img src="/jean.png" alt="Jean Benazir T. Buaya — Registered Electrical Engineer" className="hanim-up" style={{ animationDelay: '0.1s' }} />
          <div className="hsplit-social-icons">
            <a href="mailto:jeanbenazirb@gmail.com" className="hsplit-social-btn" title="Email">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
            <a href="https://linkedin.com/in/jean-benazir" className="hsplit-social-btn" title="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="tel:+639973647886" className="hsplit-social-btn" title="Phone">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12 19.79 19.79 0 0 1 1.14 3.38 2 2 0 0 1 3.11 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT — white floating card (content, no full-bleed image) */}
        <div className="hsplit-right hanim-right" style={{ animationDelay: '0.05s' }}>
          <div className="hsplit-card">
            <nav className="hsplit-card-nav">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'hcnav-link active' : 'hcnav-link'}>Home</NavLink>
              <NavLink to="/projects" className={({ isActive }) => isActive ? 'hcnav-link active' : 'hcnav-link'}>Projects</NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'hcnav-link active' : 'hcnav-link'}>About Me</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'hcnav-link active' : 'hcnav-link'}>Contact</NavLink>
              <Link to="/contact" className="hcnav-cta">Consult Now</Link>
            </nav>

            <div className="hsplit-card-content">

              {/* Small session-style badge */}
              <span className="hcard-session-badge hanim-up" style={{ animationDelay: '0.45s' }}>Profile</span>

              {/* Role title + license */}
              <p className="hcard-role-title hanim-up" style={{ animationDelay: '0.55s' }}>Registered Electrical Engineer</p>
              <p className="hcard-license-text hanim-up" style={{ animationDelay: '0.65s' }}>REE License No. 0084321</p>

              {/* Description */}
              <p className="hcard-desc hanim-up" style={{ animationDelay: '0.75s' }}>
                Specializing in <span className="hcard-desc-gold">Power Systems</span>, Building Wiring, and <span className="hcard-desc-gold">Solar PV Systems Design</span>. Over <span className="hcard-desc-gold">6 years</span> in utility-scale ground-mounted solar up to <span className="hcard-desc-gold">3,500 MWp</span> and commercial rooftop installations up to <span className="hcard-desc-gold">528 kWp</span>.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Engineering Logic Pillars */}
      <div className="pillars-section-white">
        <section className="section-padding container">
          <div className="pillars-v2-layout">

            {/* Row 1, Col 1 — text panel */}
            <div className="pillars-v2-left reveal" data-dir="left">
              <span className="pillars-v2-subtitle">Our Services</span>
              <h2 className="pillars-v2-heading">Engineering solutions<br/>of every kind</h2>
              <p className="pillars-v2-desc">
                From solar PV design to on-site supervision, delivering precision-engineered solutions for residential and commercial power systems across the Philippines.
              </p>
            </div>

            {/* Row 1, Col 2 */}
            <div className="pillars-v2-card reveal" data-delay="0.1s">
              <div className="pillars-v2-icon" style={{ background: '#1340b8' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              </div>
              <h3 className="pillars-v2-card-title">Solar PV Design</h3>
              <p className="pillars-v2-card-desc">Basic to complex PV designs including array layouts, shading analysis, PV-inverter sizing, PVSyst, PVCase and Helioscope simulations.</p>
            </div>

            {/* Row 1, Col 3 */}
            <div className="pillars-v2-card reveal" data-dir="right" data-delay="0.2s">
              <div className="pillars-v2-icon" style={{ background: '#e5891a' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
                  <path d="M7 2v20M17 2v20M2 7h20M2 17h20"/>
                </svg>
              </div>
              <h3 className="pillars-v2-card-title">Electrical Planning</h3>
              <p className="pillars-v2-card-desc">Single Line Diagrams (SLD), DC/AC cable routing optimization, auxiliary cabling systems, and wiring diagrams for residential & commercial sites.</p>
            </div>

            {/* Row 2, Col 1 — 5th service card */}
            <div className="pillars-v2-card reveal" data-dir="left" data-delay="0.05s">
              <div className="pillars-v2-icon" style={{ background: '#15803d' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 20h20M5 20V10l7-7 7 7v10"/>
                  <path d="M9 20v-5h6v5"/>
                </svg>
              </div>
              <h3 className="pillars-v2-card-title">Site Assessment & Audit</h3>
              <p className="pillars-v2-card-desc">On-site energy audits, load analysis, and technical inspection of existing electrical systems for compliance and optimization.</p>
            </div>

            {/* Row 2, Col 2 */}
            <div className="pillars-v2-card reveal" data-delay="0.15s">
              <div className="pillars-v2-icon" style={{ background: '#0891b2' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3 className="pillars-v2-card-title">DOE Resource Policy</h3>
              <p className="pillars-v2-card-desc">Auditing developer books, formulating solar resource recommendations, and evaluating financial capabilities for solar RE contracts.</p>
            </div>

            {/* Row 2, Col 3 */}
            <div className="pillars-v2-card reveal" data-dir="right" data-delay="0.25s">
              <div className="pillars-v2-icon" style={{ background: '#6d28d9' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <h3 className="pillars-v2-card-title">MEPF Supervision</h3>
              <p className="pillars-v2-card-desc">Coordinating on-site MEPF subcontractor progress, reviewing as-built drawings, on-site assessments, and managing timelines.</p>
            </div>

          </div>
        </section>
      </div>

      {/* Engineering Quote Section */}
      <section className="section-padding" style={{ background: '#ffffff', position: 'relative', zIndex: 5, paddingTop: 0 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 className="font-serif reveal" data-dir="down" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', maxWidth: '800px', color: '#1a1a2e' }}>
            Advancing Renewable Solar Infrastructure.
          </h2>
          <p className="reveal" data-delay="0.15s" style={{ maxWidth: '600px', marginBottom: '2.5rem', fontSize: '1.05rem', color: '#667085', fontWeight: 400 }}>
            Through simulation, detailed calculation, and on-site audit compliance, we design systems that maximize power yield and guarantee standard safety.
          </p>
          <div className="reveal" data-dir="scale" data-delay="0.3s" style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/about" className="quote-btn-primary">Profile Story</Link>
            <Link to="/projects" className="quote-btn-outline">Solar Projects</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
