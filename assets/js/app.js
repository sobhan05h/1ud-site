/**
 * 1ud.ir - Main Frontend Rendering & Command Engine (Zero-Backend Architecture)
 */

const STORAGE_KEY = "1UD_SITE_DATA_V1";

function getSiteData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Could not read localStorage:", e);
  }
  return JSON.parse(JSON.stringify(window.DEFAULT_SITE_DATA));
}

function saveSiteData(newData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  } catch (e) {
    console.error("Failed to save to localStorage:", e);
  }
}

function applyThemeVariables(theme) {
  if (!theme) return;
  const root = document.documentElement;
  if (theme.bgPrimary) root.style.setProperty("--bg-primary", theme.bgPrimary);
  if (theme.bgSecondary) root.style.setProperty("--bg-secondary", theme.bgSecondary);
  if (theme.darkBlue) root.style.setProperty("--dark-blue", theme.darkBlue);
  if (theme.midBlue) root.style.setProperty("--mid-blue", theme.midBlue);
  if (theme.lightBlue) root.style.setProperty("--light-blue", theme.lightBlue);
  if (theme.cyanGlow) root.style.setProperty("--cyan-glow", theme.cyanGlow);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderSite(data) {
  if (!data) data = getSiteData();
  applyThemeVariables(data.theme);

  // Meta & Brand
  document.title = data.meta?.pageTitle || "1ud.ir";
  const brandShortEl = document.getElementById("brand-short");
  const brandDomainEl = document.getElementById("brand-domain");
  if (brandShortEl) brandShortEl.textContent = data.meta?.brandShort || "1UD";
  if (brandDomainEl) brandDomainEl.textContent = data.meta?.siteName || "1ud.ir";

  // Hero Section
  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val || "";
  };
  setTxt("hero-badge-text", data.hero?.badge);
  setTxt("hero-greeting", data.hero?.greeting);
  setTxt("hero-name", data.hero?.name);
  setTxt("hero-role", data.hero?.roleTitle);
  setTxt("hero-bio", data.hero?.bio);

  const avatarEl = document.getElementById("hero-avatar");
  if (avatarEl && data.hero?.avatarUrl) {
    avatarEl.src = data.hero.avatarUrl;
  }

  const cta1 = document.getElementById("hero-cta-primary");
  if (cta1) {
    cta1.textContent = data.hero?.primaryCtaText || "مشاهده پروژه‌ها";
    cta1.href = data.hero?.primaryCtaLink || "#projects";
  }
  const cta2 = document.getElementById("hero-cta-secondary");
  if (cta2) {
    cta2.textContent = data.hero?.secondaryCtaText || "ارتباط با من";
    cta2.href = data.hero?.secondaryCtaLink || "#contact";
  }

  // Hero Stats
  const statsContainer = document.getElementById("hero-stats");
  if (statsContainer && Array.isArray(data.hero?.stats)) {
    statsContainer.innerHTML = data.hero.stats
      .map(
        (st) => `
      <div class="stat-card">
        <div class="stat-value">${escapeHtml(st.value)}</div>
        <div class="stat-label">${escapeHtml(st.label)}</div>
      </div>
    `
      )
      .join("");
  }

  // About & Services
  setTxt("about-title", data.about?.title);
  setTxt("about-subtitle", data.about?.subtitle);
  setTxt("about-desc", data.about?.description);

  const highlightsEl = document.getElementById("about-highlights");
  if (highlightsEl && Array.isArray(data.about?.highlights)) {
    highlightsEl.innerHTML = data.about.highlights
      .map(
        (item) => `
      <li>
        <span class="check-icon">✓</span>
        <span>${escapeHtml(item)}</span>
      </li>
    `
      )
      .join("");
  }

  const servicesEl = document.getElementById("services-list");
  if (servicesEl && Array.isArray(data.services)) {
    servicesEl.innerHTML = data.services
      .map(
        (sv) => `
      <div class="service-card">
        <h3>${escapeHtml(sv.title)}</h3>
        <p>${escapeHtml(sv.description)}</p>
      </div>
    `
      )
      .join("");
  }

  // Skills with Filter
  renderSkillsSection(data.skills || [], "همه");

  // Projects with Filter
  renderProjectsSection(data.projects || [], "همه");

  // Experience Timeline
  const timelineEl = document.getElementById("experience-timeline");
  if (timelineEl && Array.isArray(data.experiences)) {
    timelineEl.innerHTML = data.experiences
      .map(
        (ex) => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-header">
          <div class="timeline-role">${escapeHtml(ex.role)}</div>
          <span class="timeline-period">${escapeHtml(ex.period)}</span>
        </div>
        <div class="timeline-company">${escapeHtml(ex.company)}</div>
        <p style="color: var(--text-muted); font-size: 0.95rem;">${escapeHtml(ex.description)}</p>
      </div>
    `
      )
      .join("");
  }

  // Contact Info
  const contactListEl = document.getElementById("contact-info-list");
  if (contactListEl && data.contact) {
    const c = data.contact;
    const items = [
      { label: "ایمیل رسمی", val: c.email, href: `mailto:${c.email}`, icon: "@" },
      { label: "تلگرام", val: c.telegram, href: c.telegram, icon: "TG" },
      { label: "گیت‌هاب (GitHub)", val: c.github, href: c.github, icon: "GH" },
      { label: "لینکدین (LinkedIn)", val: c.linkedin, href: c.linkedin, icon: "IN" },
      { label: "شماره تماس", val: c.phone, href: `tel:${c.phone}`, icon: "✆" },
      { label: "موقعیت", val: c.location, href: "#contact", icon: "⌖" }
    ].filter((i) => i.val);

    contactListEl.innerHTML = items
      .map(
        (it) => `
      <a class="contact-item" href="${escapeHtml(it.href)}" target="${it.href.startsWith('http') ? '_blank' : '_self'}" rel="noopener">
        <div class="contact-icon">${escapeHtml(it.icon)}</div>
        <div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(it.label)}</div>
          <div style="font-weight: 700; color: #fff; direction: ltr; text-align: right;">${escapeHtml(it.val)}</div>
        </div>
      </a>
    `
      )
      .join("");
  }

  setTxt("footer-note", data.contact?.footerNote);
}

function renderSkillsSection(skills, activeCat) {
  const tabsEl = document.getElementById("skills-filter-tabs");
  const gridEl = document.getElementById("skills-grid");
  if (!gridEl) return;

  const categories = ["همه", ...new Set(skills.map((s) => s.category).filter(Boolean))];
  if (tabsEl) {
    tabsEl.innerHTML = categories
      .map(
        (cat) => `
      <button class="filter-btn ${cat === activeCat ? "active" : ""}" data-skill-cat="${escapeHtml(cat)}">
        ${escapeHtml(cat)}
      </button>
    `
      )
      .join("");

    tabsEl.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        renderSkillsSection(skills, btn.getAttribute("data-skill-cat"));
      });
    });
  }

  const filtered = activeCat === "همه" ? skills : skills.filter((s) => s.category === activeCat);
  gridEl.innerHTML = filtered
    .map(
      (sk) => `
    <div class="skill-card">
      <div class="skill-top">
        <span class="skill-name">${escapeHtml(sk.name)}</span>
        <span class="skill-badge">${escapeHtml(sk.badge || sk.category)}</span>
      </div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" style="width: ${Math.min(100, Math.max(0, Number(sk.level) || 80))}%"></div>
      </div>
      <div class="skill-meta">
        <span>دسته: ${escapeHtml(sk.category)}</span>
        <span style="color: var(--light-blue); font-weight: 700;">${escapeHtml(sk.level)}%</span>
      </div>
    </div>
  `
    )
    .join("");
}

function renderProjectsSection(projects, activeCat) {
  const tabsEl = document.getElementById("projects-filter-tabs");
  const gridEl = document.getElementById("projects-grid");
  if (!gridEl) return;

  const categories = ["همه", ...new Set(projects.map((p) => p.category).filter(Boolean))];
  if (tabsEl) {
    tabsEl.innerHTML = categories
      .map(
        (cat) => `
      <button class="filter-btn ${cat === activeCat ? "active" : ""}" data-proj-cat="${escapeHtml(cat)}">
        ${escapeHtml(cat)}
      </button>
    `
      )
      .join("");

    tabsEl.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        renderProjectsSection(projects, btn.getAttribute("data-proj-cat"));
      });
    });
  }

  const filtered = activeCat === "همه" ? projects : projects.filter((p) => p.category === activeCat);
  gridEl.innerHTML = filtered
    .map((pr, idx) => {
      const tags = (Array.isArray(pr.tags) ? pr.tags : String(pr.tags || "").split(","))
        .map((t) => t.trim())
        .filter(Boolean);
      const statusLabel = pr.featured === false ? "Completed" : "Active";
      const statusClass = pr.featured === false ? "is-done" : "is-active";
      const techLine = tags.slice(0, 4).join(" · ") || (pr.category || "");
      return `
    <article class="project-card">
      <div class="project-thumb">
        <img src="${escapeHtml(pr.image)}" alt="${escapeHtml(pr.title)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'" />
        <span class="project-status-chip ${statusClass}">${statusLabel}</span>
        ${pr.category ? `<span class="project-category-chip">${escapeHtml(pr.category)}</span>` : ""}
      </div>
      <div class="project-body">
        <h3 class="project-title">${escapeHtml(pr.title)}</h3>
        <div class="project-meta">
          ${pr.date ? `<span>${escapeHtml(pr.date)}</span>` : ""}
          ${pr.date && techLine ? `<span class="dot"></span>` : ""}
          ${techLine ? `<span>${escapeHtml(techLine)}</span>` : ""}
        </div>
        <p class="project-desc">${escapeHtml(pr.description)}</p>
        <div class="project-tags">
          ${tags.map((t) => `<span class="tag-chip">${escapeHtml(t)}</span>`).join("")}
        </div>
        <div class="project-links">
          ${pr.liveUrl ? `<a class="link-live" href="${escapeHtml(pr.liveUrl)}" target="_blank" rel="noopener">مشاهده آنلاین ↗</a>` : ""}
          ${pr.repoUrl ? `<a class="link-repo" href="${escapeHtml(pr.repoUrl)}" target="_blank" rel="noopener">سورس / جزئیات</a>` : ""}
          ${!pr.liveUrl && !pr.repoUrl ? `<a class="link-live" href="#projects">Open Project</a>` : ""}
        </div>
      </div>
    </article>`;
    })
    .join("");
}

function showToast(msg) {
  let toast = document.getElementById("site-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "site-toast";
    toast.className = "toast-notification";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3400);
}

// Secret keyboard command listener: typing "/admin" anywhere on the page opens the Admin Panel!
let keyBuffer = "";
window.addEventListener("keydown", (e) => {
  if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
    e.preventDefault();
    if (window.openAdminModal) window.openAdminModal();
    return;
  }
  if (e.key.length === 1) {
    keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-10);
    if (keyBuffer.endsWith("/admin")) {
      keyBuffer = "";
      if (window.openAdminModal) window.openAdminModal();
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const data = getSiteData();
  renderSite(data);

  // Contact form handler (Zero-backend mailto + clipboard fallback)
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("cf-name")?.value || "";
      const email = document.getElementById("cf-email")?.value || "";
      const msg = document.getElementById("cf-message")?.value || "";
      const dest = getSiteData().contact?.email || "info@1ud.ir";
      const subject = encodeURIComponent(`پیام جدید از سایت 1ud.ir - ${name}`);
      const body = encodeURIComponent(`نام: ${name}
ایمیل: ${email}

متن پیام:
${msg}`);
      window.location.href = `mailto:${dest}?subject=${subject}&body=${body}`;
      showToast("در حال باز کردن برنامه ایمیل برای ارسال پیام شما...");
      contactForm.reset();
    });
  }

  // Check if URL requests /admin
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  if (
    path.endsWith("/admin") ||
    path.endsWith("/admin/") ||
    hash === "#admin" ||
    hash === "#/admin" ||
    search.includes("admin=1") ||
    window.FORCE_OPEN_ADMIN === true
  ) {
    if (window.openAdminModal) {
      setTimeout(() => window.openAdminModal(), 150);
    }
  }
});
