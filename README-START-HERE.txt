DASH OF ESPRESSO — ALWAYS VISIBLE SUNSET VIDEO BUTTON FIX

What changed:
- Sunset Americano shows an always-visible "Watch how it's made" button BELOW View recipe / Choose + on desktop and mobile.
- Video plays in a popup on click, and stops when closed.
- Existing milk-and-sweetener options for Hot Cappuccino are preserved.
- No homepage, recipe data, barista portrait, or vault files are modified.

Install:
1. Extract this ZIP.
2. Open GitHub Desktop > Repository > Show in Explorer.
3. Copy app.js and video-player.css into the repository root (replace both if prompted).
4. Copy images/sunset-video-poster.jpg into images/ and videos/sunset-americano.mp4 into videos/.
   These folders must stay in the root of the website, next to app.js and index.html.
5. Commit "Make Sunset Americano video button always visible" and Push origin.
6. Wait for the new Cloudflare deployment. Hard-refresh with Ctrl+Shift+R on desktop;
   on phone, try a private/incognito tab if you still see the old JavaScript.
7. Find Sunset Americano. A Watch how it's made button should appear BELOW the other two actions.

If the button still does not appear:
- Open https://dash-of-espresso.pages.dev/app.js in your browser and search for "watch-video-inline".
- If it is absent, the newer app.js has not been deployed or an old cached file is being served.
- Open https://dash-of-espresso.pages.dev/videos/sunset-americano.mp4 to confirm the video is available.

Note: Uploaded video may contain copyrighted/licensed audio; only publish audio you have rights to use outside Instagram.
