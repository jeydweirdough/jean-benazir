// Seeds the Sanity dataset with the portfolio content currently hardcoded in src/pages/Home.tsx.
// Run with: npm run seed  (requires SANITY_API_TOKEN in .env)
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const assetPath = (p) => path.join(root, 'src', 'assets', p);

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('Missing SANITY_API_TOKEN. Add it to .env and re-run with `node --env-file=.env scripts/seed-sanity.mjs`.');
  process.exit(1);
}

const client = createClient({
  projectId: 'r21fiqjr',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const uploadedAssets = new Map();

async function uploadImage(relativePath) {
  if (uploadedAssets.has(relativePath)) return uploadedAssets.get(relativePath);
  const filePath = assetPath(relativePath);
  let buffer = readFileSync(filePath);
  const isSvg = filePath.toLowerCase().endsWith('.svg');
  if (isSvg) {
    // Some source SVGs declare encoding="utf-16" in their XML prolog while the bytes are
    // actually UTF-8, which confuses Sanity's image processor. Normalize the declaration.
    const text = buffer.toString('utf8').replace(/encoding="utf-16"/i, 'encoding="UTF-8"');
    buffer = Buffer.from(text, 'utf8');
  }
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(filePath),
    contentType: isSvg ? 'image/svg+xml' : undefined,
  });
  uploadedAssets.set(relativePath, asset);
  console.log(`Uploaded image: ${relativePath}`);
  return asset;
}

async function uploadImageFromUrl(url) {
  if (uploadedAssets.has(url)) return uploadedAssets.get(url);
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`Skipping image (HTTP ${res.status}): ${url}`);
    return null;
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(new URL(url).pathname) || 'image.jpg',
  });
  uploadedAssets.set(url, asset);
  console.log(`Uploaded remote image: ${url}`);
  return asset;
}

function imageField(asset) {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
  };
}

async function main() {
  console.log('Uploading images...');
  const [
    portraitAsset,
    collegeAsset,
    scholarAsset,
    pvsystAsset,
    pvcaseAsset,
    helioscopeAsset,
    autocadAsset,
    revitAsset,
    etapAsset,
    skmAsset,
  ] = await Promise.all([
    uploadImage('jean_portrait_no_bg.png'),
    uploadImage('college.jpg'),
    uploadImage('scholar.png'),
    uploadImage('logos/pvsyst.svg'),
    uploadImage('logos/pvcase.png'),
    uploadImage('logos/helioscope.svg'),
    uploadImage('logos/autocad.png'),
    uploadImage('logos/revit.png'),
    uploadImage('logos/etap.svg'),
    uploadImage('logos/skm.png'),
  ]);

  console.log('Writing profile document...');
  const profile = {
    _id: 'profile',
    _type: 'profile',
    name: 'Jean Benazir T. Buaya',
    designation: 'Registered Electrical Engineer',
    liscence: 'REE License No. 0084321',
    image: imageField(portraitAsset),
    stats: [
      { _key: 'stat-1', _type: 'stat', value: '2019', label: 'Registered EE Board Exam' },
      { _key: 'stat-2', _type: 'stat', value: '6+ Years', label: 'Electrical & Solar Experience' },
      { _key: 'stat-3', _type: 'stat', value: '10+', label: 'Utility-Scale Projects' },
      { _key: 'stat-4', _type: 'stat', value: '500MW+', label: 'Total Capacity Designed' },
    ],
    academicBackground: [
      {
        _key: 'edu-1',
        _type: 'academicEntry',
        degree: 'Bachelor of Science in Electrical Engineering',
        institution: 'Camarines Norte State College',
        year: 'Graduated 2019',
        badge: 'REE — Board Passer 2019',
        image: imageField(collegeAsset),
        displayType: 'cover',
      },
    ],
    achievements: [
      {
        _key: 'ach-1',
        _type: 'achievementEntry',
        title: 'Iskolar ng Bayan Grantee',
        organization: 'LGU Mercedes',
        criteria: 'Academic Excellence',
        badge: 'Scholarship Grantee',
        image: imageField(scholarAsset),
        displayType: 'contain',
      },
    ],
    email: 'jeanbenazirb@gmail.com',
    phone: '+63 997 364 7886',
    address: 'Las Piñas City, Metro Manila, Philippines',
    socials: [
      { _key: 'social-linkedin', _type: 'social', platform: 'linkedin', url: 'https://linkedin.com/in/jean-benazir' },
    ],
    references: [
      { _key: 'ref-1', _type: 'professionalReference', name: 'Engr. Jennylene Baluyot', role: 'Plant Manager', organization: 'BulacanSol · MGen Renewable Energy', contact: '0927 895 5849' },
      { _key: 'ref-2', _type: 'professionalReference', name: 'Engr. Carlito Derije', role: 'EDD Manager', organization: 'Cornersteel Systems Corp.', contact: '0998 557 8490' },
      { _key: 'ref-3', _type: 'professionalReference', name: 'Engr. Marrion M. Marteja', role: 'Lead MEPF', organization: 'DMCI Homes', contact: '0935 428 6844' },
    ],
  };
  await client.createOrReplace(profile);

  console.log('Writing journey entries...');
  const journeyEntries = [
    {
      role: 'Senior Solar Design Engineer',
      company: 'TotalEnergies (Total Distributed PH)',
      dateRange: 'Nov 2025 – Present',
      body: 'Lead designer executing engineering layouts, master plans, shading profiles, and yield simulation models for multi-megawatt solar systems.',
      scope: [
        'Performs layout designs, shading audits, and capacity matchings using PVSyst & PVCase.',
        'Generates detail bills of materials (BOM) and electrical CAPEX estimations.',
      ],
      icon: 'sun',
      milestone: false,
      order: 1,
    },
    {
      role: 'Science Research Specialist II',
      company: 'Department of Energy (Solar Management Group)',
      dateRange: 'Dec 2024 – Nov 2025',
      body: 'Evaluated grid interconnection capabilities, financial metrics of solar energy developer contracts, and formulated resource policies.',
      scope: [
        'Audited developer site reports and project logbooks for compliance checks.',
        'Formulated solar yield resource policy criteria.',
      ],
      icon: 'government',
      milestone: false,
      order: 2,
    },
    {
      role: 'Electrical & Solar Design Engineer',
      company: 'Solar Philippines',
      dateRange: 'Jul 2023 – Dec 2024',
      body: 'Drafted array layout blueprints and utility connection grids for utility-scale parks up to 3,500 MWp and commercial systems.',
      scope: [
        'Drafted wiring schematics, Single Line Diagrams, and collection layouts.',
        'Executed shading computations and layout yield simulations.',
      ],
      icon: 'solar-grid',
      milestone: false,
      order: 3,
    },
    {
      role: 'Electrical Engineer',
      company: 'M. Verano Construction Corp.',
      dateRange: 'Aug 2022 – Jul 2023',
      body: 'Managed site electrical deliverables, structural wiring pathways, and subcontractor compliance schedules.',
      scope: [
        'Supervised on-site conduit system routing runs.',
        'Reviewed document controls, RFIs, as-built changes, and bid estimates.',
      ],
      icon: 'hardhat',
      milestone: false,
      order: 4,
    },
    {
      role: 'Electrical Engineer',
      company: 'DMCI Homes Inc. (Prisma Residences Project)',
      dateRange: 'Nov 2021 – Aug 2022',
      body: 'Coordinated high-rise MEPF subcontractors, reviewed riser layouts, panel schedules, and resolved conduit collisions.',
      scope: [],
      icon: 'building',
      milestone: false,
      order: 5,
    },
    {
      role: 'Electrical Design Engineer',
      company: 'Cornersteel Systems Corp.',
      dateRange: 'Jan 2020 – Jun 2021',
      body: 'Conducted office fit-out site surveys, electrical panel specifications, and structured cabling blueprints.',
      scope: [],
      icon: 'cabling',
      milestone: false,
      order: 6,
    },
    {
      role: 'Registered Electrical Engineer',
      company: '',
      dateRange: '2019 Milestone',
      body: 'Passed the PRC Electrical Engineering Licensure Examination — officially licensed to practice electrical engineering in the Philippines.',
      scope: [],
      icon: 'award',
      milestone: true,
      order: 7,
    },
  ];

  for (const [i, entry] of journeyEntries.entries()) {
    await client.createOrReplace({
      _id: `journey-${i + 1}`,
      _type: 'journeyEntry',
      ...entry,
    });
  }

  console.log('Writing project entries...');
  const projects = [
    {
      title: 'Megaworld Festivewalk Mall',
      category: 'rooftop',
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
      description: 'Preparation of preliminary project drawings based on site inspection, shading orientation analysis, and electrical design considerations for a 528kWp Rooftop Solar Project (RSP).',
      year: '2024',
      location: 'Iloilo City, PH',
      role: 'Lead Design Engineer',
      scope: [
        'Prepared preliminary PV array layouts and inverter configuration for 528kWp.',
        'Conducted detailed shading and yield performance assessments using PVSyst.',
        'Developed DC/AC cable schedules and cable size calculations.',
        'Created single line diagrams (SLD) in compliance with the Philippine Electrical Code.',
      ],
      inverterRating: '400kWac Inverter Stack',
      designDrawings: 'PV Layout, Cable Routing, SLD',
      capacityYield: '528kWp DC / 400kWac AC',
      standardsCode: 'Philippine Electrical Code (PEC)',
      client: 'TotalEnergies',
      result: 'Reduced cabling distribution losses by 2.4% and successfully passed Meralco Net Metering verification on the first inspection.',
    },
    {
      title: 'Nueva Ecija 2 Solar Project',
      category: 'ground',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      description: 'Development of initial project drawings and electrical layout plans for a massive 3,500MWp ground-mounted solar utility project, coordinating master plans and centralized power layout designs.',
      year: '2024',
      location: 'Nueva Ecija, PH',
      role: 'Lead Solar Design Engineer',
      scope: [
        'Created master plan block layouts and tracker configurations using PVCase.',
        'Modeled terrain slopes and calculated shading layouts for utility-scale efficiency.',
        'Conducted large-scale PVSyst meteorological yield estimations.',
        'Coordinated layout sizing and spacing for central inverter stations.',
      ],
      inverterRating: 'Central Inverter Blocks (3.125MW)',
      designDrawings: 'Block Layout, SLD, Substation MV',
      capacityYield: '3,500MWp Utility Capacity',
      standardsCode: 'Grid Code Integration Standards',
      client: 'Solar Philippines',
      result: 'Optimized array block layouts to reduce DC cable quantities by 12% across Phase 1 development blocks.',
    },
    {
      title: 'General Santos City SPP',
      category: 'ground',
      image: 'https://images.unsplash.com/photo-1548550022-c3bf507b9a5c?auto=format&fit=crop&w=800&q=80',
      description: 'Development of initial project drawings and layout optimization for a 475MWp Ground-Mounted Solar Power Project, conducting shading and yield simulations.',
      year: '2023',
      location: 'General Santos City, PH',
      role: 'Solar Design Engineer',
      scope: [
        'Developed 475MWp utility solar array layouts and DC/AC routing plans.',
        'Conducted PVSyst meteorological shading and performance ratio simulations.',
        'Prepared detailed Single Line Diagrams (SLD) for inverter station cabinets.',
        'Drafted MV collection grid routing schematic layouts.',
      ],
      inverterRating: '1500V central / string mix',
      designDrawings: 'Single Line Diagram, DC Cable Routing',
      capacityYield: '475MWp Utility Scale',
      standardsCode: 'PEC / IEC Standards Compliance',
      client: 'Solar Philippines',
      result: 'Yield simulations validated by the client technical committee for project financial close.',
    },
    {
      title: 'Infinity Resort RSP',
      category: 'rooftop',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
      description: 'Preparation of preliminary project drawings, shading assessments, and PV-inverter sizing layouts for a 50kWp Net-Metered Rooftop Solar Project.',
      year: '2024',
      location: 'Puerto Galera, PH',
      role: 'Design Engineer',
      scope: [
        'Designed 50kWp Net-Metered rooftop array layout and tile spacing.',
        'Performed PV-inverter matching calculations.',
        'Developed single line drawings (SLDs) and electrical panels layouts.',
        'Prepared technical bill of materials (BOM) with cost analysis.',
      ],
      inverterRating: '36kWac String Inverter',
      designDrawings: 'DC/AC Cable Routing Plan & SLD',
      capacityYield: '50kWp DC / 36kWac AC',
      standardsCode: 'Net Metering Application Standards',
      client: 'Infinity Resort',
      result: 'Passed local utility net metering inspection, generating 72 MWh of annual clean energy.',
    },
    {
      title: 'SM City Puerto Princesa',
      category: 'rooftop',
      image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=800&q=80',
      description: 'Development of initial project drawings and electrical plans for SM City Puerto Princesa commercial solar rooftop project.',
      year: '2024',
      location: 'Palawan, PH',
      role: 'Lead Design Engineer',
      scope: [
        'Evaluated structural design load constraints for solar panel racks.',
        'Developed initial layouts and electrical wiring diagrams.',
        'Performed cable sizing, DC combiners layout, and inverter stack optimization.',
      ],
      inverterRating: '100kW String Inverters Stack',
      designDrawings: 'Layout Drawings & Block Diagrams',
      capacityYield: '1.2MWp Commercial Rooftop',
      standardsCode: 'PEC / Utility Standards',
      client: 'TotalEnergies',
      result: 'Completed initial design packages for corporate engineering review and approval.',
    },
    {
      title: 'Iba-Palauig SPP',
      category: 'ground',
      image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80',
      description: 'Development of initial drawings and array layouts for 200MWp ground-mounted solar power plant.',
      year: '2023',
      location: 'Zambales, PH',
      role: 'Design Engineer',
      scope: [
        'Developed initial drawings and layout configurations for a 200MWp ground system.',
        'Drafted cable routing optimization diagrams to minimize voltage drops.',
        'Assisted in array boundary calculations and tracker configurations.',
      ],
      inverterRating: 'Central Inverter Blocks',
      designDrawings: 'SLD & Collection Grid Layout',
      capacityYield: '200MWp Capacity Scale',
      standardsCode: 'Philippine Grid Code / PEC',
      client: 'Solar Philippines',
      result: 'Design drawings integrated into system impact studies (SIS) for grid interconnection.',
    },
    {
      title: 'San Ildefonso SPP',
      category: 'ground',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      description: 'Drafted layout configurations and PV array layouts for 500MWp utility solar project.',
      year: '2023',
      location: 'Bulacan, PH',
      role: 'Design Engineer',
      scope: [
        'Drafted array layouts and block structures for 500MWp utility system.',
        'Assisted in PVSyst performance calculations and cable calculations.',
        'Coordinated with site surveys to map shading factors from surrounding terrain.',
      ],
      inverterRating: 'Central Inverter Blocks',
      designDrawings: 'Master Block Plan & Wiring Layout',
      capacityYield: '500MWp Utility Capacity',
      standardsCode: 'IEEE 1547 / PEC Standards',
      client: 'Solar Philippines',
      result: 'Optimized layout configurations, increasing active collection area by 3% within property bounds.',
    },
    {
      title: 'Prisma Residences MEPF',
      category: 'planning',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      description: 'Supervision and management of construction activities, reviewing MEPF plans/drawings, revisions, and as-builts for DMCI high-rise residential project.',
      year: '2022',
      location: 'Pasig City, PH',
      role: 'Electrical Engineer',
      scope: [
        'Supervised subcontractor electrical installations on-site.',
        'Reviewed MEPF drawings, riser diagrams, panel schedules, and as-builts.',
        'Evaluated subcontractor billings and variation orders.',
        'Coordinated weekly site alignment meetings and resolved conduit collisions.',
      ],
      inverterRating: '2x1500kVA Substation Sub',
      designDrawings: 'Riser Diagrams & Panel Schedules',
      capacityYield: '3 High-Rise Residential Towers',
      standardsCode: 'PEC / National Building Code PH',
      client: 'DMCI Homes Inc.',
      result: 'Reduced project delay by 15% through preemptive collision checking between duct banks and structural beams.',
    },
    {
      title: 'Cornersteel Structured Cabling',
      category: 'planning',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      description: 'Site survey and drafting single line diagrams for proposed electrical, structured voice/data, and auxiliary cabling systems.',
      year: '2021',
      location: 'Makati City, PH',
      role: 'Electrical Design Engineer',
      scope: [
        'Conducted site surveys for corporate commercial fit-out projects.',
        'Drafted power and lighting layout drawings, single line diagrams (SLDs).',
        'Calculated load schedules and estimated materials for structured cabling (voice/data).',
      ],
      inverterRating: '150kVA Connected Load',
      designDrawings: 'Power/Lighting & Cabling Layout',
      capacityYield: '4,200 sq.m Corporate Fit-out',
      standardsCode: 'PEC / EIA/TIA 568',
      client: 'Cornersteel Systems Corp.',
      result: 'Completed drawings and BOM approved on first submission, enabling on-time site fit-out execution.',
    },
  ];

  for (const [i, p] of projects.entries()) {
    const imageAsset = await uploadImageFromUrl(p.image);
    await client.createOrReplace({
      _id: `project-${i + 1}`,
      _type: 'project',
      title: p.title,
      category: p.category,
      description: p.description,
      ...(imageAsset ? { image: imageField(imageAsset) } : {}),
      year: p.year,
      location: p.location,
      role: p.role,
      scope: p.scope,
      inverterRating: p.inverterRating,
      designDrawings: p.designDrawings,
      capacityYield: p.capacityYield,
      standardsCode: p.standardsCode,
      client: p.client,
      result: p.result,
      order: i + 1,
    });
  }

  console.log('Writing service entries...');
  const services = [
    {
      key: 'solar-pv-design',
      title: 'Solar PV Design',
      description: 'Basic to complex PV designs including array layouts, shading analysis, PV-inverter sizing, PVSyst, PVCase and Helioscope simulations.',
      icon: 'solar-array',
    },
    {
      key: 'electrical-planning',
      title: 'Electrical Planning',
      description: 'Single Line Diagrams (SLD), DC/AC cable routing optimization, auxiliary cabling systems, and wiring diagrams for residential & commercial sites.',
      icon: 'sld',
    },
    {
      key: 'site-assessment-audit',
      title: 'Site Assessment & Audit',
      description: 'On-site energy audits, load analysis, and technical inspection of existing electrical systems for compliance and optimization.',
      icon: 'audit',
    },
    {
      key: 'doe-resource-policy',
      title: 'DOE Resource Policy',
      description: 'Auditing developer books, formulating solar resource recommendations, and evaluating financial capabilities for solar RE contracts.',
      icon: 'policy',
    },
    {
      key: 'mepf-supervision',
      title: 'MEPF Supervision',
      description: 'Coordinating on-site MEPF subcontractor progress, reviewing as-built drawings, on-site assessments, and managing timelines.',
      icon: 'tools',
    },
  ];

  for (const [i, s] of services.entries()) {
    await client.createOrReplace({
      _id: `service-${s.key}`,
      _type: 'service',
      title: s.title,
      description: s.description,
      icon: s.icon,
      order: i + 1,
    });
  }

  console.log('Writing tool entries...');
  const tools = [
    { key: 'pvsyst', name: 'PVSyst', description: 'Industry-standard simulation software for PV system energy yield and performance ratio analysis.', asset: pvsystAsset },
    { key: 'pvcase', name: 'PVCase', description: 'Advanced PV layout and string design tool for optimizing utility-scale solar array configurations.', asset: pvcaseAsset },
    { key: 'helioscope', name: 'Helioscope', description: 'Web-based solar design platform for detailed shading analysis and system performance modeling.', asset: helioscopeAsset },
    { key: 'autocad', name: 'AutoCAD', description: 'Industry-leading 2D/3D drafting tool used for precise electrical and structural engineering drawings.', asset: autocadAsset },
    { key: 'revit-mep', name: 'Revit MEP', description: 'BIM software for designing and coordinating mechanical, electrical, and plumbing building systems.', asset: revitAsset },
    { key: 'etap', name: 'ETAP', description: 'Power system analysis platform for load flow, short circuit, and protection coordination studies.', asset: etapAsset },
    { key: 'skm-tools', name: 'SKM Tools', description: 'Electrical power system analysis suite used for fault studies, arc flash, and equipment sizing.', asset: skmAsset },
    { key: 'planswift', name: 'Planswift', description: 'Digital takeoff and estimating software for accurate material quantity calculations from plans.', asset: null },
    { key: 'ms-office', name: 'MS Office', description: 'Proficient in Excel, Word, and PowerPoint for documentation, reporting, and project presentations.', asset: null },
  ];

  for (const [i, t] of tools.entries()) {
    await client.createOrReplace({
      _id: `tool-${t.key}`,
      _type: 'tool',
      name: t.name,
      description: t.description,
      ...(t.asset ? { logo: imageField(t.asset) } : {}),
      order: i + 1,
    });
  }

  console.log('Writing training entries...');
  const trainings = [
    { title: 'CS201: Huawei SmartLogger Configuration Procedure', organizer: 'Solar Philippines', date: 'February 2024' },
    { title: 'PV117: Introduction to Net Metering Application', organizer: 'Solar Philippines', date: 'January 2024' },
    { title: 'PV108: Basic Engineering Design for Commercial Rooftop Solar', organizer: 'Solar Philippines', date: 'January 2024' },
    { title: 'SF101: Electrical Safety in the Workplace', organizer: 'Solar Philippines', date: 'March 2024' },
    { title: 'RA 11285: Compliance Energy Audit Case Studies', organizer: 'IIEE Mini Conference, Worldbex', date: '2023' },
    { title: 'Energy Efficiency & Conservation Act on Building Design', organizer: 'IIEE Mini Conference, Worldbex', date: '2023' },
    { title: 'Energy Management & Energy Audit: Best Global Practice in PH', organizer: 'IIEE Mini Conference, Worldbex', date: '2023' },
    { title: '2-Day Solar PV Installation & Training — Rooftop Solar PV Design', organizer: 'PHL Solar Industries, Quezon City', date: 'July 9–10, 2022' },
    { title: 'Standard Electrical Installation & Simplified Fault Calculation', organizer: 'IIEE Metro South Chapter / IIEE-CSC Region V', date: 'Aug 2020 · Sep 2017' },
  ];

  for (const [i, tr] of trainings.entries()) {
    await client.createOrReplace({
      _id: `training-${i + 1}`,
      _type: 'training',
      title: tr.title,
      organizer: tr.organizer,
      date: tr.date,
      order: i + 1,
    });
  }

  console.log('Seed complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
