/* karandeepbhardwaj.me — section router + small enhancements. No dependencies. */
(function () {
  'use strict';

  // Clickjacking guard (meta `frame-ancestors` isn't enforced on GitHub Pages).
  try { if (window.top !== window.self) { window.top.location = window.self.location; } } catch (e) {}

  var views = document.querySelectorAll('.view');
  // Only the actual tab controls — NOT the section panels (which also carry
  // [data-view]). Binding the click handler to a section would preventDefault()
  // every click that bubbles up from inside it, breaking links (contact, projects).
  var tabs = document.querySelectorAll('.nav-btn, .bb-btn');
  var nav = document.getElementById('nav');
  var indicator = document.getElementById('navIndicator');
  var valid = ['about', 'experience', 'projects', 'skills', 'education', 'contact'];
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function positionIndicator() {
    if (!nav || !indicator) return;
    var active = nav.querySelector('.nav-btn.active');
    if (!active) return;
    indicator.style.top = (active.offsetTop + 8) + 'px';
    indicator.style.height = (active.offsetHeight - 16) + 'px';
  }

  function paint(name, focus) {
    views.forEach(function (v) {
      var on = v.getAttribute('data-view') === name;
      v.classList.toggle('active', on);
      if (on) { v.scrollTop = 0; }
    });
    tabs.forEach(function (b) {
      var on = b.getAttribute('data-view') === name;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    positionIndicator();
    if (focus) {
      var panel = document.getElementById('view-' + name);
      if (panel) { try { panel.focus({ preventScroll: true }); } catch (e) { panel.focus(); } }
    }
  }

  function withTransition(run, animate) {
    if (animate && !reduce.matches && document.startViewTransition) {
      document.startViewTransition(run);
    } else {
      run();
    }
  }

  // history: 'push' (user action), 'replace' (initial), or null (back/forward — URL already set)
  function activate(name, history) {
    if (valid.indexOf(name) === -1) name = 'about';
    var focus = history === 'push';
    withTransition(function () { paint(name, focus); }, true);
    try {
      if (history === 'push' && location.hash.slice(1) !== name) {
        window.history.pushState({ v: name }, '', '#' + name);
      } else if (history === 'replace') {
        window.history.replaceState({ v: name }, '', '#' + name);
      }
    } catch (e) {}
  }

  tabs.forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault();
      activate(b.getAttribute('data-view'), 'push');
    });
  });

  // Back / forward and manual hash edits drive the view (no new history entry).
  function fromUrl() { activate((location.hash || '').replace('#', ''), null); }
  window.addEventListener('popstate', fromUrl);
  window.addEventListener('hashchange', fromUrl);

  // ← / → move between sections (only when a tab or the body is focused; never in fields).
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var t = e.target;
    var ok = t === document.body || (t && t.hasAttribute && t.hasAttribute('data-view'));
    if (!ok) return;
    var cur = document.querySelector('.nav-btn.active') || document.querySelector('.bb-btn.active');
    var idx = valid.indexOf(cur ? cur.getAttribute('data-view') : 'about');
    if (e.key === 'ArrowRight' && idx < valid.length - 1) { e.preventDefault(); activate(valid[idx + 1], 'push'); }
    if (e.key === 'ArrowLeft' && idx > 0) { e.preventDefault(); activate(valid[idx - 1], 'push'); }
  });

  // Initial state from the URL hash (no focus steal, no extra history entry).
  var start = (location.hash || '').replace('#', '');
  activate(valid.indexOf(start) !== -1 ? start : 'about', 'replace');

  positionIndicator();
  window.addEventListener('resize', positionIndicator);
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(positionIndicator); }

  // ----- Contact: email kept out of the page source (anti-scrape) -----
  // The address is base64-encoded and only assembled after a real click,
  // so static-HTML scrapers never see it.
  var EMAIL_B64 = 'YmthcmFuZGVlcEBpY2xvdWQuY29t';
  var addr = null;
  function getEmail() { if (!addr) { try { addr = atob(EMAIL_B64); } catch (e) { addr = ''; } } return addr; }

  var emailRow = document.getElementById('emailRow');
  var emailVal = document.getElementById('emailVal');
  var copyBtn = document.getElementById('copyEmail');
  var revealed = false;

  if (emailRow && emailVal) {
    emailRow.addEventListener('click', function () {
      var e = getEmail();
      if (!revealed) {
        revealed = true;
        emailVal.textContent = e;
        emailRow.classList.add('revealed');
        emailRow.setAttribute('aria-label', 'Email ' + e + ' — click again to compose');
        if (copyBtn) copyBtn.hidden = false;
      } else {
        window.location.href = 'mailto:' + e;
      }
    });
  }

  if (copyBtn && navigator.clipboard) {
    var txtEl = copyBtn.querySelector('.ca-txt');
    var label = txtEl ? txtEl.textContent : '';
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(getEmail()).then(function () {
        copyBtn.classList.add('copied');
        if (txtEl) txtEl.textContent = 'Copied';
        copyBtn.setAttribute('aria-label', 'Email address copied');
        setTimeout(function () {
          copyBtn.classList.remove('copied');
          if (txtEl) txtEl.textContent = label;
          copyBtn.setAttribute('aria-label', 'Copy email address');
        }, 1700);
      }).catch(function () {});
    });
  }

  // vCard generated on click (reliable cross-browser download; carries the assembled email).
  var vcardBtn = document.getElementById('vcardBtn');
  if (vcardBtn) {
    vcardBtn.addEventListener('click', function () {
      var vcf = [
        'BEGIN:VCARD', 'VERSION:3.0',
        'N:Bhardwaj;Karandeep;;;', 'FN:Karandeep Bhardwaj',
        'TITLE:Lead Software Engineer',
        'EMAIL;TYPE=INTERNET,PREF:' + getEmail(),
        'URL:https://karandeepbhardwaj.me',
        'item1.URL:https://linkedin.com/in/karandeepbhardwaj', 'item1.X-ABLabel:LinkedIn',
        'item2.URL:https://github.com/karandeepbhardwaj', 'item2.X-ABLabel:GitHub',
        'item3.URL:https://x.com/karandeepbhrdwj', 'item3.X-ABLabel:X',
        'ADR;TYPE=HOME:;;;Toronto;ON;;Canada',
        'NOTE:Lead Software Engineer — production AI systems, agentic workflows, Go, Python, serverless AWS.',
        'END:VCARD'
      ].join('\r\n');
      var blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = 'Karandeep-Bhardwaj.vcf';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
    });
  }

  // Service worker (instant repeat loads + offline).
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function () {});
    });
  }
})();
