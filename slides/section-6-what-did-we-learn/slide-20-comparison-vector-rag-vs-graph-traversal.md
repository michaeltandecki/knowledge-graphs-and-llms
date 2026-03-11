## Comparison: Vector RAG vs Graph Traversal

Revisiting the running question:

> "If knowledge is scattered across many documents, is vector RAG enough?"

Same question, two retrieval behaviors:

- **Vector RAG:** relevant fragments, but relationship stitching is implicit and brittle
- **Graph traversal:** explicit path through entities and relationships

Strongest takeaway: when the question is relationship-heavy and cross-document, explicit structure wins.
