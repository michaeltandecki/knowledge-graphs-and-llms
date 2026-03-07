## First Attempt: Vector RAG Pipeline

Default modern grounding pipeline:

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

Why it became standard:

- simple to implement
- good semantic retrieval baseline
- easy to integrate with LLM applications
