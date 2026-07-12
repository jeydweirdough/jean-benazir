import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import jeanPortrait from '../assets/jean_portrait_no_bg.png';
import laptopMockup from '../assets/laptopmockup.png';
import screenContent from '../assets/autocad.png';
import { useSanityQuery } from '../lib/useSanityQuery';
import { urlFor } from '../lib/sanity';
import { PORTFOLIO_QUERY, type PortfolioData } from '../lib/queries';

const JOURNEY_ICONS: Record<string, React.ReactNode> = {
  sun: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
  ),
  government: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="10" width="18" height="11" rx="1" /><polyline points="3 10 12 3 21 10" /><line x1="12" y1="10" x2="12" y2="21" /></svg>
  ),
  'solar-grid': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="1" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="8" y1="6" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="18" /></svg>
  ),
  hardhat: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20" /><path d="M5 20V8.5A7 7 0 0 1 12 2a7 7 0 0 1 7 6.5V20" /><line x1="12" y1="2" x2="12" y2="8" /></svg>
  ),
  building: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="1" /><line x1="9" y1="2" x2="9" y2="22" /><line x1="15" y1="2" x2="15" y2="22" /><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
  ),
  cabling: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="5" height="5" rx="1" /><rect x="17" y="2" width="5" height="5" rx="1" /><rect x="9.5" y="17" width="5" height="5" rx="1" /><line x1="7" y1="4.5" x2="17" y2="4.5" /><line x1="12" y1="7" x2="12" y2="17" /><line x1="4.5" y1="7" x2="11.5" y2="17" /><line x1="19.5" y1="7" x2="12.5" y2="17" /></svg>
  ),
  award: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
  ),
};

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'solar-array': (
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
  ),
  sld: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="9" y="15" width="6" height="6" rx="1" />
      <line x1="9" y1="6" x2="15" y2="6" />
      <line x1="12" y1="6" x2="12" y2="15" />
      <line x1="6" y1="9" x2="12" y2="15" />
      <line x1="18" y1="9" x2="12" y2="15" />
    </svg>
  ),
  audit: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
      <polyline points="9 9 10 10 12 8" />
    </svg>
  ),
  policy: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
      <line x1="8" y1="9" x2="10" y2="9" />
    </svg>
  ),
  tools: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

// Tools with no CMS logo image fall back to one of these hand-drawn marks, keyed by name.
const TOOL_FALLBACK_ICONS: Record<string, React.ReactNode> = {
  Planswift: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" fill="#1A3D63" /><path d="M7 12h10M7 8h6M7 16h8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  'MS Office': (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="9" height="9" rx="1.5" fill="#D83B01" /><rect x="13" y="2" width="9" height="9" rx="1.5" fill="#217346" /><rect x="2" y="13" width="9" height="9" rx="1.5" fill="#2B7CD3" /><rect x="13" y="13" width="9" height="9" rx="1.5" fill="#FFB900" /></svg>
  ),
};

export default function Home() {
  const { data } = useSanityQuery<PortfolioData>(PORTFOLIO_QUERY);
  const profile = data?.profile;
  const journey = data?.journey ?? [];
  const projects = data?.projects ?? [];
  const services = data?.services ?? [];
  const tools = data?.tools ?? [];
  const trainings = data?.trainings ?? [];

  const [typedName, setTypedName] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const fullName = profile?.name;
    if (!fullName) return;
    let i = 0;
    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        i++;
        if (i <= fullName.length) {
          setTypedName(fullName.slice(0, i));
        } else {
          clearInterval(intervalId);
          setTypingDone(true);
        }
      }, 75);
    }, 800);
    return () => { clearTimeout(timeoutId); clearInterval(intervalId); };
  }, [profile?.name]);

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
    ? projects
    : projects.filter(p => p.category === currentFilter);

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
              {profile?.designation}
            </h2>

            {/* Caption / license */}
            <p style={{ color: '#64748b', fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '2.5rem', letterSpacing: '0.5px' }}>
              {profile?.liscence}
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/projects"
                className="hero-btn"
                style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', color: '#ffffff', border: 'none', padding: '0.8rem 1.8rem', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', borderRadius: '9999px', letterSpacing: '0.3px', cursor: 'pointer', transition: 'all 0.25s ease' }}
              >
                View Projects
              </Link>
              <Link to="/journey"
                className="hero-btn"
                style={{ background: 'transparent', color: '#1A3D63', border: '1.5px solid #1A3D63', padding: '0.8rem 1.8rem', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', borderRadius: '9999px', letterSpacing: '0.3px', cursor: 'pointer', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(26,61,99,0.08)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1A3D63'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1A3D63'; }}
              >
                My Journey
              </Link>
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
              src={profile?.image ? urlFor(profile.image).width(680).url() : jeanPortrait}
              alt={profile ? `${profile.name} — ${profile.designation}` : 'Portrait'}
              fetchPriority="high"
              loading="eager"
              decoding="async"
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
            {(profile?.stats ?? []).map((stat, idx) => (
              <div key={stat.label} className="reveal" data-dir="scale" data-delay={`${idx * 0.1}s`}>
                <div className="stat-number" style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '2.2rem', fontWeight: 700 }}>{stat.value}</div>
                <div className="stat-label" style={{ color: '#64748b', fontSize: '0.75rem', letterSpacing: '0.5px', marginTop: '0.25rem' }}>{stat.label}</div>
              </div>
            ))}
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

            {journey.map((entry, idx) => {
              const isMilestone = entry.milestone;
              const side = isMilestone ? 'scale' : idx % 2 === 0 ? 'left' : 'right';
              return (
                <div
                  key={entry._id}
                  className={`journey-milestone reveal${isMilestone ? ' journey-milestone--gold' : ''}`}
                  data-dir={side}
                  data-delay={`${Math.min(idx, 1) * 0.05}s`}
                >
                  <div className={`journey-node${isMilestone ? ' journey-node--gold' : ''}`}>
                    {JOURNEY_ICONS[entry.icon]}
                  </div>
                  <div className={`journey-card${isMilestone ? ' journey-card--gold' : ''}`}>
                    <h3 className="journey-role" style={isMilestone ? { color: 'var(--gold)' } : undefined}>{entry.role}</h3>
                    <time className="journey-date" style={isMilestone ? { color: 'var(--text-muted)' } : undefined}>{entry.dateRange}</time>
                    {entry.company && (
                      <div className="journey-company">
                        {JOURNEY_ICONS[entry.icon]}
                        {entry.company}
                      </div>
                    )}
                    <p className="journey-body">{entry.body}</p>
                    {entry.scope.length > 0 && (
                      <ul className="journey-scope-list">
                        {entry.scope.map((item) => (
                          <li key={item} className="journey-scope-item">{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
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
            {filteredProjects.map((project) => {
              const imageUrl = project.image ? urlFor(project.image).width(800).url() : null;
              return (
              <div key={project._id} className="news-project-card" style={{ background: '#ffffff', border: '1px solid var(--border)', padding: '2rem', boxShadow: 'var(--shadow-sm)', transition: 'var(--transition)', borderRadius: '15px', overflow: 'hidden' }}>

                {/* Column 1: Project Image */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '320px' }}>
                  <div style={{ width: '100%', height: '100%', overflow: 'hidden', border: '1px solid var(--border-light)', borderRadius: '10px', position: 'relative', cursor: imageUrl ? 'zoom-in' : 'default' }} onClick={() => imageUrl && setPreviewImage(imageUrl)}>
                    {imageUrl ? (
                      <img src={imageUrl} alt={project.title} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')} onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', minHeight: '320px', background: 'linear-gradient(135deg, #f0f6ff, #e8f0fa)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(74,127,167,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(74,127,167,0.6)', fontWeight: 500 }}>No Image Available</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Column 2: Content & Specifications Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', gap: '1.5rem' }}>
                  <div>
                    {/* Header info */}
                    <div className="proj-card-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                      <h3 className="proj-card-title" style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, margin: '0 0 0.5rem' }}>{project.title}</h3>
                      <div className="proj-card-sub-row" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="proj-card-pill" style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', color: '#ffffff', padding: '0.25rem 0.75rem', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', border: 'none', borderRadius: '9999px', whiteSpace: 'nowrap' }}>{project.category}</span>
                        <div className="proj-card-meta" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                          <strong>{project.location}</strong> · {project.year}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>{project.description}</p>

                    {/* Scope Bullets */}
                    <div style={{ marginBottom: '1.75rem' }}>
                      <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Scope of Work</h4>
                      <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {project.scope.map((item) => (
                          <li key={item} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <span style={{ color: 'var(--gold)' }}>⚡</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specifications Grid */}
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                      <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Project Specifications</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                        <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '0.65rem' }}>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Role</span>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{project.role}</strong>
                        </div>
                        <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '0.65rem' }}>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Client Type</span>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{project.client}</strong>
                        </div>
                        <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '0.65rem' }}>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Capacity / Sizing</span>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{project.capacityYield}</strong>
                        </div>
                        <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '0.65rem' }}>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Inverters / Aux</span>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{project.inverterRating}</strong>
                        </div>
                        <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '0.65rem' }}>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Drawings</span>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{project.designDrawings}</strong>
                        </div>
                        <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '0.65rem' }}>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Standards</span>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{project.standardsCode}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              );
            })}
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

            {services.map((service, idx) => (
              <div
                key={service._id}
                className="pillars-v2-card reveal"
                data-dir={idx % 2 === 0 ? 'left' : 'right'}
                data-delay={`${idx * 0.05}s`}
                style={{ background: 'var(--bg-darker)', borderColor: 'var(--border)', borderRadius: '15px' }}
              >
                <div className="pillars-v2-icon" style={{ background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', color: '#ffffff' }}>
                  {SERVICE_ICONS[service.icon]}
                </div>
                <h3 className="pillars-v2-card-title" style={{ color: 'var(--text-primary)' }}>{service.title}</h3>
                <p className="pillars-v2-card-desc" style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
              </div>
            ))}
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

                {tools.map((tool) => (
                  <div key={tool._id} className="skill-card" style={{ background: '#ffffff', borderRadius: '15px', padding: '1.1rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111111', margin: '0 0 0.3rem' }}>{tool.name}</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{tool.description}</p>
                    </div>
                    {tool.logo ? (
                      <img src={urlFor(tool.logo).width(120).height(120).url()} alt={tool.name} loading="lazy" decoding="async" style={{ width: '60px', height: '60px', objectFit: 'contain', flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: '60px', height: '60px', borderRadius: '10px', background: 'linear-gradient(135deg, #e8f0fe, #d2e3fc)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {TOOL_FALLBACK_ICONS[tool.name] ?? SERVICE_ICONS.tools}
                      </div>
                    )}
                  </div>
                ))}

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
                  src={laptopMockup}
                  alt="Laptop mockup"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '750px', height: '528px', objectFit: 'fill', display: 'block', position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                />

                {/* Screen overlay — sits in front of the laptop frame */}
                {/* Outer div: rounded top corners via overflow+border-radius */}
                <div style={{ position: 'absolute', top: '23px', left: '129px', width: '490px', height: '308px', zIndex: 2, borderRadius: '15px 15px 0 0', overflow: 'hidden' }}>
                  {/* Inner div: slant via clip-path */}
                  <div style={{ width: '100%', height: '100%', clipPath: 'polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%)' }}>
                    <img
                      src={screenContent}
                      alt="Screen content"
                      loading="lazy"
                      decoding="async"
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  gap: '1rem',
                  width: '100%',
                }}
              >
                {(profile?.academicBackground ?? []).map((edu, idx) => {
                  const imgUrl = edu.image ? urlFor(edu.image).width(600).url() : null;
                  return (
                  <div
                    key={edu._key}
                    className="reveal edu-achievement-card"
                    data-dir="up"
                    data-delay={`${idx * 0.08}s`}
                    style={{
                      position: 'relative',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                      minHeight: '160px',
                      background: edu.displayType === 'none' ? 'linear-gradient(135deg, #1A3D63 0%, #2A5D8A 100%)' : 'transparent'
                    }}
                  >
                    {/* Background image if type is cover */}
                    {edu.displayType === 'cover' && imgUrl && (
                      <>
                        <img src={imgUrl} alt="" aria-hidden="true" loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(26,61,99,0.85) 0%, rgba(74,127,167,0.75) 55%, rgba(74,127,167,0.35) 100%)' }} />
                      </>
                    )}
                    {/* Background if type is contain */}
                    {edu.displayType === 'contain' && imgUrl && (
                      <>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(26,61,99,0.85) 0%, rgba(74,127,167,0.75) 55%, rgba(74,127,167,0.35) 100%)' }} />
                        <img src={imgUrl} alt="" aria-hidden="true" loading="lazy" decoding="async" style={{ position: 'absolute', right: '-10px', bottom: 0, height: '85%', width: 'auto', objectFit: 'contain', objectPosition: 'right bottom' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,61,99,0.95) 30%, rgba(26,61,99,0.5) 60%, transparent 100%)' }} />
                      </>
                    )}
                    {/* Dynamic background overlay for fallback 'none' */}
                    {edu.displayType === 'none' && (
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(26,61,99,0.95) 0%, rgba(74,127,167,0.85) 100%)' }} />
                    )}

                    {/* Content */}
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '1.75rem 2rem' }}>
                      <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.3rem', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>{edu.degree}</h3>
                        <p style={{ fontSize: '0.88rem', color: '#93c5fd', fontWeight: 600, margin: '0 0 0.3rem' }}>{edu.institution}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', margin: 0 }}>{edu.year}</p>
                          {edu.badge && (
                            <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.35)', color: '#ffffff', fontSize: '0.68rem', fontWeight: 700, padding: '0.3rem 0.85rem', borderRadius: '9999px', letterSpacing: '0.5px' }}>
                              {edu.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements */}
            <div id="achievements">
              <div className="reveal" data-dir="up" style={{ marginBottom: '1.75rem' }}>
                <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--gold)', marginBottom: '0.75rem' }}>Recognition</span>
                <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 1rem' }}>Achievements</h2>
                <div className="section-divider" style={{ margin: '0' }}></div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  gap: '1rem',
                  width: '100%',
                }}
              >
                {(profile?.achievements ?? []).map((ach, idx) => {
                  const imgUrl = ach.image ? urlFor(ach.image).width(600).url() : null;
                  return (
                  <div
                    key={ach._key}
                    className="reveal edu-achievement-card"
                    data-dir="up"
                    data-delay={`${idx * 0.08}s`}
                    style={{
                      position: 'relative',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                      minHeight: '160px',
                      display: 'flex',
                      alignItems: 'stretch',
                      background: ach.displayType === 'none' ? 'linear-gradient(135deg, #1A3D63 0%, #2A5D8A 100%)' : 'transparent'
                    }}
                  >
                    {/* Background image if type is cover */}
                    {ach.displayType === 'cover' && imgUrl && (
                      <>
                        <img src={imgUrl} alt="" aria-hidden="true" loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(26,61,99,0.85) 0%, rgba(74,127,167,0.75) 55%, rgba(74,127,167,0.35) 100%)' }} />
                      </>
                    )}
                    {/* Background image if type is contain (like Mercedes seal) */}
                    {ach.displayType === 'contain' && imgUrl && (
                      <>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(26,61,99,0.85) 0%, rgba(74,127,167,0.72) 55%, rgba(74,127,167,0.35) 100%)' }} />
                        <img src={imgUrl} alt="" aria-hidden="true" loading="lazy" decoding="async" style={{ position: 'absolute', right: '-10px', bottom: 0, height: '85%', width: 'auto', objectFit: 'contain', objectPosition: 'right bottom' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,61,99,0.95) 30%, rgba(26,61,99,0.5) 60%, transparent 100%)' }} />
                      </>
                    )}
                    {/* Dynamic background overlay for fallback 'none' */}
                    {ach.displayType === 'none' && (
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(26,61,99,0.95) 0%, rgba(74,127,167,0.85) 100%)' }} />
                    )}

                    {/* Content */}
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '1.75rem 2rem', width: '100%' }}>
                      <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.3rem', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>{ach.title}</h3>
                        <p style={{ fontSize: '0.88rem', color: '#93c5fd', fontWeight: 600, margin: '0 0 0.3rem' }}>{ach.organization}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', margin: 0 }}>{ach.criteria}</p>
                          {ach.badge && (
                            <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.35)', color: '#ffffff', fontSize: '0.68rem', fontWeight: 700, padding: '0.3rem 0.85rem', borderRadius: '9999px', letterSpacing: '0.5px' }}>
                              {ach.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
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
            {trainings.map((item) => (
              <div key={item._id} style={{ background: 'var(--bg-card)', borderRadius: '14px', padding: '1.2rem 1.4rem', border: '1px solid var(--border)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', flexShrink: 0, marginTop: '5px' }}></div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', margin: '0 0 0.25rem', lineHeight: 1.4 }}>{item.title}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600, margin: '0 0 0.1rem' }}>{item.organizer}</p>
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
                {(profile?.socials ?? []).filter(s => s.platform === 'linkedin').map((social) => (
                  <a key={social.url} href={social.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                ))}
                {/* Email */}
                <a href={`mailto:${profile?.email}`} aria-label="Email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </a>
                {/* Phone */}
                <a href={`tel:${profile?.phone?.replace(/\s+/g, '')}`} aria-label="Phone">
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
                    <p style={{ color: 'var(--text-secondary)', margin: '0.1rem 0 0', fontSize: '0.8rem' }}>{profile?.address}</p>
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
                    <p style={{ color: 'var(--text-secondary)', margin: '0.1rem 0 0', fontSize: '0.8rem' }}>{profile?.phone}</p>
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
                    <p style={{ color: 'var(--text-secondary)', margin: '0.1rem 0 0', fontSize: '0.8rem' }}>{profile?.email}</p>
                  </div>
                </div>
              </div>

              {/* Reference Check */}
              <div className="contact-references">
                <h3 style={{ color: 'var(--gold)' }}>Professional References</h3>
                <div className="contact-reference-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {(profile?.references ?? []).map((ref) => (
                    <div key={ref.name} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem', borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(to right, #1A3D63, #4A7FA7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      </div>
                      <div>
                        <h5 style={{ margin: '0 0 0.2rem', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{ref.name}</h5>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 0.15rem' }}>{ref.role}, {ref.organization}</p>
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
