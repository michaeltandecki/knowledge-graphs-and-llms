## LLM → Knowledge Graph

LLMs can extract entities and relationships from text and feed the graph.

- Run transcripts, docs, or chat logs through an LLM with a simple schema
- Output: (entity A, relation, entity B) triples you can ingest
- Not perfect — but good enough to bootstrap or enrich a KG without hand-curating everything

Note:
- Visual: left = short transcript snippet (2–3 lines of dialogue). Right = 3–4 nodes and 2–3 edges labeled (e.g. "Alice", "Bob", "Project X", "discussed", "assignedTo"). Arrow from snippet to graph: "extract."
- Mention extraction errors only briefly; slide 13 covers limits.
