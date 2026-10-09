# Dash of Espresso — menu update (v2)

This is the updated, free Cloudflare Pages website for Sourav’s home café. It includes **six drinks** with custom illustrated SVG assets and recipe details. All espresso drinks use **one double shot from an espresso machine**.

## Menu now
- Fridge Cigarette — Diet Coke, espresso, vanilla cloud
- Classic Affogato — vanilla ice cream, espresso, cocoa
- Salted Caramel Affogato — vanilla ice cream, espresso, 20 g caramel sauce, pinch of salt
- Jamun Coffee Tonic — retained signature with double espresso instead of moka-pot brew
- Sunrise Americano — orange juice, soda water, espresso, orange garnish
- Dark Chocolate Peanut Butter Iced Latte — chocolate milk, peanut butter/honey espresso, honey cloud

No other sample drinks are present. Change `data/recipes.json` to edit measurements or add drinks. `app.js` now has an **Iced / Dessert / Signature / Fruity** filter and a simpler order form (recipe serving + a preference). Artwork is under `images/`.

## To update the existing GitHub + Cloudflare project

Recommended: use GitHub Desktop to clone your existing `dashofespresso` repository, copy the **contents** of this ZIP over the clone's working folder, delete old unused assets if you want, then **Commit to main** and **Push origin**. Cloudflare Pages redeploys the same URL automatically.

Do not upload a nested `dash-of-espresso-v2` folder into your repo; `index.html`, `data/`, and `images/` must be directly at repository root.

To run locally, open a terminal in the extracted project folder and execute `py -m http.server 5500`, then visit `http://localhost:5500`.

## Notes
- The user supplied drink measurements. Ice amount and final serving volume vary by glass, espresso yield, foam thickness, and displacement. Do not assume exact finished drink volume unless tested.
- The Jamun recipe uses 120–130 ml tonic as a close adjustment to the previous 110–130 ml moka version.
- One double shot is roughly 36–45 ml **only as an example**, not a required yield; use your machine's actual recipe.
- Peanut butter latte contains **peanuts and dairy**. Affogatos and vanilla-cloud Fridge Cigarette contain dairy.
- The order system has no backend. Configure `config.js` for WhatsApp/email; guests must press Send to deliver a request.
- Keep the website URL unchanged so your NFC tag continues to work.
