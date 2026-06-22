export default function About() {
  return (
    <div className="animate-fade-in section-padding about-page" style={{ position: 'relative', background: '#ffffff', minHeight: '100vh' }}>
      {/* Background decoration wires */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1, opacity: 0.05 }}>
        <svg width="100%" height="100%">
          <path d="M 0,100 H 600 V 500 H 1200" fill="none" stroke="#F4E11B" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="600" cy="100" r="5" fill="#F4E11B" />
          <circle cx="600" cy="500" r="5" fill="#F4E11B" />
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Laboratory Legacy</span>
          <h1 className="section-title">The Story of Jean Benazir</h1>
          <div className="section-divider"></div>
        </div>

        {/* Intro Grid */}
        <div className="about-intro-grid">
          <div className="about-intro-text">
            <h2>Advancing Photovoltaic System Design & Efficiency</h2>
            <p>
              Jean Benazir T. Buaya is a Registered Electrical Engineer (REE) based in Las Piñas City, Philippines. She specializes in the design, optimization, and audit compliance of solar photovoltaic energy infrastructures.
            </p>
            <p>
              With experience spanning senior design engineering roles at global energy corporations like TotalEnergies, policy research at the Department of Energy, and MEPF execution at construction firms, she balances technical calculations with regulatory compliance.
            </p>
            <p>
              From complex ground-mounted solar utility arrays to commercial rooftop installations, she develops array layouts, single line diagrams (SLD), cable routing optimizations, and shading/yield simulations.
            </p>
          </div>
          <div className="about-intro-image">
            <div className="offset-border-frame" style={{ width: '100%' }}>
              <div className="about-intro-image-frame" style={{ border: 'none' }}>
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80"
                  alt="Solar panel arrays under sunshine"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Section */}
      <section className="stats-bar" style={{ position: 'relative', zIndex: 5 }}>
        <div className="container">
          <div className="stats-grid">
            <div>
              <div className="stat-number">2019</div>
              <div className="stat-label">Registered EE Board Exam</div>
            </div>
            <div>
              <div className="stat-number">3.5GWp+</div>
              <div className="stat-label">Ground-Mounted Project Scale</div>
            </div>
            <div>
              <div className="stat-number">6+ Years</div>
              <div className="stat-label">Electrical & Solar Experience</div>
            </div>
            <div>
              <div className="stat-number">528kWp</div>
              <div className="stat-label">Rooftop Project Scale</div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Chapters Section */}
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '5rem' }}>
        <div className="section-header">
          <span className="section-subtitle">Career Timeline</span>
          <h2 className="section-title">Professional Chapters</h2>
          <div className="section-divider"></div>
        </div>

        <div className="team-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' }}>
          {/* Chapter 1 */}
          <div className="team-card brochure-card offset-border-frame" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="team-img-frame" style={{ aspectRatio: '16/10', marginBottom: '1rem' }}>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
                alt="TotalEnergies Senior Solar Design Engineer"
              />
            </div>
            <div className="team-info" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h4>TotalEnergies</h4>
              <p style={{ color: 'var(--gold)', margin: '0.2rem 0', fontWeight: 600 }}>Senior Solar Design Engineer</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Nov 2025 - Present (Total Distributed PH)
              </p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                Performs detailed layout designs, master plans, shading analysis, PV-inverter sizing, PVSyst yield simulations, and Bill of Materials (BOM) with cost estimations for complex solar installations.
              </p>
            </div>
          </div>

          {/* Chapter 2 */}
          <div className="team-card brochure-card offset-border-frame" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="team-img-frame" style={{ aspectRatio: '16/10', marginBottom: '1rem' }}>
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
                alt="Department of Energy Science Research Specialist"
              />
            </div>
            <div className="team-info" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h4>Department of Energy</h4>
              <p style={{ color: 'var(--gold)', margin: '0.2rem 0', fontWeight: 600 }}>Science Research Specialist II</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Dec 2024 - Nov 2025 (Solar Management Group)
              </p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                Formulated solar resource policy recommendations, evaluated applicants' financial capabilities, audited developer books, and managed government financial share databases.
              </p>
            </div>
          </div>

          {/* Chapter 3 */}
          <div className="team-card brochure-card offset-border-frame" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="team-img-frame" style={{ aspectRatio: '16/10', marginBottom: '1rem' }}>
              <img
                src="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&w=600&q=80"
                alt="Solar Philippines Solar Design Engineer"
              />
            </div>
            <div className="team-info" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h4>Solar Philippines</h4>
              <p style={{ color: 'var(--gold)', margin: '0.2rem 0', fontWeight: 600 }}>Electrical / Solar Design Engineer</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Jul 2023 - Dec 2024 (Rooftop & Ground PV)
              </p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                Drafted PV layouts, wiring diagrams, routing layouts for C&I, residential and farm systems. Handled on-site feasibility, subcontractor schedules, and material canvasses.
              </p>
            </div>
          </div>

          {/* Chapter 4 */}
          <div className="team-card brochure-card offset-border-frame" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="team-img-frame" style={{ aspectRatio: '16/10', marginBottom: '1rem' }}>
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80"
                alt="M. Verano Const. Corp Electrical Engineer"
              />
            </div>
            <div className="team-info" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h4>M. Verano Const. Corp</h4>
              <p style={{ color: 'var(--gold)', margin: '0.2rem 0', fontWeight: 600 }}>Electrical Engineer</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Aug 2022 - Jul 2023
              </p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                Directly responsible for all electrical works under consultant supervision. Supervised construction activities, document control, resource deployment, and bid preparation.
              </p>
            </div>
          </div>

          {/* Chapter 5 */}
          <div className="team-card brochure-card offset-border-frame" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="team-img-frame" style={{ aspectRatio: '16/10', marginBottom: '1rem' }}>
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80"
                alt="DMCI Homes Electrical Engineer"
              />
            </div>
            <div className="team-info" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h4>DMCI Homes Inc.</h4>
              <p style={{ color: 'var(--gold)', margin: '0.2rem 0', fontWeight: 600 }}>Electrical Engineer</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Nov 2021 - Aug 2022 (Prisma Residences)
              </p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                Monitored MEPF subcontractor productivity. Reviewed drawings, RFIs, as-builts, and evaluated billings, variation orders, and coordinated weekly site alignment meetings.
              </p>
            </div>
          </div>

          {/* Chapter 6 */}
          <div className="team-card brochure-card offset-border-frame" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="team-img-frame" style={{ aspectRatio: '16/10', marginBottom: '1rem' }}>
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
                alt="Cornersteel Systems Corp Electrical Design Engineer"
              />
            </div>
            <div className="team-info" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h4>Cornersteel Systems Corp.</h4>
              <p style={{ color: 'var(--gold)', margin: '0.2rem 0', fontWeight: 600 }}>Electrical Design Engineer</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Jan 2020 - Jun 2021
              </p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                Conducted site surveys for electrical, structured voice/data, and auxiliary installations. Prepared designs, single line diagrams (SLDs), and material quantity estimations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Stack Section */}
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '5rem' }}>
        <div className="section-header">
          <span className="section-subtitle">Technical Matrix</span>
          <h2 className="section-title">Skills & Proficiencies</h2>
          <div className="section-divider"></div>
        </div>

        <div className="philosophy-grid" style={{ marginTop: '2rem' }}>
          {/* Software Column */}
          <div className="brochure-card offset-border-frame" style={{ padding: '2rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--gold)' }}>Engineering Software</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <span>PVSyst / Helioscope / PVCase</span>
                </div>
                <div className="skill-badge-container">
                  <span className="skill-badge expert">Expert</span>
                  <span className="skill-badge expert">Yield Simulation</span>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <span>AutoCAD / Revit MEP</span>
                </div>
                <div className="skill-badge-container">
                  <span className="skill-badge expert">Expert</span>
                  <span className="skill-badge advanced">MEPF Modeling</span>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <span>ETAP / SKM PowerTools</span>
                </div>
                <div className="skill-badge-container">
                  <span className="skill-badge advanced">Advanced</span>
                  <span className="skill-badge advanced">Short Circuit & Load Flow</span>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <span>MATLAB / PSCAD / Dialux</span>
                </div>
                <div className="skill-badge-container">
                  <span className="skill-badge advanced">Advanced</span>
                  <span className="skill-badge basic">Lighting Design</span>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <span>MS Project / PlanSwift</span>
                </div>
                <div className="skill-badge-container">
                  <span className="skill-badge advanced">Advanced</span>
                  <span className="skill-badge advanced">Project Scheduling</span>
                </div>
              </div>
            </div>
          </div>

          {/* Codes/Standards Column */}
          <div className="brochure-card offset-border-frame" style={{ padding: '2rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--gold)' }}>Codes & Standards</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>PEC (Philippine Electrical Code)</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Compliance reviewer & design base standard</p>
                <div className="skill-badge-container"><span className="skill-badge expert">Expert Compliance</span></div>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>NEC (National Electrical Code)</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>US / International reference calculations</p>
                <div className="skill-badge-container"><span className="skill-badge expert">Expert</span></div>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>IEEE Standards / IEC Regulations</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Utility-scale protection and equipment parameters</p>
                <div className="skill-badge-container"><span className="skill-badge advanced">Advanced</span></div>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>PEE Guidelines</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Professional licensing & design verification guidelines</p>
                <div className="skill-badge-container"><span className="skill-badge advanced">Advanced</span></div>
              </div>
            </div>
          </div>

          {/* Specialties Column */}
          <div className="brochure-card offset-border-frame" style={{ padding: '2rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--gold)' }}>Core Specialties</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <span className="skill-badge expert" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Solar PV Array Design</span>
              <span className="skill-badge expert" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Single Line Diagrams (SLD)</span>
              <span className="skill-badge expert" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Load Analysis</span>
              <span className="skill-badge advanced" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Short Circuit Studies</span>
              <span className="skill-badge expert" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Grounding Systems</span>
              <span className="skill-badge advanced" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Lightning Protection</span>
              <span className="skill-badge advanced" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>MEPF Coordination</span>
              <span className="skill-badge basic" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Control Systems</span>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications and Trainings Section */}
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '5rem' }}>
        <div className="section-header">
          <span className="section-subtitle">Credentials & Development</span>
          <h2 className="section-title">Certifications & Trainings</h2>
          <div className="section-divider"></div>
        </div>

        <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border)', padding: '2.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'left' }}>
            <div>
              <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', fontFamily: 'var(--sans)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Solar PV Professional Courses</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>HUAWEI Smartlogger Configuration Procedure (CS201)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Solar Philippines &middot; Feb 2024</div>
                </li>
                <li style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Introduction of Net Metering Application (PV117)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Solar Philippines &middot; Jan 2024</div>
                </li>
                <li style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Basic Engineering Design for Commercial Rooftops (PV108)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Solar Philippines &middot; Jan 2024</div>
                </li>
                <li style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Solar PV Installation & Design (Rooftop Focus)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PHL SOLAR Industries &middot; Jul 2022</div>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', fontFamily: 'var(--sans)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Compliance & Safety</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Electrical Safety in the Workplace (SF101)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Solar Philippines &middot; Mar 2024</div>
                </li>
                <li style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>RA 11285: Compliance Energy Audit Case Studies</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>IIEE Mini Conference &middot; 2023</div>
                </li>
                <li style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Energy Efficiency & Conservation on Building Design</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>IIEE Mini Conference &middot; 2023</div>
                </li>
                <li style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Standard Electrical Installation & Fault Calculation</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>IIEE-Metro South Chapter &middot; Aug 2020</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
