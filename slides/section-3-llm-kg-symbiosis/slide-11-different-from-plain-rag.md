## Why This Is Different from Plain RAG

Retrieval usually returns documents; graphs return structured facts.

- Document RAG: fetch chunks of text, hope the answer is in there
- Graph: fetch specific nodes and edges — you get "who works with whom," "what belongs to what"
- Traversing relationships is explicit; no need to re-parse prose for every question

Note:
- Visual: side-by-side. Left: "Document retrieval" — stack of doc snippets, question mark. Right: "Graph traversal" — small graph with highlighted path, clear nodes/edges. Caption under each.
- One line: "Documents are opaque; graphs are queryable structure."
