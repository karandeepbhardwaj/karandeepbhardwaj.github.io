# karandeepbhardwaj.me

[![CI](https://github.com/karandeepbhardwaj/karandeepbhardwaj.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/karandeepbhardwaj/karandeepbhardwaj.github.io/actions/workflows/ci.yml)
[![Security Headers](https://github.com/karandeepbhardwaj/karandeepbhardwaj.github.io/actions/workflows/security-headers.yml/badge.svg)](https://github.com/karandeepbhardwaj/karandeepbhardwaj.github.io/actions/workflows/security-headers.yml)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue?logo=github)](https://karandeepbhardwaj.me)
[![HTTPS](https://img.shields.io/badge/HTTPS-Enforced-brightgreen?logo=letsencrypt)](https://karandeepbhardwaj.me)

Personal portfolio for **Karandeep Bhardwaj** — Lead Software Engineer & AI Systems Architect.

A single, static, fast-loading page. No frameworks, no build step, no animation libraries,
no third-party scripts — `index.html` with all CSS inlined plus one tiny vanilla `js/app.js`.

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

- **Self-hosted contact actions** — copy-email-to-clipboard, downloadable vCard (`.vcf`), and the résumé PDF.
- **Accessible by design** — ARIA `tablist`/`tab`/`tabpanel`, focus moved into the activated panel, skip link, AA-contrast text, 48px mobile tap targets, broad `prefers-reduced-motion` support, and a `<noscript>` fallback that shows every section.
- **Browser Back / Forward** works via `pushState` (each section is a real history entry).

## Performance

- One request renders the full page (HTML + inlined CSS) + one tiny deferred `js/app.js`
- **Self-hosted, preloaded variable font** (Hanken Grotesk, one 34 KB woff2 covering all weights) — no third-party font chain; headings use the system monospace stack
- **No third-party scripts** — analytics removed; nothing blocks render
- **View Transitions** for section swaps (reduced-motion-guarded), graceful fallback
- Service Worker (network-first HTML, cache-first assets) — always-fresh content, instant offline repeat visits, font + PDF precached
- Fully responsive, single-column on mobile

## Sections

About · Experience · Projects · Skills · Education · Contact

The **Projects** section highlights recent open-source work from
[github.com/karandeepbhardwaj](https://github.com/karandeepbhardwaj).

## Security & Privacy

- **HTTPS enforced** via GitHub Pages + Let's Encrypt
- **Hardened Content Security Policy** — `default-src 'self'`, `script-src 'self'` (no `'unsafe-inline'`), `object-src 'none'`, `frame-ancestors 'none'`; backed by a JS frame-buster since Pages can't set real headers
- **No analytics, no cookies, no third-party origins** — privacy-first, matching the projects it showcases
- **Referrer Policy** `strict-origin-when-cross-origin`; external links use `rel="noopener noreferrer"`
- **`security.txt`** at `/.well-known/security.txt`
- Rich social previews via a generated 1200×630 `og-cover.png`; structured data covers role, employer, education, and the AWS credential.

> Want analytics back? Add a cookieless provider (Plausible / Umami / Cloudflare Web Analytics) — no consent banner needed.

## Architecture

```
karandeepbhardwaj.github.io/
├── index.html                  # The entire site — semantic HTML + inlined CSS
├── js/app.js                   # Section router, ARIA, View Transitions, copy-email (vanilla)
├── fonts/                      # Self-hosted Hanken Grotesk (variable woff2)
├── og-cover.png                # 1200×630 social share card
├── karandeep-bhardwaj.vcf      # Downloadable contact card
├── Karandeep_Resume_2026.pdf   # Résumé
├── 404.html                    # Custom 404 (Ink palette)
├── sw.js                       # Service Worker (network-first HTML, cache-first assets)
├── manifest.json               # PWA manifest
├── icon-*.png/svg              # Icons
└── .github/workflows/
    ├── ci.yml                  # HTML validation, link check, Lighthouse
    └── security-headers.yml    # Weekly HTTPS/SSL verification
```

> **Updating the résumé / sitemap:** replace `Karandeep_Resume_2026.pdf` in place, and bump
> `<lastmod>` in `sitemap.xml` + `CACHE_NAME` in `sw.js` when content changes.

## Local Development

No build step — just serve the files:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## License

&copy; 2026 Karandeep Bhardwaj. All rights reserved.
