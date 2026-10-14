# karandeepbhardwaj.me

[![CI](https://github.com/karandeepbhardwaj/karandeepbhardwaj.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/karandeepbhardwaj/karandeepbhardwaj.github.io/actions/workflows/ci.yml)
[![Security Headers](https://github.com/karandeepbhardwaj/karandeepbhardwaj.github.io/actions/workflows/security-headers.yml/badge.svg)](https://github.com/karandeepbhardwaj/karandeepbhardwaj.github.io/actions/workflows/security-headers.yml)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue?logo=github)](https://karandeepbhardwaj.me)
[![HTTPS](https://img.shields.io/badge/HTTPS-Enforced-brightgreen?logo=letsencrypt)](https://karandeepbhardwaj.me)

Personal portfolio for **Karandeep Bhardwaj** — Senior AI Engineer at Workday.

A single, static, fast-loading page. No frameworks, no build step, no animation libraries.
`index.html` inlines all CSS, plus one tiny vanilla `js/app.js`. Cloudflare Web Analytics is the only third-party script.

> **[karandeepbhardwaj.me](https://karandeepbhardwaj.me)**

---

## Design

Implemented from a [Claude Design](https://claude.ai/design) handoff — an **"Ink editorial"** look:

- **Tabbed single view, no page scroll** — a fixed left sidebar (desktop) / bottom tab bar (mobile) swaps sections into a fixed stage. Each view fits the viewport and scrolls internally only if long. Hash deep-links + ← → arrow keys also navigate.
- **Signature nav** — a measured vertical scale: track line, sliding accent indicator, mono index numerals (01–06), and an arrow that reveals on the active row.
- **Palette** — warm paper (`#F2EFE9`) with a near-black editorial accent (`#2C2924`), flat outlined cards.
- **Type** — monospace display headings over **Hanken Grotesk** body (one web font).
- **No entrance animations, no spinners, no scroll effects** — only gentle hover states and the indicator glide (disabled under `prefers-reduced-motion`).
- Sections: About · Experience · Projects (the centerpiece — GitHub cards with local/offline-first badges) · Skills · Education · Contact.

- **Contact form** — name, email, and message post to [Web3Forms](https://api.web3forms.com/submit) without a page reload. The public access key is the `WEB3FORMS_ACCESS_KEY` constant in `js/app.js`. A honeypot field drops spam. The downloadable vCard has no email address. The résumé PDF is offline until a new file is ready.
- **Accessible by design** — ARIA `tablist`/`tab`/`tabpanel`, focus moved into the activated panel, skip link, AA-contrast text, 48px mobile tap targets, broad `prefers-reduced-motion` support, and a `<noscript>` fallback that shows every section.
- **Browser Back / Forward** works via `pushState` (each section is a real history entry).

## Performance

- One request renders the full page (HTML + inlined CSS) + one tiny deferred `js/app.js`
- **Self-hosted, preloaded variable font** (Hanken Grotesk, one 34 KB woff2 covering all weights) — no third-party font chain; headings use the system monospace stack
- **Cloudflare Web Analytics** loads deferred and does not block render. It is cookieless. No other third-party scripts.
- **View Transitions** for section swaps (reduced-motion-guarded), graceful fallback
- Service Worker (network-first HTML, cache-first assets) — always-fresh content, instant offline repeat visits, font and icons precached
- Fully responsive, single-column on mobile

## Sections

About · Experience · Projects · Skills · Education · Contact

The **Projects** section highlights recent open-source work from
[github.com/karandeepbhardwaj](https://github.com/karandeepbhardwaj).

## Security & Privacy

- **HTTPS enforced** via GitHub Pages + Let's Encrypt
- **Hardened Content Security Policy** — `default-src 'self'`, `script-src 'self'` (no `'unsafe-inline'`), `object-src 'none'`, `frame-ancestors 'none'`; backed by a JS frame-buster since Pages can't set real headers
- **Cookieless Cloudflare Web Analytics** and the Web3Forms contact endpoint (`https://api.web3forms.com`, allowed in `connect-src` and `form-action`). No ad pixels. The Web3Forms access key is a public client key; lock it to this domain in the Web3Forms dashboard.
- **Referrer Policy** `strict-origin-when-cross-origin`; external links use `rel="noopener noreferrer"`
- **`security.txt`** at `/.well-known/security.txt`
- Rich social previews via a generated 1200×630 `og-cover.png`; structured data covers the current role, employer, education, and the AWS credential.

## Architecture

```
karandeepbhardwaj.github.io/
├── index.html                  # The entire site — semantic HTML + inlined CSS
├── js/app.js                   # Section router, ARIA, View Transitions, contact form (vanilla)
├── fonts/                      # Self-hosted Hanken Grotesk (variable woff2)
├── og-cover.png                # 1200×630 social share card
├── 404.html                    # Custom 404 (Ink palette)
├── sw.js                       # Service Worker (network-first HTML, cache-first assets)
├── manifest.json               # PWA manifest
├── icon-*.png/svg              # Icons
└── .github/workflows/
    ├── ci.yml                  # HTML validation, link check, Lighthouse
    └── security-headers.yml    # Weekly HTTPS/SSL verification
```

> **Updating the sitemap:** bump `<lastmod>` in `sitemap.xml` and `CACHE_NAME` in `sw.js` when content changes.
> The contact card (`.vcf`) is generated in the browser from `js/app.js`, not stored as a file, and it does not include an email address.
> The Web3Forms access key is the public `WEB3FORMS_ACCESS_KEY` constant in `js/app.js`.
>
> Workday starts July 2026 and is the current role. Sun Life ended July 2026.
> The résumé PDF is not published. Add it back only after Karandeep supplies an updated file.

## Local Development

No build step — just serve the files:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## License

&copy; 2026 Karandeep Bhardwaj. All rights reserved.
