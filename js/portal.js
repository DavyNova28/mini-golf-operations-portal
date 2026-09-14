(() => {
  "use strict";

  const VERSION_FALLBACK = {
    version: "0.1.6",
    build: "1.6",
    channel: "Development",
    status: "Development"
  };

  const STORAGE_KEYS = {
    favorites: "miniGolfPortal.favorites.v1",
    recent: "miniGolfPortal.recent.v1",
    activeProfile: "miniGolfPortal.activeProfile.v1"
  };

  const MAX_FAVORITES = 12;
  const MAX_RECENT = 8;
  const MAX_SEARCH_RESULTS = 12;

  const config = window.PORTAL_CONFIG || {};
  const $ = (id) => document.getElementById(id);
  const destinationIndex = new Map();
  let activeProfileId = null;
  let favorites = [];
  let recent = [];

  function isConfiguredUrl(url) {
    return typeof url === "string" && /^https?:\/\//i.test(url.trim());
  }

  function safeReadStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (_) {
      return fallback;
    }
  }

  function safeWriteStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      // The Portal remains fully usable if browser storage is unavailable.
    }
  }

  function safeRemoveStorage(key) {
    try {
      localStorage.removeItem(key);
    } catch (_) {
      // Ignore storage failures.
    }
  }

  function cleanStoredIds(ids, limit) {
    if (!Array.isArray(ids)) return [];
    const unique = [];
    ids.forEach((id) => {
      if (typeof id === "string" && destinationIndex.has(id) && !unique.includes(id)) unique.push(id);
    });
    return unique.slice(0, limit);
  }

  function applyLink(anchor, url, destinationId) {
    if (isConfiguredUrl(url)) {
      anchor.href = url.trim();
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.removeAttribute("aria-disabled");
      anchor.classList.remove("disabled");
      if (destinationId) {
        anchor.addEventListener("click", () => trackRecent(destinationId));
      }
      return true;
    }

    anchor.href = "#";
    anchor.classList.add("disabled");
    anchor.setAttribute("aria-disabled", "true");
    anchor.addEventListener("click", (event) => event.preventDefault());
    return false;
  }

  function buildDestinationIndex() {
    destinationIndex.clear();

    destinationIndex.set("dashboard:prod", {
      id: "dashboard:prod",
      icon: "🚀",
      label: "PROD Dashboard",
      detail: "Production · Live system",
      category: "Dashboard",
      url: config.dashboards?.prod || ""
    });
    destinationIndex.set("dashboard:dev", {
      id: "dashboard:dev",
      icon: "🛠️",
      label: "DEV Dashboard",
      detail: "Development · Testing & future builds",
      category: "Dashboard",
      url: config.dashboards?.dev || ""
    });

    (config.quickLinks || []).forEach((item) => {
      const id = `quick:${item.id || item.label}`;
      destinationIndex.set(id, {
        id,
        icon: item.icon || "🔗",
        label: item.label || "Quick Access",
        detail: item.detail || "System & data",
        category: "Quick Access",
        url: item.url || ""
      });
    });

    (config.profiles || []).forEach((profile) => {
      (profile.groups || []).forEach((group) => {
        (group.links || []).forEach((item) => {
          const id = `schedule:${profile.id}:${item.tab || item.label}`;
          destinationIndex.set(id, {
            id,
            icon: profile.icon || "📅",
            label: `${group.title || "Schedule"} · ${item.label || "Open"}`,
            detail: item.tab || "Google Sheet tab",
            category: profile.title || "Schedule Profile",
            profileId: profile.id,
            groupTitle: group.title || "Schedule",
            scheduleLabel: item.label || "Open",
            tab: item.tab || "",
            url: item.url || ""
          });
        });
      });
    });
  }

  function setupPrimaryLinks() {
    const prod = destinationIndex.get("dashboard:prod");
    const dev = destinationIndex.get("dashboard:dev");
    applyLink($("prodDashboardLink"), prod?.url || "", prod?.id);
    applyLink($("devDashboardLink"), dev?.url || "", dev?.id);
  }

  function renderProfiles() {
    const grid = $("profileGrid");
    grid.textContent = "";

    (config.profiles || []).forEach((profile) => {
      const total = (profile.groups || []).reduce((sum, group) => sum + (group.links || []).length, 0);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "profile-card";
      button.dataset.profileId = profile.id;
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", "profilePanel");
      button.innerHTML = `
        <span class="profile-icon" aria-hidden="true">${profile.icon || "📁"}</span>
        <strong>${escapeHtml(profile.title || "Profile")}</strong>
        <p>${escapeHtml(profile.description || "")}</p>
        <span class="profile-count">${total} Google Sheet tab${total === 1 ? "" : "s"}</span>
      `;
      button.addEventListener("click", () => toggleProfile(profile.id));
      grid.appendChild(button);
    });
  }

  function setActiveProfileCard(profileId) {
    document.querySelectorAll(".profile-card").forEach((card) => {
      const isActive = card.dataset.profileId === profileId;
      card.classList.toggle("active", isActive);
      card.setAttribute("aria-expanded", isActive ? "true" : "false");
    });
  }

  function animatePanelOpen(panel) {
    panel.getAnimations?.().forEach((animation) => animation.cancel());
    panel.hidden = false;
    if (prefersReducedMotion() || typeof panel.animate !== "function") return;
    panel.animate(
      [
        { opacity: 0, transform: "translateY(-8px) scaleY(.985)" },
        { opacity: 1, transform: "translateY(0) scaleY(1)" }
      ],
      { duration: 180, easing: "cubic-bezier(.2,.8,.2,1)" }
    );
  }

  function animatePanelClose(panel) {
    panel.getAnimations?.().forEach((animation) => animation.cancel());
    if (panel.hidden || prefersReducedMotion() || typeof panel.animate !== "function") {
      panel.hidden = true;
      return;
    }

    const animation = panel.animate(
      [
        { opacity: 1, transform: "translateY(0) scaleY(1)" },
        { opacity: 0, transform: "translateY(-6px) scaleY(.99)" }
      ],
      { duration: 130, easing: "ease-in" }
    );
    animation.addEventListener("finish", () => {
      if (activeProfileId === null) panel.hidden = true;
    }, { once: true });
  }

  function closeProfile() {
    activeProfileId = null;
    safeRemoveStorage(STORAGE_KEYS.activeProfile);
    setActiveProfileCard(null);
    animatePanelClose($("profilePanel"));
  }

  function toggleProfile(profileId) {
    if (activeProfileId === profileId && !$("profilePanel").hidden) {
      closeProfile();
      return;
    }

    openProfile(profileId);
  }

  function openProfile(profileId, options = {}) {
    const profile = (config.profiles || []).find((item) => item.id === profileId);
    if (!profile) return;

    const { scroll = true, persist = true } = options;
    activeProfileId = profileId;
    if (persist) safeWriteStorage(STORAGE_KEYS.activeProfile, profileId);
    setActiveProfileCard(profileId);

    $("profilePanelKicker").textContent = "SCHEDULE PROFILE";
    $("profilePanelTitle").textContent = profile.title || "Profile";
    $("profilePanelDescription").textContent = profile.description || "";

    const groupsHost = $("profileLinkGroups");
    groupsHost.textContent = "";

    (profile.groups || []).forEach((group) => {
      const section = document.createElement("section");
      section.className = "link-group";

      const heading = document.createElement("h4");
      heading.textContent = group.title || "Links";
      section.appendChild(heading);

      const list = document.createElement("div");
      list.className = "link-list";

      (group.links || []).forEach((item) => {
        const destinationId = `schedule:${profile.id}:${item.tab || item.label}`;
        const destination = destinationIndex.get(destinationId);
        const wrapper = document.createElement("div");
        wrapper.className = "destination-item";

        const anchor = document.createElement("a");
        anchor.className = "destination-link";
        anchor.innerHTML = `
          <span class="destination-copy">
            <span class="destination-label">${escapeHtml(item.label || "Open")}</span>
            <small class="tab-name">${escapeHtml(item.tab || "Google Sheet tab")}</small>
            <small class="link-status">Open Google Sheet</small>
          </span>
          <span class="arrow" aria-hidden="true">↗</span>
        `;
        const configured = applyLink(anchor, item.url || "", destinationId);
        if (!configured) {
          anchor.querySelector(".link-status").textContent = "Not configured";
          anchor.querySelector(".arrow").textContent = "—";
        }

        wrapper.appendChild(anchor);
        wrapper.appendChild(createFavoriteButton(destination?.id || destinationId, destination?.label || item.label || "destination"));
        list.appendChild(wrapper);
      });

      section.appendChild(list);
      groupsHost.appendChild(section);
    });

    const panel = $("profilePanel");
    animatePanelOpen(panel);
    syncFavoriteButtons();
    if (scroll) panel.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "nearest" });
  }

  function renderQuickLinks() {
    const grid = $("quickGrid");
    grid.textContent = "";

    (config.quickLinks || []).forEach((item) => {
      const destinationId = `quick:${item.id || item.label}`;
      const destination = destinationIndex.get(destinationId);
      const wrapper = document.createElement("div");
      wrapper.className = "quick-item";

      const anchor = document.createElement("a");
      anchor.className = "quick-card";
      anchor.innerHTML = `
        <span class="quick-icon" aria-hidden="true">${item.icon || "🔗"}</span>
        <strong>${escapeHtml(item.label || "Link")}</strong>
        <span>${escapeHtml(item.detail || "")}</span>
      `;
      const configured = applyLink(anchor, item.url || "", destinationId);
      if (!configured) anchor.querySelector("span:last-child").textContent = "Not configured";

      wrapper.appendChild(anchor);
      wrapper.appendChild(createFavoriteButton(destination?.id || destinationId, destination?.label || item.label || "destination"));
      grid.appendChild(wrapper);
    });
  }

  function createFavoriteButton(destinationId, label) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "favorite-button";
    button.dataset.favoriteId = destinationId;
    button.setAttribute("aria-label", `Add ${label} to favorites`);
    button.setAttribute("aria-pressed", "false");
    button.title = "Add to favorites";
    button.textContent = "☆";
    button.addEventListener("click", () => toggleFavorite(destinationId));
    return button;
  }

  function toggleFavorite(destinationId) {
    if (!destinationIndex.has(destinationId)) return;
    if (favorites.includes(destinationId)) {
      favorites = favorites.filter((id) => id !== destinationId);
    } else {
      favorites = [destinationId, ...favorites.filter((id) => id !== destinationId)].slice(0, MAX_FAVORITES);
    }
    safeWriteStorage(STORAGE_KEYS.favorites, favorites);
    renderFavorites();
    syncFavoriteButtons();
    renderSearchResults($("portalSearch").value);
  }

  function syncFavoriteButtons() {
    document.querySelectorAll("[data-favorite-id]").forEach((button) => {
      const isFavorite = favorites.includes(button.dataset.favoriteId);
      const destination = destinationIndex.get(button.dataset.favoriteId);
      const label = destination?.label || "destination";
      button.setAttribute("aria-pressed", isFavorite ? "true" : "false");
      button.setAttribute("aria-label", `${isFavorite ? "Remove" : "Add"} ${label} ${isFavorite ? "from" : "to"} favorites`);
      button.title = isFavorite ? "Remove from favorites" : "Add to favorites";
      button.textContent = isFavorite ? "★" : "☆";
    });
  }

  function trackRecent(destinationId) {
    if (!destinationIndex.has(destinationId)) return;
    recent = [destinationId, ...recent.filter((id) => id !== destinationId)].slice(0, MAX_RECENT);
    safeWriteStorage(STORAGE_KEYS.recent, recent);
    renderRecent();
  }

  function renderFavorites() {
    favorites = cleanStoredIds(favorites, MAX_FAVORITES);
    safeWriteStorage(STORAGE_KEYS.favorites, favorites);
    renderShortcutList($("favoritesList"), favorites, true);
    $("favoriteCount").textContent = String(favorites.length);
    $("favoritesEmpty").hidden = favorites.length > 0;
  }

  function renderRecent() {
    recent = cleanStoredIds(recent, MAX_RECENT);
    safeWriteStorage(STORAGE_KEYS.recent, recent);
    renderShortcutList($("recentList"), recent, false);
    $("recentEmpty").hidden = recent.length > 0;
    $("clearRecent").hidden = recent.length === 0;
  }

  function renderShortcutList(host, ids, favoriteMode) {
    host.textContent = "";
    ids.forEach((id) => {
      const destination = destinationIndex.get(id);
      if (!destination) return;

      const row = document.createElement("div");
      row.className = "shortcut-item";
      const anchor = createCompactDestinationLink(destination, "shortcut-link");
      row.appendChild(anchor);
      row.appendChild(createFavoriteButton(destination.id, destination.label));
      host.appendChild(row);
    });
    if (favoriteMode) syncFavoriteButtons();
  }

  function createCompactDestinationLink(destination, className) {
    const anchor = document.createElement("a");
    anchor.className = className;
    anchor.innerHTML = `
      <span class="result-icon" aria-hidden="true">${destination.icon || "🔗"}</span>
      <span class="result-copy">
        <strong>${escapeHtml(destination.label)}</strong>
        <small>${escapeHtml(`${destination.category} · ${destination.detail}`)}</small>
      </span>
    `;
    applyLink(anchor, destination.url || "", destination.id);
    return anchor;
  }

  function normalizeSearch(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function getSearchResults(query) {
    const normalized = normalizeSearch(query);
    if (!normalized) return [];
    const tokens = normalized.split(/\s+/).filter(Boolean);

    return [...destinationIndex.values()]
      .filter((destination) => isConfiguredUrl(destination.url))
      .map((destination) => {
        const haystack = normalizeSearch([
          destination.label,
          destination.detail,
          destination.category,
          destination.groupTitle,
          destination.scheduleLabel,
          destination.tab,
          destination.profileId
        ].filter(Boolean).join(" "));
        const matches = tokens.every((token) => haystack.includes(token));
        if (!matches) return null;
        let score = 0;
        const label = normalizeSearch(destination.label);
        const detail = normalizeSearch(destination.detail);
        if (label === normalized || detail === normalized) score += 100;
        if (label.startsWith(normalized) || detail.startsWith(normalized)) score += 35;
        tokens.forEach((token) => {
          if (label.includes(token)) score += 8;
          if (detail.includes(token)) score += 6;
        });
        return { destination, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || a.destination.label.localeCompare(b.destination.label))
      .slice(0, MAX_SEARCH_RESULTS)
      .map((entry) => entry.destination);
  }

  function renderSearchResults(query) {
    const host = $("searchResults");
    const clearButton = $("clearSearch");
    const input = $("portalSearch");
    const normalized = normalizeSearch(query);

    clearButton.hidden = !query;
    if (!normalized) {
      host.hidden = true;
      host.textContent = "";
      input.setAttribute("aria-expanded", "false");
      return;
    }

    const results = getSearchResults(query);
    host.textContent = "";
    host.hidden = false;
    input.setAttribute("aria-expanded", "true");

    if (!results.length) {
      const empty = document.createElement("p");
      empty.className = "search-empty";
      empty.textContent = `No Portal destination matched “${query.trim()}”.`;
      host.appendChild(empty);
      return;
    }

    const summary = document.createElement("div");
    summary.className = "search-summary";
    summary.textContent = `${results.length} result${results.length === 1 ? "" : "s"}${results.length === MAX_SEARCH_RESULTS ? " shown" : ""}`;
    host.appendChild(summary);

    results.forEach((destination) => {
      const row = document.createElement("div");
      row.className = "search-result";
      row.appendChild(createCompactDestinationLink(destination, "search-result-link"));
      row.appendChild(createFavoriteButton(destination.id, destination.label));
      host.appendChild(row);
    });

    syncFavoriteButtons();
  }

  function setupSearch() {
    const input = $("portalSearch");
    input.addEventListener("input", () => renderSearchResults(input.value));
    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        input.value = "";
        renderSearchResults("");
        input.blur();
      }
    });

    $("clearSearch").addEventListener("click", () => {
      input.value = "";
      renderSearchResults("");
      input.focus();
    });

    document.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  function restoreBrowserState() {
    favorites = cleanStoredIds(safeReadStorage(STORAGE_KEYS.favorites, []), MAX_FAVORITES);
    recent = cleanStoredIds(safeReadStorage(STORAGE_KEYS.recent, []), MAX_RECENT);
    renderFavorites();
    renderRecent();
    syncFavoriteButtons();

    const storedProfile = safeReadStorage(STORAGE_KEYS.activeProfile, null);
    if (typeof storedProfile === "string" && (config.profiles || []).some((profile) => profile.id === storedProfile)) {
      openProfile(storedProfile, { scroll: false, persist: false });
    }
  }

  function clearRecent() {
    recent = [];
    safeRemoveStorage(STORAGE_KEYS.recent);
    renderRecent();
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function isStandaloneMode() {
    return Boolean(
      window.matchMedia?.("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  }

  function isIosLikeDevice() {
    const userAgent = navigator.userAgent || "";
    const platform = navigator.platform || "";
    return /iPad|iPhone|iPod/i.test(userAgent) || (platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }

  function setupInstallExperience() {
    const installButton = $("installPortal");
    const installTip = $("installTip");
    const closeTip = $("installTipClose");
    if (!installButton || !installTip || !closeTip) return;

    let deferredInstallPrompt = null;

    const hideInstallUi = () => {
      installButton.hidden = true;
      installTip.hidden = true;
      deferredInstallPrompt = null;
    };

    if (isStandaloneMode()) {
      hideInstallUi();
      return;
    }

    if (isIosLikeDevice()) {
      installButton.hidden = false;
      installButton.textContent = "Add to Home Screen";
    }

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      deferredInstallPrompt = event;
      installButton.hidden = false;
      installButton.textContent = "Install Portal";
      installTip.hidden = true;
    });

    installButton.addEventListener("click", async () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        try {
          const choice = await deferredInstallPrompt.userChoice;
          if (choice?.outcome === "accepted") hideInstallUi();
          else deferredInstallPrompt = null;
        } catch (_) {
          deferredInstallPrompt = null;
        }
        return;
      }

      installTip.hidden = !installTip.hidden;
      if (!installTip.hidden) closeTip.focus({ preventScroll: true });
    });

    closeTip.addEventListener("click", () => {
      installTip.hidden = true;
      installButton.focus({ preventScroll: true });
    });

    window.addEventListener("appinstalled", hideInstallUi);
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator) || !window.isSecureContext) return;

    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js", { scope: "./" })
        .then((registration) => registration.update())
        .catch(() => {
          // Installation/offline support is optional; Portal navigation still works without it.
        });
    }, { once: true });
  }

  async function loadVersion() {
    let data = VERSION_FALLBACK;
    try {
      const response = await fetch(`version.json?ts=${Date.now()}`, { cache: "no-store" });
      if (response.ok) data = { ...VERSION_FALLBACK, ...(await response.json()) };
    } catch (_) {
      // Static fallback remains visible if version.json is temporarily unavailable.
    }

    const versionText = `v${data.version} · Build ${data.build}`;
    $("versionBadge").textContent = versionText;
    $("channelBadge").textContent = data.channel || data.status || "Development";
    $("footerVersion").textContent = `${versionText} · ${data.status || data.channel || "Development"}`;
  }

  function init() {
    buildDestinationIndex();
    setupPrimaryLinks();
    renderProfiles();
    renderQuickLinks();
    setupSearch();
    setupInstallExperience();
    registerServiceWorker();
    loadVersion();

    $("closeProfilePanel").addEventListener("click", closeProfile);
    $("clearRecent").addEventListener("click", clearRecent);

    restoreBrowserState();
  }

  init();
})();
