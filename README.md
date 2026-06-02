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

A warm, minimalist, editorial layout inspired by Anthropic's design language:

- **Easy-on-the-eyes palette** — warm ivory background (`#f6f5f0`) with a clay/terracotta accent (`#bd5d3a`)
- **System fonts only** — a serif display stack for headings + the native system sans for body, so there are **zero font network requests** and no layout shift
- **All CSS inlined** — the entire page renders from a single HTML request
- **No loaders, no entrance animations** — content is static and visible instantly; the only motion is subtle hover states and CSS smooth-scroll (disabled under `prefers-reduced-motion`)

## Performance

- One request renders the full page (HTML + inlined CSS)
- No web fonts, no CSS/JS bundles, no animation runtime
- Images lazy-loaded; analytics loaded `async` and non-blocking
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
