
## What didn't work? 

**Question:**
Who was a Google employee that later founded their own company?


Retrieval matters:

MATCH q=(s:Company)-[:FOUNDED]-(p: Person)-[:WORKED_AT]-(c: Company {name: "Google"}) RETURN q;