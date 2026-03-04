## KG → LLM (Grounding)

Grounding = the answer is constrained by retrieved facts.

- User asks a question → system retrieves relevant subgraph (entities + edges)
- Retrieved subgraph is injected into the prompt context
- LLM responds using those facts instead of guessing from parameters alone

Note:
- This is the KG-enhanced LLM pattern in practice.
- Caution: if retrieval is wrong, grounding amplifies the wrongness.
