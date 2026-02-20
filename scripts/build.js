#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SLIDES_DIR = path.join(__dirname, '..', 'slides');

function collectSlidePaths(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  const dirs = [];
  for (const e of entries) {
    const rel = path.join(base, e.name);
    if (e.isDirectory()) dirs.push(rel);
    else if (e.name.endsWith('.md')) files.push(rel);
  }
  dirs.sort();
  files.sort();
  const result = [];
  for (const d of dirs) {
    result.push(...collectSlidePaths(path.join(dir, d), d));
  }
  result.push(...files);
  return result;
}

const slidePaths = collectSlidePaths(SLIDES_DIR).map((p) => p.replace(/\\/g, '/'));

// Group slides by first path segment (intro, section-1, section-2, …) for 2D navigation:
// left/right = between sections, up/down = within section
const groupOrder = [...new Set(slidePaths.map((p) => p.split('/')[0]))];
const byGroup = new Map();
for (const p of slidePaths) {
  const group = p.split('/')[0];
  if (!byGroup.has(group)) byGroup.set(group, []);
  byGroup.get(group).push(p);
}

const sections = groupOrder
  .map((group) => {
    const files = byGroup.get(group);
    const inner = files
      .map((p) => `        <section data-markdown="slides/${p}" data-separator="^\\n\\n\\n" data-separator-vertical="^\\n\\n"></section>`)
      .join('\n');
    return `      <section>\n${inner}\n      </section>`;
  })
  .join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Knowledge Graphs and LLMs</title>
  <link rel="icon" href="favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="https://unpkg.com/reveal.js@5.2.1/dist/reveal.css" />
  <link rel="stylesheet" href="https://unpkg.com/reveal.js@5.2.1/dist/theme/moon.css" />
  <link rel="stylesheet" href="css/custom.css" />
</head>
<body>
  <div class="reveal">
    <div class="slides">
${sections}
    </div>
  </div>

  <script src="https://unpkg.com/reveal.js@5.2.1/dist/reveal.js"></script>
  <script src="https://unpkg.com/reveal.js@5.2.1/plugin/markdown/markdown.js"></script>
  <script src="https://unpkg.com/reveal.js@5.2.1/plugin/notes/notes.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/reveal.js-mermaid-plugin@11.12.3/plugin/mermaid/mermaid.js"></script>
  <script>
    Reveal.initialize({
      hash: true,
      width: 1200,
      height: 700,
      plugins: [ RevealMarkdown, RevealNotes, RevealMermaid ],
      mermaid: { theme: 'dark' }
    });
  </script>
</body>
</html>
`;

const outPath = path.join(__dirname, '..', 'index.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log('Built index.html with', slidePaths.length, 'slide(s):', slidePaths.join(', '));
