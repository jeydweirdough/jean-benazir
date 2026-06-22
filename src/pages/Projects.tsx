import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';

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

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const currentFilter = searchParams.get('filter') || 'all';

  // Calculations tab state
  const [activeTab, setActiveTab] = useState<'load' | 'vd' | 'sc'>('load');

  // Voltage Drop Calculator State
  const [vdCurrent, setVdCurrent] = useState<number>(30);
  const [vdLength, setVdLength] = useState<number>(50);
  const [vdWireSize, setVdWireSize] = useState<number>(8.0); // mm2
  const [vdVoltage, setVdVoltage] = useState<number>(230); // Single Phase 230V
  const [vdResult, setVdResult] = useState<{ drop: number; pct: number }>({ drop: 0, pct: 0 });

  // Short Circuit Calculator State
  const [scKva, setScKva] = useState<number>(500);
  const [scImpedance, setScImpedance] = useState<number>(5.0);
  const [scSecVolt, setScSecVolt] = useState<number>(400); // Three Phase 400V
  const [scResult, setScResult] = useState<{ iBase: number; iSc: number; kaic: number }>({ iBase: 0, iSc: 0, kaic: 0 });

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

  // Scroll reveal — re-observe whenever filter changes (new cards rendered)
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
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredProjects]);

  // Close lightbox on escape keypress and toggle body scrolling lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);

    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  // Calculate Voltage Drop on input change
  useEffect(() => {
    // Copper resistivity: 0.0172 ohm-mm2 / meter
    const R = (0.0172 * vdLength) / vdWireSize;
    // Single phase formula: 2 * I * R
    const drop = 2 * vdCurrent * R;
    const pct = (drop / vdVoltage) * 100;
    setVdResult({
      drop: parseFloat(drop.toFixed(2)),
      pct: parseFloat(pct.toFixed(2))
    });
  }, [vdCurrent, vdLength, vdWireSize, vdVoltage]);

  // Calculate Short Circuit on input change
  useEffect(() => {
    // I_base = kVA / (sqrt(3) * V_L-L_kV)
    const vK = scSecVolt / 1000;
    const iBase = scKva / (1.732 * vK);
    // I_sc = I_base / (Z% / 100)
    const iSc = iBase / (scImpedance / 100);
    
    let kaic = 10;
    const scKa = iSc / 1000;
    if (scKa <= 10) kaic = 10;
    else if (scKa <= 18) kaic = 18;
    else if (scKa <= 22) kaic = 22;
    else if (scKa <= 35) kaic = 35;
    else if (scKa <= 50) kaic = 50;
    else kaic = 65;

    setScResult({
      iBase: parseFloat(iBase.toFixed(0)),
      iSc: parseFloat(iSc.toFixed(0)),
      kaic
    });
  }, [scKva, scImpedance, scSecVolt]);

  return (
    <div className="animate-fade-in section-padding" style={{ backgroundImage: 'linear-gradient(rgba(10,15,30,0.72), rgba(10,15,30,0.72)), url(/background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header reveal" data-dir="down">
          <span className="section-subtitle" style={{ color: '#a8cce8', fontWeight: 700 }}>Project Logbook</span>
          <h1 className="section-title" style={{ color: '#ffffff' }}>Solar & Electrical Engineering</h1>
          <div className="section-divider"></div>
        </div>

        {/* Filters */}
        <div className="project-filters reveal" data-delay="0.2s">
          <button onClick={() => setFilter('all')} className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}>All</button>
          <button onClick={() => setFilter('rooftop')} className={`filter-btn ${currentFilter === 'rooftop' ? 'active' : ''}`}>Rooftop Solar</button>
          <button onClick={() => setFilter('ground')} className={`filter-btn ${currentFilter === 'ground' ? 'active' : ''}`}>Ground Mounted</button>
          <button onClick={() => setFilter('planning')} className={`filter-btn ${currentFilter === 'planning' ? 'active' : ''}`}>MEPF & Cabling</button>
        </div>

        {/* Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="pcard-v2 reveal" data-delay={`${(index % 3) * 0.12}s`} onClick={() => setSelectedProject(project)}>
              <img className="pcard-v2-bg" src={project.image} alt={project.title} />
              <div className="pcard-v2-overlay" />
              <div className="pcard-v2-content">
                <span className="pcard-v2-category">{project.category}</span>
                <div className="pcard-v2-bottom">
                  <h3 className="pcard-v2-title">{project.title}</h3>
                  <p className="pcard-v2-meta">{project.location} · {project.year}</p>
                  <div className="pcard-v2-footer">
                    <span className="pcard-v2-cta">View Details</span>
                    <span className="pcard-v2-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calculations Section */}
        <div className="calculations-section reveal" data-dir="scale">
          <div className="section-header" style={{ marginBottom: '2.5rem', textAlign: 'left', maxWidth: '100%' }}>
            <span className="section-subtitle" style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>Calculations & Verification</span>
            <h2 className="section-title" style={{ fontSize: '2rem', color: '#ffffff' }}>Engineering Studies & Samples</h2>
            <div className="section-divider" style={{ margin: '0' }}></div>
          </div>
          
          <div className="calc-tabs">
            <button className={`calc-tab-btn ${activeTab === 'load' ? 'active' : ''}`} onClick={() => setActiveTab('load')}>Sample Load Schedule</button>
            <button className={`calc-tab-btn ${activeTab === 'vd' ? 'active' : ''}`} onClick={() => setActiveTab('vd')}>Voltage Drop Calculator</button>
            <button className={`calc-tab-btn ${activeTab === 'sc' ? 'active' : ''}`} onClick={() => setActiveTab('sc')}>Short Circuit Analysis</button>
          </div>

          {/* Panel Load Schedule */}
          <div className={`calc-panel ${activeTab === 'load' ? 'active' : ''}`}>
            <p className="calc-desc">
              <strong>Panel Designation: LP-1 (230V, Single-Phase, 2-Wire, 60Hz)</strong>. A sample panelboard schedule calculated in compliance with the Philippine Electrical Code (PEC) sizing regulations for branch circuits.
            </p>
            <div className="calc-table-wrapper">
              <table className="calc-table">
                <thead>
                  <tr>
                    <th>CKT</th>
                    <th>Load Description</th>
                    <th>Volt-Amps (VA)</th>
                    <th>Voltage (V)</th>
                    <th>Amps (A)</th>
                    <th>Wire Size (THHN Cu)</th>
                    <th>Conduit Size</th>
                    <th>Protection (AT/AF)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Lighting Outlets (8 outlets)</td>
                    <td>800 VA</td>
                    <td>230 V</td>
                    <td>3.48 A</td>
                    <td>2 x 2.0 mm²</td>
                    <td>15 mmø PVC</td>
                    <td>15AT / 50AF</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Lighting Outlets (6 outlets)</td>
                    <td>600 VA</td>
                    <td>230 V</td>
                    <td>2.61 A</td>
                    <td>2 x 2.0 mm²</td>
                    <td>15 mmø PVC</td>
                    <td>15AT / 50AF</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Convenience Outlets (8 outlets)</td>
                    <td>1440 VA</td>
                    <td>230 V</td>
                    <td>6.26 A</td>
                    <td>2 x 3.5 mm²</td>
                    <td>20 mmø PVC</td>
                    <td>20AT / 50AF</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Convenience Outlets (6 outlets)</td>
                    <td>1080 VA</td>
                    <td>230 V</td>
                    <td>4.70 A</td>
                    <td>2 x 3.5 mm²</td>
                    <td>20 mmø PVC</td>
                    <td>20AT / 50AF</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>AC Unit (1.5 HP)</td>
                    <td>1500 VA</td>
                    <td>230 V</td>
                    <td>6.52 A</td>
                    <td>2 x 5.5 mm²</td>
                    <td>20 mmø PVC</td>
                    <td>30AT / 50AF</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Water Heater</td>
                    <td>3000 VA</td>
                    <td>230 V</td>
                    <td>13.04 A</td>
                    <td>2 x 5.5 mm²</td>
                    <td>20 mmø PVC</td>
                    <td>30AT / 50AF</td>
                  </tr>
                  <tr style={{ fontWeight: 600, borderTop: '2px solid var(--border)' }}>
                    <td>Total</td>
                    <td>Sub-Total Connected Load</td>
                    <td>8,420 VA</td>
                    <td>230 V</td>
                    <td>36.61 A</td>
                    <td>2 x 14.0 mm² + 5.5mm² G</td>
                    <td>32 mmø IMC</td>
                    <td>Main: 60AT / 100AF</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Voltage Drop Calculator */}
          <div className={`calc-panel ${activeTab === 'vd' ? 'active' : ''}`}>
            <p className="calc-desc">
              Calculate voltage drop along copper feeders. Recommended maximum voltage drop under PEC is <strong>3.0%</strong> for branch circuits and <strong>5.0%</strong> combined feeder-branch circuit.
            </p>
            <div className="calc-calculator-box">
              <div className="calc-input-group">
                <label>Load Current (A):</label>
                <input 
                  type="number" 
                  value={vdCurrent} 
                  onChange={(e) => setVdCurrent(Math.max(1, parseInt(e.target.value) || 0))}
                />
              </div>
              <div className="calc-input-group">
                <label>One-Way Distance (meters):</label>
                <input 
                  type="number" 
                  value={vdLength} 
                  onChange={(e) => setVdLength(Math.max(1, parseInt(e.target.value) || 0))}
                />
              </div>
              <div className="calc-input-group">
                <label>Wire Size (Copper mm²):</label>
                <select 
                  value={vdWireSize} 
                  onChange={(e) => setVdWireSize(parseFloat(e.target.value))}
                >
                  <option value="2.0">2.0 mm² (#14 AWG)</option>
                  <option value="3.5">3.5 mm² (#12 AWG)</option>
                  <option value="5.5">5.5 mm² (#10 AWG)</option>
                  <option value="8.0">8.0 mm² (#8 AWG)</option>
                  <option value="14.0">14.0 mm² (#6 AWG)</option>
                  <option value="22.0">22.0 mm² (#4 AWG)</option>
                  <option value="30.0">30.0 mm² (#2 AWG)</option>
                </select>
              </div>
              <div className="calc-input-group">
                <label>Nominal Voltage (V):</label>
                <select 
                  value={vdVoltage} 
                  onChange={(e) => setVdVoltage(parseInt(e.target.value))}
                >
                  <option value="230">230 V (Single Phase)</option>
                  <option value="400">400 V (Three Phase Equivalent)</option>
                </select>
              </div>

              <div className="calc-result-box">
                <p>Voltage Drop: {vdResult.drop} V</p>
                <p style={{ color: vdResult.pct > 3 ? '#c0392b' : '#1a7a3a', marginTop: '0.5rem' }}>
                  Percentage Drop: {vdResult.pct}%<br/>
                  {vdResult.pct > 3 ? 'Exceeds PEC 3% recommended limit' : 'Complies with PEC guidelines'}
                </p>
              </div>
            </div>
          </div>

          {/* Short Circuit Analysis */}
          <div className={`calc-panel ${activeTab === 'sc' ? 'active' : ''}`}>
            <p className="calc-desc">
              Estimate prospective short-circuit currents at transformer secondary terminals for standard breaker rating selection.
            </p>
            <div className="calc-calculator-box">
              <div className="calc-input-group">
                <label>Transformer Rating (kVA):</label>
                <input 
                  type="number" 
                  value={scKva} 
                  onChange={(e) => setScKva(Math.max(1, parseInt(e.target.value) || 0))}
                />
              </div>
              <div className="calc-input-group">
                <label>Impedance %Z (Standard 5%):</label>
                <input 
                  type="number" 
                  step="0.1" 
                  value={scImpedance} 
                  onChange={(e) => setScImpedance(Math.max(0.1, parseFloat(e.target.value) || 0))}
                />
              </div>
              <div className="calc-input-group">
                <label>Secondary Voltage (V, L-L):</label>
                <select 
                  value={scSecVolt} 
                  onChange={(e) => setScSecVolt(parseInt(e.target.value))}
                >
                  <option value="400">400 V (3-Phase)</option>
                  <option value="230">230 V (3-Phase)</option>
                </select>
              </div>

              <div className="calc-result-box">
                <p>Base Full Load Current: {scResult.iBase} A</p>
                <p style={{ marginTop: '0.5rem' }}>Prospective Fault Current: {scResult.iSc} A<br/>({ (scResult.iSc / 1000).toFixed(2) } kA)</p>
                <p style={{ color: '#1a1a2e', marginTop: '0.5rem', fontWeight: 600 }}>
                  Recommended Breaker Capacity: &ge; {scResult.kaic} KAIC
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal - Rendered via React Portal */}
      {selectedProject && createPortal(
        <div className="lightbox" onClick={() => setSelectedProject(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close specifications sheet"
            >
              &times;
            </button>
            <div className="lightbox-img-frame">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>
            <div className="lightbox-info">
              <h3 style={{ textTransform: 'capitalize' }}>{selectedProject.title}</h3>
              <div className="lightbox-meta">
                <span>{selectedProject.category}</span>
                <span>{selectedProject.year} &middot; {selectedProject.location}</span>
              </div>
              
              <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--gold)' }}>
                <strong>Role:</strong> {selectedProject.role} &middot; <strong>Client Type:</strong> {selectedProject.client}
              </div>

              <p className="lightbox-desc">{selectedProject.desc}</p>
              
              <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'var(--sans)' }}>Scope of Work</h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {selectedProject.scope.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'var(--sans)' }}>Technical Specifications</h4>
                <div className="calc-table-wrapper" style={{ margin: '0' }}>
                  <table className="calc-table" style={{ fontSize: '0.75rem' }}>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', borderRight: 'none' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                          Capacity / Sizing
                        </td>
                        <td>{selectedProject.capacity_yield}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', borderRight: 'none' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
                          Inverters / Auxiliaries
                        </td>
                        <td>{selectedProject.inverter_rating}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', borderRight: 'none' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                          Design & Drawings
                        </td>
                        <td>{selectedProject.design_drawings}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', borderRight: 'none' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                          Standards Compliance
                        </td>
                        <td>{selectedProject.standards_code}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ textAlign: 'left', marginBottom: '1.5rem', borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.2rem', fontFamily: 'var(--sans)' }}>Project Result & Impact</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontStyle: 'italic' }}>"{selectedProject.result}"</p>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => setSelectedProject(null)}
                style={{ alignSelf: 'flex-start' }}
              >
                Close Spec Sheet
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
