/**
 * @file app.js
 * @description Orquestador principal de la aplicación: inicializa de forma modular
 *              todas las capas de seguridad, navegación, interactividad y datos.
 */

import { enforceSecureExternalLinks } from './modules/security.js';
import { initNavigation } from './modules/navigation.js';
import { initTechFilter } from './modules/tech-filter.js';
import { initClipboardTriggers } from './modules/clipboard.js';
import { initContactForm } from './modules/contact-form.js';
import { initAIAssistant } from './modules/ai-assistant.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Capa de Seguridad: Blindar enlaces externos contra reverse tabnabbing
  enforceSecureExternalLinks();

  // 2. Capa de Interacción: Inicializar navegación y scrollspy
  initNavigation();

  // 3. Capa de Lógica UI: Filtro reactivo del stack tecnológico
  initTechFilter();

  // 4. Capa de Utilidades: Copiado seguro al portapapeles
  initClipboardTriggers();

  // 5. Capa de Lógica UI: Validación segura y anti-bot del formulario
  initContactForm();

  // 6. Asistente IA flotante (Gemini Flash API)
  initAIAssistant();

  console.log('⚡ Portfolio de Luciano Colalunga cargado y asegurado con éxito.');
});
