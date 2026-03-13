## KG Retrieval Example

**Question:**
Who was a Google employee that later founded their own company?

**Retrieved graph fragments**

```
MERGE (dario)-[:WORKED_AT]->(google)
MERGE (dario)-[:FOUNDED]->(anthropic)
MERGE (ilya:Person {name: "Ilya Sutskever"})
MERGE (ilya)-[:FOUNDED {year: 2015}]->(openai)
MERGE (ilya)-[:WORKED_AT {role: "Researcher"}]->(google)
```

**Answer:**
<ul class="retrieved-fragments">
<li><b>Ilya Sutskever</b> — Co-founded <b>OpenAI</b></li>
<li><b>Dario Amodei</b> — Founded <b>Anthropic</b></li>
</ul>


**Observation:** answers seem more relevant, but it's not the full picture. Remember Bret Taylor?