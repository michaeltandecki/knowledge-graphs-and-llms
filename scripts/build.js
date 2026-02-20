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

const sections = slidePaths
  .map((p) => `      <section data-markdown="slides/${p}" data-separator="^\\n\\n\\n" data-separator-vertical="^\\n\\n"></section>`)
  .join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Knowledge Graphs and LLMs</title>
  <link rel="stylesheet" href="https://unpkg.com/reveal.js@5.2.1/dist/reveal.css" />
  <link rel="stylesheet" href="https://unpkg.com/reveal.js@5.2.1/dist/theme/black.css" />
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
  <script>
    Reveal.initialize({
      hash: true,
      width: 1200,
      height: 700,
      plugins: [ RevealMarkdown, RevealNotes ]
    });
  </script>
</body>
</html>
`;

const outPath = path.join(__dirname, '..', 'index.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log('Built index.html with', slidePaths.length, 'slide(s):', slidePaths.join(', '));
