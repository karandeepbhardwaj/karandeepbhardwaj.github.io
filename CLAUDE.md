# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal portfolio site for Karandeep Bhardwaj, hosted on GitHub Pages at karandeepbhardwaj.me. No build tools, bundlers, or package managers — plain HTML/CSS/JS with ES modules.

## Development

Open `index.html` in a browser. No build step or dev server required. For local development with service worker support, use any static file server (e.g., `python3 -m http.server`).

## Architecture

Single-page site with one HTML file (`index.html`), one CSS file (`style.css`), and modular JS under `js/`.

### Visual Design — Liquid Glass
The site uses a "liquid glass" aesthetic inspired by Apple's iOS design language:
- **Animated gradient mesh background** on `body` (radial gradients with `background-attachment: fixed`)
- **`.glass-panel`** — frosted glass cards for section content using `backdrop-filter: blur()`, semi-transparent backgrounds, and layered inner shadows
- **`.glass-pill`** — pill-shaped glass elements for nav bar, skill tags, status badge
- **`.glass-button`** — glass-styled CTA buttons
- Light and dark themes have distinct glass tokens (white-tinted vs dark translucent)
- `mix-blend-mode: plus-lighter` is wrapped in `@supports` for Firefox fallback

### JavaScript Modules (ES modules loaded via `type="module"`)
- `js/main.js` — Entry point; imports and initializes all modules
- `js/theme.js` — Dark/light mode toggle with localStorage persistence and system preference detection. Theme is applied via `data-theme` attribute on `<html>`
- `js/navigation.js` — Floating bottom nav bar with IntersectionObserver-based active section tracking, back-to-top button, smooth scrolling
- `js/animations.js` — Scroll reveal animations, hero typing effect, skill tag stagger entrance
- `js/command-palette.js` — Cmd/Ctrl+K command palette with keyboard navigation; imports from theme.js and navigation.js

### CSS Design System
All design tokens are CSS custom properties defined in `:root` and overridden in `[data-theme="dark"]`. Use the existing `--color-*`, `--glass-*`, `--pill-*`, `--mesh-*`, `--space-*`, `--text-*`, and `--transition-*` variables rather than hardcoding values.

### Navigation
The site uses a floating pill-shaped nav bar fixed at the bottom center of the viewport. It contains SVG icon links to sections (Home, About, Experience, Skills, Contact) plus a theme toggle. Active section is tracked via IntersectionObserver.

### PWA
- `sw.js` — Service worker with network-first (HTML) and cache-first (assets) strategies. Cache version is `CACHE_NAME` constant — bump it when deploying asset changes.
- `manifest.json` — Web app manifest

### External Services
- Google Analytics: `G-F93L5YE4B0`
- Contact form: Formspree (`formspree.io/f/mjknzlon`)
