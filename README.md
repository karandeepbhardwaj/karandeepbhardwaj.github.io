# karandeepbhardwaj.me

[![CI](https://github.com/karandeepbhardwaj/karandeepbhardwaj.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/karandeepbhardwaj/karandeepbhardwaj.github.io/actions/workflows/ci.yml)
[![Security Headers](https://github.com/karandeepbhardwaj/karandeepbhardwaj.github.io/actions/workflows/security-headers.yml/badge.svg)](https://github.com/karandeepbhardwaj/karandeepbhardwaj.github.io/actions/workflows/security-headers.yml)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue?logo=github)](https://karandeepbhardwaj.me)
[![HTTPS](https://img.shields.io/badge/HTTPS-Enforced-brightgreen?logo=letsencrypt)](https://karandeepbhardwaj.me)

Personal portfolio for **Karandeep Bhardwaj** — Lead Software Engineer & AI Systems Architect.

A single, static, fast-loading page. No frameworks, no build step, no animation libraries —
just one self-contained `index.html` with all CSS inlined and (almost) zero JavaScript.

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

## Performance

- One request renders the full page (HTML + inlined CSS)
- A single web font (Hanken Grotesk); headings use the system monospace stack — no extra request
- No CSS/JS bundles, no animation runtime; analytics loaded `async` and non-blocking
- Service Worker (stale-while-revalidate) for instant repeat visits
- Fully responsive, single-column on mobile

## Sections

Hero · About · Experience · Skills · Projects · Education · Contact

The **Projects** section highlights recent open-source work from
[github.com/karandeepbhardwaj](https://github.com/karandeepbhardwaj).

## Security

- **HTTPS enforced** via GitHub Pages + Let's Encrypt
- **Content Security Policy** locked down via `<meta>` (script/style/img/connect/font sources, `frame-ancestors 'none'`)
- **Referrer Policy** — `strict-origin-when-cross-origin`
- **`security.txt`** at `/.well-known/security.txt`

## Architecture

```
karandeepbhardwaj.github.io/
├── index.html      # The entire site — semantic HTML + inlined CSS
├── 404.html        # Custom 404 (matching palette)
├── sw.js           # Service Worker (offline + instant repeat loads)
├── manifest.json   # PWA manifest
├── icon-*.png/svg  # Icons
└── .github/workflows/
    ├── ci.yml                  # HTML validation, link check, Lighthouse
    └── security-headers.yml    # Weekly HTTPS/SSL verification
```

## Local Development

No build step — just serve the files:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## License

&copy; 2026 Karandeep Bhardwaj. All rights reserved.
