/* Dash of Espresso — interactive coffee lab, self-contained, no network requests. */
(() => {
  'use strict';
  const stage = document.getElementById('brewLab');
  if (!stage) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const options = {
    espresso: { title: 'The double shot.', description: 'Freshly pulled. A little dramatic.' },
    sunset: { title: 'The sunset experiment.', description: 'Orange, cranberry, and a dramatic espresso finish.' },
    latte: { title: 'A cloud on top.', description: 'Caramel, cold milk, and a ridiculously good foam.' }
  };
  const buttons = [...stage.querySelectorAll('[data-brew]')];
  let resetTimer;
  function animatePour() {
    if (reduced.matches) return;
    stage.classList.remove('is-pouring');
    void stage.offsetWidth;
    stage.classList.add('is-pouring');
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => stage.classList.remove('is-pouring'), 2400);
  }
  function choose(flavour) {
    if (!options[flavour]) return;
    stage.dataset.flavour = flavour;
    document.getElementById('labDrinkName').textContent = options[flavour].title;
    document.getElementById('labDrinkDesc').textContent = options[flavour].description;
    buttons.forEach(button => {
      const active = button.dataset.brew === flavour;
      button.classList.toggle('is-current', active);
      button.setAttribute('aria-pressed', String(active));
    });
    animatePour();
  }
  buttons.forEach(button => button.addEventListener('click', () => choose(button.dataset.brew)));
  document.getElementById('pourAgain')?.addEventListener('click', animatePour);
  if (!reduced.matches) {
    // Start visible motion as soon as the page loads instead of waiting for scroll.
    requestAnimationFrame(() => requestAnimationFrame(animatePour));
  }
  let scheduled = false;
  function updateScroll() {
    scheduled = false;
    if (reduced.matches) return;
    const rect = stage.getBoundingClientRect();
    const range = Math.max(1, Math.min(window.innerHeight, 900));
    const shift = Math.max(-80, Math.min(75, -rect.top / range * 110));
    stage.style.setProperty('--labScroll', `${shift.toFixed(1)}px`);
    stage.style.setProperty('--labTilt', `${(shift * .012).toFixed(2)}deg`);
    const next = document.querySelector('.brew-interlude');
    if (next) {
      const top = next.getBoundingClientRect().top;
      const amount = Math.max(-26, Math.min(45,(window.innerHeight - top) * .10));
      next.style.setProperty('--interludeOffset', `${amount}px`);
    }
  }
  function onScroll() { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll, {passive:true});
  updateScroll();
  const buttonsMenu = document.querySelector('.lab-menu-link');
  buttonsMenu?.addEventListener('click', () => {
    // The existing menu code controls rendering and filtering; don't interfere with it.
  });
})();
