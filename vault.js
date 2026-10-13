/* Dash of Espresso — encrypted vault. No plaintext note content or password in source. */
(() => {
  "use strict";
  const FILE = "vault-data.enc.json";
  const FORMAT = "dash-of-espresso-vault-v1";
  const CATEGORIES = ["Grinder Settings", "Beans & Recommendations", "Secret Recipes", "Experiments", "Other Notes"];
  const ITERATIONS = 450000;
  const $ = (id) => document.getElementById(id);
  let vault = null;
  let passphrase = null;
  let editingId = null;
  let dirty = false;
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  function showOnly(name) {
    ["loadingView", "errorView", "loginView", "setupView", "workspace"].forEach(id => {$(id).hidden = id !== name;});
  }
  function message(id, text) { $(id).textContent = text; }
  function bytesTo64(bytes) {
    let s = ""; for (const byte of bytes) s += String.fromCharCode(byte);
    return btoa(s);
  }
  function from64(s) { const bin = atob(s); return Uint8Array.from(bin, c => c.charCodeAt(0)); }
  async function keyFromPassword(pw, salt, iterations) {
    const inputKey = await crypto.subtle.importKey("raw", encoder.encode(pw), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({name:"PBKDF2", hash:"SHA-256", salt, iterations:iterations}, inputKey, {name:"AES-GCM",length:256}, false, ["encrypt", "decrypt"]);
  }
  async function encryptData(data, pw) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await keyFromPassword(pw, salt, ITERATIONS);
    const clear = encoder.encode(JSON.stringify(data));
    const bytes = await crypto.subtle.encrypt({name:"AES-GCM",iv}, key, clear);
    return { format:FORMAT, version:1, kdf:"PBKDF2-SHA256", iterations:ITERATIONS, salt:bytesTo64(salt), cipher:"AES-256-GCM", iv:bytesTo64(iv), ciphertext:bytesTo64(new Uint8Array(bytes)), updatedAt:new Date().toISOString() };
  }
  async function decryptData(env, pw) {
    if (env.format !== FORMAT || env.cipher !== "AES-256-GCM" || env.kdf !== "PBKDF2-SHA256" || env.version !== 1 || !Number.isInteger(env.iterations) || env.iterations < 100000 || env.iterations > 10000000) {
      throw new Error("Unexpected vault data format.");
    }
    const salt=from64(env.salt), iv=from64(env.iv);
    if (salt.length !== 16 || iv.length !== 12) throw new Error("Invalid vault encryption parameters.");
    const key = await keyFromPassword(pw, salt, env.iterations);
    const clear = await crypto.subtle.decrypt({name:"AES-GCM",iv}, key, from64(env.ciphertext));
    const data=JSON.parse(decoder.decode(clear));
    if (!data || !Array.isArray(data.entries)) throw new Error("Invalid decrypted vault data.");
    return data;
  }
  function downloadEnvelope(envelope) {
    const blob = new Blob([JSON.stringify(envelope,null,2) + "\n"], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download=FILE; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
  async function exportVault() {
    if (!vault || !passphrase) throw new Error("Unlock the vault first.");
    const encrypted = await encryptData(vault,passphrase);
    downloadEnvelope(encrypted);
    dirty=false; updateDirty();
    toast("Encrypted file downloaded. Replace vault-data.enc.json in GitHub, then commit and push.");
  }
  function updateDirty() {
    $("dirtyStatus").textContent = dirty ? "● Unsaved / not yet published" : "Encrypted file downloaded or unchanged";
    $("dirtyStatus").style.color = dirty ? "#a34137" : "#4b7654";
  }
  function toast(t) {const n=$("toast"); n.textContent=t;n.hidden=false; clearTimeout(toast._timer);toast._timer=setTimeout(()=>n.hidden=true,5500);}
  function getStats() {
    $("stats").replaceChildren();
    const values = [{label:"Saved notes",value:vault.entries.length},{label:"Beans & settings",value:vault.entries.filter(e=>e.category===CATEGORIES[0]||e.category===CATEGORIES[1]).length},{label:"Secret recipes",value:vault.entries.filter(e=>e.category===CATEGORIES[2]).length}];
    for (const item of values) {const c=document.createElement("div");c.className="stat";const num=document.createElement("strong");num.textContent=item.value;const label=document.createElement("span");label.textContent=item.label;c.append(num,label);$("stats").append(c);}
  }
  function add(parent, tag, className, value) {const n=document.createElement(tag);if(className)n.className=className;if(value!=null)n.textContent=value;parent.append(n);return n;}
  function render() {
    getStats(); const list=$("entries");list.replaceChildren();
    const query=$("searchNotes").value.trim().toLowerCase(), category=$("categoryFilter").value;
    const matches=vault.entries.filter(e => (category==="All" || e.category===category) && [e.title,e.bean,e.grind,e.equipment,e.ratio,e.notes].join(" ").toLowerCase().includes(query));
    if (!matches.length) {add(list,"div","empty-state",vault.entries.length ? "No notes matched this search." : "Your vault is empty. Start with your grinder settings or your favorite coffee beans!");return;}
    for (const e of [...matches].reverse()) {
      const card=add(list,"article","entry");add(card,"span","tag",e.category);add(card,"h3","",e.title);
      const bits=[["Bean",e.bean],["Grinder",e.grind],["Method",e.equipment],["Ratio",e.ratio]].filter(x=>x[1]);
      if (bits.length) add(card,"div","details",bits.map(x=>x[0]+": "+x[1]).join("  ·  "));
      if(e.notes) add(card,"p","",e.notes);
      const acts=add(card,"div","actions");
      const edit=add(acts,"button","btn ghost compact","Edit");edit.type="button";edit.addEventListener("click",()=>editEntry(e.id));
      const del=add(acts,"button","btn ghost compact","Delete");del.type="button";del.addEventListener("click",()=>removeEntry(e.id));
    }
  }
  function editEntry(id) {
    const e=vault.entries.find(item=>item.id===id);
    if(!e)return;
    editingId=id;$("editorHeading").textContent="Edit private note";
    for (const [input,prop] of [["noteTitle","title"],["noteCategory","category"],["noteBean","bean"],["noteGrind","grind"],["noteEquipment","equipment"],["noteRatio","ratio"],["noteBody","notes"]]) $(input).value=e[prop] || "";
    $("editorPanel").hidden=false;$("editorPanel").scrollIntoView({behavior:"smooth",block:"start"});
  }
  function newEntry() {
    editingId=null;$("noteForm").reset();$("editorHeading").textContent="New private note";$("editorPanel").hidden=false;$("editorPanel").scrollIntoView({behavior:"smooth",block:"start"});
  }
  function removeEntry(id) {
    if (!confirm("Remove this private note? The removal takes effect once you export and publish the encrypted file."))return;
    vault.entries=vault.entries.filter(e=>e.id!==id);dirty=true;updateDirty();render();
  }
  function saveEntry(e) {
    e.preventDefault();
    const item={id:editingId || crypto.randomUUID(),title:$("noteTitle").value.trim(),category:$("noteCategory").value,bean:$("noteBean").value.trim(),grind:$("noteGrind").value.trim(),equipment:$("noteEquipment").value.trim(),ratio:$("noteRatio").value.trim(),notes:$("noteBody").value.trim(),updatedAt:new Date().toISOString()};
    if(!item.title){$("noteTitle").focus();return;}if(!CATEGORIES.includes(item.category)){toast("Invalid category");return;}
    const i=vault.entries.findIndex(x=>x.id===editingId);if(i>=0)vault.entries[i]=item;else vault.entries.push(item);
    $("editorPanel").hidden=true;editingId=null;dirty=true;updateDirty();render();toast("Note added to this session. Download encrypted file to save it for later.");
  }
  function lock() {
    if(dirty && !confirm("You have unpublished edits. Locking now will discard them. Continue?"))return;
    vault=null;passphrase=null;editingId=null;dirty=false;$("unlockPassword").value="";$("setupPassword").value="";$("confirmPassword").value="";$("noteForm").reset();$("editorPanel").hidden=true;location.reload();
  }
  async function setup(e) {
    e.preventDefault();const pw=$("setupPassword").value, pw2=$("confirmPassword").value;
    if(pw.length<14){message("setupMessage","Please use at least 14 characters.");return;}
    if(pw!==pw2){message("setupMessage","The passphrases don't match.");return;}
    $("setupBtn").disabled=true;message("setupMessage","Encrypting your new vault…");
    try {
      vault={schemaVersion:1,entries:[]};passphrase=pw;$("setupPassword").value="";$("confirmPassword").value="";
      await exportVault(); dirty=false;updateDirty();showOnly("workspace");render();
    } catch(err) {message("setupMessage","Could not create the vault. Try again in a secure browser."); console.error(err);}
    finally {$("setupBtn").disabled=false;}
  }
  async function unlock(e) {
    e.preventDefault();const pw=$("unlockPassword").value;
    $("unlockBtn").disabled=true;message("unlockMessage","Decrypting your notes…");
    try {
      const result=await fetch(FILE,{cache:"no-store"});
      if(!result.ok)throw new Error("Vault file unavailable. Status: "+result.status);
      const envelope=await result.json();
      if(envelope.status==="uninitialized")throw new Error("The published vault hasn't been initialized yet. Publish the downloaded encrypted file first.");
      const plain=await decryptData(envelope,pw);
      vault=plain;passphrase=pw;$("unlockPassword").value="";message("unlockMessage","");dirty=false;updateDirty();showOnly("workspace");render();
    } catch(err){message("unlockMessage",err.name==="OperationError" ? "Incorrect password (or the encrypted vault is damaged)." : err.message);}
    finally{$("unlockBtn").disabled=false;}
  }
  async function init() {
    if(!window.crypto?.subtle || !window.crypto.getRandomValues){showOnly("errorView");message("fatalMessage","This vault requires HTTPS and a browser with Web Crypto support.");return;}
    try {
      const response=await fetch(FILE,{cache:"no-store"});
      if(!response.ok)throw new Error("Vault file could not load (HTTP "+response.status+"). Check that vault-data.enc.json was uploaded to your GitHub repository.");
      const packet=await response.json();
      if(packet.status==="uninitialized"){showOnly("setupView");return;}
      if(packet.format!==FORMAT || typeof packet.ciphertext!=="string")throw new Error("Vault file has an unexpected format. Do not overwrite it; verify the deployed file.");
      showOnly("loginView");
    } catch(err) {showOnly("errorView");message("fatalMessage",err.message);}
  }
  $("retryBtn").addEventListener("click",()=>{showOnly("loadingView");init();});
  $("setupForm").addEventListener("submit",setup);
  $("unlockForm").addEventListener("submit",unlock);
  $("newNoteBtn").addEventListener("click",newEntry);
  $("cancelEditBtn").addEventListener("click",()=>{$("editorPanel").hidden=true;editingId=null;});
  $("noteForm").addEventListener("submit",saveEntry);
  $("lockBtn").addEventListener("click",lock);
  $("downloadBtn").addEventListener("click",async()=>{const btn=$("downloadBtn");btn.disabled=true;try{await exportVault();}catch(err){toast("Could not encrypt. Try again.");console.error(err);}finally{btn.disabled=false;}});
  $("searchNotes").addEventListener("input",()=>{if(vault)render();});
  $("categoryFilter").addEventListener("change",()=>{if(vault)render();});
  window.addEventListener("beforeunload",e=>{if(dirty){e.preventDefault();e.returnValue="";}});
  init();
})();
