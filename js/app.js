/* karandeepbhardwaj.me: contact form, vCard, analytics, service worker.
   One scrolling page, no router. No dependencies. */
(function () {
  'use strict';

  // Clickjacking guard (meta `frame-ancestors` isn't enforced on GitHub Pages).
  try { if (window.top !== window.self) { window.top.location = window.self.location; } } catch (e) {}

  // ----- Contact form (Web3Forms). No address is published on the site. -----
  // Replace this placeholder with the real Web3Forms access key. It is the only copy.
  var WEB3FORMS_ACCESS_KEY = '3d6ce322-3122-4628-af79-ab6ff4cba5ac';

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
        showStatus('success', 'Message sent. Thank you. I will get back to you.');
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
          showStatus('success', 'Message sent. Thank you. I will get back to you.');
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

  // vCard generated on click. It carries public profile links only, no email address.
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
        'NOTE:Senior AI Engineer at Workday: AI for Agent Factory and Sana Enterprise. Production AI systems, agentic workflows, Go, Python, serverless AWS.',
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
