/*
  Shared behaviour for every page: header, footer, theme, and the renderers
  that turn data.js into HTML. Each page sets <body data-page="..."> and
  provides empty containers with the ids used below.
*/
(function () {
  "use strict";

  const S = window.SITE;
  const page = document.body.dataset.page;
  const $ = (sel, root = document) => root.querySelector(sel);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const phBadge = (item) => (item && item.placeholder ? '<span class="ph-badge">placeholder</span>' : "");
  const phClass = (item) => (item && item.placeholder ? " placeholder" : "");
  const arrow = '<span aria-hidden="true">↗</span>';

  /* ---------------- Navigation ---------------- */
  const MAIN_NAV = [
    { href: "projects.html", label: "Projects", id: "projects" },
    { href: "publications.html", label: "Publications", id: "publications" },
    { href: "news.html", label: "News", id: "news" },
  ];
  const MORE_NAV = [
    { href: "teaching.html", label: "Teaching", note: "Courses & students", id: "teaching" },
    { href: "books.html", label: "Books", note: "My bookshelf", id: "books" },
    { href: "activities.html", label: "Activities", note: "Visits, talks, life", id: "activities" },
    { href: "cv.html", label: "CV", note: "Experience & education", id: "cv" },
  ];
  const cur = (id) => (id === page ? ' aria-current="page"' : "");

  function renderHeader() {
    const host = $("#site-header");
    if (!host) return;
    const moreActive = MORE_NAV.some((n) => n.id === page);
    host.className = "site-header";
    host.innerHTML = `
      <div class="wrap nav">
        <a class="wordmark" href="index.html" aria-label="${esc(S.person.name)}, home">pe<span class="fix" aria-hidden="true"></span></a>
        <nav class="nav-links" id="nav-links" aria-label="Main">
          ${MAIN_NAV.map((n) => `<a href="${n.href}"${cur(n.id)}>${n.label}</a>`).join("")}
          <div class="more">
            <button class="more-btn${moreActive ? " active" : ""}" aria-expanded="false" aria-controls="more-menu">More
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
            </button>
            <div class="more-menu" id="more-menu">
              ${MORE_NAV.map((n) => `<a href="${n.href}"${cur(n.id)}>${n.label}<small>${n.note}</small></a>`).join("")}
            </div>
          </div>
        </nav>
        <div class="nav-tools">
          <button class="icon-btn theme-btn" aria-label="Toggle dark mode">
            <svg class="moon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
            <svg class="sun" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.6"/></svg>
          </button>
          <button class="icon-btn menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16" stroke="currentColor" stroke-width="1.6"/></svg>
          </button>
        </div>
      </div>`;

    const moreBtn = $(".more-btn", host);
    const moreMenu = $("#more-menu", host);
    const setMore = (open) => { moreMenu.classList.toggle("open", open); moreBtn.setAttribute("aria-expanded", open); };
    moreBtn.addEventListener("click", (e) => { e.stopPropagation(); setMore(!moreMenu.classList.contains("open")); });
    document.addEventListener("click", (e) => { if (!e.target.closest(".more")) setMore(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setMore(false); setMenu(false); } });

    const menuBtn = $(".menu-btn", host);
    const links = $("#nav-links", host);
    const setMenu = (open) => { links.classList.toggle("open", open); menuBtn.setAttribute("aria-expanded", open); };
    menuBtn.addEventListener("click", () => setMenu(!links.classList.contains("open")));

    $(".theme-btn", host).addEventListener("click", toggleTheme);
    const onScroll = () => host.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function renderFooter() {
    const host = $("#site-footer");
    if (!host) return;
    host.className = "site-footer";
    const all = [{ href: "index.html", label: "Home" }, ...MAIN_NAV, ...MORE_NAV];
    host.innerHTML = `
      <div class="wrap">
        <p>© ${new Date().getFullYear()} ${esc(S.person.name)} · Luxembourg</p>
        <nav aria-label="Footer">${all.map((n) => `<a href="${n.href}">${n.label}</a>`).join("")}</nav>
        <a href="#top">Back to top ↑</a>
      </div>`;
  }

  /* ---------------- Theme ---------------- */
  function currentTheme() {
    const set = document.documentElement.dataset.theme;
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function toggleTheme() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
  }

  /* ---------------- Small helpers ---------------- */
  function toast(msg) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => t.classList.remove("show"), 1800);
  }

  function observeReveals() {
    const els = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
  }

  const authorList = (authors) =>
    authors.map((a) => (a === S.person.name ? `<strong>${esc(a)}</strong>` : esc(a))).join(", ");

  function citation(p) {
    return `${p.authors.join(", ")}. ${p.year}. ${p.title}. In ${p.venue}.${p.url ? " " + p.url : ""}`;
  }

  function copy(text, done) {
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
      ta.remove();
    };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
  }

  function pubHTML(p) {
    return `
      <article class="pub reveal">
        <span class="venue">${esc(p.venue)}</span>
        <h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.title)}</a>` : esc(p.title)}</h3>
        <p class="authors">${authorList(p.authors)}</p>
        <div class="pub-actions">
          ${p.url ? `<a class="pill" href="${esc(p.url)}">Paper ${arrow}</a>` : ""}
          <button class="pill" data-cite="${esc(citation(p))}">Copy citation</button>
          ${p.project ? `<a class="pill" href="projects.html#${esc(p.project)}">Project →</a>` : ""}
        </div>
      </article>`;
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cite]");
    if (b) copy(b.dataset.cite, () => toast("Citation copied"));
  });

  /* ---------------- Portrait: an illustrated avatar whose eyes follow your gaze ---------------- */
  const AVATAR = `
    <svg class="avatar" viewBox="0 0 400 400" role="img" aria-label="Illustration of ${esc(S.person.name)}">
      <rect width="400" height="400" fill="var(--avatar-bg)"/>
      <g fill="none" stroke="var(--accent)" stroke-opacity=".18">
        <circle cx="200" cy="190" r="150"/><circle cx="200" cy="190" r="115"/>
      </g>
      <g transform="translate(200 202) scale(1.08) translate(-200 -180)">
      <!-- ponytail (sways), with a hair tie -->
      <g class="ponytail">
        <path d="M146 118 C100 126 84 196 98 248 C106 278 100 304 90 324 C132 312 148 274 144 236 C141 200 148 160 168 132 Z" fill="var(--hair)"/>
        <path d="M120 170 C112 200 112 232 118 258" fill="none" stroke="var(--hair-light)" stroke-width="2" opacity=".5"/>
      </g>
      <ellipse cx="149" cy="124" rx="8" ry="10" fill="#ef8fab" transform="rotate(-25 149 124)"/>
      </g>
      <!-- simple top with a round neckline -->
      <path d="M68 400 C76 344 118 316 168 306 L232 306 C282 316 324 344 332 400 Z" fill="var(--top)"/>
      <path d="M100 400 C104 370 116 350 132 338 M300 400 C296 370 284 350 268 338" fill="none" stroke="var(--top-line)" stroke-width="2" stroke-linecap="round"/>
      <!-- neck & neckline -->
      <path d="M185 258 L215 258 L218 306 C232 307 238 308 240 310 Q200 352 160 310 C162 308 168 307 182 306 Z" fill="var(--skin-shade)"/>
      <!-- fine necklace with a little heart -->
      <path d="M184 312 Q200 334 216 312" fill="none" stroke="#d4ae55" stroke-width="1.4"/>
      <path d="M200 336 c-3-4-9-1-5 4 l5 4.5 5-4.5 c4-5-2-8-5-4 Z" fill="#d4ae55"/>
      <g transform="translate(200 202) scale(1.08) translate(-200 -180)">
      <!-- ears -->
      <ellipse cx="131" cy="182" rx="9" ry="14" fill="var(--skin-shade)"/>
      <ellipse cx="269" cy="182" rx="9" ry="14" fill="var(--skin-shade)"/>
      <!-- face -->
      <ellipse cx="200" cy="172" rx="70" ry="72" fill="var(--skin)"/>
      <!-- hair & side-swept fringe -->
      <path d="M128 186 C116 100 160 76 202 76 C246 76 288 100 272 186 C266 150 256 126 236 114 C214 104 186 104 164 114 C146 124 134 150 128 186 Z" fill="var(--hair)"/>
      <path d="M136 156 C140 112 178 94 216 100 C246 105 266 124 270 158 C252 132 230 120 206 122 C188 124 170 134 156 146 C150 151 143 155 136 156 Z" fill="var(--hair)"/>
      <path d="M176 104 C196 98 222 100 240 110" fill="none" stroke="var(--hair-light)" stroke-width="2.2" stroke-linecap="round" opacity=".6"/>
      <!-- brows -->
      <g fill="none" stroke="var(--hair)" stroke-width="3" stroke-linecap="round">
        <path d="M160 150 Q173 143 186 149"/><path d="M214 149 Q227 143 240 150"/>
      </g>
      <!-- big eyes (blink + follow) -->
      <g class="eyes">
        <ellipse cx="174" cy="182" rx="12" ry="13" fill="#fff"/>
        <ellipse cx="226" cy="182" rx="12" ry="13" fill="#fff"/>
        <g class="pupils">
          <circle cx="174" cy="183" r="8" fill="#2b211e"/><circle cx="226" cy="183" r="8" fill="#2b211e"/>
          <circle cx="177" cy="179" r="2.8" fill="#fff"/><circle cx="229" cy="179" r="2.8" fill="#fff"/>
          <circle cx="171.5" cy="187" r="1.3" fill="#fff"/><circle cx="223.5" cy="187" r="1.3" fill="#fff"/>
        </g>
        <g fill="none" stroke="var(--hair)" stroke-width="2.6" stroke-linecap="round">
          <path d="M161 178 Q174 165 187 178"/><path d="M213 178 Q226 165 239 178"/>
          <path d="M162 176 l-5 -4 M238 176 l5 -4"/>
        </g>
      </g>
      <!-- round glasses -->
      <g fill="rgba(255,255,255,.12)" stroke="#b8b0a8" stroke-width="2.4">
        <circle cx="174" cy="182" r="21"/><circle cx="226" cy="182" r="21"/>
      </g>
      <path d="M195 180 Q200 175 205 180 M153 178 L132 175 M247 178 L268 175" fill="none" stroke="#b8b0a8" stroke-width="2.4" stroke-linecap="round"/>
      <!-- tiny nose, rosy cheeks, smile -->
      <path d="M197 203 Q200 207 203 203" fill="none" stroke="var(--skin-line)" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="157" cy="212" rx="11" ry="7" fill="#f28ea2" opacity=".38"/>
      <ellipse cx="243" cy="212" rx="11" ry="7" fill="#f28ea2" opacity=".38"/>
      <path d="M187 216 Q200 232 213 216 Q200 221 187 216 Z" fill="#c45a6c" stroke="#c45a6c" stroke-width="2" stroke-linejoin="round"/>
      </g>
    </svg>`;

  function portraitHTML() {
    return `<div class="portrait-frame">${AVATAR}</div>`;
  }

  // Moves the avatar's pupils toward a point given in viewport coordinates.
  function lookAt(x, y) {
    const pupils = $(".avatar .pupils");
    if (!pupils) return;
    const svg = pupils.ownerSVGElement.getBoundingClientRect();
    const scale = svg.width / 400;
    const ex = svg.left + 200 * scale, ey = svg.top + 204 * scale;
    const dx = x - ex, dy = y - ey, d = Math.hypot(dx, dy) || 1;
    const reach = Math.min(d / (120 * scale), 1) * 3.5;
    pupils.setAttribute("transform", `translate(${(dx / d * reach).toFixed(2)} ${(dy / d * reach * .7).toFixed(2)})`);
  }

  /* ---------------- Gaze canvas (home) ---------------- */
  // Draws fixations (circles that grow while the gaze dwells) joined by
  // saccades (lines), like an eye-tracking scanpath. The gaze comes from one of:
  //   mouse  - the cursor (desktop)
  //   touch  - a tap places a fixation; the auto path resumes a few seconds later
  //   auto   - a synthetic scanpath when there is no mouse
  //   camera - real webcam eye tracking (WebGazer), after calibration
  function startGaze(canvas) {
    const ctx = canvas.getContext("2d");
    const hero = canvas.parentElement;
    let w = 0, h = 0, dpr = 1;
    const fixations = [];
    let current = null;
    const MAX = 9;
    const hasMouse = window.matchMedia("(hover: hover)").matches;
    let source = hasMouse ? "mouse" : "auto";
    let target = null, lastMove = 0, touchUntil = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.clientWidth; h = hero.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    // Re-measure whenever the hero changes size (fonts loading, mobile address bar, rotation),
    // otherwise the canvas is stretched and fixations drift away from the finger.
    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(hero);
    else window.addEventListener("resize", resize);

    const color = () => getComputedStyle(document.documentElement).getPropertyValue("--gaze").trim() || "rgba(122,59,90,.9)";
    const soft = () => getComputedStyle(document.documentElement).getPropertyValue("--gaze-soft").trim() || "rgba(122,59,90,.14)";

    function fixate(x, y, now, minDist = 40) {
      if (current && Math.hypot(current.x - x, current.y - y) < minDist) return;
      current = { x, y, start: now, r: 4 };
      const hr = hero.getBoundingClientRect();
      lookAt(hr.left + x, hr.top + y);
      fixations.push(current);
      if (fixations.length > MAX) fixations.shift();
    }

    // Records a gaze sample given in viewport coordinates.
    function sample(clientX, clientY) {
      const r = hero.getBoundingClientRect();
      target = { x: clientX - r.left, y: clientY - r.top };
      lastMove = performance.now();
    }

    window.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse" || source === "camera") return;
      source = "mouse";
      lookAt(e.clientX, e.clientY);
      sample(e.clientX, e.clientY);
    }, { passive: true });
    hero.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse" && source === "mouse") target = null; });

    hero.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" || source === "camera") return;
      const now = performance.now();
      sample(e.clientX, e.clientY);
      fixate(target.x, target.y, now, 1);
      touchUntil = now + 4000;
    }, { passive: true });

    // Synthetic scanpath: jump between random points with human-ish dwell times
    let nextJump = 0;
    function autoStep(now) {
      if (now < nextJump) return;
      fixate(w * (0.08 + Math.random() * 0.84), h * (0.12 + Math.random() * 0.76), now);
      nextJump = now + 450 + Math.random() * 900;
    }

    function frame(now) {
      if (source === "camera") { if (target) fixate(target.x, target.y, now, 80); }
      else if (now < touchUntil) { /* hold the tapped fixation */ }
      else if (source === "mouse") { if (target && now - lastMove > 90) fixate(target.x, target.y, now); }
      else autoStep(now);

      if (current) current.r = Math.min(4 + (now - current.start) / 28, 46);

      ctx.clearRect(0, 0, w, h);
      const c = color(), s = soft();
      const n = fixations.length;
      ctx.lineWidth = 1.2;
      for (let i = 0; i < n; i++) {
        const f = fixations[i];
        const age = (n - i) / n; // 1 = oldest
        const alpha = 1 - age * 0.85 + 0.1;
        if (i > 0) {
          const p = fixations[i - 1];
          ctx.globalAlpha = alpha * 0.6;
          ctx.strokeStyle = c;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(f.x, f.y); ctx.stroke();
        }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = c;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = c;
        ctx.beginPath(); ctx.arc(f.x, f.y, 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillText(String(i + 1).padStart(2, "0"), f.x + f.r + 4, f.y - f.r * 0.4);
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    return {
      // Smoothed webcam gaze estimates arrive here while camera mode is on.
      cameraSample(x, y) { lookAt(x, y); sample(x, y); },
      setCamera(on) {
        source = on ? "camera" : hasMouse ? "mouse" : "auto";
        target = null;
      },
    };
  }

  /* ---------------- Real eye tracking via the webcam (opt-in) ---------------- */
  // Uses WebGazer (https://webgazer.cs.brown.edu), loaded only when the visitor
  // asks for it. Everything runs in the browser; no video or data leaves the
  // device and nothing is stored.
  const WEBGAZER_BASE = "https://cdn.jsdelivr.net/npm/webgazer@3.5.3/dist";
  const WEBGAZER_SRC = WEBGAZER_BASE + "/webgazer.js";

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src; s.async = true;
      s.onload = resolve; s.onerror = () => reject(new Error("load failed"));
      document.head.appendChild(s);
    });
  }

  function setupEyeTracking(gaze) {
    const btn = $("#eyetrack-btn");
    if (!btn || !gaze || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { if (btn) btn.hidden = true; return; }

    let running = false, calibrated = false, smooth = null, used = false;

    function overlay(html) {
      const el = document.createElement("div");
      el.className = "et-overlay";
      el.setAttribute("role", "dialog");
      el.setAttribute("aria-modal", "true");
      el.innerHTML = html;
      document.body.appendChild(el);
      return el;
    }

    function stop() {
      running = false; calibrated = false; smooth = null;
      // end() alone leaves the camera on; stopVideo() releases it.
      try { window.webgazer.stopVideo(); } catch (e) { /* camera never started */ }
      try { window.webgazer.end(); } catch (e) { /* not started */ }
      document.querySelectorAll(".et-overlay, .et-status").forEach((el) => el.remove());
      gaze.setCamera(false);
      btn.hidden = false;
    }

    function consent() {
      const dlg = overlay(`
        <div class="et-card">
          <p class="eyebrow"><span class="fix" aria-hidden="true"></span>Real eye tracking</p>
          <h2>Let the page follow <em>your eyes.</em></h2>
          <p>This uses your camera to estimate where you look, the way eye-tracking research does, just much less precisely.</p>
          <ul>
            <li>Everything runs in your browser. Video never leaves your device and nothing is saved. (The face model, about 10 MB, is downloaded once from a public CDN.)</li>
            <li>First a short calibration: look at each dot and click or tap it 3 times.</li>
            <li>Works best on a laptop, with your face well lit.</li>
          </ul>
          <div class="cta-row"><button class="btn" data-et="start">Turn on camera</button><button class="btn ghost" data-et="cancel">Not now</button></div>
        </div>`);
      $("[data-et=start]", dlg).focus();
      dlg.addEventListener("click", (e) => {
        const a = e.target.closest("[data-et]");
        if (!a) return;
        dlg.remove();
        if (a.dataset.et === "start") start();
      });
    }

    async function start() {
      // WebGazer cannot be restarted cleanly after end(), so a second run starts from a fresh page.
      if (used) { location.hash = "eye-tracking"; location.reload(); return; }
      used = true;
      running = true;
      btn.hidden = true;
      toast("Loading eye tracker…");
      try {
        if (!window.webgazer) await loadScript(WEBGAZER_SRC);
        const wg = window.webgazer;
        wg.saveDataAcrossSessions(false);
        wg.params.showVideoPreview = true;
        wg.params.videoViewerWidth = 240;
        wg.params.videoViewerHeight = 180;
        wg.params.faceMeshSolutionPath = WEBGAZER_BASE + "/mediapipe/face_mesh";
        await wg.setRegression("ridge")
          .setGazeListener((data) => {
            if (!data || !calibrated || !running) return;
            smooth = smooth ? { x: smooth.x * 0.8 + data.x * 0.2, y: smooth.y * 0.8 + data.y * 0.2 } : { x: data.x, y: data.y };
            gaze.cameraSample(smooth.x, smooth.y);
          })
          .begin();
        wg.showPredictionPoints(false);
        if (!running) return stop(); // cancelled while loading
        calibrate();
      } catch (e) {
        stop();
        toast("Camera not available");
      }
    }

    function calibrate() {
      // Dots avoid the camera preview, which sits at the top centre.
      const spots = [[8, 10], [92, 10], [8, 38], [50, 38], [92, 38], [8, 64], [50, 64], [92, 64], [8, 90], [50, 90], [92, 90]];
      const cal = overlay(`
        <p class="et-instructions"><span>Look at each dot and click it <strong>3 times</strong>.</span> <button class="pill" data-et="cancel">Cancel</button></p>
        ${spots.map(([x, y], i) => `<button class="et-dot" style="left:${x}%;top:${y}%" data-hits="0" aria-label="Calibration point ${i + 1}"></button>`).join("")}`);
      cal.classList.add("calibrating");
      let done = 0;
      cal.addEventListener("click", (e) => {
        if (e.target.closest("[data-et=cancel]")) return stop();
        const dot = e.target.closest(".et-dot");
        if (!dot || dot.disabled) return;
        const hits = +dot.dataset.hits + 1;
        dot.dataset.hits = hits;
        dot.style.setProperty("--fill", hits / 3);
        if (hits >= 3) { dot.disabled = true; done++; }
        if (done === spots.length) finish(cal);
      });
    }

    function finish(cal) {
      cal.remove();
      calibrated = true;
      const wg = window.webgazer;
      wg.showVideoPreview(false).showFaceOverlay(false).showFaceFeedbackBox(false);
      gaze.setCamera(true);
      const status = document.createElement("div");
      status.className = "et-status";
      status.innerHTML = `<span class="rec" aria-hidden="true"></span>Eye tracking on <button class="pill" data-et="stop">Stop camera</button>`;
      document.body.appendChild(status);
      $("[data-et=stop]", status).addEventListener("click", stop);
      toast("Calibrated. Now just look around");
    }

    btn.addEventListener("click", consent);
    if (location.hash === "#eye-tracking") { history.replaceState(null, "", location.pathname); consent(); }
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      const dlg = $(".et-overlay");
      if (dlg && !dlg.classList.contains("calibrating")) dlg.remove();
      else if (dlg) stop();
    });
  }

  /* ---------------- Page renderers ---------------- */
  const renderers = {
    home() {
      const P = S.person;
      $("#hero-copy").innerHTML = `
        <p class="eyebrow"><span class="fix" aria-hidden="true"></span>${esc(P.role)}</p>
        <h1>Parvin <em>Emami</em></h1>
        <p class="hero-statement">${esc(P.statement)}</p>
        <p class="intro">${esc(P.intro)}</p>
        <div class="chips" aria-label="Research interests">
          ${P.interests.map((i) => `<a class="chip" href="${esc(i.page)}">${esc(i.label)}</a>`).join("")}
        </div>
        <div class="cta-row">
          <a class="btn" href="publications.html">Read my research <span aria-hidden="true">→</span></a>
        </div>
        <div class="socials">${P.links.filter((l) => l.url).map((l) => `<a href="${esc(l.url)}">${esc(l.label)} ${arrow}</a>`).join("")}</div>`;

      $("#portrait").innerHTML = `
        <div class="portrait-wrap">
          ${portraitHTML()}
          <div class="portrait-tag"><span class="pulse" aria-hidden="true"></span><span>${esc(P.now)}</span></div>
        </div>
        <p class="portrait-caption">I look where you look</p>
        <button class="eyetrack-btn" id="eyetrack-btn"><span class="rec" aria-hidden="true"></span>Try real eye tracking with your camera</button>`;

      $("#home-news").innerHTML = S.news.slice(0, 4).map((n) =>
        `<li><span class="when">${esc(n.date)}</span><p>${n.text}${n.link ? ` <a href="${esc(n.link)}">${arrow}</a>` : ""}</p></li>`).join("");

      $("#home-projects").innerHTML = S.projects.slice(0, 3).map((p, i) => `
        <a class="card ${p.color} reveal" href="projects.html#${p.id}">
          <span class="num">0${i + 1}</span>
          <p class="tag" style="margin-top:22px">${esc(p.tag)}</p>
          <h3>${esc(p.question)}</h3>
          <p>${esc(p.title)}</p>
        </a>`).join("");

      $("#home-pubs").innerHTML = S.publications.filter((p) => p.selected).map(pubHTML).join("");

      const canvas = $("#gaze-canvas");
      if (canvas && !reduceMotion) setupEyeTracking(startGaze(canvas));
      else { const b = $("#eyetrack-btn"); if (b) b.hidden = true; }
    },

    projects() {
      const deco = `<svg class="deco" viewBox="0 0 200 200" aria-hidden="true"><g fill="none" stroke="currentColor"><circle cx="100" cy="100" r="90"/><circle cx="100" cy="100" r="60"/><circle cx="100" cy="100" r="30"/></g></svg>`;
      $("#project-list").innerHTML = S.projects.map((p, i) => {
        const pubs = S.publications.filter((x) => x.project === p.id);
        return `
        <article class="project ${p.color} reveal" id="${p.id}">
          <span class="num">0${i + 1}</span>
          <div>
            <p class="tag">${esc(p.tag)}</p>
            <h2>${esc(p.question)}</h2>
            <p class="sub">${esc(p.title)}</p>
            <p class="status"><span class="fix" aria-hidden="true"></span>${esc(p.status)}</p>
          </div>
          <div class="body">
            <p>${esc(p.summary)}</p>
            <div class="methods">${p.methods.map((m) => `<span>${esc(m)}</span>`).join("")}</div>
            ${pubs.length ? `<div class="related"><p class="tag">Related papers</p><ul>${pubs.map((x) =>
              `<li><a href="${esc(x.url)}">${esc(x.title)}</a> <span class="muted mono">· ${esc(x.venue)}</span></li>`).join("")}</ul></div>` : ""}
          </div>
          ${deco}
        </article>`;
      }).join("");
    },

    publications() {
      const pubs = S.publications;
      const topics = [...new Set(pubs.flatMap((p) => p.topics || []))];
      let active = "All", query = "";
      const chips = $("#topic-chips");
      chips.innerHTML = ["All", ...topics].map((t) => {
        const count = t === "All" ? pubs.length : pubs.filter((p) => p.topics.includes(t)).length;
        return `<button class="chip" aria-pressed="${t === "All"}" data-topic="${esc(t)}">${esc(t)} <span class="count">${count}</span></button>`;
      }).join("");

      function draw() {
        const q = query.toLowerCase();
        const list = pubs.filter((p) =>
          (active === "All" || p.topics.includes(active)) &&
          (!q || [p.title, p.venue, p.authors.join(" ")].join(" ").toLowerCase().includes(q)));
        const years = [...new Set(list.map((p) => p.year))].sort((a, b) => b - a);
        $("#pub-list").innerHTML = years.length
          ? years.map((y) => `
            <div class="year-group"><span class="yr">${y}</span>
              <div>${list.filter((p) => p.year === y).map(pubHTML).join("")}</div>
            </div>`).join("")
          : `<p class="empty">No papers match, try another word.</p>`;
        observeReveals();
      }

      chips.addEventListener("click", (e) => {
        const b = e.target.closest("[data-topic]");
        if (!b) return;
        active = b.dataset.topic;
        chips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c === b));
        draw();
      });
      $("#pub-search").addEventListener("input", (e) => { query = e.target.value; draw(); });
      draw();

      $("#manuscripts").innerHTML = S.manuscripts.map((m) =>
        `<li class="reveal"><span class="venue">${esc(m.status)}</span><h3>${esc(m.title)}</h3></li>`).join("");
    },

    news() {
      $("#news-list").innerHTML = S.news.map((n) => `
        <li class="reveal">
          <span class="when">${esc(n.date)}</span>
          <div class="what">
            <span class="node w${n.weight || 1}" aria-hidden="true"></span>
            <span class="tag">${esc(n.tag)}</span>
            <p>${n.text}${n.link ? ` <a href="${esc(n.link)}" aria-label="Read more">${arrow}</a>` : ""}</p>
          </div>
        </li>`).join("");
    },

    teaching() {
      const T = S.teaching;
      $("#courses").innerHTML = T.courses.map((c) => `
        <div class="course reveal"><div><h3>${esc(c.title)}</h3><p class="muted">${esc(c.role)} · ${esc(c.place)}</p></div><span class="mono">${esc(c.years)}</span></div>`).join("");
      $("#supervision-intro").textContent = T.supervisionIntro;
      $("#supervision-topics").innerHTML = T.topics.map((t) => `<span class="chip">${esc(t)}</span>`).join("");
      $("#students").innerHTML = T.students.map((s) => `
        <tr class="${phClass(s).trim()}"><td>${esc(s.name)}${phBadge(s)}</td><td>${esc(s.level)}</td><td>${esc(s.project)}</td><td class="mono">${esc(s.year)}</td></tr>`).join("");
    },

    books() {
      const tones = {
        reading: ["#e2b6c9", "#d9a5bc"],
        favorite: ["#e8cf9c", "#dcbc7f"],
        read: ["#bccbb0", "#a9c0d4", "#cfc3b4", "#b9b2cf"],
      };
      const shelf = $("#shelf");
      shelf.innerHTML = S.books.map((b, i) => {
        const set = tones[b.status] || tones.read;
        const bg = set[i % set.length];
        const height = 190 + ((b.title.length * 7 + i * 23) % 70);
        return `<button class="spine${phClass(b)}" style="background:${bg};height:${height}px" data-i="${i}" aria-pressed="false" aria-label="${esc(b.title)} by ${esc(b.author)}">
          <span>${esc(b.title)}</span><small>${esc(b.status)}</small></button>`;
      }).join("");

      const detail = $("#book-detail");
      function show(i) {
        const b = S.books[i];
        shelf.querySelectorAll(".spine").forEach((s) => s.setAttribute("aria-pressed", s.dataset.i === String(i)));
        detail.innerHTML = `
          <div><p class="tag">${esc(b.status)}${phBadge(b)}</p><h3>${esc(b.title)}</h3><p class="muted">${esc(b.author)}</p>${b.note ? `<p style="margin-top:12px">${esc(b.note)}</p>` : ""}</div>`;
      }
      shelf.addEventListener("click", (e) => { const s = e.target.closest(".spine"); if (s) show(+s.dataset.i); });
      const firstReading = S.books.findIndex((b) => b.status === "reading");
      if (S.books.length) show(firstReading >= 0 ? firstReading : 0);
    },

    activities() {
      const A = S.activities;
      const tl = (items) => items.map((v) => `
        <li class="reveal${phClass(v)}"><span class="yrs">${esc(v.years || v.date)}</span><h3>${esc(v.title)}${phBadge(v)}</h3>
        <p>${esc(v.place || v.venue)}</p>${v.detail ? `<p class="muted">${esc(v.detail)}</p>` : ""}</li>`).join("");
      $("#visits").innerHTML = tl(A.visits);
      $("#talks").innerHTML = tl(A.talks);
      $("#service").innerHTML = A.service.map((s) => `<li class="${phClass(s).trim()}">${esc(s.role)} · <span class="muted">${esc(s.venue)}</span>${phBadge(s)}</li>`).join("");
      $("#recognition").innerHTML = A.recognition.map((r) => `<li>${esc(r)}</li>`).join("");
      $("#languages").innerHTML = A.languages.map((l) => `
        <div class="lang"><dt>${esc(l.name)}</dt><dd>${esc(l.level)}</dd>
        <span class="meter" aria-hidden="true">${[1, 2, 3, 4, 5].map((k) => `<i class="${k <= l.value ? "on" : ""}"></i>`).join("")}</span></div>`).join("");
      $("#hobbies").innerHTML = A.hobbies.map((h) => `
        <div class="card sand reveal${phClass(h)}"><h3>${esc(h.label)}${phBadge(h)}</h3><p>${esc(h.note)}</p></div>`).join("");
    },

    cv() {
      const C = S.cv;
      const tl = (items) => items.map((v) => `
        <li class="reveal"><span class="yrs">${esc(v.years)}</span><h3>${esc(v.title)}</h3><p>${esc(v.place)}</p>${v.detail ? `<p class="muted">${esc(v.detail)}</p>` : ""}</li>`).join("");
      $("#appointments").innerHTML = tl(C.appointments);
      $("#education").innerHTML = tl(C.education);
      const btn = $("#cv-download");
      btn.href = C.pdf;
      // Only advertise the PDF if it actually exists.
      fetch(C.pdf, { method: "HEAD" }).then((r) => { if (!r.ok) throw 0; }).catch(() => {
        btn.removeAttribute("href");
        btn.classList.add("ghost", "placeholder");
        btn.innerHTML = 'PDF coming soon <span class="ph-badge">add ' + esc(C.pdf) + "</span>";
      });
      $("#cv-pubs").innerHTML = S.publications.map(pubHTML).join("");
    },
  };

  /* ---------------- Contact band (all pages) ---------------- */
  const ICONS = {
    email: '<path d="M3 6.5h18v11H3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M3.5 7l8.5 6.5L20.5 7" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    linkedin: '<path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4z"/>',
    x: '<path fill="currentColor" d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78zm-1.08 16.17h1.7L7.4 4.73H5.58z"/>',
    scholar: '<path fill="currentColor" d="M12 2 1 9l4 2.55V16c0 .3.1.6.3.83C6.84 18.6 9.27 20 12 20s5.16-1.4 6.7-3.17c.2-.23.3-.53.3-.83v-4.45L21 10.3V17h2V9zm0 15.5c-1.9 0-3.65-.86-5-2.18v-2.5L12 16l5-3.18v2.5c-1.35 1.32-3.1 2.18-5 2.18z"/>',
    github: '<path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>',
  };

  function renderContact() {
    const host = $("#contact");
    if (!host) return;
    host.className = "contact-band";
    const links = [{ label: "Email", icon: "email", url: "mailto:" + S.person.email }, ...S.person.links].filter((l) => l.url && ICONS[l.icon]);
    host.innerHTML = `
      <div class="wrap">
        <p class="eyebrow"><span class="fix" aria-hidden="true"></span>Let's connect</p>
        <h2>Good ideas begin with a <em>conversation.</em></h2>
        <div class="contact-icons">${links.map((l) =>
          `<a class="icon-link" href="${esc(l.url)}" aria-label="${esc(l.label)}" title="${esc(l.label)}"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">${ICONS[l.icon]}</svg></a>`).join("")}</div>
      </div>`;
  }

  renderHeader();
  if (renderers[page]) renderers[page]();
  renderContact();
  renderFooter();
  observeReveals();
})();
