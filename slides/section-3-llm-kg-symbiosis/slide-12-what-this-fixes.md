## What This Fixes

Better consistency, memory, and disambiguation — when the graph is right.

- Same entity everywhere: "Alice" in the graph is the same Alice in every answer
- Multi-turn and cross-session: answers can stay consistent by reading from the graph
- Fewer hallucinations on factual questions when the model is grounded on retrieved subgraphs

Note:
- Visual: before/after. Before: two speech bubbles with slightly different "Alice" facts (contradiction). After: one graph node "Alice" with edges; one answer that correctly uses those facts.
- Keep it concrete: "Before = inconsistent; after = one source of truth."
