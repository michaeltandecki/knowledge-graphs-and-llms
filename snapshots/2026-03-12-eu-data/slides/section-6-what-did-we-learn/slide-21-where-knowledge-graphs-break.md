## KG Failure Modes (and what helps)

<div class="two-col strengths-limits-grid">
  <div class="strengths-limits-pane limits-pane">
    <ul>
      <li>enforce ontology adherence during extraction; small schema drift can silently erase valid answers at query time</li>
      <li>validate against the original text and ontology; check that extracted entities and relationships are present and use allowed types</li>
    </ul>
  </div>
  <div class="strengths-limits-pane strengths-pane">
    <ul>
      <li>treat query design as a first-class iteration loop; test multi-hop patterns early or you'll miss real cross-entity links</li>
      <li>Cypher query generation is not the only option; search through references, 
      vector embeddings, etc.</li>
    </ul>
  </div>
</div>
