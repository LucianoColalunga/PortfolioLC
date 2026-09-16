/**
 * @file ai-assistant.js
 * @description Asistente IA flotante para el portfolio de Luciano Colalunga.
 *              Usa Gemini Flash API (Google AI Studio) para responder preguntas
 *              sobre el portfolio de forma contextualizada y natural.
 *
 * CONFIGURACIÓN: Reemplazá GEMINI_API_KEY con tu clave de Google AI Studio.
 * Generá tu clave gratis en: https://aistudio.google.com/app/apikey
 * Restringí la clave a tu dominio en Google Cloud Console para mayor seguridad.
 */

// ─── CONFIGURACIÓN ───────────────────────────────────────────────────────────

const GEMINI_API_KEY = 'AQ.Ab8RN6LXU-1bsG16Hhf27aPBUUztdtWFlpsFTC-J6Xow2brwvw'; // <-- Reemplazá con tu API key

const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `Sos el asistente virtual del portfolio de Luciano Colalunga.
Tu función es ayudar a los visitantes a conocer a Luciano y navegar su portfolio.
Respondé siempre en español, de forma amigable, concisa y profesional.
Nunca inventés información que no esté en este contexto. Si no sabés algo, decí que contacten a Luciano.

=== INFORMACIÓN DE LUCIANO COLALUNGA ===

**Rol:** Desarrollador Full Stack, QA & Arquitecto de Software
**Estado:** Disponible para proyectos Full Stack & QA
**Email:** colalunga.97@gmail.com
**Teléfono/WhatsApp:** +54 9 2920 344637
**GitHub:** https://github.com/LucianoColalunga
**LinkedIn:** https://www.linkedin.com/in/luciano-colalunga/
**CV Descargable:** Disponible en el botón "Descargar CV" del header o en la sección CV del portfolio.

**Experiencia:** Programando activamente desde 2023. +290 horas de prácticas laborales intensivas. 2 proyectos ganadores y Hackathon. Certificado en QA Manual & Automation.

**Habilidades principales:**
- Frontend: React, Next.js, JavaScript/TypeScript, HTML5, CSS3, Tailwind CSS, Bootstrap, Figma
- Backend: Java, Spring Boot, Spring Security (JWT), Node.js, REST APIs, Microservicios
- Bases de datos: PostgreSQL, modelado SQL
- QA: Cypress, Testing E2E, QA Manual & Automation (certificado UTN)
- Seguridad: Hacking Ético (OWASP), Spring Security, Ciberdefensa con IA
- DevOps: Git, GitHub, CI
- BI: Power BI + IA

**Proyectos destacados:**
1. AlkyWallet (https://alkywallet.com.ar/) — Billetera virtual fullstack desarrollada en equipo durante 2.5 meses junto a Alkemy y la Secretaría de Innovación de Río Negro. Scrum, transacciones seguras, REST APIs.
2. Ecommerce Fullstack Teclab (290hs) — Plataforma de ecommerce completa: Figma, PostgreSQL, fullstack y QA.
3. 2° Puesto Hackathon Secretaría de Energía de Río Negro — Solución premiada por innovación y optimización.
4. Proyecto Ganador Aceleración Tech Alkemy — Ganador frente a paneles de inversores. Reconocido por arquitectura limpia y calidad técnica.

**Certificaciones:**
- Diploma Técnico Superior en Programación — Teclab (Título Superior Oficial)
- QA Manual — UTN (Universidad Tecnológica Nacional)
- QA Avanzado y Automático — UTN
- Ciberseguridad y Hacking Ético — BIG SCHOOL
- Sistemas de Ciberdefensa con IA — Congreso CACIC
- Power BI + IA — Data Analytics & Visualización
- Práctica Profesionalizante Teclab (290hs)
- Práctica Alkemy & Gobierno de Río Negro

**Secciones del portfolio:**
- Inicio (Hero) — Presentación principal
- Sobre Mí — Perfil, competencias y facetas profesionales
- Tecnologías — Stack tecnológico con filtros por categoría
- Proyectos — Proyectos, prácticas y reconocimientos
- Certificados — Certificaciones y formación oficial
- CV — Banner para descargar el currículum
- Contacto — Canales de contacto y formulario

Si alguien pregunta cómo contactar a Luciano, mencioná WhatsApp, email y LinkedIn.
Si preguntan por el CV, deciles que pueden descargarlo desde el botón del header.
Si preguntan por proyectos, mencioná AlkyWallet con su URL.
Mantené respuestas cortas (máximo 4-5 oraciones). Usá emojis con moderación.`;

const QUICK_CHIPS = [
  { label: '📋 ¿Cuáles son tus skills?', query: '¿Cuáles son las principales tecnologías y habilidades de Luciano?' },
  { label: '🚀 Ver proyectos', query: '¿Cuáles son los proyectos destacados de Luciano?' },
  { label: '📄 ¿Dónde está el CV?', query: '¿Cómo puedo descargar el CV de Luciano?' },
  { label: '📞 Contactar', query: '¿Cómo puedo contactar a Luciano?' },
];

// ─── ESTADO ──────────────────────────────────────────────────────────────────

let isOpen = false;
let isLoading = false;
let chatHistory = [];

// ─── LLAMADA A LA API ─────────────────────────────────────────────────────────

async function askGemini(userMessage) {
  const contents = [
    ...chatHistory,
    { role: 'user', parts: [{ text: userMessage }] }
  ];

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: {
      maxOutputTokens: 300,
      temperature: 0.7,
    }
  };

  if (GEMINI_API_KEY === 'TU_API_KEY_AQUI') {
    // Modo demostración si no hay API key configurada
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "¡Hola! Por el momento estoy en modo de demostración porque no se configuró una API Key. Luciano es un excelente desarrollador Full Stack y QA, ¡no dudes en contactarlo por LinkedIn o WhatsApp!";
  }

  const response = await fetch(GEMINI_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  const data = await response.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!reply) throw new Error('No reply from API');

  // Guardar historial
  chatHistory.push({ role: 'user', parts: [{ text: userMessage }] });
  chatHistory.push({ role: 'model', parts: [{ text: reply }] });

  // Limitar historial a 10 turnos para no superar tokens
  if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

  return reply;
}

// ─── RENDERIZADO DEL DOM ──────────────────────────────────────────────────────

function createWidget() {
  const container = document.createElement('div');
  container.id = 'ai-assistant-widget';
  container.setAttribute('role', 'complementary');
  container.setAttribute('aria-label', 'Asistente IA del portfolio');

  container.innerHTML = `
    <!-- Burbuja flotante -->
    <button
      id="ai-bubble"
      class="ai-bubble"
      aria-haspopup="dialog"
      aria-expanded="false"
      title="Asistente IA — ¿Necesitás ayuda para navegar el portfolio?"
    >
      <span class="ai-bubble-icon ai-bubble-icon--chat" aria-hidden="true">
        <span class="material-symbols-outlined">smart_toy</span>
      </span>
      <span class="ai-bubble-icon ai-bubble-icon--close" aria-hidden="true" style="display:none;">
        <span class="material-symbols-outlined">close</span>
      </span>
      <span class="ai-bubble-ping" aria-hidden="true"></span>
    </button>

    <!-- Panel de chat -->
    <div
      id="ai-panel"
      class="ai-panel"
      role="dialog"
      aria-modal="false"
      aria-label="Chat con el asistente de portfolio"
      style="display:none;"
    >
      <!-- Header -->
      <div class="ai-panel-header">
        <div class="ai-header-info">
          <span class="ai-avatar">🤖</span>
          <div>
            <p class="ai-header-name">Asistente de Portfolio</p>
            <p class="ai-header-status">
              <span class="ai-status-dot"></span>
              <span>Disponible ahora</span>
            </p>
          </div>
        </div>
        <div style="display: flex; gap: 4px; align-items: center;">
          <button id="ai-clear-btn" class="ai-close-btn" aria-label="Reiniciar chat" title="Reiniciar chat">
            <span class="material-symbols-outlined" style="font-size:18px;">delete</span>
          </button>
          <button id="ai-close-btn" class="ai-close-btn" aria-label="Cerrar asistente" title="Cerrar asistente">
            <span class="material-symbols-outlined" style="font-size:18px;">close</span>
          </button>
        </div>
      </div>

      <!-- Mensajes -->
      <div id="ai-messages" class="ai-messages" role="log" aria-live="polite" aria-label="Historial de chat"></div>

      <!-- Chips de acceso rápido -->
      <div id="ai-chips" class="ai-chips"></div>

      <!-- Input -->
      <div class="ai-input-area">
        <input
          id="ai-input"
          type="text"
          class="ai-input"
          placeholder="Preguntame sobre el portfolio..."
          aria-label="Tu pregunta para el asistente"
          maxlength="300"
          autocomplete="off"
        />
        <button id="ai-send-btn" class="ai-send-btn" aria-label="Enviar mensaje" disabled>
          <span class="material-symbols-outlined" style="font-size:18px;">send</span>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(container);
}

function renderMessage(role, text) {
  const messagesEl = document.getElementById('ai-messages');
  const div = document.createElement('div');
  div.classList.add('ai-msg', role === 'user' ? 'ai-msg--user' : 'ai-msg--bot');

  // Convertir URLs a links y saltos de línea
  const sanitized = text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\n/g, '<br>');

  div.innerHTML = `<span class="ai-msg-content">${sanitized}</span>`;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function renderLoading() {
  const messagesEl = document.getElementById('ai-messages');
  const div = document.createElement('div');
  div.id = 'ai-loading-bubble';
  div.classList.add('ai-msg', 'ai-msg--bot', 'ai-msg--loading');
  div.innerHTML = `
    <span class="ai-msg-content">
      <span class="ai-dot"></span><span class="ai-dot"></span><span class="ai-dot"></span>
    </span>`;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function removeLoading() {
  document.getElementById('ai-loading-bubble')?.remove();
}

function renderChips() {
  const chipsEl = document.getElementById('ai-chips');
  chipsEl.innerHTML = '';
  QUICK_CHIPS.forEach(chip => {
    const btn = document.createElement('button');
    btn.className = 'ai-chip';
    btn.textContent = chip.label;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      sendMessage(chip.query, chip.label);
    });
    chipsEl.appendChild(btn);
  });
}

function hideChips() {
  const chipsEl = document.getElementById('ai-chips');
  if (chipsEl) chipsEl.style.display = 'none';
}

function clearChat() {
  chatHistory = [];
  const messagesEl = document.getElementById('ai-messages');
  messagesEl.innerHTML = '';
  renderMessage('bot', '¡Hola! 👋 Soy el asistente del portfolio de **Luciano**. Puedo ayudarte a conocer sus proyectos, habilidades, certificaciones y cómo contactarlo. ¿En qué te puedo ayudar?');
  
  const chipsEl = document.getElementById('ai-chips');
  if (chipsEl) {
    chipsEl.style.display = 'flex'; // O lo que use tu CSS por defecto
    renderChips();
  }
}

// ─── LÓGICA DE CHAT ───────────────────────────────────────────────────────────

async function sendMessage(query, displayText = null) {
  if (isLoading) return;
  const input = document.getElementById('ai-input');
  const sendBtn = document.getElementById('ai-send-btn');
  const msg = query || input.value.trim();
  if (!msg) return;

  hideChips();
  renderMessage('user', displayText || msg);
  input.value = '';
  sendBtn.disabled = true;

  isLoading = true;
  renderLoading();

  try {
    const reply = await askGemini(msg);
    removeLoading();
    renderMessage('bot', reply);
  } catch (err) {
    removeLoading();
    renderMessage('bot', '⚠️ Ocurrió un error al contactar al asistente. Por favor, intentá de nuevo en unos segundos.');
    console.error('[AI Assistant]', err);
  } finally {
    isLoading = false;
  }
}

function togglePanel() {
  const panel = document.getElementById('ai-panel');
  const bubble = document.getElementById('ai-bubble');
  const iconChat = bubble.querySelector('.ai-bubble-icon--chat');
  const iconClose = bubble.querySelector('.ai-bubble-icon--close');

  isOpen = !isOpen;
  bubble.setAttribute('aria-expanded', String(isOpen));

  if (isOpen) {
    panel.style.display = 'flex';
    // Pequeño delay para animación de entrada
    requestAnimationFrame(() => panel.classList.add('ai-panel--open'));
    iconChat.style.display = 'none';
    iconClose.style.display = 'flex';

    // Mostrar mensaje de bienvenida solo la primera vez
    const messagesEl = document.getElementById('ai-messages');
    if (messagesEl.children.length === 0) {
      renderMessage('bot', '¡Hola! 👋 Soy el asistente del portfolio de **Luciano**. Puedo ayudarte a conocer sus proyectos, habilidades, certificaciones y cómo contactarlo. ¿En qué te puedo ayudar?');
      renderChips();
    }

    document.getElementById('ai-input')?.focus();
  } else {
    panel.classList.remove('ai-panel--open');
    iconChat.style.display = 'flex';
    iconClose.style.display = 'none';
    setTimeout(() => { if (!isOpen) panel.style.display = 'none'; }, 250);
  }
}

// ─── INICIALIZACIÓN ───────────────────────────────────────────────────────────

export function initAIAssistant() {
  createWidget();

  // Eventos
  document.getElementById('ai-bubble').addEventListener('click', togglePanel);
  
  document.getElementById('ai-clear-btn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearChat();
  });

  document.getElementById('ai-close-btn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    togglePanel();
  });

  const input = document.getElementById('ai-input');
  const sendBtn = document.getElementById('ai-send-btn');

  input.addEventListener('input', () => {
    sendBtn.disabled = input.value.trim().length === 0;
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  sendBtn.addEventListener('click', () => sendMessage());

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) togglePanel();
  });
}
