## Vector RAG: Pipeline, Strengths, and Limits

<pre class="mermaid">
flowchart LR
  D[Documents] --> C[Chunking]
  C --> E[Embeddings]
  E --> V[Vector DB]
  Q[User question] --> QE[Query embedding]
  QE --> V
  V --> R[Top-k retrieval]
  R --> LLM[LLM]
  LLM --> A[Answer]
  Q --> LLM
</pre>

<div class="two-col strengths-limits-grid">
  <div class="strengths-limits-pane strengths-pane">
    <h3>Strengths</h3>
    <ul>
      <li>semantic similarity search works well for broad recall</li>
      <li>retrieves relevant passages quickly</li>
      <li>grounds answers in source text</li>
    </ul>
  </div>
  <div class="strengths-limits-pane limits-pane">
    <h3>Limitations</h3>
    <ul>
      <li>hard to connect facts across many documents</li>
      <li>weak entity identity / disambiguation </li>
      <li>multi-hop relationships remain implicit in text</li>
    </ul>
  </div>
</div>
