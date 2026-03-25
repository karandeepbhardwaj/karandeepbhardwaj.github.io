# karandeepbhardwaj.me

[![CI](https://github.com/karandeepbhardwaj/karandeepbhardwaj.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/karandeepbhardwaj/karandeepbhardwaj.github.io/actions/workflows/ci.yml)
[![Security Headers](https://github.com/karandeepbhardwaj/karandeepbhardwaj.github.io/actions/workflows/security-headers.yml/badge.svg)](https://github.com/karandeepbhardwaj/karandeepbhardwaj.github.io/actions/workflows/security-headers.yml)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue?logo=github)](https://karandeepbhardwaj.me)
[![HTTPS](https://img.shields.io/badge/HTTPS-Enforced-brightgreen?logo=letsencrypt)](https://karandeepbhardwaj.me)
[![W3C Validation](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fkarandeepbhardwaj.me)](https://validator.w3.org/nu/?doc=https%3A%2F%2Fkarandeepbhardwaj.me%2F)

Personal portfolio website for **Karandeep Bhardwaj** — Senior Full-Stack Engineer.

## Tech Stack

- Vanilla HTML/CSS/JS (no frameworks)
- PWA with offline support (Service Worker)
- GitHub Pages with custom domain + HTTPS
- Google Analytics
- Formspree contact form

## Security

- HTTPS enforced via GitHub Pages + Let's Encrypt
- Content Security Policy (CSP) via meta tags
- X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- `security.txt` at `/.well-known/security.txt`

## CI/CD

- **HTML Validation** — validates all HTML files on every push/PR
- **Broken Link Check** — catches dead links before they go live
- **Lighthouse Audit** — performance, accessibility, SEO, and best practices scoring
- **Security Headers Check** — weekly verification of HTTPS and SSL certificate
