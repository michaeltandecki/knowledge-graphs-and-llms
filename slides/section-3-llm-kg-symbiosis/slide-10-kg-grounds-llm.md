## KG → LLM (Grounding)

The graph provides stable entities and relationships; the LLM uses them to give grounded answers.

- User asks a question → system looks up relevant subgraph (entities + edges)
- That subgraph is injected into the prompt as context
- LLM answers using those facts instead of guessing from parameters alone

Note:
- Visual: flow. "User query" → "Graph lookup" (box with small graph) → "Prompt + subgraph" → "LLM" → "Grounded answer." One-way pipeline, clearly labeled.
- Grounding = "answer is tied to retrieved facts." Don't over-explain RAG here; next slide contrasts.
