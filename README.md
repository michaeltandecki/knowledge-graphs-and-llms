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

**Images:** Use standard Markdown, e.g. `![alt text](path/to/image.png)`, or raw HTML if you need size/class control.

**Mermaid diagrams:** Embed programmatic diagrams (flowcharts, graphs, nodes and edges) with raw HTML in any slide. Use `<pre class="mermaid">` (the reveal.js-mermaid-plugin expects this):

```html
<pre class="mermaid">
flowchart LR
  A[Tokens] --> B[No memory]
  C[KG] --> D[Nodes and edges]
</pre>
```

Speaker notes go in a line starting with `Note:` (with a blank line before it).

## Theme and customization

- **Base theme:** Set in the build template in `scripts/build.js` (e.g. `moon.css`, `black.css`). See [Reveal.js themes](https://revealjs.com/themes/).
- **Overrides:** Edit `css/custom.css` for typography, spacing, title slide, blockquotes, and layout helpers (`.two-col`, `.highlight-box`, `.dim`).
- **Favicon:** The repo includes `favicon.svg` (a small knowledge-graph icon). To use your own (e.g. a company logo): replace `favicon.svg` with your image, or add a `favicon.ico` / `favicon.png` and change the `<link rel="icon">` in `scripts/build.js` to point to it. To generate a favicon from an image URL (e.g. a logo): use [realfavicongenerator.net](https://realfavicongenerator.net/) (paste the image URL or upload a file), then download the package and copy the favicon files into the repo and update the build/deploy to include them.

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
