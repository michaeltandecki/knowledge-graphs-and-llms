## Why This Is Different from Plain RAG

Document retrieval returns chunks; graph retrieval returns explicit entities and relationships.

- Document RAG: fetch text and infer structure each time
- Graph retrieval: fetch nodes/edges like "who owns what" and "what depends on what"
- Relationship traversal is explicit; less re-inference from prose on every question
- In practice, best systems are hybrid: vector retrieval + graph traversal

Note:
- Keep this non-religious: graph is a retrieval primitive, not a replacement ideology.
- "Focus on business questions; don't boil the ocean." — Juan Sequeda (user-provided excerpt).
