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

Dataset scale:

- 18 transcripts
- 24,364 transcript paragraphs processed
- 16,692 extracted triples (entity-relationship facts) in the graph

Focus:

- evaluate retrieval quality for cross-transcript relationship questions
- compare against a vector RAG baseline
