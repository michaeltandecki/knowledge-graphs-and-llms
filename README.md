# knowledge-graphs-and-llms

**LLMs Talk. Knowledge Graphs Remember.** — An intuitive look at how LLMs and knowledge graphs complement each other to build more reliable AI systems.

## Setup and build

- **Package manager:** pnpm (not npm).
- **Install:** `pnpm install`
- **Build:** `pnpm build` — generates `index.html` from the slide files under `slides/`.
- **Local preview:** `pnpm start` — serves the repo at `http://localhost:8000` (use this so the Markdown slides load correctly).

## Editing slides

Slides are one **Markdown file per slide** under `slides/`:

```
slides/
  section-1/
    slide-1.md   ← title
    slide-2.md   ← scaffolding
  section-2/
    slide-3.md
    ...
```

Order is given by walking sections and files alphabetically. After editing, run `pnpm build` to regenerate `index.html`.

## Viewing the presentation

- **Local:** Run `pnpm start` and open `http://localhost:8000` (opening `index.html` directly may not load external Markdown).
- **Online:** After enabling GitHub Pages (see below), open `https://<your-username>.github.io/knowledge-graphs-and-llms/`.

## Publishing on GitHub Pages

### Option A: GitHub Action (recommended)

1. In the repo: **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main`; the workflow in `.github/workflows/deploy-pages.yml` will build and deploy automatically.
4. The site will be at `https://<username>.github.io/knowledge-graphs-and-llms/`.

### Option B: Manual deploy from branch

1. Run `pnpm build`, commit the updated `index.html`, and push.
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch **main** (or **master**) and folder **/ (root)**.
5. Save. The site will be at `https://<username>.github.io/knowledge-graphs-and-llms/`.
