# Agents and Site Notes

This document briefly describes recent structural changes made to the site and explains where to find and how to manage the bits that behave like "agents" (small scripts/includes) across the static site.

Summary of important files
- `_config.yml` — site metadata (title, tagline, author, url, email, site text). Templates read values from `site.*`.
- `_data/quotes.yml` — quotes data used to render the "Quotes I like" section at build time.
- `_data/publications.yml` — publications data used to render the Publications section.
- `_includes/theme-init.html` — tiny inline script that runs early (in the `<head>`) to apply a saved theme before the page renders. Prevents theme flash.
- `_includes/theme-toggle.html` — the theme toggle button markup as a reusable include.
- `assets/js/theme.js` — external JS that wires up the theme toggle and persists choices to `localStorage`.

Why this structure
- Keep behavior minimal and predictable: static content is generated at build time (Jekyll) from `_data` files; runtime behaviour is small and isolated in `assets/js` and `_includes`.
- The inline theme-init script must run before CSS renders to avoid a visual "flash" of the wrong theme for users who saved a preference.

How to update
- To add or edit quotes: edit `_data/quotes.yml` (YAML list of objects with `text` and `author`). Jekyll will expose it as `site.data.quotes`.
- To add or edit publications: edit `_data/publications.yml` (objects with `title`, `url`, `summary`, `year`). Templating in `index.html` iterates over `site.data.publications`.
- To change site metadata (site title, tagline, email, canonical URL, etc.) edit `_config.yml`.
- To change the theme toggle markup: edit `_includes/theme-toggle.html`.
- To modify theme behaviour: edit `assets/js/theme.js` (toggle handler) and `_includes/theme-init.html` (early apply).

Build & deploy
- Local build: install Jekyll and run `jekyll build` or `jekyll serve` in the site root.
- GitHub Pages: push the repository to a `username.github.io` repo or configure Pages for the project repository. GitHub Pages will build the site automatically (uses a safe set of plugins).

Notes and troubleshooting
- If you still see the wrong theme on initial load, ensure `_includes/theme-init.html` is included near the top of the `<head>` (it is by default in `index.html`) and that there is no blocking script before it.
- If the theme toggle doesn't persist, check browser console for `localStorage` errors (private mode may restrict storage).
- If publications or quotes don't appear, ensure the corresponding `_data/*.yml` files are valid YAML. The site will fail to build on malformed YAML.

If you want, I can:
- Move shared header/footer into `_includes` and create `_layouts/default.html` so the include is available on all pages.
- Add more robust accessibility attributes on the toggle (e.g., visually-hidden text and focus styles).

— end —
