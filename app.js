/* Dash of Espresso — no dependencies, no database. */
(() => {
  "use strict";
  const $ = (sel, base = document) => base.querySelector(sel);
  const grid = $("#menuGrid");
  const filterArea = $("#categoryFilters");
  const searchInput = $("#searchInput");
  const config = window.COFFEE_BAR_CONFIG || {};
  const state = { drinks: [], category: "All", query: "", activeDrink: null };
  const categories = ["All", "Iced", "Hot", "Signature", "Fruity"];
  const imageFallback = "images/coffee-default.svg";

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = String(text);
    return node;
  };
  // With 3 arguments append plain text; with 4 use (parent, tag, CSS class, text).
  function appendText(parent, tag, textOrClass, textIfClass) {
    const node = textIfClass === undefined
      ? el(tag, "", textOrClass)
      : el(tag, textOrClass, textIfClass);
    parent.append(node);
    return node;
  }
  function createImage(src, name, cls) {
    const img = el("img", cls);
    img.src = src || imageFallback;
    img.alt = name;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", () => { if (!img.src.endsWith(imageFallback)) img.src = imageFallback; }, { once: true });
    return img;
  }
  function showDialog(dialog) { if (!dialog.open) dialog.showModal(); }
  function closeDialog(dialog) { if (dialog.open) dialog.close(); }

  function renderFilters() {
    filterArea.replaceChildren();
    categories.forEach(category => {
      const btn = el("button", "filter-btn" + (state.category === category ? " is-active" : ""), category);
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(state.category === category));
      btn.addEventListener("click", () => { state.category = category; renderFilters(); renderDrinks(); });
      filterArea.append(btn);
    });
  }
  function matchingDrinks() {
    return state.drinks.filter(drink => {
      const tagged = state.category === "All" || (drink.categories || []).includes(state.category);
      const searchable = [drink.name, drink.description, ...(drink.tags || [])].join(" ").toLowerCase();
      return tagged && searchable.includes(state.query);
    });
  }
  function renderDrinks() {
    grid.replaceChildren();
    const drinks = matchingDrinks();
    grid.setAttribute("aria-busy", "false");
    $("#resultsNote").textContent = `${drinks.length} drink${drinks.length === 1 ? "" : "s"} to discover`;
    if (!drinks.length) {
      const empty = el("div", "empty-state");
      appendText(empty, "h3", "No cups found.");
      appendText(empty, "p", "Try another category or search for something else.");
      grid.append(empty); return;
    }
    drinks.forEach((drink, index) => {
      const card = el("article", "drink-card");
      const photo = el("div", "drink-photo");
      photo.append(createImage(drink.image, `Coffee drink: ${drink.name}`, "drink-image"));
      if (drink.badge) photo.append(el("span", "drink-badge", drink.badge));
      card.append(photo);
      const info = el("div", "drink-info");
      appendText(info, "p", "drink-category", (drink.categories || ["Coffee"])[0].toUpperCase() + " · " + (drink.serve || "300 ml"));
      appendText(info, "h3", "drink-name", drink.name);
      appendText(info, "p", "drink-description", drink.description);
      const actions = el("div", "drink-actions");
      const recipeBtn = el("button", "recipe-button", "View recipe ↗"); recipeBtn.type="button";
      recipeBtn.setAttribute("aria-label", `View recipe for ${drink.name}`);
      recipeBtn.addEventListener("click", () => openRecipe(drink));
      const orderBtn = el("button", "order-button", "Choose +"); orderBtn.type="button";
      orderBtn.setAttribute("aria-label", `Choose ${drink.name}`);
      orderBtn.addEventListener("click", () => openOrder(drink));
      actions.append(recipeBtn, orderBtn); info.append(actions); card.append(info);
      card.style.setProperty("--index", Math.min(index, 8));
      grid.append(card);
    });
  }
  function openRecipe(drink) {
    const panel = $("#recipeContent"); panel.replaceChildren();
    panel.append(createImage(drink.image, `Coffee drink: ${drink.name}`, "recipe-cover"));
    appendText(panel, "p", "section-kicker", "INSIDE THE CUP · " + (drink.serve || "300 ml"));
    appendText(panel, "h2", "recipe-title", drink.name);
    appendText(panel, "p", "recipe-description", drink.description);
    const details = el("div", "recipe-highlights");
    [drink.brewMethod, drink.prepTime, drink.strength].filter(Boolean).forEach(item => appendText(details, "span", item));
    panel.append(details);
    appendText(panel, "h3", "recipe-subtitle", "What goes in");
    const ingList = el("ul", "recipe-list"); (drink.ingredients || []).forEach(item => appendText(ingList, "li", item)); panel.append(ingList);
    appendText(panel, "h3", "recipe-subtitle", "How to make it");
    const stepList = el("ol", "recipe-list recipe-steps"); (drink.steps || []).forEach(item => appendText(stepList, "li", item)); panel.append(stepList);
    appendText(panel, "p", "recipe-disclaimer", "Starter measurements for demonstration — adjust to match your tested recipe before publishing.");
    const button = el("button", "button button-dark recipe-order", "I'd love this one ↗");
    button.type = "button"; button.addEventListener("click", () => { closeDialog($("#recipeDialog")); openOrder(drink); });
    panel.append(button); showDialog($("#recipeDialog"));
  }
  function openOrder(drink) {
    state.activeDrink = drink;
    $("#orderDrinkName").textContent = drink.name;
    $("#orderForm").reset();
    $("#serving").value = drink.serve && ["250 ml", "300 ml", "325 ml"].includes(drink.serve) ? drink.serve : "300 ml";
    $("#orderFeedback").textContent = "";
    showDialog($("#orderDialog"));
  }
  function getOrderText() {
    const form = $("#orderForm");
    if (!form.reportValidity()) return null;
    const guest = $("#guestName").value.trim();
    if (!guest) { $("#guestName").focus(); return null; }
    const notes = $("#orderNotes").value.trim();
    return `☕ COFFEE REQUEST — ${config.cafeName || "Dash of Espresso"}\nName: ${guest}\nDrink: ${state.activeDrink.name}\nServing: ${$("#serving").value}\nSweetness: ${$("#sweetness").value}\nMilk: ${$("#milk").value}\n${notes ? `Note: ${notes}\n` : ""}Please let me know if you can make this!`;
  }
  function feedback(message) { $("#orderFeedback").textContent = message; }
  function initOrdering() {
    const wa = String(config.whatsappNumber || "").replace(/\D/g, "");
    const email = String(config.orderEmail || "").trim();
    $("#whatsappOrder").hidden = !wa;
    $("#emailOrder").hidden = !email;
    $("#shareOrder").hidden = !("share" in navigator);
    if (!wa && !email) $("#orderHint").textContent = "For now, copy or share the order. To receive requests directly, add your WhatsApp number or email to config.js.";
    $("#whatsappOrder").addEventListener("click", () => {
      const msg = getOrderText(); if (!msg || !wa) return;
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
      feedback("WhatsApp opened. Press Send there to deliver the request.");
    });
    $("#emailOrder").addEventListener("click", () => {
      const msg = getOrderText(); if (!msg || !email) return;
      window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Coffee request: " + state.activeDrink.name)}&body=${encodeURIComponent(msg)}`;
      feedback("Your email app should open. Press Send there to deliver the request.");
    });
    $("#shareOrder").addEventListener("click", async () => {
      const msg = getOrderText(); if (!msg) return;
      try { await navigator.share({title:"Coffee request", text:msg}); feedback("The share menu was opened. Send using your chosen app."); }
      catch (error) { if (error.name !== "AbortError") feedback("Sharing isn't available here. Try Copy order instead."); }
    });
    $("#copyOrder").addEventListener("click", async () => {
      const msg = getOrderText(); if (!msg) return;
      try { await navigator.clipboard.writeText(msg); feedback("Copied! Paste this into a message to your barista."); }
      catch (_) {
        const selection = el("textarea"); selection.value = msg; selection.style.position = "fixed"; selection.style.opacity = "0";
        document.body.append(selection); selection.select();
        const worked = document.execCommand("copy"); selection.remove();
        feedback(worked ? "Copied! Paste this into a message to your barista." : "Copy not supported here. Open the site over HTTPS and try again.");
      }
    });
  }
  async function boot() {
    document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", () => closeDialog(document.getElementById(button.dataset.close))));
    [$("#recipeDialog"), $("#orderDialog")].forEach(dialog => dialog.addEventListener("click", event => { if (event.target === dialog) closeDialog(dialog); }));
    searchInput.addEventListener("input", () => { state.query = searchInput.value.trim().toLowerCase(); renderDrinks(); });
    initOrdering(); renderFilters();
    try {
      const response = await fetch("data/recipes.json", {cache: "no-cache"});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const recipes = await response.json();
      if (!Array.isArray(recipes)) throw new Error("recipes.json must be an array");
      state.drinks = recipes;
      renderDrinks();
    } catch (error) {
      grid.setAttribute("aria-busy", "false"); grid.replaceChildren();
      const msg = el("div", "empty-state");
      appendText(msg, "h3", "The menu couldn't load.");
      appendText(msg, "p", "Run the site using a local web server (not by double-clicking index.html), or check data/recipes.json.");
      grid.append(msg);
      console.error("Unable to load recipes:", error);
    }
  }
  boot();
})();
