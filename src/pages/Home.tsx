import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import jeanPortrait from '../assets/jean_portrait_no_bg.png';

interface Project {
  id: string;
  title: string;
  category: 'rooftop' | 'ground' | 'planning';
  image: string;
  desc: string;
  year: string;
  location: string;
  role: string;
  scope: string[];
  inverter_rating: string;
  design_drawings: string;
  capacity_yield: string;
  standards_code: string;
  client: string;
  result: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'Megaworld Festivewalk Mall',
    category: 'rooftop',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
    desc: 'Preparation of preliminary project drawings based on site inspection, shading orientation analysis, and electrical design considerations for a 528kWp Rooftop Solar Project (RSP).',
    year: '2024',
    location: 'Iloilo City, PH',
    role: 'Lead Design Engineer',
    scope: [
      'Prepared preliminary PV array layouts and inverter configuration for 528kWp.',
      'Conducted detailed shading and yield performance assessments using PVSyst.',
      'Developed DC/AC cable schedules and cable size calculations.',
      'Created single line diagrams (SLD) in compliance with the Philippine Electrical Code.'
    ],
    inverter_rating: '400kWac Inverter Stack',
    design_drawings: 'PV Layout, Cable Routing, SLD',
    capacity_yield: '528kWp DC / 400kWac AC',
    standards_code: 'Philippine Electrical Code (PEC)',
    client: 'TotalEnergies',
    result: 'Reduced cabling distribution losses by 2.4% and successfully passed Meralco Net Metering verification on the first inspection.'
  },
  {
    id: '2',
    title: 'Nueva Ecija 2 Solar Project',
    category: 'ground',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    desc: 'Development of initial project drawings and electrical layout plans for a massive 3,500MWp ground-mounted solar utility project, coordinating master plans and centralized power layout designs.',
    year: '2024',
    location: 'Nueva Ecija, PH',
    role: 'Lead Solar Design Engineer',
    scope: [
      'Created master plan block layouts and tracker configurations using PVCase.',
      'Modeled terrain slopes and calculated shading layouts for utility-scale efficiency.',
      'Conducted large-scale PVSyst meteorological yield estimations.',
      'Coordinated layout sizing and spacing for central inverter stations.'
    ],
    inverter_rating: 'Central Inverter Blocks (3.125MW)',
    design_drawings: 'Block Layout, SLD, Substation MV',
    capacity_yield: '3,500MWp Utility Capacity',
    standards_code: 'Grid Code Integration Standards',
    client: 'Solar Philippines',
    result: 'Optimized array block layouts to reduce DC cable quantities by 12% across Phase 1 development blocks.'
  },
  {
    id: '3',
    title: 'General Santos City SPP',
    category: 'ground',
    image: 'https://images.unsplash.com/photo-1548550022-c3bf507b9a5c?auto=format&fit=crop&w=800&q=80',
    desc: 'Development of initial project drawings and layout optimization for a 475MWp Ground-Mounted Solar Power Project, conducting shading and yield simulations.',
    year: '2023',
    location: 'General Santos City, PH',
    role: 'Solar Design Engineer',
    scope: [
      'Developed 475MWp utility solar array layouts and DC/AC routing plans.',
      'Conducted PVSyst meteorological shading and performance ratio simulations.',
      'Prepared detailed Single Line Diagrams (SLD) for inverter station cabinets.',
      'Drafted MV collection grid routing schematic layouts.'
    ],
    inverter_rating: '1500V central / string mix',
    design_drawings: 'Single Line Diagram, DC Cable Routing',
    capacity_yield: '475MWp Utility Scale',
    standards_code: 'PEC / IEC Standards Compliance',
    client: 'Solar Philippines',
    result: 'Yield simulations validated by the client technical committee for project financial close.'
  },
  {
    id: '4',
    title: 'Infinity Resort RSP',
    category: 'rooftop',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
    desc: 'Preparation of preliminary project drawings, shading assessments, and PV-inverter sizing layouts for a 50kWp Net-Metered Rooftop Solar Project.',
    year: '2024',
    location: 'Puerto Galera, PH',
    role: 'Design Engineer',
    scope: [
      'Designed 50kWp Net-Metered rooftop array layout and tile spacing.',
      'Performed PV-inverter matching calculations.',
      'Developed single line drawings (SLDs) and electrical panels layouts.',
      'Prepared technical bill of materials (BOM) with cost analysis.'
    ],
    inverter_rating: '36kWac String Inverter',
    design_drawings: 'DC/AC Cable Routing Plan & SLD',
    capacity_yield: '50kWp DC / 36kWac AC',
    standards_code: 'Net Metering Application Standards',
    client: 'Infinity Resort',
    result: 'Passed local utility net metering inspection, generating 72 MWh of annual clean energy.'
  },
  {
    id: '5',
    title: 'SM City Puerto Princesa',
    category: 'rooftop',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=800&q=80',
    desc: 'Development of initial project drawings and electrical plans for SM City Puerto Princesa commercial solar rooftop project.',
    year: '2024',
    location: 'Palawan, PH',
    role: 'Lead Design Engineer',
    scope: [
      'Evaluated structural design load constraints for solar panel racks.',
      'Developed initial layouts and electrical wiring diagrams.',
      'Performed cable sizing, DC combiners layout, and inverter stack optimization.'
    ],
    inverter_rating: '100kW String Inverters Stack',
    design_drawings: 'Layout Drawings & Block Diagrams',
    capacity_yield: '1.2MWp Commercial Rooftop',
    standards_code: 'PEC / Utility Standards',
    client: 'TotalEnergies',
    result: 'Completed initial design packages for corporate engineering review and approval.'
  },
  {
    id: '6',
    title: 'Iba-Palauig SPP',
    category: 'ground',
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80',
    desc: 'Development of initial drawings and array layouts for 200MWp ground-mounted solar power plant.',
    year: '2023',
    location: 'Zambales, PH',
    role: 'Design Engineer',
    scope: [
      'Developed initial drawings and layout configurations for a 200MWp ground system.',
      'Drafted cable routing optimization diagrams to minimize voltage drops.',
      'Assisted in array boundary calculations and tracker configurations.'
    ],
    inverter_rating: 'Central Inverter Blocks',
    design_drawings: 'SLD & Collection Grid Layout',
    capacity_yield: '200MWp Capacity Scale',
    standards_code: 'Philippine Grid Code / PEC',
    client: 'Solar Philippines',
    result: 'Design drawings integrated into system impact studies (SIS) for grid interconnection.'
  },
  {
    id: '7',
    title: 'San Ildefonso SPP',
    category: 'ground',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    desc: 'Drafted layout configurations and PV array layouts for 500MWp utility solar project.',
    year: '2023',
    location: 'Bulacan, PH',
    role: 'Design Engineer',
    scope: [
      'Drafted array layouts and block structures for 500MWp utility system.',
      'Assisted in PVSyst performance calculations and cable calculations.',
      'Coordinated with site surveys to map shading factors from surrounding terrain.'
    ],
    inverter_rating: 'Central Inverter Blocks',
    design_drawings: 'Master Block Plan & Wiring Layout',
    capacity_yield: '500MWp Utility Capacity',
    standards_code: 'IEEE 1547 / PEC Standards',
    client: 'Solar Philippines',
    result: 'Optimized layout configurations, increasing active collection area by 3% within property bounds.'
  },
  {
    id: '8',
    title: 'Prisma Residences MEPF',
    category: 'planning',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    desc: 'Supervision and management of construction activities, reviewing MEPF plans/drawings, revisions, and as-builts for DMCI high-rise residential project.',
    year: '2022',
    location: 'Pasig City, PH',
    role: 'Electrical Engineer',
    scope: [
      'Supervised subcontractor electrical installations on-site.',
      'Reviewed MEPF drawings, riser diagrams, panel schedules, and as-builts.',
      'Evaluated subcontractor billings and variation orders.',
      'Coordinated weekly site alignment meetings and resolved conduit collisions.'
    ],
    inverter_rating: '2x1500kVA Substation Sub',
    design_drawings: 'Riser Diagrams & Panel Schedules',
    capacity_yield: '3 High-Rise Residential Towers',
    standards_code: 'PEC / National Building Code PH',
    client: 'DMCI Homes Inc.',
    result: 'Reduced project delay by 15% through preemptive collision checking between duct banks and structural beams.'
  },
  {
    id: '9',
    title: 'Cornersteel Structured Cabling',
    category: 'planning',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    desc: 'Site survey and drafting single line diagrams for proposed electrical, structured voice/data, and auxiliary cabling systems.',
    year: '2021',
    location: 'Makati City, PH',
    role: 'Electrical Design Engineer',
    scope: [
      'Conducted site surveys for corporate commercial fit-out projects.',
      'Drafted power and lighting layout drawings, single line diagrams (SLDs).',
      'Calculated load schedules and estimated materials for structured cabling (voice/data).'
    ],
    inverter_rating: '150kVA Connected Load',
    design_drawings: 'Power/Lighting & Cabling Layout',
    capacity_yield: '4,200 sq.m Corporate Fit-out',
    standards_code: 'PEC / EIA/TIA 568',
    client: 'Cornersteel Systems Corp.',
    result: 'Completed drawings and BOM approved on first submission, enabling on-time site fit-out execution.'
  }
];

export default function Home() {
  const FULL_NAME = 'Jean Benazir T. Buaya';
  const [typedName, setTypedName] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        i++;
        if (i <= FULL_NAME.length) {
          setTypedName(FULL_NAME.slice(0, i));
        } else {
          clearInterval(intervalId);
          setTypingDone(true);
        }
      }, 75);
    }, 800);
    return () => { clearTimeout(timeoutId); clearInterval(intervalId); };
  }, []);

  const showCursor = !typingDone;

  // Intersection observer for animation triggers
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

  // Snake journey scroll tracker
  const journeyRef = useRef<HTMLDivElement>(null);
  const [trackerPos, setTrackerPos] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!journeyRef.current) return;
      const rect = journeyRef.current.getBoundingClientRect();
      const sectionH = journeyRef.current.offsetHeight;
      const progress = Math.min(1, Math.max(0, (-rect.top + window.innerHeight * 0.4) / sectionH));
      setTrackerPos(progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Back-to-top visibility
  const [showBackTop, setShowBackTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Projects Filtering
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get('filter') || 'all';

  const setFilter = (filter: string) => {
    if (filter === 'all') {
      searchParams.delete('filter');
    } else {
      searchParams.set('filter', filter);
    }
    setSearchParams(searchParams);
  };

  const filteredProjects = currentFilter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === currentFilter);

  // (lightbox removed)



  // Contact Form State & Submitting Logic
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    mobile: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company || !formData.mobile || !formData.message) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        mobile: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div style={{ background: 'var(--bg-darker)', color: 'var(--text-secondary)' }}>

      {/* ── SECTION 0: HERO SPLIT ── */}
      <section id="hero" className="hero-split-v2" style={{ background: '#ffffff', minHeight: '85vh', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '4rem', alignItems: 'center', width: '100%' }}>

          {/* Left Column: Profile details */}
          <div className="hero-left-animate" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Label / eyebrow */}
            <span style={{ background: '#f1f5f9', color: '#64748b', padding: '0.25rem 0.75rem', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', borderRadius: '4px', display: 'inline-block', marginBottom: '1.5rem' }}>
              Profile
            </span>

            {/* H1 — name, single line */}
            <h1 style={{ color: '#0A1931', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 1rem', fontFamily: 'var(--sans)', whiteSpace: 'nowrap' }}>
              {typedName}{showCursor && <span className="hsplit-typing-cursor" style={{ background: '#0A1931' }} />}
            </h1>

            {/* H2 — title */}
            <h2 style={{ color: '#1d4ed8', fontSize: '1.25rem', fontWeight: 600, margin: '0 0 0.4rem', fontFamily: 'var(--sans)' }}>
              Registered Electrical Engineer
            </h2>

            {/* Caption / license */}
            <p style={{ color: '#64748b', fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '2.5rem', letterSpacing: '0.5px' }}>
              REE License No. 0084321
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#projects" className="btn" style={{ background: '#0A1931', color: '#ffffff', border: 'none', padding: '0.8rem 1.8rem', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                View Projects
              </a>
              <a href="#journey" className="btn" style={{ background: 'transparent', color: '#1d4ed8', border: '1px solid #1d4ed8', padding: '0.8rem 1.8rem', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                My Journey
              </a>
            </div>
          </div>

          {/* Right Column: Portrait + floating design elements */}
          <div
            className="hero-right-animate"
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '480px',
              background: 'linear-gradient(135deg, #f0f6ff 0%, #e8f0fa 50%, #f5f8ff 100%)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-md)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            {/* Background grid pattern */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: 'radial-gradient(circle, rgba(29,78,216,0.07) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }} />

            {/* Floater 1 — large ring top-right */}
            <div style={{
              position: 'absolute', top: '-30px', right: '-30px', zIndex: 1,
              width: '160px', height: '160px',
              border: '2px solid rgba(29,78,216,0.15)',
              borderRadius: '50%',
              animation: 'floatA 7s ease-in-out infinite',
            }} />

            {/* Floater 2 — small ring top-right inset */}
            <div style={{
              position: 'absolute', top: '20px', right: '20px', zIndex: 1,
              width: '60px', height: '60px',
              border: '2px solid rgba(74,127,167,0.3)',
              borderRadius: '50%',
              animation: 'floatA 5s ease-in-out infinite reverse',
            }} />

            {/* Floater 3 — solar bolt icon top-left */}
            <div style={{
              position: 'absolute', top: '24px', left: '24px', zIndex: 3,
              background: '#0A1931',
              borderRadius: '50%',
              width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(10,25,49,0.25)',
              animation: 'floatB 6s ease-in-out infinite',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#f0c040" stroke="none">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>

            {/* Floater 4 — circuit dot bottom-left */}
            <div style={{
              position: 'absolute', bottom: '60px', left: '18px', zIndex: 3,
              animation: 'floatC 8s ease-in-out infinite',
            }}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="28" r="6" fill="rgba(29,78,216,0.18)" stroke="rgba(29,78,216,0.35)" strokeWidth="1.5"/>
                <line x1="28" y1="0" x2="28" y2="18" stroke="rgba(29,78,216,0.25)" strokeWidth="1.5"/>
                <line x1="28" y1="38" x2="28" y2="56" stroke="rgba(29,78,216,0.25)" strokeWidth="1.5"/>
                <line x1="0" y1="28" x2="18" y2="28" stroke="rgba(29,78,216,0.25)" strokeWidth="1.5"/>
                <line x1="38" y1="28" x2="56" y2="28" stroke="rgba(29,78,216,0.25)" strokeWidth="1.5"/>
              </svg>
            </div>

            {/* Floater 5 — angle-bracket top-right mid */}
            <div style={{
              position: 'absolute', top: '40%', right: '12px', zIndex: 3,
              animation: 'floatA 9s ease-in-out infinite 1s',
              opacity: 0.55,
            }}>
              <svg width="32" height="48" viewBox="0 0 32 48" fill="none" stroke="rgba(10,25,49,0.45)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="24 4 8 24 24 44"/>
              </svg>
            </div>

            {/* Floater 6 — hex badge bottom-right */}
            <div style={{
              position: 'absolute', bottom: '28px', right: '22px', zIndex: 3,
              background: 'rgba(29,78,216,0.08)',
              border: '1.5px solid rgba(29,78,216,0.2)',
              borderRadius: '4px',
              padding: '6px 10px',
              fontSize: '0.65rem',
              fontWeight: 700,
              color: '#1d4ed8',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontFamily: 'monospace',
              animation: 'floatB 7s ease-in-out infinite 0.5s',
            }}>
              REE ✦ PH
            </div>

            {/* Floater 7 — solar panel icon bottom-left badge */}
            <div style={{
              position: 'absolute', bottom: '28px', left: '18px', zIndex: 3,
              background: 'rgba(10,25,49,0.06)',
              border: '1.5px solid rgba(29,78,216,0.2)',
              borderRadius: '4px',
              padding: '6px 8px',
              animation: 'floatC 6s ease-in-out infinite 2s',
            }}>
              <svg width="22" height="16" viewBox="0 0 24 18" fill="none" stroke="rgba(29,78,216,0.6)" strokeWidth="1.5" strokeLinecap="round">
                <rect x="1" y="1" width="10" height="8" rx="1"/>
                <rect x="13" y="1" width="10" height="8" rx="1"/>
                <line x1="1" y1="5" x2="11" y2="5"/>
                <line x1="13" y1="5" x2="23" y2="5"/>
                <line x1="6" y1="9" x2="6" y2="14"/>
                <line x1="18" y1="9" x2="18" y2="14"/>
                <line x1="3" y1="14" x2="21" y2="14"/>
              </svg>
            </div>

            {/* Floater 8 — diagonal dashes top-left corner */}
            <div style={{
              position: 'absolute', top: '80px', left: '64px', zIndex: 1,
              opacity: 0.2,
              animation: 'floatA 11s ease-in-out infinite 3s',
            }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4">
                <line x1="4" y1="4" x2="36" y2="36"/>
                <line x1="14" y1="4" x2="36" y2="26"/>
                <line x1="4" y1="14" x2="26" y2="36"/>
              </svg>
            </div>

            {/* Portrait image — centered, sits above all floaters */}
            <img
              src={jeanPortrait}
              alt="Jean Benazir T. Buaya — Registered Electrical Engineer"
              style={{
                position: 'relative',
                zIndex: 2,
                width: '82%',
                maxWidth: '340px',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                marginBottom: 0,
                filter: 'drop-shadow(0 8px 32px rgba(10,25,49,0.18))',
              }}
            />
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-bar" style={{ background: '#0A1931', borderTop: 'none', borderBottom: 'none', padding: '3.5rem 0' }}>
        <div className="container">
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
            <div className="reveal" data-dir="scale" data-delay="0s">
              <div className="stat-number" style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: 700 }}>2019</div>
              <div className="stat-label" style={{ color: '#a8cce8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '0.25rem' }}>Registered EE Board Exam</div>
            </div>
            <div className="reveal" data-dir="scale" data-delay="0.1s">
              <div className="stat-number" style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: 700 }}>6+ Years</div>
              <div className="stat-label" style={{ color: '#a8cce8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '0.25rem' }}>Electrical & Solar Experience</div>
            </div>
            <div className="reveal" data-dir="scale" data-delay="0.2s">
              <div className="stat-number" style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: 700 }}>10+</div>
              <div className="stat-label" style={{ color: '#a8cce8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '0.25rem' }}>Utility-Scale Projects</div>
            </div>
            <div className="reveal" data-dir="scale" data-delay="0.3s">
              <div className="stat-number" style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: 700 }}>500MW+</div>
              <div className="stat-label" style={{ color: '#a8cce8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '0.25rem' }}>Total Capacity Designed</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: PROFESSIONAL JOURNEY — Snake Timeline ── */}
      <section id="journey" className="journey-timeline-section">
        <div className="container">
          <div className="section-header reveal" data-dir="down" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            {/* Eyebrow label */}
            <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--gold)', marginBottom: '0.75rem' }}>Chronological Track</span>
            {/* Section H2 */}
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 1rem' }}>Professional Career Journey</h2>
            <div className="section-divider" style={{ margin: '0 auto' }}></div>
          </div>

          {/* Snake container with scroll tracker */}
          <div className="journey-container" ref={journeyRef}>
            {/* Central vertical busbar */}
            <div className="journey-busbar"></div>

            {/* Scroll-tracking bolt icon — LEFT side reading marker */}
            <div className="journey-tracker" style={{ top: `calc(${trackerPos * 100}% - 20px)` }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--gold)" stroke="none">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>

            {/* Entry 1 — LEFT side */}
            <div className="journey-milestone reveal" data-dir="left" data-delay="0s">
              {/* Sun icon — energy/solar company */}
              <div className="journey-node">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              </div>
              <div className="journey-card">
                {/* Date label */}
                <time className="journey-date">Nov 2025 – Present</time>
                {/* Role — H3 */}
                <h3 className="journey-role">Senior Solar Design Engineer</h3>
                {/* Company */}
                <div className="journey-company">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                  TotalEnergies (Total Distributed PH)
                </div>
                {/* Body */}
                <p className="journey-body">Lead designer executing engineering layouts, master plans, shading profiles, and yield simulation models for multi-megawatt solar systems.</p>
                <ul className="journey-scope-list">
                  <li className="journey-scope-item">Performs layout designs, shading audits, and capacity matchings using PVSyst & PVCase.</li>
                  <li className="journey-scope-item">Generates detail bills of materials (BOM) and electrical CAPEX estimations.</li>
                </ul>
              </div>
            </div>

            {/* Entry 2 — RIGHT side */}
            <div className="journey-milestone reveal" data-dir="right" data-delay="0.05s">
              {/* Government building icon — DOE */}
              <div className="journey-node">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="10" width="18" height="11" rx="1"/><polyline points="3 10 12 3 21 10"/><line x1="12" y1="10" x2="12" y2="21"/></svg>
              </div>
              <div className="journey-card">
                <time className="journey-date">Dec 2024 – Nov 2025</time>
                <h3 className="journey-role">Science Research Specialist II</h3>
                <div className="journey-company">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="10" width="18" height="11" rx="1"/><polyline points="3 10 12 3 21 10"/><line x1="12" y1="10" x2="12" y2="21"/></svg>
                  Department of Energy (Solar Management Group)
                </div>
                <p className="journey-body">Evaluated grid interconnection capabilities, financial metrics of solar energy developer contracts, and formulated resource policies.</p>
                <ul className="journey-scope-list">
                  <li className="journey-scope-item">Audited developer site reports and project logbooks for compliance checks.</li>
                  <li className="journey-scope-item">Formulated solar yield resource policy criteria.</li>
                </ul>
              </div>
            </div>

            {/* Entry 3 — LEFT side */}
            <div className="journey-milestone reveal" data-dir="left" data-delay="0.05s">
              {/* Solar panel grid icon — Solar Philippines */}
              <div className="journey-node">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="1"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="8" y1="6" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="18"/></svg>
              </div>
              <div className="journey-card">
                <time className="journey-date">Jul 2023 – Dec 2024</time>
                <h3 className="journey-role">Electrical & Solar Design Engineer</h3>
                <div className="journey-company">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="1"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="8" y1="6" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="18"/></svg>
                  Solar Philippines
                </div>
                <p className="journey-body">Drafted array layout blueprints and utility connection grids for utility-scale parks up to 3,500 MWp and commercial systems.</p>
                <ul className="journey-scope-list">
                  <li className="journey-scope-item">Drafted wiring schematics, Single Line Diagrams, and collection layouts.</li>
                  <li className="journey-scope-item">Executed shading computations and layout yield simulations.</li>
                </ul>
              </div>
            </div>

            {/* Entry 4 — RIGHT side */}
            <div className="journey-milestone reveal" data-dir="right" data-delay="0.05s">
              {/* Hard hat / construction icon — M. Verano */}
              <div className="journey-node">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M5 20V8.5A7 7 0 0 1 12 2a7 7 0 0 1 7 6.5V20"/><line x1="12" y1="2" x2="12" y2="8"/></svg>
              </div>
              <div className="journey-card">
                <time className="journey-date">Aug 2022 – Jul 2023</time>
                <h3 className="journey-role">Electrical Engineer</h3>
                <div className="journey-company">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M5 20V8.5A7 7 0 0 1 12 2a7 7 0 0 1 7 6.5V20"/><line x1="12" y1="2" x2="12" y2="8"/></svg>
                  M. Verano Construction Corp.
                </div>
                <p className="journey-body">Managed site electrical deliverables, structural wiring pathways, and subcontractor compliance schedules.</p>
                <ul className="journey-scope-list">
                  <li className="journey-scope-item">Supervised on-site conduit system routing runs.</li>
                  <li className="journey-scope-item">Reviewed document controls, RFIs, as-built changes, and bid estimates.</li>
                </ul>
              </div>
            </div>

            {/* Entry 5 — LEFT side */}
            <div className="journey-milestone reveal" data-dir="left" data-delay="0.05s">
              {/* High-rise building icon — DMCI */}
              <div className="journey-node">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="2" x2="9" y2="22"/><line x1="15" y1="2" x2="15" y2="22"/><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
              </div>
              <div className="journey-card">
                <time className="journey-date">Nov 2021 – Aug 2022</time>
                <h3 className="journey-role">Electrical Engineer</h3>
                <div className="journey-company">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="2" x2="9" y2="22"/><line x1="15" y1="2" x2="15" y2="22"/><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
                  DMCI Homes Inc. (Prisma Residences Project)
                </div>
                <p className="journey-body">Coordinated high-rise MEPF subcontractors, reviewed riser layouts, panel schedules, and resolved conduit collisions.</p>
              </div>
            </div>

            {/* Entry 6 — RIGHT side */}
            <div className="journey-milestone reveal" data-dir="right" data-delay="0.05s">
              {/* Network / cabling icon — Cornersteel */}
              <div className="journey-node">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="17" y="2" width="5" height="5" rx="1"/><rect x="9.5" y="17" width="5" height="5" rx="1"/><line x1="7" y1="4.5" x2="17" y2="4.5"/><line x1="12" y1="7" x2="12" y2="17"/><line x1="4.5" y1="7" x2="11.5" y2="17"/><line x1="19.5" y1="7" x2="12.5" y2="17"/></svg>
              </div>
              <div className="journey-card">
                <time className="journey-date">Jan 2020 – Jun 2021</time>
                <h3 className="journey-role">Electrical Design Engineer</h3>
                <div className="journey-company">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="17" y="2" width="5" height="5" rx="1"/><rect x="9.5" y="17" width="5" height="5" rx="1"/><line x1="7" y1="4.5" x2="17" y2="4.5"/><line x1="12" y1="7" x2="12" y2="17"/><line x1="4.5" y1="7" x2="11.5" y2="17"/><line x1="19.5" y1="7" x2="12.5" y2="17"/></svg>
                  Cornersteel Systems Corp.
                </div>
                <p className="journey-body">Conducted office fit-out site surveys, electrical panel specifications, and structured cabling blueprints.</p>
              </div>
            </div>

            {/* Entry 7 — Milestone / LEFT side */}
            <div className="journey-milestone journey-milestone--gold reveal" data-dir="scale" data-delay="0.05s">
              {/* Award / star icon — REE board exam milestone */}
              <div className="journey-node journey-node--gold">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div className="journey-card journey-card--gold">
                <time className="journey-date" style={{ color: 'var(--text-muted)' }}>2019 Milestone</time>
                <h3 className="journey-role" style={{ color: 'var(--gold)' }}>Registered Electrical Engineer</h3>
                <p className="journey-body">Passed the PRC Electrical Engineering Licensure Examination — officially licensed to practice electrical engineering in the Philippines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: MILESTONE PROJECTS ── */}
      <section id="projects" className="section-padding" style={{ background: 'var(--bg-medium)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header reveal" data-dir="down" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle" style={{ color: 'var(--gold)', letterSpacing: '4px' }}>Project Logbook</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', color: 'var(--text-primary)' }}>Solar & Electrical Engineering Log</h2>
            <div className="section-divider" style={{ margin: '1rem auto' }}></div>
          </div>

          {/* Filters */}
          <div className="project-filters reveal" data-delay="0.2s" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <button onClick={() => setFilter('all')} className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`} style={{ borderColor: 'var(--border)', color: currentFilter === 'all' ? 'var(--bg-darker)' : 'var(--text-primary)', background: currentFilter === 'all' ? 'var(--gold)' : 'transparent' }}>All</button>
            <button onClick={() => setFilter('rooftop')} className={`filter-btn ${currentFilter === 'rooftop' ? 'active' : ''}`} style={{ borderColor: 'var(--border)', color: currentFilter === 'rooftop' ? 'var(--bg-darker)' : 'var(--text-primary)', background: currentFilter === 'rooftop' ? 'var(--gold)' : 'transparent' }}>Rooftop Solar</button>
            <button onClick={() => setFilter('ground')} className={`filter-btn ${currentFilter === 'ground' ? 'active' : ''}`} style={{ borderColor: 'var(--border)', color: currentFilter === 'ground' ? 'var(--bg-darker)' : 'var(--text-primary)', background: currentFilter === 'ground' ? 'var(--gold)' : 'transparent' }}>Ground Mounted</button>
            <button onClick={() => setFilter('planning')} className={`filter-btn ${currentFilter === 'planning' ? 'active' : ''}`} style={{ borderColor: 'var(--border)', color: currentFilter === 'planning' ? 'var(--bg-darker)' : 'var(--text-primary)', background: currentFilter === 'planning' ? 'var(--gold)' : 'transparent' }}>MEPF & Cabling</button>
          </div>

          {/* Projects News Feed List */}
          <div className="projects-feed" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '3rem' }}>
            {filteredProjects.map((project, idx) => (
              <div key={project.id} className="news-project-card reveal" data-delay={`${idx * 0.08}s`} style={{ background: 'var(--panel-bg)', border: '1px solid var(--border)', padding: '2rem', boxShadow: 'var(--shadow-sm)', transition: 'var(--transition)' }}>
                
                {/* Column 1: Image & Technical specs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  
                  {/* Technical specifications table */}
                  <div style={{ background: 'var(--bg-medium)', border: '1px solid var(--border)', padding: '1.25rem' }}>
                    <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Technical Parameters</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.25rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Capacity / Sizing</span>
                        <strong style={{ color: 'var(--text-primary)' }}>{project.capacity_yield}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.25rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Inverters / Aux</span>
                        <strong style={{ color: 'var(--text-primary)' }}>{project.inverter_rating}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.25rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Drawings</span>
                        <strong style={{ color: 'var(--text-primary)' }}>{project.design_drawings}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.25rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Standards</span>
                        <strong style={{ color: 'var(--text-primary)' }}>{project.standards_code}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Content & Scope */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    {/* Header info */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                      <div>
                        <span style={{ background: 'var(--gold-alpha)', color: 'var(--gold)', padding: '0.25rem 0.6rem', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', marginRight: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }}>{project.category}</span>
                        <h3 style={{ display: 'inline', color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600 }}>{project.title}</h3>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <strong>{project.location}</strong> · {project.year}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem', fontSize: '0.82rem' }}>
                      <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>Role</span>
                        <strong style={{ color: 'var(--text-primary)' }}>{project.role}</strong>
                      </div>
                      <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>Client Type</span>
                        <strong style={{ color: 'var(--text-primary)' }}>{project.client}</strong>
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>{project.desc}</p>
                    
                    {/* Scope Bullets */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Scope of Work</h4>
                      <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {project.scope.map((item, idx) => (
                          <li key={idx} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <span style={{ color: 'var(--gold)' }}>⚡</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Highlighted Result */}
                  <div style={{ background: 'var(--gold-alpha)', borderLeft: '3px solid var(--gold)', padding: '1rem', fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-primary)' }}>
                    <strong>Impact & Result:</strong> "{project.result}"
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3.5: SERVICES & SKILLS ── */}
      <section id="services" className="pillars-section-white" style={{ background: 'var(--bg-medium)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="section-padding container">
          <div className="pillars-v2-layout">
            <div className="pillars-v2-left reveal" data-dir="left">
              <span className="pillars-v2-subtitle" style={{ color: 'var(--gold)' }}>Our Services</span>
              <h2 className="pillars-v2-heading" style={{ color: 'var(--text-primary)' }}>Engineering solutions<br/>of every kind</h2>
              <p className="pillars-v2-desc" style={{ color: 'var(--text-secondary)' }}>
                From solar PV design to on-site supervision, delivering precision-engineered solutions for residential and commercial power systems across the Philippines.
              </p>
            </div>

            {/* Solar PV Design */}
            <div className="pillars-v2-card reveal" data-delay="0.1s" style={{ background: 'var(--bg-darker)', borderColor: 'var(--border)' }}>
              <div className="pillars-v2-icon" style={{ background: 'var(--gold-alpha)', color: 'var(--gold)' }}>
                {/* Solar panel array icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="9" height="7" rx="1"/>
                  <rect x="13" y="5" width="9" height="7" rx="1"/>
                  <line x1="6" y1="5" x2="6" y2="12"/>
                  <line x1="10" y1="5" x2="10" y2="12"/>
                  <line x1="17" y1="5" x2="17" y2="12"/>
                  <line x1="21" y1="5" x2="21" y2="12"/>
                  <line x1="8" y1="19" x2="8" y2="12"/>
                  <line x1="16" y1="19" x2="16" y2="12"/>
                  <line x1="5" y1="19" x2="19" y2="19"/>
                </svg>
              </div>
              <h3 className="pillars-v2-card-title" style={{ color: 'var(--text-primary)' }}>Solar PV Design</h3>
              <p className="pillars-v2-card-desc" style={{ color: 'var(--text-secondary)' }}>Basic to complex PV designs including array layouts, shading analysis, PV-inverter sizing, PVSyst, PVCase and Helioscope simulations.</p>
            </div>

            {/* Electrical Planning */}
            <div className="pillars-v2-card reveal" data-dir="right" data-delay="0.2s" style={{ background: 'var(--bg-darker)', borderColor: 'var(--border)' }}>
              <div className="pillars-v2-icon" style={{ background: 'var(--gold-alpha)', color: 'var(--gold)' }}>
                {/* SLD / schematic diagram icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="6" height="6" rx="1"/>
                  <rect x="15" y="3" width="6" height="6" rx="1"/>
                  <rect x="9" y="15" width="6" height="6" rx="1"/>
                  <line x1="9" y1="6" x2="15" y2="6"/>
                  <line x1="12" y1="6" x2="12" y2="15"/>
                  <line x1="6" y1="9" x2="12" y2="15"/>
                  <line x1="18" y1="9" x2="12" y2="15"/>
                </svg>
              </div>
              <h3 className="pillars-v2-card-title" style={{ color: 'var(--text-primary)' }}>Electrical Planning</h3>
              <p className="pillars-v2-card-desc" style={{ color: 'var(--text-secondary)' }}>Single Line Diagrams (SLD), DC/AC cable routing optimization, auxiliary cabling systems, and wiring diagrams for residential & commercial sites.</p>
            </div>

            {/* Site Assessment & Audit */}
            <div className="pillars-v2-card reveal" data-dir="left" data-delay="0.05s" style={{ background: 'var(--bg-darker)', borderColor: 'var(--border)' }}>
              <div className="pillars-v2-icon" style={{ background: 'var(--gold-alpha)', color: 'var(--gold)' }}>
                {/* Clipboard / audit checklist icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
                  <rect x="9" y="3" width="6" height="4" rx="1"/>
                  <line x1="9" y1="12" x2="15" y2="12"/>
                  <line x1="9" y1="16" x2="13" y2="16"/>
                  <polyline points="9 9 10 10 12 8"/>
                </svg>
              </div>
              <h3 className="pillars-v2-card-title" style={{ color: 'var(--text-primary)' }}>Site Assessment & Audit</h3>
              <p className="pillars-v2-card-desc" style={{ color: 'var(--text-secondary)' }}>On-site energy audits, load analysis, and technical inspection of existing electrical systems for compliance and optimization.</p>
            </div>

            {/* DOE Resource Policy */}
            <div className="pillars-v2-card reveal" data-delay="0.15s" style={{ background: 'var(--bg-darker)', borderColor: 'var(--border)' }}>
              <div className="pillars-v2-icon" style={{ background: 'var(--gold-alpha)', color: 'var(--gold)' }}>
                {/* Document / policy icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="8" y1="13" x2="16" y2="13"/>
                  <line x1="8" y1="17" x2="16" y2="17"/>
                  <line x1="8" y1="9" x2="10" y2="9"/>
                </svg>
              </div>
              <h3 className="pillars-v2-card-title" style={{ color: 'var(--text-primary)' }}>DOE Resource Policy</h3>
              <p className="pillars-v2-card-desc" style={{ color: 'var(--text-secondary)' }}>Auditing developer books, formulating solar resource recommendations, and evaluating financial capabilities for solar RE contracts.</p>
            </div>

            {/* MEPF Supervision */}
            <div className="pillars-v2-card reveal" data-dir="right" data-delay="0.25s" style={{ background: 'var(--bg-darker)', borderColor: 'var(--border)' }}>
              <div className="pillars-v2-icon" style={{ background: 'var(--gold-alpha)', color: 'var(--gold)' }}>
                {/* Wrench & gear / tools icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <h3 className="pillars-v2-card-title" style={{ color: 'var(--text-primary)' }}>MEPF Supervision</h3>
              <p className="pillars-v2-card-desc" style={{ color: 'var(--text-secondary)' }}>Coordinating on-site MEPF subcontractor progress, reviewing as-built drawings, on-site assessments, and managing timelines.</p>
            </div>
          </div>

          {/* Horizontal Skills Row — per-tool SVG icons */}
          <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border)' }}>
            <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '2px', marginBottom: '1.5rem', textAlign: 'center' }}>
              Core Technical Skills & Software
            </span>
            <div className="skills-row-layout" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>

              {/* PVSyst — simulation / chart bar */}
              <div style={{ background: 'var(--bg-darker)', border: '1px solid var(--border)', padding: '0.75rem 1.25rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
                <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>PVSyst</span>
              </div>

              {/* PVCase — grid / solar array layout */}
              <div style={{ background: 'var(--bg-darker)', border: '1px solid var(--border)', padding: '0.75rem 1.25rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="9" height="7" rx="1"/><rect x="13" y="5" width="9" height="7" rx="1"/><line x1="6" y1="5" x2="6" y2="12"/><line x1="10" y1="5" x2="10" y2="12"/><line x1="17" y1="5" x2="17" y2="12"/><line x1="8" y1="19" x2="8" y2="12"/><line x1="16" y1="19" x2="16" y2="12"/><line x1="5" y1="19" x2="19" y2="19"/></svg>
                <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>PVCase</span>
              </div>

              {/* Helioscope — 3D terrain / shading sun */}
              <div style={{ background: 'var(--bg-darker)', border: '1px solid var(--border)', padding: '0.75rem 1.25rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
                <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>Helioscope</span>
              </div>

              {/* AutoCAD — drafting / pen tool */}
              <div style={{ background: 'var(--bg-darker)', border: '1px solid var(--border)', padding: '0.75rem 1.25rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
                <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>AutoCAD</span>
              </div>

              {/* Revit MEP — building / floor plan */}
              <div style={{ background: 'var(--bg-darker)', border: '1px solid var(--border)', padding: '0.75rem 1.25rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="2" x2="9" y2="22"/><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="9" y2="12"/><line x1="4" y1="17" x2="9" y2="17"/></svg>
                <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>Revit MEP</span>
              </div>

              {/* ETAP — power systems / zap */}
              <div style={{ background: 'var(--bg-darker)', border: '1px solid var(--border)', padding: '0.75rem 1.25rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>ETAP</span>
              </div>

              {/* SKM Tools — power flow / circuit */}
              <div style={{ background: 'var(--bg-darker)', border: '1px solid var(--border)', padding: '0.75rem 1.25rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>SKM Tools</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding contact-section" style={{ background: 'var(--bg-darker)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="contact-panel reveal" data-dir="down">
            <div className="contact-info-col">
              <h2 style={{ color: 'var(--text-primary)' }}>Let's Talk</h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Have a question or want to discuss a project? Reach out using the form below. I am here to help.
              </p>

              <div className="contact-plain-details">
                <p style={{ color: 'var(--text-secondary)' }}>
                  Las Pinas City,<br />
                  Metro Manila, Philippines
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>jeanbenazirb@gmail.com</p>
              </div>

              <div className="contact-socials" aria-label="Social links">
                <a href="https://linkedin.com/in/jean-benazir" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
                <a href="mailto:jeanbenazirb@gmail.com" aria-label="Email">@</a>
                <a href="tel:+639973647886" aria-label="Phone">ph</a>
              </div>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon" style={{ background: 'var(--gold-alpha)', color: 'var(--gold)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h5 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '0.9rem' }}>Office Coordinates</h5>
                    <p style={{ color: 'var(--text-secondary)', margin: '0.1rem 0 0', fontSize: '0.8rem' }}>Las Piñas City, Metro Manila, Philippines</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon" style={{ background: 'var(--gold-alpha)', color: 'var(--gold)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h5 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '0.9rem' }}>Direct Mobile Liaison</h5>
                    <p style={{ color: 'var(--text-secondary)', margin: '0.1rem 0 0', fontSize: '0.8rem' }}>+63 997 364 7886</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon" style={{ background: 'var(--gold-alpha)', color: 'var(--gold)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h5 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '0.9rem' }}>Electronic Mail</h5>
                    <p style={{ color: 'var(--text-secondary)', margin: '0.1rem 0 0', fontSize: '0.8rem' }}>jeanbenazirb@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Reference Check */}
              <div className="contact-references">
                <h3 style={{ color: 'var(--gold)' }}>Professional References</h3>
                <div className="contact-reference-list" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                    <h5 style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Engr. Jennylene Baluyot</h5>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Plant Manager, BulacanSol &middot; MGen Renewable Energy</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>Contact: 0927 895 5849</p>
                  </div>
                  <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                    <h5 style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Engr. Carlito Derije</h5>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>EDD Manager, Cornersteel Systems Corp.</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>Contact: 0998 557 8490</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-col">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" style={{ color: 'var(--text-primary)' }}>Full Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" style={{ color: 'var(--text-primary)' }}>E-mail ID*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company" style={{ color: 'var(--text-primary)' }}>Company Name*</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="form-control"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mobile" style={{ color: 'var(--text-primary)' }}>Mobile No.*</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    required
                    className="form-control"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" style={{ color: 'var(--text-primary)' }}>Message*</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="form-control"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ background: 'var(--gold)', color: 'var(--bg-darker)', border: 'none' }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>

                {submitStatus === 'success' && (
                  <div className="form-status-message form-status-success animate-fade-in" style={{ color: 'var(--gold)', background: 'var(--gold-alpha)', border: '1px solid var(--border)', marginTop: '1rem', padding: '0.75rem', borderRadius: '4px', fontSize: 0 }}>
                    <span style={{ fontSize: '0.85rem' }}>Message received. I will get back to you shortly.</span>
                    ✓ Specifications received. I will review the electrical scope and get back to you shortly.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="form-status-message" style={{ background: 'rgba(231, 76, 60, 0.15)', border: '1px solid #e74c3c', color: '#e74c3c', marginTop: '1rem', padding: '0.75rem', borderRadius: '4px', fontSize: 0 }}>
                    <span style={{ fontSize: '0.85rem' }}>Please fill in all required (*) fields.</span>
                    ✗ Signal Interrupted: Please fill in all required (*) coordinate fields.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Back to Top Button ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 999,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: '#0A1931',
          border: '2px solid rgba(74,127,167,0.5)',
          boxShadow: '0 4px 20px rgba(10,25,49,0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: showBackTop ? 1 : 0,
          pointerEvents: showBackTop ? 'auto' : 'none',
          transform: showBackTop ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.85)',
          transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 28px rgba(74,127,167,0.45)';
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px) scale(1.05)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(10,25,49,0.3)';
          (e.currentTarget as HTMLButtonElement).style.transform = showBackTop ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.85)';
        }}
      >
        {/* Up chevron arrow */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f0c040" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>

    </div>
  );
}
