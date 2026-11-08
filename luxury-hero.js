/* Gentle cinematic drift for the hero image. Other homepage functionality stays independent. */
(() => {
  "use strict";
  const image = document.querySelector(".luxury-visual-image");
  const hero = document.querySelector(".luxury-hero");
  if (!image || !hero || !window.matchMedia || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const scrollFraction = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height,1)));
      hero.style.setProperty("--scroll-shift", `${(scrollFraction * 17).toFixed(1)}px`);
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();
})();
