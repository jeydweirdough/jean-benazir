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
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
      <section id="hero" className="hero-split-v2" style={{ background: 'linear-gradient(135deg, #f0f6ff 0%, #e8f0fa 50%, #f5f8ff 100%)', minHeight: '85vh', display: 'flex', alignItems: 'center', padding: '0 1.5rem', margin: '0.75rem 1.25rem', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)', position: 'relative' }}>

        {/* ── HERO BACKGROUND DECORATIONS ── */}
        {/* Radial glow — left side using palette gradient colors */}
        <div style={{ position: 'absolute', top: '-80px', left: '-100px', zIndex: 0, width: '520px', height: '520px', background: 'radial-gradient(circle, rgba(74,127,167,0.16) 0%, transparent 65%)', pointerEvents: 'none' }} />
        {/* Radial glow — bottom center */}
        <div style={{ position: 'absolute', bottom: '-100px', left: '28%', zIndex: 0, width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(26,61,99,0.11) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Gradient accent strip — bottom-left edge */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '36%', height: '4px', zIndex: 0, background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', opacity: 0.55, pointerEvents: 'none' }} />
        {/* Gradient accent strip — top-right edge */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '25%', height: '3px', zIndex: 0, background: 'linear-gradient(to left, #1A3D63, #4A7FA7)', opacity: 0.35, pointerEvents: 'none' }} />
        {/* Dashed concentric circles — left mid */}
        <div style={{ position: 'absolute', top: '50%', left: '4%', transform: 'translateY(-50%)', zIndex: 0, opacity: 0.13, pointerEvents: 'none' }}>
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
            <circle cx="55" cy="55" r="50" stroke="#4A7FA7" strokeWidth="1.5" strokeDasharray="7 5" />
            <circle cx="55" cy="55" r="34" stroke="#1A3D63" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="55" cy="55" r="14" stroke="#4A7FA7" strokeWidth="1.5" fill="rgba(74,127,167,0.1)" />
          </svg>
        </div>
        {/* Dot grid — top center-left area */}
        <div style={{ position: 'absolute', top: '8%', left: '20%', zIndex: 0, opacity: 0.13, pointerEvents: 'none' }}>
          <svg width="110" height="55" viewBox="0 0 110 55" fill="#4A7FA7">
            <circle cx="5" cy="5" r="2.5" /><circle cx="25" cy="5" r="2.5" /><circle cx="45" cy="5" r="2.5" /><circle cx="65" cy="5" r="2.5" /><circle cx="85" cy="5" r="2.5" /><circle cx="105" cy="5" r="2.5" />
            <circle cx="5" cy="25" r="2.5" /><circle cx="25" cy="25" r="2.5" /><circle cx="45" cy="25" r="2.5" /><circle cx="65" cy="25" r="2.5" /><circle cx="85" cy="25" r="2.5" /><circle cx="105" cy="25" r="2.5" />
            <circle cx="5" cy="45" r="2.5" /><circle cx="25" cy="45" r="2.5" /><circle cx="45" cy="45" r="2.5" /><circle cx="65" cy="45" r="2.5" /><circle cx="85" cy="45" r="2.5" /><circle cx="105" cy="45" r="2.5" />
          </svg>
        </div>
        {/* Plus cross — center area */}
        <div style={{ position: 'absolute', top: '18%', left: '44%', zIndex: 0, opacity: 0.09, pointerEvents: 'none' }}>
          <svg width="54" height="54" viewBox="0 0 54 54" fill="none" stroke="#1A3D63" strokeWidth="2" strokeLinecap="round">
            <line x1="27" y1="4" x2="27" y2="50" />
            <line x1="4" y1="27" x2="50" y2="27" />
          </svg>
        </div>
        {/* Hexagon outline — center-left */}
        <div style={{ position: 'absolute', bottom: '15%', left: '30%', zIndex: 0, opacity: 0.08, pointerEvents: 'none' }}>
          <svg width="70" height="80" viewBox="0 0 70 80" fill="none" stroke="url(#hexGrad)" strokeWidth="1.5">
            <defs>
              <linearGradient id="hexGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1A3D63" />
                <stop offset="100%" stopColor="#4A7FA7" />
              </linearGradient>
            </defs>
            <polygon points="35 4 66 21 66 59 35 76 4 59 4 21" />
          </svg>
        </div>

        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '4rem', alignItems: 'center', width: '100%', position: 'relative', zIndex: 1 }}>

          {/* Left Column: Profile details */}
          <div className="hero-left-animate" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Label / eyebrow */}
            <span style={{ background: '#f1f5f9', color: '#64748b', padding: '0.25rem 0.75rem', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', borderRadius: '4px', display: 'inline-block', marginBottom: '1.5rem' }}>
              Profile
            </span>

            {/* H1 — name, single line */}
            <h1 style={{ color: '#0A1931', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, lineHeight: 1.1, margin: '0 0 1rem', fontFamily: 'var(--sans)', whiteSpace: 'nowrap' }}>
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
              <a href="#projects"
                className="hero-btn"
                style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', color: '#ffffff', border: 'none', padding: '0.8rem 1.8rem', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', borderRadius: '9999px', letterSpacing: '0.3px', cursor: 'pointer', transition: 'all 0.25s ease' }}
              >
                View Projects
              </a>
              <a href="#journey"
                className="hero-btn"
                style={{ background: 'transparent', color: '#1A3D63', border: '1.5px solid #1A3D63', padding: '0.8rem 1.8rem', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', borderRadius: '9999px', letterSpacing: '0.3px', cursor: 'pointer', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(26,61,99,0.08)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1A3D63'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1A3D63'; }}
              >
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
              background: 'transparent',
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


            {/* Floater 4 — circuit dot bottom-left */}
            <div style={{
              position: 'absolute', bottom: '60px', left: '18px', zIndex: 3,
              animation: 'floatC 8s ease-in-out infinite',
            }}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="28" r="6" fill="rgba(29,78,216,0.18)" stroke="rgba(29,78,216,0.35)" strokeWidth="1.5" />
                <line x1="28" y1="0" x2="28" y2="18" stroke="rgba(29,78,216,0.25)" strokeWidth="1.5" />
                <line x1="28" y1="38" x2="28" y2="56" stroke="rgba(29,78,216,0.25)" strokeWidth="1.5" />
                <line x1="0" y1="28" x2="18" y2="28" stroke="rgba(29,78,216,0.25)" strokeWidth="1.5" />
                <line x1="38" y1="28" x2="56" y2="28" stroke="rgba(29,78,216,0.25)" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Floater 5 — angle-bracket top-right mid */}
            <div style={{
              position: 'absolute', top: '40%', right: '12px', zIndex: 3,
              animation: 'floatA 9s ease-in-out infinite 1s',
              opacity: 0.55,
            }}>
              <svg width="32" height="48" viewBox="0 0 32 48" fill="none" stroke="rgba(10,25,49,0.45)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="24 4 8 24 24 44" />
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
                <rect x="1" y="1" width="10" height="8" rx="1" />
                <rect x="13" y="1" width="10" height="8" rx="1" />
                <line x1="1" y1="5" x2="11" y2="5" />
                <line x1="13" y1="5" x2="23" y2="5" />
                <line x1="6" y1="9" x2="6" y2="14" />
                <line x1="18" y1="9" x2="18" y2="14" />
                <line x1="3" y1="14" x2="21" y2="14" />
              </svg>
            </div>

            {/* Floater 8 — diagonal dashes top-left corner */}
            <div style={{
              position: 'absolute', top: '80px', left: '64px', zIndex: 1,
              opacity: 0.2,
              animation: 'floatA 11s ease-in-out infinite 3s',
            }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4">
                <line x1="4" y1="4" x2="36" y2="36" />
                <line x1="14" y1="4" x2="36" y2="26" />
                <line x1="4" y1="14" x2="26" y2="36" />
              </svg>
            </div>

            {/* Center gradient glow blob */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 0, width: '300px', height: '300px', background: 'radial-gradient(ellipse, rgba(74,127,167,0.15) 0%, rgba(26,61,99,0.06) 55%, transparent 75%)', pointerEvents: 'none' }} />
            {/* Gradient arc — center */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 1, opacity: 0.18, pointerEvents: 'none' }}>
              <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
                <defs>
                  <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1A3D63" />
                    <stop offset="100%" stopColor="#4A7FA7" />
                  </linearGradient>
                </defs>
                <circle cx="110" cy="110" r="100" stroke="url(#arcGrad)" strokeWidth="1.5" strokeDasharray="12 8" fill="none" />
                <circle cx="110" cy="110" r="70" stroke="url(#arcGrad)" strokeWidth="1" strokeDasharray="6 10" fill="none" />
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
      <section className="stats-bar" style={{ background: '#ffffff', padding: '3.5rem 0 0' }}>
        <div className="container">
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
            <div className="reveal" data-dir="scale" data-delay="0s">
              <div className="stat-number" style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '2.2rem', fontWeight: 700 }}>2019</div>
              <div className="stat-label" style={{ color: '#64748b', fontSize: '0.75rem', letterSpacing: '0.5px', marginTop: '0.25rem' }}>Registered EE Board Exam</div>
            </div>
            <div className="reveal" data-dir="scale" data-delay="0.1s">
              <div className="stat-number" style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '2.2rem', fontWeight: 700 }}>6+ Years</div>
              <div className="stat-label" style={{ color: '#64748b', fontSize: '0.75rem', letterSpacing: '0.5px', marginTop: '0.25rem' }}>Electrical & Solar Experience</div>
            </div>
            <div className="reveal" data-dir="scale" data-delay="0.2s">
              <div className="stat-number" style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '2.2rem', fontWeight: 700 }}>10+</div>
              <div className="stat-label" style={{ color: '#64748b', fontSize: '0.75rem', letterSpacing: '0.5px', marginTop: '0.25rem' }}>Utility-Scale Projects</div>
            </div>
            <div className="reveal" data-dir="scale" data-delay="0.3s">
              <div className="stat-number" style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '2.2rem', fontWeight: 700 }}>500MW+</div>
              <div className="stat-label" style={{ color: '#64748b', fontSize: '0.75rem', letterSpacing: '0.5px', marginTop: '0.25rem' }}>Total Capacity Designed</div>
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
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 1rem' }}>Professional Career Journey</h2>
            <div className="section-divider" style={{ margin: '0 auto' }}></div>
          </div>

          {/* Snake container with scroll tracker */}
          <div className="journey-container" ref={journeyRef}>
            {/* Central vertical busbar */}
            <div className="journey-busbar"></div>

            {/* Scroll-tracking bolt icon — LEFT side reading marker */}
            <div className="journey-tracker" style={{ top: `calc(${trackerPos * 100}% - 20px)` }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--gold)" stroke="none">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>

            {/* Entry 1 — LEFT side */}
            <div className="journey-milestone reveal" data-dir="left" data-delay="0s">
              {/* Sun icon — energy/solar company */}
              <div className="journey-node">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              </div>
              <div className="journey-card">
                <h3 className="journey-role">Senior Solar Design Engineer</h3>
                <time className="journey-date">Nov 2025 – Present</time>
                {/* Company */}
                <div className="journey-company">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="10" width="18" height="11" rx="1" /><polyline points="3 10 12 3 21 10" /><line x1="12" y1="10" x2="12" y2="21" /></svg>
              </div>
              <div className="journey-card">
                <h3 className="journey-role">Science Research Specialist II</h3>
                <time className="journey-date">Dec 2024 – Nov 2025</time>
                <div className="journey-company">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="10" width="18" height="11" rx="1" /><polyline points="3 10 12 3 21 10" /><line x1="12" y1="10" x2="12" y2="21" /></svg>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="1" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="8" y1="6" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="18" /></svg>
              </div>
              <div className="journey-card">
                <h3 className="journey-role">Electrical & Solar Design Engineer</h3>
                <time className="journey-date">Jul 2023 – Dec 2024</time>
                <div className="journey-company">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="1" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="8" y1="6" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="18" /></svg>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20" /><path d="M5 20V8.5A7 7 0 0 1 12 2a7 7 0 0 1 7 6.5V20" /><line x1="12" y1="2" x2="12" y2="8" /></svg>
              </div>
              <div className="journey-card">
                <h3 className="journey-role">Electrical Engineer</h3>
                <time className="journey-date">Aug 2022 – Jul 2023</time>
                <div className="journey-company">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20" /><path d="M5 20V8.5A7 7 0 0 1 12 2a7 7 0 0 1 7 6.5V20" /><line x1="12" y1="2" x2="12" y2="8" /></svg>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="1" /><line x1="9" y1="2" x2="9" y2="22" /><line x1="15" y1="2" x2="15" y2="22" /><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
              </div>
              <div className="journey-card">
                <h3 className="journey-role">Electrical Engineer</h3>
                <time className="journey-date">Nov 2021 – Aug 2022</time>
                <div className="journey-company">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="1" /><line x1="9" y1="2" x2="9" y2="22" /><line x1="15" y1="2" x2="15" y2="22" /><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
                  DMCI Homes Inc. (Prisma Residences Project)
                </div>
                <p className="journey-body">Coordinated high-rise MEPF subcontractors, reviewed riser layouts, panel schedules, and resolved conduit collisions.</p>
              </div>
            </div>

            {/* Entry 6 — RIGHT side */}
            <div className="journey-milestone reveal" data-dir="right" data-delay="0.05s">
              {/* Network / cabling icon — Cornersteel */}
              <div className="journey-node">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="5" height="5" rx="1" /><rect x="17" y="2" width="5" height="5" rx="1" /><rect x="9.5" y="17" width="5" height="5" rx="1" /><line x1="7" y1="4.5" x2="17" y2="4.5" /><line x1="12" y1="7" x2="12" y2="17" /><line x1="4.5" y1="7" x2="11.5" y2="17" /><line x1="19.5" y1="7" x2="12.5" y2="17" /></svg>
              </div>
              <div className="journey-card">
                <h3 className="journey-role">Electrical Design Engineer</h3>
                <time className="journey-date">Jan 2020 – Jun 2021</time>
                <div className="journey-company">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="5" height="5" rx="1" /><rect x="17" y="2" width="5" height="5" rx="1" /><rect x="9.5" y="17" width="5" height="5" rx="1" /><line x1="7" y1="4.5" x2="17" y2="4.5" /><line x1="12" y1="7" x2="12" y2="17" /><line x1="4.5" y1="7" x2="11.5" y2="17" /><line x1="19.5" y1="7" x2="12.5" y2="17" /></svg>
                  Cornersteel Systems Corp.
                </div>
                <p className="journey-body">Conducted office fit-out site surveys, electrical panel specifications, and structured cabling blueprints.</p>
              </div>
            </div>

            {/* Entry 7 — Milestone / LEFT side */}
            <div className="journey-milestone journey-milestone--gold reveal" data-dir="scale" data-delay="0.05s">
              {/* Award / star icon — REE board exam milestone */}
              <div className="journey-node journey-node--gold">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <div className="journey-card journey-card--gold">
                <h3 className="journey-role" style={{ color: 'var(--gold)' }}>Registered Electrical Engineer</h3>
                <time className="journey-date" style={{ color: 'var(--text-muted)' }}>2019 Milestone</time>
                <p className="journey-body">Passed the PRC Electrical Engineering Licensure Examination — officially licensed to practice electrical engineering in the Philippines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: MILESTONE PROJECTS ── */}
      <section id="projects" className="section-padding" style={{ background: 'var(--bg-darker)', paddingTop: '3rem' }}>
        <div className="container">
          <div className="section-header reveal" data-dir="down" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle" style={{ color: 'var(--gold)', letterSpacing: '4px' }}>Project Logbook</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', color: 'var(--text-primary)' }}>Solar & Electrical Engineering Log</h2>
            <div className="section-divider" style={{ margin: '1rem auto' }}></div>
          </div>

          {/* Filters */}
          <div className="project-filters reveal" data-delay="0.2s" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <button onClick={() => setFilter('all')} className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`} style={{ borderRadius: '9999px', border: '1px solid var(--border)', color: currentFilter === 'all' ? '#ffffff' : 'var(--text-primary)', background: currentFilter === 'all' ? 'linear-gradient(to right, #1A3D63, #4A7FA7)' : 'transparent' }}>All</button>
            <button onClick={() => setFilter('rooftop')} className={`filter-btn ${currentFilter === 'rooftop' ? 'active' : ''}`} style={{ borderRadius: '9999px', border: '1px solid var(--border)', color: currentFilter === 'rooftop' ? '#ffffff' : 'var(--text-primary)', background: currentFilter === 'rooftop' ? 'linear-gradient(to right, #1A3D63, #4A7FA7)' : 'transparent' }}>Rooftop Solar</button>
            <button onClick={() => setFilter('ground')} className={`filter-btn ${currentFilter === 'ground' ? 'active' : ''}`} style={{ borderRadius: '9999px', border: '1px solid var(--border)', color: currentFilter === 'ground' ? '#ffffff' : 'var(--text-primary)', background: currentFilter === 'ground' ? 'linear-gradient(to right, #1A3D63, #4A7FA7)' : 'transparent' }}>Ground Mounted</button>
            <button onClick={() => setFilter('planning')} className={`filter-btn ${currentFilter === 'planning' ? 'active' : ''}`} style={{ borderRadius: '9999px', border: '1px solid var(--border)', color: currentFilter === 'planning' ? '#ffffff' : 'var(--text-primary)', background: currentFilter === 'planning' ? 'linear-gradient(to right, #1A3D63, #4A7FA7)' : 'transparent' }}>MEPF & Cabling</button>
          </div>

          {/* Projects News Feed List */}
          <div className="projects-feed" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '3rem' }}>
            {filteredProjects.map((project, idx) => (
              <div key={project.id} className="news-project-card reveal" data-delay={`${idx * 0.08}s`} style={{ background: '#ffffff', border: '1px solid var(--border)', padding: '2rem', boxShadow: 'var(--shadow-sm)', transition: 'var(--transition)', borderRadius: '15px', overflow: 'hidden' }}>

                {/* Column 1: Image & Technical specs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', border: '1px solid var(--border-light)', borderRadius: '10px', position: 'relative', cursor: project.image ? 'zoom-in' : 'default' }} onClick={() => project.image && setPreviewImage(project.image)}>
                    {project.image ? (
                      <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')} onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #f0f6ff, #e8f0fa)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(74,127,167,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(74,127,167,0.6)', fontWeight: 500 }}>No Image Available</span>
                      </div>
                    )}
                  </div>

                  {/* Technical specifications table */}
                  <div style={{ background: '#ffffff', padding: '1.25rem' }}>
                    <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '0.85rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Technical Parameters</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.25rem' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Capacity / Sizing</strong>
                        <span style={{ color: 'var(--text-muted)' }}>{project.capacity_yield}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.25rem' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Inverters / Aux</strong>
                        <span style={{ color: 'var(--text-muted)' }}>{project.inverter_rating}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.25rem' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Drawings</strong>
                        <span style={{ color: 'var(--text-muted)' }}>{project.design_drawings}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.25rem' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Standards</strong>
                        <span style={{ color: 'var(--text-muted)' }}>{project.standards_code}</span>
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
                        <span style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', color: '#ffffff', padding: '0.25rem 0.75rem', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginRight: '0.5rem', border: 'none', borderRadius: '9999px', display: 'inline-block' }}>{project.category}</span>
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
      <section id="services" className="pillars-section-white" style={{ background: 'var(--bg-darker)' }}>
        <div className="section-padding container" style={{ paddingTop: '3rem' }}>
          <div className="pillars-v2-layout">
            <div className="pillars-v2-left reveal" data-dir="left">
              <span className="pillars-v2-subtitle" style={{ color: 'var(--gold)' }}>Our Services</span>
              <h2 className="pillars-v2-heading" style={{ color: 'var(--text-primary)' }}>Engineering solutions<br />of every kind</h2>
              <p className="pillars-v2-desc" style={{ color: 'var(--text-secondary)' }}>
                From solar PV design to on-site supervision, delivering precision-engineered solutions for residential and commercial power systems across the Philippines.
              </p>
            </div>

            {/* Solar PV Design */}
            <div className="pillars-v2-card reveal" data-delay="0.1s" style={{ background: 'var(--bg-darker)', borderColor: 'var(--border)', borderRadius: '15px' }}>
              <div className="pillars-v2-icon" style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', color: '#ffffff' }}>
                {/* Solar panel array icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="9" height="7" rx="1" />
                  <rect x="13" y="5" width="9" height="7" rx="1" />
                  <line x1="6" y1="5" x2="6" y2="12" />
                  <line x1="10" y1="5" x2="10" y2="12" />
                  <line x1="17" y1="5" x2="17" y2="12" />
                  <line x1="21" y1="5" x2="21" y2="12" />
                  <line x1="8" y1="19" x2="8" y2="12" />
                  <line x1="16" y1="19" x2="16" y2="12" />
                  <line x1="5" y1="19" x2="19" y2="19" />
                </svg>
              </div>
              <h3 className="pillars-v2-card-title" style={{ color: 'var(--text-primary)' }}>Solar PV Design</h3>
              <p className="pillars-v2-card-desc" style={{ color: 'var(--text-secondary)' }}>Basic to complex PV designs including array layouts, shading analysis, PV-inverter sizing, PVSyst, PVCase and Helioscope simulations.</p>
            </div>

            {/* Electrical Planning */}
            <div className="pillars-v2-card reveal" data-dir="right" data-delay="0.2s" style={{ background: 'var(--bg-darker)', borderColor: 'var(--border)', borderRadius: '15px' }}>
              <div className="pillars-v2-icon" style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', color: '#ffffff' }}>
                {/* SLD / schematic diagram icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="6" height="6" rx="1" />
                  <rect x="15" y="3" width="6" height="6" rx="1" />
                  <rect x="9" y="15" width="6" height="6" rx="1" />
                  <line x1="9" y1="6" x2="15" y2="6" />
                  <line x1="12" y1="6" x2="12" y2="15" />
                  <line x1="6" y1="9" x2="12" y2="15" />
                  <line x1="18" y1="9" x2="12" y2="15" />
                </svg>
              </div>
              <h3 className="pillars-v2-card-title" style={{ color: 'var(--text-primary)' }}>Electrical Planning</h3>
              <p className="pillars-v2-card-desc" style={{ color: 'var(--text-secondary)' }}>Single Line Diagrams (SLD), DC/AC cable routing optimization, auxiliary cabling systems, and wiring diagrams for residential & commercial sites.</p>
            </div>

            {/* Site Assessment & Audit */}
            <div className="pillars-v2-card reveal" data-dir="left" data-delay="0.05s" style={{ background: 'var(--bg-darker)', borderColor: 'var(--border)', borderRadius: '15px' }}>
              <div className="pillars-v2-icon" style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', color: '#ffffff' }}>
                {/* Clipboard / audit checklist icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="16" x2="13" y2="16" />
                  <polyline points="9 9 10 10 12 8" />
                </svg>
              </div>
              <h3 className="pillars-v2-card-title" style={{ color: 'var(--text-primary)' }}>Site Assessment & Audit</h3>
              <p className="pillars-v2-card-desc" style={{ color: 'var(--text-secondary)' }}>On-site energy audits, load analysis, and technical inspection of existing electrical systems for compliance and optimization.</p>
            </div>

            {/* DOE Resource Policy */}
            <div className="pillars-v2-card reveal" data-delay="0.15s" style={{ background: 'var(--bg-darker)', borderColor: 'var(--border)', borderRadius: '15px' }}>
              <div className="pillars-v2-icon" style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', color: '#ffffff' }}>
                {/* Document / policy icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="8" y1="13" x2="16" y2="13" />
                  <line x1="8" y1="17" x2="16" y2="17" />
                  <line x1="8" y1="9" x2="10" y2="9" />
                </svg>
              </div>
              <h3 className="pillars-v2-card-title" style={{ color: 'var(--text-primary)' }}>DOE Resource Policy</h3>
              <p className="pillars-v2-card-desc" style={{ color: 'var(--text-secondary)' }}>Auditing developer books, formulating solar resource recommendations, and evaluating financial capabilities for solar RE contracts.</p>
            </div>

            {/* MEPF Supervision */}
            <div className="pillars-v2-card reveal" data-dir="right" data-delay="0.25s" style={{ background: 'var(--bg-darker)', borderColor: 'var(--border)', borderRadius: '15px' }}>
              <div className="pillars-v2-icon" style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', color: '#ffffff' }}>
                {/* Wrench & gear / tools icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <h3 className="pillars-v2-card-title" style={{ color: 'var(--text-primary)' }}>MEPF Supervision</h3>
              <p className="pillars-v2-card-desc" style={{ color: 'var(--text-secondary)' }}>Coordinating on-site MEPF subcontractor progress, reviewing as-built drawings, on-site assessments, and managing timelines.</p>
            </div>
          </div>

          {/* Core Technical Skills — Hero-card style */}
          <div className="tools-hero-card" style={{ marginTop: '4rem', background: 'linear-gradient(145deg, #f2f4f7 0%, #eaf0f7 38%, #4A7FA7 70%, #1A3D63 100%)', borderRadius: '20px', padding: '2.5rem', overflow: 'hidden', display: 'flex', gap: '2.5rem', alignItems: 'stretch', minHeight: '400px', position: 'relative' }}>

            {/* Abstract glassy spheres — clipped to right/blue gradient area only */}
            <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 1000 520" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Clip strictly to safe blue area — inset from all edges */}
                <clipPath id="rightHalf">
                  <rect x="600" y="40" width="370" height="440" />
                </clipPath>
                <radialGradient id="sg1" cx="38%" cy="32%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="45%" stopColor="#dbeafe" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.1" />
                </radialGradient>
                <radialGradient id="sg2" cx="32%" cy="28%" r="50%">
                  <stop offset="0%" stopColor="#e0f4ff" stopOpacity="1" />
                  <stop offset="50%" stopColor="#60b8f0" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#2a7fc4" stopOpacity="0.1" />
                </radialGradient>
                <radialGradient id="sg3" cx="35%" cy="30%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#bfdbfe" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.05" />
                </radialGradient>
              </defs>
              {/* Large glassy sphere — center of blue area */}
              <circle cx="785" cy="260" r="170" fill="url(#sg1)" clipPath="url(#rightHalf)" />
              {/* Medium glassy sphere — lower right */}
              <circle cx="900" cy="370" r="100" fill="url(#sg2)" clipPath="url(#rightHalf)" />
              {/* Small glassy sphere — upper area */}
              <circle cx="665" cy="130" r="65" fill="url(#sg3)" clipPath="url(#rightHalf)" />
              {/* Small accent circles */}
              <circle cx="850" cy="130" r="48" fill="url(#sg1)" clipPath="url(#rightHalf)" />
              <circle cx="940" cy="230" r="36" fill="url(#sg2)" clipPath="url(#rightHalf)" />
              <circle cx="635" cy="290" r="32" fill="url(#sg1)" clipPath="url(#rightHalf)" />
              <circle cx="700" cy="400" r="45" fill="url(#sg3)" clipPath="url(#rightHalf)" />
              <circle cx="810" cy="430" r="28" fill="url(#sg2)" clipPath="url(#rightHalf)" />
              <circle cx="940" cy="390" r="32" fill="url(#sg3)" clipPath="url(#rightHalf)" />
              <circle cx="660" cy="430" r="24" fill="url(#sg1)" clipPath="url(#rightHalf)" />
            </svg>

            {/* LEFT — label + skill logo cards */}
            <div className="tools-left-col" style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '2px', marginBottom: '0.6rem' }}>
                Core Technical Skills & Software
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.3 }}>Tools I Work With</h3>

              <div className="tools-cards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>

                {/* PVSyst */}
                <div className="skill-card" style={{ background: '#ffffff', borderRadius: '15px', padding: '1.1rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111111', margin: '0 0 0.3rem' }}>PVSyst</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>Industry-standard simulation software for PV system energy yield and performance ratio analysis.</p>
                  </div>
                  <img src="/logos/pvsyst.svg" alt="PVSyst" style={{ width: '60px', height: '60px', objectFit: 'contain', flexShrink: 0 }} />
                </div>

                {/* PVCase */}
                <div className="skill-card" style={{ background: '#ffffff', borderRadius: '15px', padding: '1.1rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111111', margin: '0 0 0.3rem' }}>PVCase</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>Advanced PV layout and string design tool for optimizing utility-scale solar array configurations.</p>
                  </div>
                  <img src="/logos/pvcase.png" alt="PVCase" style={{ width: '60px', height: '60px', objectFit: 'contain', flexShrink: 0 }} />
                </div>

                {/* Helioscope */}
                <div className="skill-card" style={{ background: '#ffffff', borderRadius: '15px', padding: '1.1rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111111', margin: '0 0 0.3rem' }}>Helioscope</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>Web-based solar design platform for detailed shading analysis and system performance modeling.</p>
                  </div>
                  <img src="/logos/helioscope.svg" alt="Helioscope" style={{ width: '60px', height: '60px', objectFit: 'contain', flexShrink: 0 }} />
                </div>

                {/* AutoCAD */}
                <div className="skill-card" style={{ background: '#ffffff', borderRadius: '15px', padding: '1.1rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111111', margin: '0 0 0.3rem' }}>AutoCAD</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>Industry-leading 2D/3D drafting tool used for precise electrical and structural engineering drawings.</p>
                  </div>
                  <img src="/logos/autocad.png" alt="AutoCAD" style={{ width: '60px', height: '60px', objectFit: 'contain', flexShrink: 0 }} />
                </div>

                {/* Revit MEP */}
                <div className="skill-card" style={{ background: '#ffffff', borderRadius: '15px', padding: '1.1rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111111', margin: '0 0 0.3rem' }}>Revit MEP</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>BIM software for designing and coordinating mechanical, electrical, and plumbing building systems.</p>
                  </div>
                  <img src="/logos/revit.png" alt="Revit MEP" style={{ width: '60px', height: '60px', objectFit: 'contain', flexShrink: 0 }} />
                </div>

                {/* ETAP */}
                <div className="skill-card" style={{ background: '#ffffff', borderRadius: '15px', padding: '1.1rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111111', margin: '0 0 0.3rem' }}>ETAP</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>Power system analysis platform for load flow, short circuit, and protection coordination studies.</p>
                  </div>
                  <img src="/logos/etap.svg" alt="ETAP" style={{ width: '60px', height: '60px', objectFit: 'contain', flexShrink: 0 }} />
                </div>

                {/* SKM Tools */}
                <div className="skill-card" style={{ background: '#ffffff', borderRadius: '15px', padding: '1.1rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111111', margin: '0 0 0.3rem' }}>SKM Tools</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>Electrical power system analysis suite used for fault studies, arc flash, and equipment sizing.</p>
                  </div>
                  <img src="/logos/skm.png" alt="SKM Tools" style={{ width: '60px', height: '60px', objectFit: 'contain', flexShrink: 0 }} />
                </div>

                {/* Planswift */}
                <div className="skill-card" style={{ background: '#ffffff', borderRadius: '15px', padding: '1.1rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111111', margin: '0 0 0.3rem' }}>Planswift</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>Digital takeoff and estimating software for accurate material quantity calculations from plans.</p>
                  </div>
                  <div style={{ width: '60px', height: '60px', borderRadius: '10px', background: 'linear-gradient(135deg, #e8f0fe, #d2e3fc)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" fill="#1A3D63"/><path d="M7 12h10M7 8h6M7 16h8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                </div>

                {/* MS Office */}
                <div className="skill-card" style={{ background: '#ffffff', borderRadius: '15px', padding: '1.1rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111111', margin: '0 0 0.3rem' }}>MS Office</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>Proficient in Excel, Word, and PowerPoint for documentation, reporting, and project presentations.</p>
                  </div>
                  <div style={{ width: '60px', height: '60px', borderRadius: '10px', background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="9" height="9" rx="1.5" fill="#D83B01"/><rect x="13" y="2" width="9" height="9" rx="1.5" fill="#217346"/><rect x="2" y="13" width="9" height="9" rx="1.5" fill="#2B7CD3"/><rect x="13" y="13" width="9" height="9" rx="1.5" fill="#FFB900"/></svg>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT — real laptop mockup image */}
            <div className="tools-right-col" style={{ flex: 1 }}>
              {/* Parent fixed to exact rendered size: 750px wide, 750×(682/969)=528px tall */}
              <div className="tools-laptop-wrapper" style={{ position: 'absolute', top: '11rem', right: '-3rem', width: '750px', height: '528px' }}>

                {/* Screen overlay — pixel-precise based on 969×682 original scaled to 750×528
                    Screen white area in original: x=95 to x=874, y=30 to y=378
                    Scaled: left=73px top=23px width=603px height=269px */}
                {/* Laptop mockup */}
                <img
                  src="/laptopmockup.png"
                  alt="Laptop mockup"
                  style={{ width: '750px', height: '528px', objectFit: 'fill', display: 'block', position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                />

                {/* Screen overlay — sits in front of the laptop frame */}
                {/* Outer div: rounded top corners via overflow+border-radius */}
                <div style={{ position: 'absolute', top: '23px', left: '129px', width: '490px', height: '308px', zIndex: 2, borderRadius: '15px 15px 0 0', overflow: 'hidden' }}>
                  {/* Inner div: slant via clip-path */}
                  <div style={{ width: '100%', height: '100%', clipPath: 'polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%)' }}>
                    <img
                      src="/autocad.png"
                      alt="Screen content"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Education & Achievements */}
      <section id="education" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="edu-achieve-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

            {/* Education */}
            <div>
              <div className="reveal" data-dir="up" style={{ marginBottom: '1.75rem' }}>
                <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--gold)', marginBottom: '0.75rem' }}>Academic Background</span>
                <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 1rem' }}>Education</h2>
                <div className="section-divider" style={{ margin: '0' }}></div>
              </div>
              <div className="reveal edu-achievement-card" data-dir="up" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', minHeight: '160px' }}>
                {/* College background image */}
                <img src="/college.jpg" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
                {/* Blue gradient overlay — left heavy so text is readable */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(26,61,99,0.82) 0%, rgba(74,127,167,0.72) 55%, rgba(74,127,167,0.35) 100%)' }} />
                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '1.75rem 2rem' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.3rem', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>Bachelor of Science in Electrical Engineering</h3>
                    <p style={{ fontSize: '0.88rem', color: '#93c5fd', fontWeight: 600, margin: '0 0 0.3rem' }}>Camarines Norte State College</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', margin: 0 }}>Graduated 2019</p>
                      <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.35)', color: '#ffffff', fontSize: '0.68rem', fontWeight: 700, padding: '0.3rem 0.85rem', borderRadius: '9999px', letterSpacing: '0.5px' }}>
                        REE — Board Passer 2019
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div id="achievements">
              <div className="reveal" data-dir="up" style={{ marginBottom: '1.75rem' }}>
                <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--gold)', marginBottom: '0.75rem' }}>Recognition</span>
                <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 1rem' }}>Achievements</h2>
                <div className="section-divider" style={{ margin: '0' }}></div>
              </div>
              <div className="reveal edu-achievement-card" data-dir="up" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', minHeight: '160px', display: 'flex', alignItems: 'stretch' }}>
                {/* Blue gradient overlay on left */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(26,61,99,0.82) 0%, rgba(74,127,167,0.72) 55%, rgba(74,127,167,0.35) 100%)' }} />
                {/* Scholar image on right — smaller, fades into blue overlay */}
                <img src="/scholar.png" alt="" aria-hidden="true" style={{ position: 'absolute', right: '-10px', bottom: 0, height: '85%', width: 'auto', objectFit: 'contain', objectPosition: 'right bottom' }} />
                {/* Extra right-fade so image blends with gradient */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,61,99,0.95) 30%, rgba(26,61,99,0.5) 60%, transparent 100%)' }} />
                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '1.75rem 2rem', width: '100%' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.3rem', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>Iskolar ng Bayan Grantee</h3>
                    <p style={{ fontSize: '0.88rem', color: '#93c5fd', fontWeight: 600, margin: '0 0 0.3rem' }}>LGU Mercedes</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', margin: 0 }}>Academic Excellence</p>
                      <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.35)', color: '#ffffff', fontSize: '0.68rem', fontWeight: 700, padding: '0.3rem 0.85rem', borderRadius: '9999px', letterSpacing: '0.5px' }}>
                        Scholarship Grantee
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trainings & Seminars */}
      <section id="trainings" className="section-padding" style={{ background: 'var(--bg-primary)', paddingTop: '3rem' }}>
        <div className="container">
          <div className="reveal" data-dir="up" style={{ marginBottom: '2.5rem' }}>
            <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--gold)', marginBottom: '0.75rem' }}>Professional Development</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 1rem' }}>Trainings & Seminars</h2>
            <div className="section-divider" style={{ margin: '0' }}></div>
          </div>
          <div className="reveal" data-dir="up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
            {[
              { title: 'CS201: Huawei SmartLogger Configuration Procedure', org: 'Solar Philippines', date: 'February 2024' },
              { title: 'PV117: Introduction to Net Metering Application', org: 'Solar Philippines', date: 'January 2024' },
              { title: 'PV108: Basic Engineering Design for Commercial Rooftop Solar', org: 'Solar Philippines', date: 'January 2024' },
              { title: 'SF101: Electrical Safety in the Workplace', org: 'Solar Philippines', date: 'March 2024' },
              { title: 'RA 11285: Compliance Energy Audit Case Studies', org: 'IIEE Mini Conference, Worldbex', date: '2023' },
              { title: 'Energy Efficiency & Conservation Act on Building Design', org: 'IIEE Mini Conference, Worldbex', date: '2023' },
              { title: 'Energy Management & Energy Audit: Best Global Practice in PH', org: 'IIEE Mini Conference, Worldbex', date: '2023' },
              { title: '2-Day Solar PV Installation & Training — Rooftop Solar PV Design', org: 'PHL Solar Industries, Quezon City', date: 'July 9–10, 2022' },
              { title: 'Standard Electrical Installation & Simplified Fault Calculation', org: 'IIEE Metro South Chapter / IIEE-CSC Region V', date: 'Aug 2020 · Sep 2017' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', borderRadius: '14px', padding: '1.2rem 1.4rem', border: '1px solid var(--border)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', flexShrink: 0, marginTop: '5px' }}></div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', margin: '0 0 0.25rem', lineHeight: 1.4 }}>{item.title}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600, margin: '0 0 0.1rem' }}>{item.org}</p>
                  <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)', margin: 0 }}>{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding contact-section" style={{ background: 'var(--bg-darker)' }}>
        <div className="container">
          <div className="contact-panel reveal" data-dir="down">
            <div className="contact-info-col">
              <h2 style={{ color: 'var(--text-primary)' }}>Let's Talk</h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Have a question or want to discuss a project? Reach out using the form below. I am here to help.
              </p>

              <div className="contact-socials" aria-label="Social links">
                {/* LinkedIn */}
                <a href="https://linkedin.com/in/jean-benazir" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                {/* Email */}
                <a href="mailto:jeanbenazirb@gmail.com" aria-label="Email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </a>
                {/* Phone */}
                <a href="tel:+639973647886" aria-label="Phone">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                </a>
              </div>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon" style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', color: '#ffffff' }}>
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
                  <div className="contact-icon" style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', color: '#ffffff' }}>
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
                  <div className="contact-icon" style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', color: '#ffffff' }}>
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
                <div className="contact-reference-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { name: 'Engr. Jennylene Baluyot', role: 'Plant Manager', org: 'BulacanSol · MGen Renewable Energy', contact: '0927 895 5849' },
                    { name: 'Engr. Carlito Derije', role: 'EDD Manager', org: 'Cornersteel Systems Corp.', contact: '0998 557 8490' },
                    { name: 'Engr. Marrion M. Marteja', role: 'Lead MEPF', org: 'DMCI Homes', contact: '0935 428 6844' },
                  ].map((ref, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem', borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      </div>
                      <div>
                        <h5 style={{ margin: '0 0 0.2rem', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{ref.name}</h5>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 0.15rem' }}>{ref.role}, {ref.org}</p>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>Contact: {ref.contact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-form-col" style={{ background: '#ffffff', borderRadius: '15px', padding: '3rem', boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mobile">Phone Number</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    required
                    placeholder="Your phone number"
                    className="form-control"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Your email address"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="Your company (optional)"
                    className="form-control"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Type something here..."
                    className="form-control"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="hero-btn"
                  style={{ width: '100%', background: '#0f172a', color: '#ffffff', border: 'none', padding: '0.9rem 1.8rem', fontWeight: 600, fontSize: '0.95rem', borderRadius: '15px', letterSpacing: '0.3px', cursor: 'pointer', transition: 'all 0.25s ease', marginTop: '0.5rem' }}
                >
                  {isSubmitting ? 'Sending...' : 'Send a message'}
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
          background: 'linear-gradient(to right, #1A3D63, #4A7FA7)',
          border: 'none',
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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      {/* ── Image Preview Lightbox ── */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(10,25,49,0.88)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.2s ease',
            cursor: 'zoom-out',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh' }}
          >
            <img
              src={previewImage}
              alt="Preview"
              style={{
                maxWidth: '100%', maxHeight: '85vh',
                borderRadius: '12px',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
                display: 'block',
              }}
            />
            <button
              onClick={() => setPreviewImage(null)}
              style={{
                position: 'absolute', top: '-14px', right: '-14px',
                width: '32px', height: '32px',
                background: '#ffffff',
                border: 'none', borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                fontSize: '1rem', color: '#1A3D63', fontWeight: 700,
              }}
            >✕</button>
          </div>
        </div>
      )}

    </div>
  );
}
