## Why LLMs Struggle

Tokens are not concepts; the context window is not memory.

- Models predict next tokens — they don't "store" facts
- Long context helps only until the next conversation
- No built-in identity: "Alice" in turn 1 and "Alice" in turn 50 are just text
- Consistency across sessions requires something outside the model

Note:
- Visual: left side = stream of tokens / word soup; right side = a small graph with labeled nodes (Person, Project) and edges (worksOn, budget). Caption: "Tokens vs structure."
- Don't go into transformer internals. Stay at "no persistent memory, no stable entities."
