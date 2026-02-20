## Practical Application

LLM as the interface; knowledge graph as the memory layer.

- Chatbots that remember users, preferences, and past decisions (backed by a graph)
- Governance: audit what facts the system used, correct bad extractions
- Start small: one domain, a few entity types, grow the graph as you go

Note:
- Visual: layered diagram. Top: "User" ↔ "LLM (interface)". Middle: "Graph (memory)". Bottom: "Sources (docs, transcripts)". Arrows: user talks to LLM; LLM reads/writes graph; graph is populated from sources.
- Relate to "chatbot with memory" and "we can fix the graph when it's wrong" — practical and hopeful.
