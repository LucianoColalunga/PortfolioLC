/**
 * @file contact-form.js
 * @description Capa de Lógica UI: Validación segura de entradas, defensa Anti-Bot (Honeypot),
 *              Rate Limiting y feedback accesible.
 */

import {
  sanitizeText,
  isValidEmail,
  isValidName,
  isValidMessage,
  detectBotSubmission,
  FormRateLimiter
} from './security.js';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertSuccess = document.getElementById('form-success');
  const alertError = document.getElementById('form-error');
  const submitButton = document.getElementById('form-submit-btn');
  const honeypot = document.getElementById('hp-website-field');

  if (!form) return;

  const rateLimiter = new FormRateLimiter(30); // 30 segundos de cooldown entre envíos

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Ocultar alertas previas
    alertSuccess?.classList.add('visually-hidden');
    alertError?.classList.add('visually-hidden');

    // 2. Detección de Bots con campo Honeypot
    if (detectBotSubmission(honeypot)) {
      console.warn('Bot submission drop silently.');
      form.reset();
      alertSuccess?.classList.remove('visually-hidden');
      return;
    }

    // 3. Rate Limiter check
    const rateCheck = rateLimiter.canSubmit();
    if (!rateCheck.allowed) {
      showError(`Por favor espera ${rateCheck.remainingSeconds} segundos antes de enviar otro mensaje.`);
      return;
    }

    // 4. Extracción y sanitización de datos
    const nameInput = form.querySelector('input[name="nombre"]');
    const emailInput = form.querySelector('input[name="email"]');
    const subjectInput = form.querySelector('input[name="asunto"]');
    const messageInput = form.querySelector('textarea[name="mensaje"]');

    const rawName = nameInput?.value || '';
    const rawEmail = emailInput?.value || '';
    const rawSubject = subjectInput?.value || '';
    const rawMessage = messageInput?.value || '';

    // 5. Validaciones estrictas
    if (!isValidName(rawName)) {
      showError('Por favor ingresa un nombre válido (solo letras, de 2 a 100 caracteres).');
      nameInput?.focus();
      return;
    }

    if (!isValidEmail(rawEmail)) {
      showError('Por favor ingresa un correo electrónico válido (ejemplo: usuario@dominio.com).');
      emailInput?.focus();
      return;
    }

    if (rawSubject.trim().length < 3) {
      showError('Por favor especifica un asunto de al menos 3 caracteres.');
      subjectInput?.focus();
      return;
    }

    if (!isValidMessage(rawMessage)) {
      showError('El mensaje debe tener al menos 10 caracteres.');
      messageInput?.focus();
      return;
    }

    // 6. Preparar payload sanitizado
    const sanitizedPayload = {
      nombre: sanitizeText(rawName),
      email: sanitizeText(rawEmail),
      asunto: sanitizeText(rawSubject),
      mensaje: sanitizeText(rawMessage),
      timestamp: new Date().toISOString()
    };

    // 7. Simular envío seguro / Integrar endpoint
    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando mensaje...';
      }

      // Si se desea conectar a Formspree / API Backend, se puede hacer fetch aquí:
      // await fetch('https://formspree.io/f/TU_ID', { method: 'POST', body: JSON.stringify(sanitizedPayload) });

      // Simulación de respuesta segura de red
      await new Promise((resolve) => setTimeout(resolve, 800));

      rateLimiter.recordSubmission();
      form.reset();

      if (alertSuccess) {
        alertSuccess.classList.remove('visually-hidden');
      }
    } catch (err) {
      console.error('Error al procesar el envío:', err);
      showError('Ocurrió un error al enviar tu mensaje. Por favor intenta contactar por WhatsApp o email directo.');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = `
          <span class="material-symbols-outlined text-[18px]">send</span>
          <span>Enviar Mensaje a Luciano</span>
        `;
      }
    }
  });

  function showError(msg) {
    if (alertError) {
      const errorTextSpan = alertError.querySelector('.error-text');
      if (errorTextSpan) {
        errorTextSpan.textContent = msg;
      } else {
        alertError.textContent = msg;
      }
      alertError.classList.remove('visually-hidden');
    } else {
      alert(msg);
    }
  }
}
