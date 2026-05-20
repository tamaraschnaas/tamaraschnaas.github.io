/* ============================================
   TAMARA — site behavior
   ============================================ */

(function () {
  // ---------- i18n ----------
  let currentLang = 'es';
  const dict = window.I18N;

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    const map = dict[lang];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (map[key] != null) el.textContent = map[key];
    });
    document.querySelectorAll('.lang-toggle__opt').forEach((el) => {
      el.classList.toggle('is-active', el.dataset.lang === lang);
    });
  }

  document.getElementById('lang-toggle').addEventListener('click', () => {
    applyLang(currentLang === 'es' ? 'en' : 'es');
  });

  // initial
  applyLang('es');

  // ---------- clock ----------
  const clockEl = document.getElementById('clock');
  function tick() {
    const d = new Date();
    const tz = 'America/Mexico_City';
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone: tz
    });
    clockEl.textContent = fmt.format(d) + ' CDMX';
  }
  tick();
  setInterval(tick, 1000);

  // ---------- magnetic name (mouse-reactive type) ----------
  const nameEl = document.getElementById('magnetic-name');
  const words = nameEl.querySelectorAll('.word');

  let raf = null;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  function updateMagnetic() {
    const heroRect = document.getElementById('hero').getBoundingClientRect();
    // viewport-normalized cursor (-1..1 from hero center)
    const cx = heroRect.left + heroRect.width / 2;
    const cy = heroRect.top + heroRect.height / 2;
    const nx = (mouseX - cx) / (heroRect.width / 2);
    const ny = (mouseY - cy) / (heroRect.height / 2);

    words.forEach((w, i) => {
      // each line reacts a bit differently
      const factor = 14 + i * 8; // px
      const tx = nx * factor;
      const ty = ny * (factor * 0.4);
      const skew = nx * (1.2 + i * 0.4);
      w.style.transform =
        `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) skewX(${skew.toFixed(2)}deg)`;
    });
    raf = null;
  }

  function onMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (raf == null) raf = requestAnimationFrame(updateMagnetic);
  }
  window.addEventListener('mousemove', onMove, { passive: true });

  // touch fallback: subtle drift on scroll
  window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    if (!t) return;
    mouseX = t.clientX; mouseY = t.clientY;
    if (raf == null) raf = requestAnimationFrame(updateMagnetic);
  }, { passive: true });

  // ---------- visit count (localStorage tally) ----------
  try {
    const k = 'tts_visits';
    let n = parseInt(localStorage.getItem(k) || '0', 10);
    n = Number.isFinite(n) ? n + 1 : 1;
    localStorage.setItem(k, String(n));
    const padded = String(n).padStart(3, '0');
    document.getElementById('visit-count').textContent = `VISITA · ${padded}`;
  } catch (_) { /* ignore */ }

  // ---------- copy vCard ----------
  const VCARD = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Tamara Terroba Schnaas',
    'N:Terroba Schnaas;Tamara;;;',
    'EMAIL;TYPE=INTERNET:tamaschnaas@gmail.com',
  
    'ADR;TYPE=HOME:;;Mexico City;;;;Mexico',
    'URL:https://github.com/tamaraschnaas',
    'NOTE:Data Science · ITAM',
    'END:VCARD'
  ].join('\r\n');

  const toast = document.getElementById('toast');
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('is-show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('is-show'), 1800);
  }

  document.getElementById('copy-card').addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(VCARD);
      showToast(dict[currentLang]['toast.copied']);
    } catch (_) {
      // fallback: download .vcf
      const blob = new Blob([VCARD], { type: 'text/vcard' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'tamara-terroba.vcf'; a.click();
      URL.revokeObjectURL(url);
    }
  });

  // ---------- subtle reveal on scroll ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.block, .row, .card').forEach((el) => io.observe(el));
})();
