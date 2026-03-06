## Where This Breaks

Extraction errors, identity failures, over-modeling, and false certainty.

- LLM extraction can invent entities or wrong relations
- Entity duplication is common (`Alice` becomes 5 nodes)
- Ontology-first can fail early; no ontology can create semantic debt later
- Systems can sound confident while propagating graph mistakes

Note:
- Mitigation: start from one business question, iterate schema, validate with SHACL, keep humans in loop for critical edges.
- "Ontology-first approaches fail early projects..." — Rewant R. (user-provided excerpt).
