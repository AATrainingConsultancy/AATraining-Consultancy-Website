/**
 * AATC Website - main.js
 * Fetches content.json and populates every section of the page.
 * To edit site text/images, edit content.json only.
 */

document.addEventListener("DOMContentLoaded", () => {

  /* MOBILE MENU TOGGLE */
  const mobileMenuBtn  = document.querySelector(".mobile-menu-btn");
  const mobileNavPanel = document.querySelector(".mobile-nav-panel");
  const menuIcon       = document.querySelector(".menu-icon");

  if (mobileMenuBtn && mobileNavPanel) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileNavPanel.classList.toggle("open");
      menuIcon.textContent = mobileNavPanel.classList.contains("open") ? "close" : "menu";
    });
  }

  /* BILINGUAL SWITCHER */
  document.querySelectorAll(".bilingual-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      document.querySelectorAll(".bilingual-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
    });
  });

  /* SMOOTH SCROLL */
  document.addEventListener("click", e => {
    const anchor = e.target.closest("a[href^=\"#\"]");
    if (!anchor) return;
    const targetId = anchor.getAttribute("href");
    if (targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
      if (mobileNavPanel && mobileNavPanel.classList.contains("open")) {
        mobileNavPanel.classList.remove("open");
        if (menuIcon) menuIcon.textContent = "menu";
      }
    }
  });

  /* LOAD CONTENT.JSON */
  fetch("content.json")
    .then(r => r.json())
    .then(d => {
      populateMeta(d);
      populateNav(d.nav, d.site);
      populateHero(d.hero);
      populateServices(d.services);
      populateFacilities(d.facilities);
      populateTrainers(d.trainers);
      populateClients(d.clients);
      populateEducatorFacilities(d.educator_facilities);
      populateContact(d.contact, d.site);
      populateFooter(d.footer, d.site);
      setTimeout(initInteractions, 100); // Initialize interactions after DOM is ready
    })
    .catch(err => console.error("Error loading content.json:", err));
});

/* HELPERS */
function set(id, html)        { const el = document.getElementById(id); if (el) el.innerHTML = html; }
function setText(id, text)    { const el = document.getElementById(id); if (el) el.textContent = text; }
function setAttr(id, a, v)    { const el = document.getElementById(id); if (el) el.setAttribute(a, v); }
function badge(text)          { return `<span style="display:inline-block;background-color:rgba(245,166,35,0.1);color:#F5A623;border:1px solid rgba(245,166,35,0.3);padding:4px 12px;border-radius:9999px;font-size:0.75rem;font-weight:700;text-transform:uppercase;margin-bottom:1rem;">${text}</span>`; }
function heading(text)        { return `<h2 class="font-display" style="font-size:clamp(2rem,4vw,2.5rem);font-weight:800;color:var(--primary);">${text}</h2>`; }
function iconRow(icon, label) { return `<li style="display:flex;align-items:center;gap:8px;font-size:0.875rem;color:var(--text-muted);"><span class="material-symbols-outlined" style="color:#F5A623;font-size:18px;">${icon}</span>${label}</li>`; }

/* META */
function populateMeta(d) {
  if (d.site.page_title) document.title = d.site.page_title;
  const m = document.querySelector("meta[name=\"description\"]");
  if (m && d.site.meta_description) m.setAttribute("content", d.site.meta_description);
}

/* NAV */
function populateNav(nav, site) {
  setText("logo-title",    site.name_short);
  setText("logo-subtitle", site.tagline);
  document.querySelectorAll(".book-btn").forEach(b => b.textContent = nav.book_btn_text);

  const desktop = document.getElementById("desktop-nav-links");
  if (desktop) desktop.innerHTML = nav.links.map((l, i) =>
    `<a href="${l.href}" class="nav-link${i===0?" active":""}">${l.label}</a>`).join("");

  const mobile = document.getElementById("mobile-nav-links");
  if (mobile) mobile.innerHTML = nav.links.map((l, i) =>
    `<a href="${l.href}" class="mobile-nav-link${i===0?" active":""}">${l.label}</a>`).join("");
}

/* HERO */
function populateHero(hero) {
  setText("hero-badge",       hero.badge_text);
  setText("hero-line1",       hero.headline_line1);
  setText("hero-line2",       hero.headline_line2);
  setText("hero-description", hero.description);

  const p = document.getElementById("hero-btn-primary");
  if (p) { p.textContent = hero.btn_primary_text; p.href = hero.btn_primary_href; }

  const s = document.getElementById("hero-btn-secondary");
  if (s) { const lbl = s.querySelector(".btn-label"); if (lbl) lbl.textContent = hero.btn_secondary_text; s.href = hero.btn_secondary_href; }

  const stats = document.getElementById("hero-stats");
  if (stats) stats.innerHTML = hero.stats.map(s =>
    `<div style="display:flex;flex-direction:column;"><span class="font-display" style="font-size:1.75rem;font-weight:800;color:#F5A623;">${s.value}</span><span style="font-size:0.75rem;color:#94a3b8;font-weight:600;text-transform:uppercase;margin-top:4px;">${s.label}</span></div>`
  ).join("");

  const t = hero.featured_trainer;
  if (t) {
    setText("hero-trainer-name",   t.name);
    setText("hero-trainer-title",  t.title);
    setText("hero-trainer-rating", t.google_rating);
    const img = document.getElementById("hero-trainer-photo");
    if (img) { img.src = t.photo; img.alt = t.name; }
  }
}

/* SERVICES */
function populateServices(s) {
  set("services-header", badge(s.section_badge) +
    `<h2 class="font-display" style="font-size:clamp(2rem,4vw,2.5rem);font-weight:800;color:var(--primary);margin-bottom:1rem;">${s.section_title}</h2>` +
    `<p style="color:var(--text-muted);max-width:600px;margin:0 auto;font-size:1rem;">${s.section_description}</p>`);

  const grid = document.getElementById("services-grid");
  if (!grid) return;

  const cards = s.cards.map(c => `
    <div class="card" style="display:flex;flex-direction:column;height:100%;">
      <div class="card-body" style="flex:1;display:flex;flex-direction:column;">
        <div style="width:48px;height:48px;border-radius:12px;background-color:var(--surface-alt);display:flex;align-items:center;justify-content:center;margin-bottom:1rem;">
          <span class="material-symbols-outlined" style="color:#F5A623;">${c.icon}</span>
        </div>
        <h3 class="font-display" style="font-size:1.25rem;font-weight:700;color:var(--primary);margin-bottom:8px;">${c.title}</h3>
        <p style="color:var(--text-muted);font-size:0.875rem;margin-bottom:1.5rem;flex:1;">${c.description}</p>
        <ul style="display:flex;flex-direction:column;gap:8px;margin-bottom:1.5rem;padding:0;list-style:none;">
          ${c.bullets.map(b => `<li style="display:flex;align-items:flex-start;gap:8px;font-size:0.875rem;"><span class="material-symbols-outlined" style="color:#F5A623;font-size:18px;">check_circle</span>${b}</li>`).join("")}
        </ul>
        <a href="#hubungi" style="color:var(--primary);font-weight:700;font-size:0.875rem;display:inline-flex;align-items:center;gap:4px;">${s.link_text} <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span></a>
      </div>
    </div>`).join("");

  const fc = s.featured_card;
  const featured = `
    <div class="card" style="display:flex;flex-direction:column;height:100%;background-color:#0B2447;border:1px solid #133E87;position:relative;overflow:hidden;">
      <div style="position:absolute;bottom:-20px;right:-20px;width:150px;height:150px;border-radius:50%;background-color:rgba(245,166,35,0.1);filter:blur(20px);"></div>
      <div class="card-body" style="flex:1;display:flex;flex-direction:column;position:relative;z-index:1;">
        <div style="width:48px;height:48px;border-radius:12px;background-color:#133E87;display:flex;align-items:center;justify-content:center;margin-bottom:1rem;">
          <span class="material-symbols-outlined" style="color:#F5A623;">workspace_premium</span>
        </div>
        <span style="color:#F5A623;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">${fc.badge}</span>
        <h3 class="font-display" style="font-size:1.25rem;font-weight:800;color:#FFFFFF;margin-bottom:8px;">${fc.title}</h3>
        <p style="color:#cbd5e1;font-size:0.875rem;margin-bottom:1.5rem;flex:1;">${fc.description}</p>
        <ul style="display:flex;flex-direction:column;gap:8px;margin-bottom:1.5rem;padding:0;list-style:none;">
          ${fc.bullets.map(b => `<li style="display:flex;align-items:flex-start;gap:8px;font-size:0.875rem;color:#FFFFFF;"><span class="material-symbols-outlined" style="color:#F5A623;font-size:18px;">check_circle</span>${b}</li>`).join("")}
        </ul>
        <a href="#hubungi" style="color:#F5A623;font-weight:700;font-size:0.875rem;display:inline-flex;align-items:center;gap:4px;">${fc.link_text} <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span></a>
      </div>
    </div>`;

  grid.innerHTML = cards + featured;
}

/* FACILITIES */
function populateFacilities(f) {
  set("facilities-header", badge(f.section_badge) + heading(f.section_title));

  const grid = document.getElementById("facilities-grid");
  if (!grid) return;

  grid.innerHTML = f.rooms.map(r => {
    const pop = r.popular;
    const border = pop ? "border:2px solid #F5A623;box-shadow:0 10px 25px rgba(245,166,35,0.15);" : "border:1px solid var(--border);box-shadow:var(--shadow-1);";
    const capTop = pop ? "top:30px;" : "top:12px;";
    return `
    <div class="card" style="display:flex;flex-direction:column;overflow:hidden;background-color:#FFFFFF;${border}position:relative;">
      ${pop ? `<div style="position:absolute;top:0;left:0;right:0;background-color:#F5A623;color:#0B2447;text-align:center;font-size:0.75rem;font-weight:700;padding:4px;z-index:2;">PILIHAN POPULAR</div>` : ""}
      <div style="height:200px;background-color:#e2e8f0;position:relative;">
        <img src="${r.photo}" alt="${r.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'">
        <div style="position:absolute;${capTop}right:12px;background-color:#0B2447;color:#FFFFFF;padding:4px 12px;border-radius:9999px;font-size:0.75rem;font-weight:700;display:flex;align-items:center;gap:4px;z-index:2;">
          <span class="material-symbols-outlined" style="font-size:16px;">groups</span>${r.capacity}
        </div>
      </div>
      <div class="card-body" style="padding:1.5rem;display:flex;flex-direction:column;flex:1;">
        <h3 class="font-display" style="font-size:1.25rem;font-weight:700;color:var(--primary);margin-bottom:1rem;">${r.name}</h3>
        <ul style="display:flex;flex-direction:column;gap:8px;margin-bottom:1.5rem;flex:1;padding:0;list-style:none;">
          ${r.amenities.map(a => iconRow(a.icon, a.label)).join("")}
        </ul>
        <div style="margin-bottom:1.5rem;">
          <span style="font-size:0.75rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Kadar Sewaan Harian</span>
          <div style="font-size:1.5rem;font-weight:800;color:#F5A623;">${r.daily_rate} <span style="font-size:0.875rem;color:var(--text-muted);font-weight:500;">/ hari</span></div>
        </div>
        <a href="#hubungi" class="btn" style="background-color:#F5A623;color:#0B2447;width:100%;justify-content:center;">${f.book_btn_text}</a>
      </div>
    </div>`;
  }).join("");
}

/* TRAINERS */
function populateTrainers(t) {
  set("trainers-header", badge(t.section_badge) + heading(t.section_title));

  const grid = document.getElementById("trainers-grid");
  if (!grid) return;

  grid.innerHTML = t.profiles.map(p => `
    <div class="card" style="display:flex;flex-direction:column;overflow:hidden;background-color:#FFFFFF;border:1px solid var(--border);box-shadow:var(--shadow-1);">
      <div class="trainer-img-wrapper" style="height:250px;background-color:#e2e8f0;">
        <img src="${p.photo}" alt="${p.name}" loading="lazy" class="primary-img" style="object-position:${p.image_position || 'top center'};" onerror="this.style.display='none'">
        ${p.photo_hover ? `<img src="${p.photo_hover}" alt="${p.name}" loading="lazy" class="hover-img" style="object-position:${p.hover_image_position || p.image_position || 'top center'};" onerror="this.style.display='none'">` : ''}
        <div style="position:absolute;bottom:0;left:0;right:0;height:50%;background:linear-gradient(to top,#FFFFFF,transparent);z-index:1;"></div>
      </div>
      <div class="card-body" style="padding:1.5rem;display:flex;flex-direction:column;flex:1;margin-top:-30px;position:relative;z-index:2;">
        <h3 class="font-display" style="font-size:1.25rem;font-weight:800;color:var(--primary);margin-bottom:4px;">${p.name}</h3>
        <p style="font-size:0.875rem;color:#F5A623;font-weight:700;margin-bottom:1rem;">${p.title}</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:1rem;">
          ${p.credentials.map(c => `<span style="background-color:#f1f5f9;color:var(--text-muted);padding:4px 10px;border-radius:6px;font-size:0.7rem;font-weight:600;border:1px solid #e2e8f0;">${c}</span>`).join("")}
        </div>
        <p style="color:var(--text-muted);font-size:0.875rem;flex:1;line-height:1.6;">${p.bio}</p>
      </div>
    </div>`).join("");
}

/* CLIENTS */
function populateClients(c) {
  set("clients-header", badge(c.section_badge) + heading(c.section_title) +
    `<p style="color:var(--text-muted);max-width:600px;margin:1rem auto 0;font-size:1rem;">${c.section_description}</p>`);

  const sectorsGrid = document.getElementById("clients-sectors-grid");
  if (sectorsGrid) sectorsGrid.innerHTML = c.sectors.map(s => `
    <div class="card" style="padding:2rem;border:1px solid var(--border);box-shadow:var(--shadow-1);display:flex;align-items:flex-start;gap:1rem;background-color:#FFFFFF;">
      <div style="background-color:rgba(245,166,35,0.1);color:#F5A623;padding:12px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <span class="material-symbols-outlined" style="font-size:28px;">${s.icon}</span>
      </div>
      <div>
        <h3 class="font-display" style="font-size:1.125rem;font-weight:700;color:var(--primary);margin-bottom:8px;">${s.title}</h3>
        <p style="font-size:0.875rem;color:var(--text-muted);line-height:1.5;">${s.description}</p>
      </div>
    </div>`).join("");

  const banner = document.getElementById("clients-logos-banner");
  if (banner) {
    const logos = c.logos.filter(l => l.name && l.logo);
    const logoHTML = logos.length
      ? logos.map(l => `<img src="${l.logo}" alt="${l.name}" loading="lazy" style="height:48px;object-fit:contain;opacity:0.5;filter:grayscale(100%);" onerror="this.outerHTML='<span style=\\'font-size:1rem;font-weight:700;color:var(--text-muted);opacity:0.5;\\'>${l.name}</span>'">`).join("")
      : `<span style="color:var(--text-muted);opacity:0.5;font-size:0.875rem;">Logo klien akan dipaparkan di sini.</span>`;
    banner.innerHTML = `<h3 class="font-display" style="font-size:1.5rem;font-weight:800;color:var(--primary);margin-bottom:2rem;">Lebih <span style="color:#F5A623;">${c.clients_count_number}</span> ${c.clients_count_suffix}</h3>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:2rem;align-items:center;">${logoHTML}</div>`;
  }
}

/* EDUCATOR FACILITIES */
function populateEducatorFacilities(e) {
  set("educator-section-header", badge(e.section_badge) + heading(e.section_title));

  const grid = document.getElementById("educator-cards-container");
  if (grid) grid.innerHTML = e.cards.map(c => `
    <div class="card" style="padding:2rem;border:1px solid var(--border);box-shadow:var(--shadow-1);display:flex;flex-direction:column;background-color:#FFFFFF;">
      <div style="background-color:rgba(11,36,71,0.05);color:var(--primary);padding:16px;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;margin-bottom:1.5rem;">
        <span class="material-symbols-outlined" style="font-size:32px;">${c.icon}</span>
      </div>
      <h3 class="font-display" style="font-size:1.25rem;font-weight:700;color:var(--primary);margin-bottom:1rem;">${c.title}</h3>
      <p style="font-size:0.875rem;color:var(--text-muted);line-height:1.6;flex:1;margin-bottom:1.5rem;">${c.description}</p>
      <a href="#hubungi" style="color:#F5A623;font-weight:700;font-size:0.875rem;display:inline-flex;align-items:center;gap:4px;text-decoration:none;">
        ${c.btn_text} <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
      </a>
    </div>`).join("");

  setText("educator-banner-title", e.banner.title);
  setText("educator-banner-desc",  e.banner.description);
  setText("educator-banner-btn",   e.banner.btn_text);
}

/* CONTACT */
function populateContact(c, site) {
  set("contact-header", badge(c.section_badge) + heading(c.section_title));
  setText("contact-form-title",  c.form_title);
  setText("contact-address",     `${site.contact.address_line1} ${site.contact.address_line2} ${site.contact.address_line3}`);
  setText("contact-phone",       `${site.contact.phone_1} / ${site.contact.phone_2}`);
  setText("contact-email",       site.contact.email);
  setText("contact-hours-wd",    site.contact.operating_hours_weekday);
  setText("contact-hours-we",    site.contact.operating_hours_weekend);
  setAttr("contact-map",         "src", c.map_embed_url);

  const select = document.getElementById("jenis_tempahan");
  if (select && c.booking_types) {
    select.innerHTML = `<option value="" disabled selected>Sila Pilih...</option>` +
      c.booking_types.map(t => `<option value="${t.value}">${t.label}</option>`).join("");
  }

  const form = document.getElementById("contact-form");
  const msg = document.getElementById("contact-success-msg");
  if (form) form.addEventListener("submit", e => {
    e.preventDefault();
    if(msg) {
      msg.textContent = c.form_success_message;
      msg.style.display = "block";
      setTimeout(() => msg.style.display = "none", 5000);
    }
    form.reset();
  });
}

/* FOOTER */
function populateFooter(f, site) {
  setText("footer-name",            site.name);
  setText("footer-reg",             site.registration);
  setText("footer-description",     f.col1_description);
  setText("footer-copyright",       "\u00A9 " + f.copyright);
  setText("footer-col2-title",      f.col2_title);
  setText("footer-col3-title",      f.col3_title);
  setText("footer-col4-title",      f.col4_title);
  setText("footer-contact-address", `${site.contact.address_line1} ${site.contact.address_line2} ${site.contact.address_line3}`);
  setText("footer-contact-phone",   `${site.contact.phone_1} / ${site.contact.phone_2}`);
  setText("footer-contact-email",   site.contact.email);

  const col2 = document.getElementById("footer-col2-links");
  if (col2) col2.innerHTML = f.col2_links.map(l =>
    `<a href="${l.href}" style="color:#cbd5e1;text-decoration:none;font-size:0.875rem;transition:color 0.2s;" onmouseover="this.style.color='#F5A623'" onmouseout="this.style.color='#cbd5e1'">${l.label}</a>`).join("");

  const col3 = document.getElementById("footer-col3-links");
  if (col3) col3.innerHTML = f.col3_links.map(l =>
    `<a href="${l.href}" style="color:#cbd5e1;text-decoration:none;font-size:0.875rem;transition:color 0.2s;" onmouseover="this.style.color='#F5A623'" onmouseout="this.style.color='#cbd5e1'">${l.label}</a>`).join("");

  setAttr("social-facebook",  "href", site.social_media.facebook);
  setAttr("social-linkedin",  "href", site.social_media.linkedin);
  setAttr("social-whatsapp",  "href", site.social_media.whatsapp);
  setAttr("social-youtube",   "href", site.social_media.youtube);
}

/* ==========================================================================
   INTERACTIONS (Scroll, animations, back to top)
   ========================================================================== */
function initInteractions() {
  // 1. Fade-in animations
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add fade-up class to sections and cards, then observe
  document.querySelectorAll('.section-header, .card').forEach((el, index) => {
    el.classList.add('fade-up');
    if (index % 3 === 1) el.classList.add('delay-100');
    if (index % 3 === 2) el.classList.add('delay-200');
    fadeObserver.observe(el);
  });

  // 2. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  const scrollSpyObserver = new IntersectionObserver(entries => {
    let visibleSection = null;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleSection = entry.target.id;
      }
    });
    
    if (visibleSection) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + visibleSection) {
          link.classList.add('active');
        }
      });
    }
  }, { root: null, rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  sections.forEach(sec => scrollSpyObserver.observe(sec));

  // 3. Back to Top Button
  const bttBtn = document.getElementById('back-to-top');
  if (bttBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        bttBtn.classList.add('show');
      } else {
        bttBtn.classList.remove('show');
      }
    });
    bttBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
