## Demo Graph

One transcript snippet → extracted entities/relations → one multi-hop answer.

**Transcript snippet (example):**
"Alice said Project Atlas depends on Data Platform. Bob owns Data Platform. CFO Mia approved Atlas budget."

<pre class="mermaid">
graph LR
  A[Alice#123] -->|leads| P[Project Atlas#P1]
  P -->|dependsOn| D[Data Platform#S9]
  B[Bob#456] -->|owns| D
  M[Mia#999] -->|approvedBudgetFor| P
</pre>

**Question:** "Who is connected to Project Atlas decisions through dependencies?"

**Answer path (highlight while speaking):** Atlas → dependsOn → Data Platform → ownedBy → Bob, and Atlas → approvedBy → Mia.

Note:
- This is the keystone slide: show, don't tell.
- Optional speaker-note Cypher (do not show on slide):
  `MATCH (p:Project {id:'P1'})-[:dependsOn]->(d)<-[:owns]-(o) RETURN p,d,o
