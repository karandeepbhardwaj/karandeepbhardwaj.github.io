/* karandeepbhardwaj.me — section router + small enhancements. No dependencies. */
(function () {
  'use strict';

  // Clickjacking guard (meta `frame-ancestors` isn't enforced on GitHub Pages).
  try { if (window.top !== window.self) { window.top.location = window.self.location; } } catch (e) {}

  var views = document.querySelectorAll('.view');
  var tabs = document.querySelectorAll('[data-view]');
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

  // Copy email to clipboard.
  var copyBtn = document.getElementById('copyEmail');
  if (copyBtn && navigator.clipboard) {
    var txtEl = copyBtn.querySelector('.ca-txt');
    var label = txtEl ? txtEl.textContent : '';
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(copyBtn.getAttribute('data-email') || '').then(function () {
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

  // Service worker (instant repeat loads + offline).
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function () {});
    });
  }
})();
