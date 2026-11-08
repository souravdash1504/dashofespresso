# Dash of Espresso — animated homepage update

This is a **four-file patch**, not a complete website. It leaves `app.js`, `data/recipes.json`, `config.js`, `vault.html`, `vault.js`, and `vault-data.enc.json` unchanged.

## Install
1. Extract this ZIP.
2. Open your existing GitHub repository folder in Explorer from GitHub Desktop.
3. Copy `index.html`, `motion.css`, and `motion.js` into the root of your repository, overwriting `index.html` only.
4. **Leave `styles.css` unchanged.** The new motion styling is isolated in `motion.css`.
5. Commit and Push origin. Cloudflare Pages will redeploy your existing URL.

## Added
- Animated first impression and scroll-progress indicator.
- Scroll-reveal effects, soft card hover motion.
- A self-contained animated SVG espresso-pouring scene (no video hosting, extra assets, or audio).
- Rewritten Meet the Barista section, with an elegant `S.` image placeholder. Replace with a portrait later.
- Respects `prefers-reduced-motion`; animated scene pauses when offscreen.

## Notes
- If `images/` or `data/recipes.json` are missing from your clone, the existing menu will not load. This patch does not change or replace these folders.
- Test on an iPhone/Android as well as desktop before publishing widely.
