# Dash of Espresso — free NFC coffee menu

A mobile-first, static HTML/CSS/JS coffee menu for Cloudflare Pages. No paid hosting, build tooling, login, database or account required for visitors.

## Project files

- `index.html`: page layout and native dialogs.
- `styles.css`: responsive layout, colours and fonts.
- `app.js`: menu filters, search, recipe dialogs, order sharing.
- `config.js`: **edit this** to turn on WhatsApp or email ordering.
- `data/recipes.json`: add or change drinks, recipes, categories and image file paths.
- `images/*.svg`: original, generated *illustration placeholders*, not photographs. Replace with your own coffee photos before public sharing if you want real photos.
- `make_illustrations.py`: optional artwork generator, **not required to host**.
- `run-local.bat`: optional Windows helper to run the local test server.

## Run locally (Windows)

1. Extract ZIP and open the folder in VS Code. You can also double-click `run-local.bat` if Python is installed.
2. Make sure Python is installed; in the VS Code Terminal run:
   `py -m http.server 5500` (or `python -m http.server 5500`).
3. Open `http://localhost:5500` in a browser.
4. Don't open `index.html` using `file://` since browsers may block JSON `fetch` requests locally. For a quick offline look without a local server, use the separate downloadable **standalone preview HTML**.
5. Press Ctrl+C in the terminal to stop the local server.

## Configure your ordering system

Edit `config.js`:

```js
window.COFFEE_BAR_CONFIG = {
  whatsappNumber: "919876543210", // example ONLY; replace with YOUR number
  orderEmail: "",                 // or enter your receiving email
  cafeName: "Dash of Espresso"
};
```

- A configured WhatsApp number activates **Send via WhatsApp** and opens a prefilled chat. The visitor has to press Send. Numbers entered here are **public**, so don't use a private number if you want to keep it private.
- A configured email activates **Send via email** via the visitor's email app. They must send the message; some visitors may not have a mail app configured.
- If neither is configured, visitors can still **Copy order** or use the phone's **Share order** sheet where supported. This does **not automatically notify you**.
- There's no backend or order storage in this version.

## Edit coffee recipes

Open `data/recipes.json`. Each object contains:

- `id`, `name`, `description`, `image`, `serve`, `badge`
- `categories`: at least one of `Iced`, `Hot`, `Signature`, `Fruity`
- `tags`: search keywords
- `brewMethod`, `prepTime`, `strength`
- `ingredients`: array of strings
- `steps`: array of strings

**All eight provided recipes are illustrative starting points**, not finalized or verified versions of your personal recipes. Confirm the ingredients, serving sizes, steps, and safety before you publish them.

To replace an image, add a JPG, PNG or WebP into `images/`, then change its `image` property, e.g. `"image":"images/my-vietnamese.webp"`. Optimized image sizes around 800–1200 pixels across (under ~250 KB per file where possible) work well.

To rename the bar in the future, update the title, header and footer in `index.html` and `cafeName` in `config.js`. In `styles.css`, adjust the CSS variables in `:root` to change colours.

## Deploy to Cloudflare Pages (recommended: Git integration for ongoing edits)

1. Create a GitHub repository and push the project **with `index.html` at the repository root** (the illustration generator is optional).
2. In [Cloudflare dashboard](https://dash.cloudflare.com/) open **Workers & Pages**, **Create application**, then select **Pages** (the location/wording may vary).
3. Choose **Connect to Git**, authorize GitHub, select your repository.
4. Configure the production branch to `main`, **Framework preset = None**, **Build command = empty (or `exit 0` if the form requires one)** and **Build output directory = `.`** (repository root), then deploy.
5. Cloudflare issues an HTTPS URL like `your-project.pages.dev`. Verify it on your phone.
6. On later edits, commit and push; the same URL is updated automatically.

**Alternative quick path:** choose **Direct Upload** and upload the contents of this project (or an archive with `index.html` at its root). Direct Upload requires redeploying after edits. Cloudflare does not support later converting that SAME Pages project between Direct Upload and Git integration. Create a new project if you switch workflows.

## NFC setup after the site is live

1. Open NFC Tools > Write > Add a record > URL/URI.
2. Paste the full HTTPS `https://your-project.pages.dev/` link.
3. Tap **Write** and hold your NTAG213 sticker to the phone.
4. Test with a separate iPhone and Android device if possible.
5. Keep the tag rewritable; updating your website does NOT require reprogramming the tag while its URL remains the same.

## Notes

- The fonts use Google Fonts online; system font fallbacks will display when unavailable.
- Accessible labels, input validation, image fallback and reduced-motion preferences are included.
- This is a demo personal home menu. The illustrations are original placeholders, and the recipes need your approval.
