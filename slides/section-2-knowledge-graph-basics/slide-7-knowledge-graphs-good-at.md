## What Knowledge Graphs Are Actually Good At

Identity, explicit relationships, persistent memory, and validation.

- Stable entities with IDs (the same `Alice#123` everywhere)
- Explicit edges: worksAt, reportsTo, partOf
- Persistent store that survives restarts and context limits
- Rule validation (e.g., required owner, cardinality) via constraints/SHACL
- Canonical entities only happen if you do entity resolution + ID management

<small><em>"The URIs are coming back." — Tony Seale (user-provided excerpt)</em></small>

Note:
- KG ≠ smarter reasoning by default; KG = clearer, inspectable ground truth.
