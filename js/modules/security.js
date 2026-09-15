/**
 * @file security.js
 * @description Capa de Seguridad Web: Sanitización de entradas, prevención de XSS,
 *              bloqueo de Spam Bots (Honeypot), Rate Limiting y auditoría de enlaces seguros.
 */

/**
 * Escapa caracteres peligrosos para prevenir inyección XSS (Cross-Site Scripting).
 * @param {string} input - Cadena de texto a sanitizar.
 * @returns {string} Cadena sanitizada y segura.
 */
export function sanitizeText(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Valida un formato de correo electrónico estándar de forma segura.
 * @param {string} email - Dirección de correo a validar.
 * @returns {boolean} True si el formato es válido.
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string' || email.length > 254) return false;
  // Regex segura compatible con RFC 5322 simplificado sin vulnerabilidad ReDoS
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Valida nombres evitando caracteres de inyección o strings desmedidos.
 * @param {string} name - Nombre completo.
 * @returns {boolean}
 */
export function isValidName(name) {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 100) return false;
  // Permite caracteres alfabéticos internacionales, espacios, puntos y guiones
  return /^[\p{L}\s.\-']+$/u.test(trimmed);
}

/**
 * Valida la longitud y estructura del mensaje.
 * @param {string} msg - Contenido del mensaje.
 * @returns {boolean}
 */
export function isValidMessage(msg) {
  if (!msg || typeof msg !== 'string') return false;
  const trimmed = msg.trim();
  return trimmed.length >= 10 && trimmed.length <= 3000;
}

/**
 * Verifica si un campo trampa (Honeypot) fue rellenado por un bot automático.
 * @param {HTMLInputElement|null} honeypotElement
 * @returns {boolean} True si es una sumisión de bot.
 */
export function detectBotSubmission(honeypotElement) {
  if (!honeypotElement) return false;
  return honeypotElement.value.trim().length > 0;
}

/**
 * Rate Limiter del lado del cliente para mitigar ataques de denegación o spam repetitivo.
 */
export class FormRateLimiter {
  constructor(cooldownSeconds = 30) {
    this.cooldownMs = cooldownSeconds * 1000;
    this.storageKey = 'portfolio_form_last_submission';
  }

  canSubmit() {
    const lastTime = localStorage.getItem(this.storageKey);
    if (!lastTime) return { allowed: true };

    const elapsed = Date.now() - parseInt(lastTime, 10);
    if (elapsed < this.cooldownMs) {
      const remainingSeconds = Math.ceil((this.cooldownMs - elapsed) / 1000);
      return {
        allowed: false,
        remainingSeconds
      };
    }
    return { allowed: true };
  }

  recordSubmission() {
    localStorage.setItem(this.storageKey, Date.now().toString());
  }
}

/**
 * Audita y fuerza programáticamente `rel="noopener noreferrer"` en todos los enlaces externos
 * para evitar ataques de Reverse Tabnabbing (manipulación de window.opener).
 */
export function enforceSecureExternalLinks() {
  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  externalLinks.forEach((link) => {
    const rel = (link.getAttribute('rel') || '').toLowerCase();
    const required = ['noopener', 'noreferrer'];
    const parts = new Set(rel.split(/\s+/).filter(Boolean));

    required.forEach((item) => parts.add(item));
    link.setAttribute('rel', Array.from(parts).join(' '));
  });
}
