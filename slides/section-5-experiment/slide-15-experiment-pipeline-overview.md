## Experiment Pipeline Overview

Experiment flow, straightforward in theory...

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

- enable and evaluate cross-transcript relationship questions
- compare against a vector RAG baseline
