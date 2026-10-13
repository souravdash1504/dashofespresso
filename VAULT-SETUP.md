# Dash of Espresso — Secret Recipe Vault

## What is protected?

The private recipe notes are stored in `vault-data.enc.json` **encrypted** with AES-256-GCM in your browser. The decryption key is derived from a passphrase with PBKDF2-SHA256 (450,000 rounds). Neither the passphrase nor plaintext notes are placed in the GitHub repository.

**Important limitation:** This is not a server-side login. Anyone can load the vault page and download the encrypted blob, but cannot reasonably read the notes without a strong passphrase. For stronger per-person access controls, add a separate authenticated backend or Cloudflare Access protection. Never put passwords, API keys or financial data here.

## Install without replacing your existing coffee menu

1. Extract `dash-of-espresso-vault-github-update.zip`.
2. Open GitHub Desktop → Repository → Show in Explorer.
3. Copy the extracted **files** to the root of your existing repo. Accept replacing only `index.html`; other files are new.
4. Commit changes and Push origin.
5. When the Cloudflare Pages deployment succeeds, open `https://dash-of-espresso.pages.dev/vault.html`.

## First-time initialization

1. Click the new secret vault link on your home page (in the footer, and in desktop navigation).
2. Choose a strong **unique** passphrase of at least 14 characters, preferably 4-5 random words, and save it in a password manager. There is no recovery if you forget it.
3. Press **Create encrypted vault**. Your browser downloads `vault-data.enc.json`.
4. Copy that file to the repo ROOT, replacing the placeholder `vault-data.enc.json`.
5. In GitHub Desktop: Commit → Push origin, and wait for Cloudflare deployment.
6. Reload `vault.html`. You now get the password prompt instead of setup.

## Add or edit secret notes

1. Unlock the live vault with your passphrase.
2. Click **+ Add a note**, select grinder settings / beans / secret recipes / experiments, enter your data, and save the note.
3. Click **Save & download encrypted file**. This downloads a fresh encrypted copy of all notes.
4. Replace `vault-data.enc.json` in your local Git repository with the **latest** downloaded version.
5. Commit and push. Wait for deployment. Now the notes are available (only after unlocking) on your other devices as well.

Until you download and commit the new file, your edits are only in the current browser tab's memory, so **do not close or refresh** with unsaved changes. Avoid editing simultaneously from two devices, since whichever encrypted file gets committed last wins.

## Privacy cautions

- A short/guessable password is vulnerable to offline guessing. Keep the passphrase strong and unique.
- The code and encrypted blob are on a publicly accessible site/repository; people can view the locked interface. Encrypted notes need the secret passphrase.
- If you publish the *plaintext* notes separately in your repo, encryption cannot undo that exposure.
- No password reset is possible without the original passphrase (unless you have another saved plaintext backup).
- The site is served over HTTPS by Cloudflare Pages; Web Crypto requires HTTPS (or localhost) in current browsers.
- `vault-data.enc.json` must live in the same root as `vault.html`.
- Your ordinary public drink menu is unchanged and continues to use `data/recipes.json`.
