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

  // ----- Contact form (Web3Forms). No address is published on the site. -----
  // Replace this placeholder with the real Web3Forms access key. It is the only copy.
  var WEB3FORMS_ACCESS_KEY = 'WEB3FORMS_ACCESS_KEY';

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    var statusEl = document.getElementById('formStatus');
    var submitBtn = contactForm.querySelector('button[type="submit"]');
    var submitLabel = submitBtn ? submitBtn.textContent : 'Send message';
    var sending = false;

    function fieldError(input, el, message) {
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', el.id);
      el.hidden = false;
      el.textContent = message;
    }

    function fieldOk(input, el) {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
      el.hidden = true;
      el.textContent = '';
    }

    function trim(value) { return String(value || '').replace(/^\s+|\s+$/g, ''); }

    function validateForm() {
      var name = contactForm.elements.name;
      var email = contactForm.elements.email;
      var message = contactForm.elements.message;
      var nameError = document.getElementById('nameError');
      var emailError = document.getElementById('emailError');
      var messageError = document.getElementById('messageError');
      var first = null;
      var nameVal = trim(name.value);
      var emailVal = trim(email.value);
      var messageVal = trim(message.value);

      if (!nameVal) { fieldError(name, nameError, 'Enter your name.'); if (!first) first = name; }
      else fieldOk(name, nameError);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        fieldError(email, emailError, 'Enter a valid email address.');
        if (!first) first = email;
      } else fieldOk(email, emailError);
      if (!messageVal) { fieldError(message, messageError, 'Enter a message.'); if (!first) first = message; }
      else fieldOk(message, messageError);

      if (first) first.focus();
      return !first;
    }

    function showStatus(kind, text) {
      statusEl.hidden = false;
      statusEl.className = 'form-status ' + kind;
      statusEl.textContent = text;
      try { statusEl.focus({ preventScroll: true }); } catch (err) { statusEl.focus(); }
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending) return;
      if (statusEl) statusEl.hidden = true;
      if (!validateForm()) return;

      var honeypot = contactForm.elements.botcheck;
      if (honeypot && trim(honeypot.value)) {
        contactForm.reset();
        showStatus('success', 'Message sent. Thank you — I will get back to you.');
        return;
      }

      sending = true;
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
      contactForm.setAttribute('aria-busy', 'true');

      var data = new FormData();
      data.append('access_key', WEB3FORMS_ACCESS_KEY);
      data.append('name', trim(contactForm.elements.name.value));
      data.append('email', trim(contactForm.elements.email.value));
      data.append('message', trim(contactForm.elements.message.value));
      data.append('subject', 'Portfolio message from ' + trim(contactForm.elements.name.value));
      data.append('from_name', trim(contactForm.elements.name.value));
      data.append('botcheck', '');

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      }).then(function (res) {
        return res.json().catch(function () { return { success: false }; });
      }).then(function (body) {
        if (body && body.success) {
          contactForm.reset();
          showStatus('success', 'Message sent. Thank you — I will get back to you.');
        } else {
          showStatus('error', 'The message did not send. Please try again in a moment.');
        }
      }).catch(function () {
        showStatus('error', 'The message did not send. Check your connection and try again.');
      }).then(function () {
        sending = false;
        contactForm.removeAttribute('aria-busy');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitLabel; }
      });
    });
  }

  // vCard generated on click. It carries public profile links only — no email address.
  var vcardBtn = document.getElementById('vcardBtn');
  if (vcardBtn) {
    vcardBtn.addEventListener('click', function () {
      var vcf = [
        'BEGIN:VCARD', 'VERSION:3.0',
        'N:Bhardwaj;Karandeep;;;', 'FN:Karandeep Bhardwaj',
        'TITLE:Senior AI Engineer',
        'ORG:Workday',
        'URL:https://karandeepbhardwaj.me',
        'item1.URL:https://linkedin.com/in/karandeepbhardwaj', 'item1.X-ABLabel:LinkedIn',
        'item2.URL:https://github.com/karandeepbhardwaj', 'item2.X-ABLabel:GitHub',
        'item3.URL:https://x.com/karandeepbhrdwj', 'item3.X-ABLabel:X',
        'ADR:;;;Toronto;ON;;Canada',
        'NOTE:Senior AI Engineer at Workday — AI for Agent Factory and Sana Enterprise. Production AI systems, agentic workflows, Go, Python, serverless AWS.',
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

  // Cloudflare Web Analytics on the public hosts only. Local previews skip the
  // beacon so it does not throw cross-origin console errors.
  var host = location.hostname;
  if (host === 'karandeepbhardwaj.me' || host === 'www.karandeepbhardwaj.me' || host.endsWith('.github.io')) {
    var beacon = document.createElement('script');
    beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    beacon.defer = true;
    beacon.setAttribute('data-cf-beacon', '{"token": "eb2878598f9d4135869b73504e4984c4"}');
    document.body.appendChild(beacon);
  }

  // Service worker (instant repeat loads + offline).
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function () {});
    });
  }
})();
