## Experiment Pipeline Overview

Experiment flow:

<pre class="mermaid">
flowchart LR
  T[Transcripts] --> X[LLM extraction]
  X --> ER[Entities + relationships]
  ER --> G[Graph]
  G --> Q[Queries]
  Q --> A[LLM answers]
</pre>

Focus:

- evaluate retrieval quality for cross-transcript relationship questions
- compare against a Vector RAG baseline
