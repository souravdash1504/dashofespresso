/* Lightweight intersection-based reveals and decorative coffee animation. */
(() => {
  "use strict";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const fill = document.getElementById("scrollProgressFill");
  const stage = document.querySelector(".film-stage");
  const revealTargets = document.querySelectorAll(".motion-reveal, .section-heading, .intro-strip, .story-copy");
  const targets = [...new Set(revealTargets)];
  if (!reducedMotion.matches && "IntersectionObserver" in window) {
    targets.forEach(node => node.classList.add("motion-reveal", "motion-pending"));
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => {
        if (!isIntersecting) return;
        target.classList.add("is-visible");
        revealObserver.unobserve(target);
      });
    }, {threshold: 0.08, rootMargin:"0px 0px 50px 0px"});
    targets.forEach(node => revealObserver.observe(node));
    if (stage) {
      const playObserver = new IntersectionObserver(entries => {
        entries.forEach(({isIntersecting}) => {
          stage.classList.toggle("is-playing", isIntersecting && !reducedMotion.matches);
        });
      }, {threshold:.18});
      playObserver.observe(stage);
    }
  } else {
    targets.forEach(node => node.classList.add("is-visible"));
  }
  if (fill) {
    let scheduled = false;
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      fill.style.transform = `scaleX(${p})`;
      scheduled = false;
    };
    const queue = () => {if (!scheduled) {scheduled = true; requestAnimationFrame(update);}};
    window.addEventListener("scroll", queue, {passive:true});
    window.addEventListener("resize", queue, {passive:true});
    update();
  }
  reducedMotion.addEventListener?.("change", ({matches}) => {
    if (stage) stage.classList.toggle("is-playing", !matches && !!stage.getBoundingClientRect().height && stage.getBoundingClientRect().top < window.innerHeight && stage.getBoundingClientRect().bottom > 0);
    if (matches) targets.forEach(node => node.classList.add("is-visible"));
  });
})();
