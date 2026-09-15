/**
 * @file tech-filter.js
 * @description Capa de Lógica UI: Filtrado reactivo y accesible del stack tecnológico.
 */

/**
 * Inicializa los botones de filtrado de tecnologías.
 */
export function initTechFilter() {
  const filterButtons = document.querySelectorAll('.tech-filter-btn');
  const techCards = document.querySelectorAll('.tech-card');

  if (filterButtons.length === 0 || techCards.length === 0) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // 1. Actualizar estado de los botones
      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const selectedCat = btn.getAttribute('data-cat');

      // 2. Filtrar tarjetas con transición
      techCards.forEach((card) => {
        const cardCat = card.getAttribute('data-cat');
        if (selectedCat === 'all' || cardCat === selectedCat) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
