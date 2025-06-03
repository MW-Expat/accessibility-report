# Accessibility & Performance Audit Pipeline 🚦

This repo contains a **fully-automated weekly audit** of your production site:

| Tool              | What it checks                                              | Output                                            |
| ----------------- | ----------------------------------------------------------- | ------------------------------------------------- |
| **Lighthouse CI** | Performance, best-practices, SEO, PWA, accessibility scores | JSON reports (rendered via Google’s Viewer) |
| **Pa11y CI**      | WCAG 2.1 AA accessibility issues                            | Pre-styled HTML reports                           |

All reports are versioned by date and published to **GitHub Pages** with an auto-generated index so you can browse historical runs in one click.

---

## ✨ Quick demo

| Umbrella index                                  | Per-tool detail page                                        |
| ----------------------------------------------- | ----------------------------------------------------------- |
| `/lhci/index.html` → lists every Lighthouse run | `/lhci/2025-06-03/index.html` → pick a page, instant viewer |
| `/pa11y/index.html` → lists every Pa11y run     | `/pa11y/2025-06-03/index.html` → Pa11y’s own multi-page UI  |

Open https://mw-expat.github.io/accessibility-report/pa11y/index.html or https://mw-expat.github.io/accessibility-report/lhci/index.html once the workflow finishes.

---

## ⚙️ GitHub Actions explained

| Step                              | Key points                                                                |
| --------------------------------- | ------------------------------------------------------------------------- |
| **Sanitise date**                 | Converts `github.run_started_at` → `YYYY-MM-DD` for folder names.         |
| **Checkout (source)**             | Regular checkout to run Node, install deps, etc.                          |
| **Install Chrome Canary**         | Uses `@puppeteer/browsers` (stable Chrome in the runner can be outdated). |
| **Checkout (gh-pages) ➜ `site/`** | Brings all historic reports into the workspace.                           |
| **Run Lighthouse CI / Pa11y CI**  | Output to `public/…/$REPORT_DATE`.                                        |
| **Merge artefacts → `site/…`**    | Keeps history intact with a simple `rsync -a`.                            |
| **Build umbrella indexes**        | Re-scans *all* date folders and rebuilds `index.html`.                    |
| **Deploy with `keep_files:true`** | Publishes the updated `site/` directory back to **gh-pages**.             |

### Cron schedule

```yaml
on:
  schedule:
    - cron: '0 6 * * 1'   # 06:00 every Monday UTC
  workflow_dispatch:       # manual run
```

Change the cron string to fit your cadence.

---

## 🔧 Customisation tips

| Want…                              | Do this                                                                                                                                              |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Different URLs**                 | Edit `urls` in `.lighthouserc.js` and `.pa11yci.js`.                                                                                                 |
| **Add HTML output for Lighthouse** | In `.lighthouserc.js`, set<br>`collect: { settings: { output: ['html','json'] } }` and adjust the index script loop from `report-*.json` → `*.html`. |
| **Stricter Pa11y standard**        | Change `standard: 'WCAG2AAA'` (AAA) or `'WCAG2A'` (A).                                                                                               |
| **Run on pull-requests as well**   | Add a `pull_request` trigger and swap the cron job for a matrix run.                                                                                 |
| **Self-hosted Viewer (no CDN)**    | Serve `/viewer/index.html` in your Pages branch and change the iframe URL accordingly.                                                               |

---

## 🛡 Permissions / Secrets

The workflow requires the default `GITHUB_TOKEN` with `pages:write`, `contents:write`, and `id-token:write` (for OIDC).
No extra secrets are needed unless you push to a protected branch.

---

## ✍️ License

MIT — feel free to copy, tweak, and share.
If you improve the umbrella scripts, a PR back is always welcome!
