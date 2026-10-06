// src/lib/data.ts - single source of truth from Mohammed Sabeel resume
export const PROFILE = {
  name: 'Mohammed Sabeel',
  initials: 'MS',
  firstName: 'Mohammed',
  lastName: 'Sabeel',
  role: 'Backend-focused Software Engineer',
  email: 'mohammedsabeel063@gmail.com',
  phone: '+91 8310881705',
  phoneHref: 'tel:+918310881705',
  location: 'Bengaluru, India',
  github: 'https://github.com/Mohammedsabeel063',
  linkedin: 'https://www.linkedin.com/in/mohammed-sabeel-8164292b7',
  resume: '/resume.pdf',
  resumeSummary:
    'Backend-focused Software Engineer skilled in building Python applications and REST APIs with Flask and FastAPI, backed by SQL databases (MySQL, PostgreSQL). Strong in database integration, query optimization, debugging, and object-oriented design. Experienced with Docker, Git, Linux, CI/CD, and Agile SDLC, plus data processing and machine learning in Python.',
  education: {
    degree: 'B.E., Computer Science (Data Science)',
    institution: 'Acharya Institute of Technology, Bengaluru',
    years: '2022 – 2026',
    cgpa: '7.2 / 10',
    graduationYear: '2026',
  },
} as const;

export const NAV = [
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Work',         href: '#work' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact',      href: '#contact' },
] as const;

export type SkillFamily = 'Languages'|'Backend'|'Databases'|'Data and ML'|'DevOps and Tools'|'Concepts';

export interface Skill {
  symbol: string; name: string; family: SkillFamily; atomicNo: number; projects?: string[];
}

export const SKILL_GROUPS: Skill[] = [
  { symbol:'Py', name:'Python',          family:'Languages',         atomicNo:1,  projects:['blog','aqua','fitness','mf'] },
  { symbol:'Sq', name:'SQL',             family:'Languages',         atomicNo:2,  projects:['aqua','blog'] },
  { symbol:'Ht', name:'HTML',            family:'Languages',         atomicNo:3,  projects:['mf'] },
  { symbol:'Cs', name:'CSS',             family:'Languages',         atomicNo:4,  projects:['mf'] },
  { symbol:'Fa', name:'FastAPI',         family:'Backend',           atomicNo:5,  projects:['blog'] },
  { symbol:'Fl', name:'Flask',           family:'Backend',           atomicNo:6,  projects:['blog'] },
  { symbol:'Ra', name:'REST APIs',       family:'Backend',           atomicNo:7,  projects:['blog','aqua'] },
  { symbol:'My', name:'MySQL',           family:'Databases',         atomicNo:8  },
  { symbol:'Pg', name:'PostgreSQL',      family:'Databases',         atomicNo:9,  projects:['blog','aqua'] },
  { symbol:'Sa', name:'SQLAlchemy',      family:'Databases',         atomicNo:10 },
  { symbol:'Pd', name:'Pandas',          family:'Data and ML',       atomicNo:11, projects:['aqua'] },
  { symbol:'Np', name:'NumPy',           family:'Data and ML',       atomicNo:12, projects:['aqua'] },
  { symbol:'Sk', name:'Scikit-learn',    family:'Data and ML',       atomicNo:13, projects:['aqua'] },
  { symbol:'Rf', name:'Random Forest',   family:'Data and ML',       atomicNo:14, projects:['aqua'] },
  { symbol:'Xb', name:'XGBoost',         family:'Data and ML',       atomicNo:15, projects:['aqua'] },
  { symbol:'Sm', name:'Streamlit',       family:'Data and ML',       atomicNo:16, projects:['aqua'] },
  { symbol:'Cv', name:'OpenCV',          family:'Data and ML',       atomicNo:17, projects:['fitness'] },
  { symbol:'Me', name:'MediaPipe',       family:'Data and ML',       atomicNo:18, projects:['fitness'] },
  { symbol:'Gt', name:'Git',             family:'DevOps and Tools',  atomicNo:19, projects:['blog','mf'] },
  { symbol:'Gh', name:'GitHub',          family:'DevOps and Tools',  atomicNo:20, projects:['blog','mf'] },
  { symbol:'Ci', name:'CI/CD',           family:'DevOps and Tools',  atomicNo:21, projects:['blog','mf'] },
  { symbol:'Dk', name:'Docker',          family:'DevOps and Tools',  atomicNo:22, projects:['blog'] },
  { symbol:'Po', name:'Postman',         family:'DevOps and Tools',  atomicNo:23 },
  { symbol:'Rd', name:'Render',          family:'DevOps and Tools',  atomicNo:24, projects:['blog'] },
  { symbol:'Vc', name:'Vercel',          family:'DevOps and Tools',  atomicNo:25, projects:['mf'] },
  { symbol:'Op', name:'OOP',             family:'Concepts',          atomicNo:26, projects:['fitness','blog'] },
  { symbol:'Ds', name:'Data Structures', family:'Concepts',          atomicNo:27 },
  { symbol:'Ag', name:'Agile SDLC',      family:'Concepts',          atomicNo:28, projects:['mf','aqua'] },
  { symbol:'Db', name:'Debugging',       family:'Concepts',          atomicNo:29, projects:['blog','mf'] },
  { symbol:'Qo', name:'Query Opt.',      family:'Concepts',          atomicNo:30, projects:['aqua'] },
];

export interface ExperienceItem {
  id: string; type: 'education'|'work'; title: string; place: string;
  period: string; year: string; detail?: string; bullets?: string[]; link?: string;
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id:'ait', type:'education',
    title:'B.E. Computer Science (Data Science)',
    place:'Acharya Institute of Technology, Bengaluru',
    period:'2022 – 2026', year:'2022', detail:'CGPA: 7.2 / 10',
    bullets:['CGPA: 7.2 / 10'],
  },
  {
    id:'freelance', type:'work',
    title:'Freelance Web Developer',
    place:'M&F Kitchen (Client Project, Remote)',
    period:'Nov 2025 – Dec 2025', year:'2025',
    link:'https://mandfkitchen.me/',
    bullets:[
      'Designed, developed, tested, and deployed a responsive full-stack business website end-to-end, running in production with zero downtime since launch.',
      'Configured GitHub Actions CI/CD pipelines to automate build and deployment, cutting release time by approximately 85%.',
      'Worked directly with the client to scope requirements and deliver a scalable solution that received stakeholder approval.',
    ],
  },
  {
    id:'aiimstc', type:'work',
    title:'Data Science & Machine Learning Intern',
    place:'AIIMS Technology Council (IIMSTC), Bengaluru',
    period:'Feb 2026 – May 2026', year:'2026',
    bullets:[
      'Built scalable Python ETL pipelines processing 50,000+ records using PostgreSQL query optimization and Pandas transformations to feed machine learning workflows.',
      'Developed backend workflows for data validation, normalization, and deduplication, delivering a fully automated 5-stage pipeline with reliable, production-grade data quality.',
      'Collaborated in Agile sprints on troubleshooting, testing, and technical documentation to improve delivery speed and reliability.',
    ],
  },
];

export interface Project {
  id: string; index: string; title: string; kicker: string; period: string;
  description: string; features: string[]; tech: string[]; github?: string; live?: string;
}

export const PROJECTS: Project[] = [
  {
    id:'blog', index:'01', title:'Python AI Blog Generator', kicker:'AI-powered content platform',
    period:'Jan 2026 – Feb 2026',
    description:'A scalable backend built with FastAPI and Flask using REST API architecture, JWT authentication, and modular clean code. Integrates external REST APIs with request validation and multilingual content generation, with automated deployment via GitHub Actions CI/CD on Render.',
    features:['FastAPI + Flask REST architecture','JWT authentication','Multilingual content generation','GitHub Actions CI/CD on Render'],
    tech:['Python','FastAPI','Flask','Docker','OpenAI API','GitHub Actions'],
    github:'https://github.com/Mohammedsabeel063/blog_project',
    live:'https://blog-project-hb0o.onrender.com/',
  },
  {
    id:'aqua', index:'02', title:'AquaIntel Analytics', kicker:'Water quality prediction app',
    period:'Mar 2026 – May 2026',
    description:'An end-to-end analytics application using Random Forest and XGBoost, achieving ~91% prediction accuracy. Features interactive dashboards with CSV/Excel upload, data visualization, and geospatial analysis across 50+ districts.',
    features:['~91% prediction accuracy (RF + XGBoost)','CSV/Excel upload and dashboards','Geospatial analysis across 50+ districts','Automated data validation pipelines'],
    tech:['Python','Streamlit','Scikit-learn','XGBoost','Pandas','NumPy'],
    github:'https://github.com/Mohammedsabeel063/AquaIntel-Analytics',
    live:'https://aquaintel-analytics-8iksg24xkhtxrnukxsktw7.streamlit.app',
  },
  {
    id:'fitness', index:'03', title:'Next Gen Fitness Tracker', kicker:'Real-time computer vision app',
    period:'Jul 2025 – Jan 2026',
    description:'A real-time computer vision app with OpenCV and MediaPipe, processing webcam streams at ~30 FPS for exercise detection. Implements pose estimation, automated rep counting, session logging, and voice feedback using modular object-oriented Python.',
    features:['~30 FPS real-time pose estimation','Automated rep counting','Session logging and voice feedback','Modular object-oriented Python'],
    tech:['Python','OpenCV','MediaPipe'],
    github:'https://github.com/Mohammedsabeel063/NEXT-GEN-FITNESS-TRACKER',
  },
  {
    id:'mf', index:'04', title:'M&F Kitchen Website', kicker:'Full-stack client business site',
    period:'Nov 2025 – Dec 2025',
    description:'Designed, developed, tested, and deployed a responsive full-stack business website end-to-end, running in production with zero downtime since launch. CI/CD pipeline cut release time by ~85%.',
    features:['End-to-end full-stack delivery','Zero downtime since launch','~85% reduction in release time via CI/CD','Stakeholder-approved design'],
    tech:['HTML','CSS','GitHub Actions','Vercel'],
    live:'https://mandfkitchen.me/',
  },
];

export interface Certification {
  id: string; index: string; title: string; issuer: string; year: string;
}

export const CERTIFICATIONS: Certification[] = [
  { id:'deloitte', index:'01', title:'Data Analytics Job Simulation',       issuer:'Deloitte (Forage)', year:'2025' },
  { id:'sql',      index:'02', title:'Working with Subqueries in SQL',       issuer:'Coursera',          year:'2025' },
  { id:'git',      index:'03', title:'Getting Started with Git and GitHub',  issuer:'Coursera',          year:'2025' },
];

export interface Achievement {
  id: string; index: string; platform: string; platformKey: string;
  label: string; caption: string; detail: string; bigNumber: string; numberSuffix?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id:'vtu',      index:'01', platform:'VTU Hackathon',      platformKey:'hackathon', label:'36-Hour VTU Hackathon',     caption:'Built and presented a working prototype in an Agile team',    detail:'Prototype delivered end-to-end within the time limit', bigNumber:'36',  numberSuffix:'hrs' },
  { id:'national', index:'02', platform:'National Hackathon', platformKey:'hackathon', label:'24-Hour National Hackathon', caption:'Delivered a Python prototype under deadline',                 detail:'Functional Python prototype shipped within 24 hours',   bigNumber:'24',  numberSuffix:'hrs' },
  { id:'pipeline', index:'03', platform:'AIIMSTC Internship', platformKey:'python',    label:'ETL Pipeline Scale',        caption:'AIIMS Technology Council (IIMSTC), Bengaluru',                detail:'Scalable Python ETL processing 50,000+ records',        bigNumber:'50k', numberSuffix:'+' },
  { id:'accuracy', index:'04', platform:'AquaIntel Analytics',platformKey:'ml',        label:'ML Model Accuracy',         caption:'Random Forest and XGBoost water quality prediction',          detail:'AquaIntel Analytics - 50+ districts analysed',          bigNumber:'91',  numberSuffix:'%' },
  { id:'fps',      index:'05', platform:'Fitness Tracker',   platformKey:'opencv',    label:'Real-time Pose Estimation', caption:'OpenCV + MediaPipe webcam processing',                        detail:'Next Gen Fitness Tracker project',                       bigNumber:'30',  numberSuffix:'FPS' },
  { id:'cicd',     index:'06', platform:'M&F Kitchen',       platformKey:'github',    label:'CI/CD Speed Gain',          caption:'GitHub Actions - M&F Kitchen client project',                 detail:'Release time cut by ~85% via automated pipeline',        bigNumber:'85',  numberSuffix:'%' },
];
