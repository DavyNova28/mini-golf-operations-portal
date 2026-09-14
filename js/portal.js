(() => {
  "use strict";

  const VERSION_FALLBACK = {
    version: "0.1.0",
    build: "1",
    channel: "Development",
    status: "Development"
  };

  const config = window.PORTAL_CONFIG || {};
  const $ = (id) => document.getElementById(id);

  function isConfiguredUrl(url) {
    return typeof url === "string" && /^https?:\/\//i.test(url.trim());
  }

  function applyLink(anchor, url) {
    if (isConfiguredUrl(url)) {
      anchor.href = url.trim();
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.removeAttribute("aria-disabled");
      anchor.classList.remove("disabled");
      return true;
    }

    anchor.href = "#";
    anchor.classList.add("disabled");
    anchor.setAttribute("aria-disabled", "true");
    anchor.addEventListener("click", (event) => event.preventDefault());
    return false;
  }

  function setupPrimaryLinks() {
    const prod = $("prodDashboardLink");
    const dev = $("devDashboardLink");
    applyLink(prod, config.dashboards?.prod || "");
    applyLink(dev, config.dashboards?.dev || "");
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
      button.innerHTML = `
        <span class="profile-icon" aria-hidden="true">${profile.icon || "📁"}</span>
        <strong>${escapeHtml(profile.title || "Profile")}</strong>
        <p>${escapeHtml(profile.description || "")}</p>
        <span class="profile-count">${total} destination${total === 1 ? "" : "s"}</span>
      `;
      button.addEventListener("click", () => openProfile(profile.id));
      grid.appendChild(button);
    });
  }

  function openProfile(profileId) {
    const profile = (config.profiles || []).find((item) => item.id === profileId);
    if (!profile) return;

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
        const anchor = document.createElement("a");
        anchor.className = "destination-link";
        anchor.innerHTML = `
          <span>
            ${escapeHtml(item.label || "Open")}
            <small>${escapeHtml(item.detail || "")}</small>
          </span>
          <span class="arrow" aria-hidden="true">↗</span>
        `;
        const configured = applyLink(anchor, item.url || "");
        if (!configured) {
          anchor.querySelector("small").textContent = "Not configured";
          anchor.querySelector(".arrow").textContent = "—";
        }
        list.appendChild(anchor);
      });

      section.appendChild(list);
      groupsHost.appendChild(section);
    });

    const panel = $("profilePanel");
    panel.hidden = false;
    panel.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "nearest" });
  }

  function renderQuickLinks() {
    const grid = $("quickGrid");
    grid.textContent = "";

    (config.quickLinks || []).forEach((item) => {
      const anchor = document.createElement("a");
      anchor.className = "quick-card";
      anchor.innerHTML = `
        <span class="quick-icon" aria-hidden="true">${item.icon || "🔗"}</span>
        <strong>${escapeHtml(item.label || "Link")}</strong>
        <span>${escapeHtml(item.detail || "")}</span>
      `;
      const configured = applyLink(anchor, item.url || "");
      if (!configured) anchor.querySelector("span:last-child").textContent = "Not configured";
      grid.appendChild(anchor);
    });
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
    setupPrimaryLinks();
    renderProfiles();
    renderQuickLinks();
    loadVersion();

    $("closeProfilePanel").addEventListener("click", () => {
      $("profilePanel").hidden = true;
    });
  }

  init();
})();
