/**
 * @file projects.js
 * @description Capa de Datos: Proyectos destacados, prácticas profesionales y reconocimientos.
 */

export const PROJECTS_DATA = [
  {
    id: 'alkywallet',
    title: 'AlkyWallet — Billetera Virtual Fullstack',
    badge: 'Práctica Intensiva',
    badgeColor: 'primary',
    icon: 'account_balance_wallet',
    iconColor: 'var(--color-primary)',
    description: 'Billetera virtual fullstack desarrollada colaborativamente durante 2 meses y medio en las prácticas intensivas junto a Alkemy y la Secretaría de Innovación de Río Negro. Implementación bajo marco ágil Scrum, simulación de entorno laboral real, transacciones seguras y arquitectura orientada a servicios.',
    tags: [
      { label: 'Full Stack', color: 'primary' },
      { label: 'Scrum Ágil', color: 'secondary' },
      { label: 'Alkemy & Río Negro', color: 'tertiary' },
      { label: 'REST APIs', color: 'variant' }
    ],
    metaLeft: { icon: 'group', iconColor: '#34d399', text: 'Trabajo en Equipo' },
    metaRight: { text: 'Finalizado con Éxito', dotColor: '#34d399' },
    repoUrl: 'https://github.com/LucianoColalunga',
    actionText: 'Repositorio GitHub'
  },
  {
    id: 'ecommerce-teclab',
    title: 'Ecommerce Fullstack — Teclab (290hs)',
    badge: '290 Horas',
    badgeColor: 'secondary',
    icon: 'shopping_bag',
    iconColor: 'var(--color-secondary)',
    description: 'Plataforma integral de comercio electrónico creada durante 290 horas de prácticas laborales profesionales en Teclab. Participación transversal de extremo a extremo: diseño en Figma, arquitectura del sistema, base de datos en PostgreSQL, desarrollo fullstack y testing QA riguroso.',
    tags: [
      { label: 'Figma UI/UX', color: 'pink' },
      { label: 'PostgreSQL', color: 'sky' },
      { label: 'Full Stack', color: 'primary' },
      { label: 'QA Testing', color: 'tertiary' }
    ],
    metaLeft: { icon: 'history_edu', iconColor: 'var(--color-secondary)', text: 'Práctica Profesionalizante' },
    metaRight: { text: '290 Horas Aprobadas', dotColor: '#22d3ee' },
    repoUrl: 'https://github.com/LucianoColalunga',
    actionText: 'Ver en GitHub'
  },
  {
    id: 'hackathon-energia',
    title: '🏆 2° Puesto Hackathon Secretaría de Energía',
    badge: '2° Puesto',
    badgeColor: 'amber',
    borderColor: 'border-amber',
    icon: 'emoji_events',
    iconColor: '#fbbf24',
    description: 'Solución tecnológica premiada en la competencia oficial de la Secretaría de Estado de Energía del Gobierno de Río Negro. Reconocimiento por diseño innovador, viabilidad técnica, arquitectura del producto y aporte a la eficiencia energética provincial.',
    tags: [
      { label: 'Hackathon Provincial', color: 'amber' },
      { label: 'Energía & Sustentabilidad', color: 'tertiary' },
      { label: 'Innovación Tecnológica', color: 'primary' }
    ],
    metaLeft: { icon: 'workspace_premium', iconColor: '#fbbf24', text: 'Secretaría de Energía RN' },
    metaRight: { text: 'Premio Provincial', isHighlight: true, textColor: '#fbbf24' },
    actionUrl: '#contacto',
    actionIcon: 'info',
    actionText: 'Consultar Detalles'
  },
  {
    id: 'aceleracion-tech',
    title: '🏆 Proyecto Ganador — Aceleración Tech',
    badge: 'Ganador',
    badgeColor: 'emerald',
    borderColor: 'border-emerald',
    icon: 'military_tech',
    iconColor: '#34d399',
    description: 'Proyecto consagrado como ganador en la presentación final frente a paneles evaluadores, empresas del ecosistema e inversores de aceleración técnica. Destacado por estándares de calidad, arquitectura limpia y solidez técnica integral.',
    tags: [
      { label: 'Aceleración Alkemy', color: 'emerald' },
      { label: 'Premio Final', color: 'primary' },
      { label: 'Pitch & Demo Técnica', color: 'secondary' }
    ],
    metaLeft: { icon: 'verified', iconColor: '#34d399', text: 'Reconocimiento por Jurado' },
    metaRight: { text: '1° Selección', isHighlight: true, textColor: '#34d399' },
    repoUrl: 'https://github.com/LucianoColalunga',
    actionText: 'Ver Proyectos GitHub'
  }
];
