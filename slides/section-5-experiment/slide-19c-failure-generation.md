## What didn't work? 

**Question:**
Who was a Google employee that later founded their own company?

This fragment was not retrieved:

Generated Cypher:
MERGE (noam)-[:FOUNDED]->(ca);
MERGE (ca:Company {name:"Character.AI"})
MERGE (noam)-[:WORKED_AT {role:"AI Researcher"}]->(gg);

Why did it fail: Probably because it did not include the [:FOUNDED] relation. 

Generated Cypher:
MERGE (bret)-[:WORKED_AT {role: "Associate Product Manager", start: 2003}]->(google)
MERGE (bret:Person {name: "Bret Taylor"})

MERGE (friendfeed:Company {name: "FriendFeed"})
MERGE (friendfeed:Company {name: "FriendFeed"})
MERGE (paul)-[:FOUNDED {source: "250629_google-0025"}]->(friendfeed)
MERGE (paul)-[:WORKED_AT {role: "Engineer"]->(google)
MERGE (paul)-[:FOUNDED {source: "250629_google-0025"}]->(friendfeed)

Failure:
- Wasn't captured that he founded friendfeed
- When looking at Code, 



So LLM -> KG is not a silver bullet, still needs human review. 

