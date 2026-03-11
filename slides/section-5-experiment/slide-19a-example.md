## KG Retrieval Example

**Question:**
Who was a Google employee that later founded their own company?

**Retrieved graph fragments**

MERGE (dario)-[:WORKED_AT {source: "251005_google-the-ai-company-0001"}]->(google)
MERGE (dario)-[:FOUNDED]->(anthropic)
MERGE (ilya:Person {name: "Ilya Sutskever"})
MERGE (ilya)-[:FOUNDED {year: 2015}]->(openai)
MERGE (ilya)-[:WORKED_AT {role: "Researcher"}]->(google)


MERGE (noam)-[:FOUNDED]->(ca);
MERGE (ca:Company {name:"Character.AI"})
MERGE (noam)-[:WORKED_AT {role:"AI Researcher"}]->(gg);

**Answer:**
<ul class="retrieved-fragments">
<b>Ilya Sutskever</b> — Co-founded <b>OpenAI</b>
<b>Dario Amodei</b> — Founded <b>Anthropic</b>
</ul>


**Observation:** answers seem more relevant