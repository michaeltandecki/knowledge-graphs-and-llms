## What didn't work? Retrieval.

**Question:**
Who was a Google employee that later founded their own company?

<div class="two-col graph-core-idea-grid">
  <div class="graph-core-idea-pane graph-core-idea-text-pane">
    <p><strong>Ideal retrieval output</strong></p>
    <p>With a good graph query, we can retrieve rich evidence (see figure):</p>
    <p><code>(s:Company)-[:FOUNDED]-(p:Person)-[:WORKED_AT]-(c:Company {name: "Google"})</code></p>
    <p>This two-hop Cypher pattern pulls both sides of the relation in one result set, improving answer coverage.</p>
    <p><strong>Limitation:</strong> this Cypher query still does not model temporal order (worked at Google first, founded company later).</p>
  </div>
  <div class="graph-core-idea-pane graph-core-idea-visual-pane">
    <img
      class="mini-graph-svg"
      src="slides/assets/mini-graphs/retrieval-founded-duplicates.svg"
      alt="All retrieved nodes and edges from the system in the poc."
    />
  </div>
</div>
