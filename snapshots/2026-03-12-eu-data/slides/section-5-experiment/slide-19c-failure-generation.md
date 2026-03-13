## What didn't work? KG Generation.

**Question:** Who was a Google employee that later founded their own company?

**Data from Neo4j:**

```cypher
(noam:Person {name: "Noam Shazeer"})-[:WORKED_AT]->(:Company {name:"Google"})
(noam)-[:WORKED_AT {role: "Founder"}]->(:Company {name:"Character.AI"})
```

**Failure signals:**
- Imperfect adherence to ontology, not applying the `[:FOUNDER]` relation.
- LLM -> KG is not a silver bullet; human review is still required.
