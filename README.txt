DASH OF ESPRESSO — SUNSET AMERICANO VIDEO UPDATE

This ZIP adds a “Watch how it’s made” button to Sunset Americano.
It uses your uploaded 47-second video, compressed from 28 MB to about 2.9 MB.

FILES TO COPY TO THE ROOT OF YOUR EXISTING GITHUB REPOSITORY:
  app.js                         <- REPLACE existing app.js
  video-player.css               <- NEW file
  videos/sunset-americano.mp4    <- NEW file
  images/sunset-video-poster.jpg <- NEW file

INSTRUCTIONS
1. In GitHub Desktop, Repository > Show in Explorer/Finder.
2. Copy these files and folders into your EXISTING repository, preserving folder paths.
3. Approve replacing only app.js. Do NOT remove other files or folders.
4. Commit and push. Cloudflare Pages will deploy the update to your existing URL.
5. Open Sunset Americano on desktop or phone; click Watch how it’s made.
6. Open Hot Cappuccino > Choose + and verify milk and sweetener choices still appear.

IMPORTANT
- The button appears on hover/focus on desktop; always visible on touch devices.
- Video is not fetched until someone explicitly clicks Play.
- The player has sound controls, close button, Escape support, and stops when closed.
- No change is needed to data/recipes.json, index.html, your hero, portrait, or vault.
- This app.js is based on the previously supplied Hot Cappuccino milk-options version.
- If you added NEW unrelated custom JavaScript to app.js after that version,
  review the change before replacing it to avoid losing those edits.
- Check the soundtrack's reuse rights before publishing to a public website;
  music licensed solely for Instagram may not be licensed for external websites.
