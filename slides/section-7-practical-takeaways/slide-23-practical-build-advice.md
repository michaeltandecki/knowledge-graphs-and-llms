## Practical Build Advice

- start with one relationship-heavy question
- model a minimal ontology first
- use LLMs for extraction, then validate critical entities
- plan for hybrid retrieval from day one

Small query example:

```cypher
MATCH (c:Company {name: "Google"})-[:ACQUIRED]->(x)<-[:FOUNDED]-(f)
RETURN f.name, x.name
```
