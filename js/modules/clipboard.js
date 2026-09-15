/**
 * @file clipboard.js
 * @description Capa de Utilidad: Copiado seguro al portapapeles con feedback accesible.
 */

/**
 * Copia texto de manera segura al portapapeles y provee retroalimentación visual accesible.
 * @param {string} text - Texto a copiar.
 * @param {HTMLElement} triggerButton - Botón que disparó la acción.
 * @param {string} successText - Texto a mostrar temporalmente.
 */
export async function copyToClipboard(text, triggerButton, successText = '¡Copiado!') {
  if (!text) return;

  const originalContent = triggerButton.textContent;
  let copiedSuccessfully = false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      copiedSuccessfully = true;
    } else {
      // Fallback seguro usando textarea temporal sin inyección
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      copiedSuccessfully = document.execCommand('copy');
      textArea.remove();
    }
  } catch (err) {
    console.warn('No se pudo acceder al portapapeles automáticamente:', err);
    copiedSuccessfully = false;
  }

  if (copiedSuccessfully && triggerButton) {
    triggerButton.textContent = successText;
    triggerButton.setAttribute('aria-live', 'polite');
    setTimeout(() => {
      triggerButton.textContent = originalContent;
    }, 2000);
  }
}

/**
 * Inicializa los disparadores de copiado del DOM de forma no intrusiva.
 */
export function initClipboardTriggers() {
  const copyButtons = document.querySelectorAll('[data-copy-target]');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = btn.getAttribute('data-copy-target');
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        const textToCopy = targetElement.textContent.trim();
        copyToClipboard(textToCopy, btn);
      }
    });
  });
}
