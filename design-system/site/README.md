# CTOC Design System — Documentation Portal

A **self-contained HTML documentation site** for the CTOC Design System. Single file, no build
step, no server — open [`index.html`](./index.html) directly in any browser.

## What's inside
Sidebar-navigated sections (client-side, hash-routable — e.g. `index.html#components`):

- **Overview** — Home, Getting Started, Resources
- **Foundations** — Foundations (live swatches, type, spacing, radius, elevation), Tokens, Variables, Styles
- **Build** — Components (live examples + prop tables), Patterns, Templates
- **Standards** — Accessibility, Governance, Changelog

## On-system by construction
The portal is built from the same tokens the product uses — its CSS custom properties mirror
[`app/globals.css`](../../app/globals.css), so the swatches, severity pills, and component demos
*are* the system, not screenshots. It ships the house rules it documents: a single light/dark
toggle (`aria-pressed`), severity that pairs hue with glyph + label, a skip link, visible focus,
keyboard-operable nav, and `prefers-reduced-motion` support.

## Deploy (optional)
It's a static file — drop it on any host, or publish `design-system/site/` to GitHub Pages as a
sibling of the app. No dependencies beyond the Google Fonts CDN link in the `<head>`.
