## LLM → Knowledge Graph

LLMs can extract entities and relationships from text and feed the graph.

- Start from transcripts/docs, but target a **small ontology** and relation whitelist
- Output triples aligned to IDs you can ingest and review
- Use human-in-the-loop review for high-value edges; batch QA for the rest
- This is LLM-augmented KG construction: fast bootstrap, then iterative cleanup

Note:
- "Ontology... emerges after reality has been observed." — Rewant R. (user-provided excerpt).
- Keep scope tight: one business question, then expand.
