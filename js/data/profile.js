/**
 * @file profile.js
 * @description Capa de Datos: Información del perfil, métricas de experiencia y canales de contacto.
 */

export const PROFILE_DATA = {
  name: 'Luciano Colalunga',
  role: 'Desarrollador Full Stack, QA & Arquitecto de Software',
  headline: 'Luciano Colalunga — Desarrollador Full Stack, QA & Arquitecto de Software',
  statusBadge: 'DISPONIBLE PARA PROYECTOS • FULL STACK & QA',
  summary: 'Especializado en el desarrollo de soluciones digitales orientadas a optimizar procesos y resolver necesidades reales de negocio.',
  email: 'colalunga.97@gmail.com',
  phone: '+54 9 2920 344637',
  whatsappUrl: 'https://wa.me/5492920344637',
  githubUrl: 'https://github.com/LucianoColalunga',
  linkedinUrl: 'https://www.linkedin.com/in/luciano-colalunga/',
  avatarUrl: './assets/luciano-perfil.jpg',
  logoUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UxAWpjcdg-SHEg3e0OYghhu-7Vpr_Cj-GDR_hyTPHHVNY7Ry4N5QXsP8up_gC6vJzZPKwQ3SDCj-Jh3mUuCkFXlbCfwHWEOIGaAtuES8RY60a-NGXCKNFCPwis11OEEcfXpCncz5S2xy6SPAj0SbFk7MlI47XntdzHg9Pd7l0c9Pai-coWAJTpg47S7nBAn6Zuc0q1R9i9uHzRqPL91O5zN4YHVYlcq_iqFepuQLJmiRSQE7EpZdB-',
  
  metrics: [
    {
      value: 'Desde 2023',
      label: 'Programando activamente',
      color: 'primary'
    },
    {
      value: '290+',
      unit: 'hrs',
      label: 'Prácticas laborales intensivas',
      color: 'secondary'
    },
    {
      value: '2x',
      icon: 'emoji_events',
      label: 'Proyectos ganadores & Hackathon',
      color: 'tertiary'
    },
    {
      value: '100%',
      label: 'QA Manual & Automation',
      color: 'emerald'
    }
  ],

  facets: [
    {
      title: 'Desarrollador Full Stack',
      icon: 'terminal',
      color: 'primary',
      description: 'Construcción integral de aplicaciones modernas de principio a fin utilizando React, Next.js, Node.js y ecosistema Java con Spring Boot. Código modular, tipado y performante.',
      techBadge: 'React · Next.js · Node.js · Spring Boot'
    },
    {
      title: 'Arquitecto de Software',
      icon: 'architecture',
      color: 'secondary',
      description: 'Diseño de arquitecturas de software sostenibles, separación en capas, microservicios, optimización de esquemas relacionales con PostgreSQL y patrones orientados a negocio.',
      techBadge: 'Clean Architecture · Microservicios · PostgreSQL'
    },
    {
      title: 'QA Manual & Automation',
      icon: 'fact_check',
      color: 'tertiary',
      description: 'Garantía de calidad sistemática. Planes de prueba manuales, reportes de bugs detallados y suites de pruebas automatizadas E2E y de integración utilizando Cypress avaladas por la UTN.',
      techBadge: 'Cypress · Testing E2E · Formación UTN'
    },
    {
      title: 'Diseño UI/UX con Figma',
      icon: 'palette',
      color: 'pink',
      description: 'Prototipado interactivo, sistemas de diseño coherentes y wireframes enfocados en la experiencia del usuario y accesibilidad, listos para una implementación técnica fluida.',
      techBadge: 'Figma · Wireframing · Design Systems'
    },
    {
      title: 'Ciberseguridad & Ciberdefensa',
      icon: 'shield',
      color: 'emerald',
      span: 2,
      description: 'Formación especializada en hacking ético, protección contra vulnerabilidades comunes (OWASP Top 10), aseguramiento de APIs mediante Spring Security y análisis de sistemas de ciberdefensa asistidos por Inteligencia Artificial.',
      techBadge: 'Hacking Ético · Spring Security · Ciberdefensa IA'
    }
  ]
};
