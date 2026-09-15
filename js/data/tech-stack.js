/**
 * @file tech-stack.js
 * @description Capa de Datos: Stack tecnológico categorizado y metadatos.
 */

export const TECH_CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'frontend', label: 'Frontend & UI/UX' },
  { id: 'backend', label: 'Backend & Java' },
  { id: 'db', label: 'Bases de Datos & Git' },
  { id: 'qa', label: 'Testing & QA' },
  { id: 'sec', label: 'Seguridad & IA' }
];

export const TECH_STACK = [
  /* Frontend */
  {
    category: 'frontend',
    title: 'Figma',
    desc: 'UI/UX & Prototipado',
    icon: 'design_services',
    iconColor: '#f472b6'
  },
  {
    category: 'frontend',
    title: 'HTML5 & CSS3',
    desc: 'Semántica & Estilos',
    icon: 'html',
    iconColor: '#fb923c'
  },
  {
    category: 'frontend',
    title: 'Tailwind CSS',
    desc: 'Utility-first Design',
    icon: 'palette',
    iconColor: '#2dd4bf'
  },
  {
    category: 'frontend',
    title: 'Bootstrap',
    desc: 'Responsive Layouts',
    icon: 'grid_view',
    iconColor: '#c084fc'
  },
  {
    category: 'frontend',
    title: 'JavaScript & TypeScript',
    desc: 'ES6+ & Strict Typing',
    icon: 'code',
    iconColor: '#fde047'
  },
  {
    category: 'frontend',
    title: 'React & Next.js',
    desc: 'SPA & SSR Moderno',
    icon: 'deployed_code',
    iconColor: '#22d3ee'
  },

  /* Backend */
  {
    category: 'backend',
    title: 'Java',
    desc: 'POO Robusta & Tipado',
    icon: 'coffee',
    iconColor: '#f87171'
  },
  {
    category: 'backend',
    title: 'Spring Framework & Boot',
    desc: 'REST APIs & Microservicios',
    icon: 'eco',
    iconColor: '#34d399'
  },
  {
    category: 'backend',
    title: 'Spring Security',
    desc: 'Auth JWT & Role Access',
    icon: 'lock',
    iconColor: '#818cf8'
  },
  {
    category: 'backend',
    title: 'Node.js',
    desc: 'Event-driven Server',
    icon: 'terminal',
    iconColor: '#4ade80'
  },

  /* Databases & DevOps */
  {
    category: 'db',
    title: 'PostgreSQL',
    desc: 'RDBMS · Modelado SQL',
    icon: 'database',
    iconColor: '#38bdf8'
  },
  {
    category: 'db',
    title: 'Git & GitHub',
    desc: 'Control de Versiones & CI',
    icon: 'account_tree',
    iconColor: '#f59e0b'
  },

  /* QA & Testing */
  {
    category: 'qa',
    title: 'Cypress',
    desc: 'E2E Automation Testing',
    icon: 'task_alt',
    iconColor: '#5eead4'
  },
  {
    category: 'qa',
    title: 'QA Manual & Automation',
    desc: 'Casos de Prueba & Regresión',
    icon: 'checklist',
    iconColor: '#4cd7f6'
  },

  /* Security & AI */
  {
    category: 'sec',
    title: 'Ciberseguridad & Hacking Ético',
    desc: 'Big School · Análisis OWASP',
    icon: 'security',
    iconColor: '#fb7185'
  },
  {
    category: 'sec',
    title: 'Ciberdefensa con IA',
    desc: 'Congreso CACIC',
    icon: 'smart_toy',
    iconColor: '#c084fc'
  },
  {
    category: 'sec',
    title: 'Power BI + IA',
    desc: 'Business Intelligence & Data',
    icon: 'analytics',
    iconColor: '#facc15'
  }
];
