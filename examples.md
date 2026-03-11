Who was a Google employee that later founded their own company? Just give a list with bullet points: name of the person + company they started or were an early employee at.


[vector]> /graph
Mode set to graph.
[graph]> Who was a Google employee that later founded their own company? Just give a list with bullet points: name of the person + company they started or were an early employee at. 

assistant> Based on the supplied retrieval context:

- **Ilya Sutskever** – Co‑founded **OpenAI**  
- **Dario Amodei** – Founded **Anthropic**

Missing / error

MERGE (ca:Company {name:"Character.AI"})
ON CREATE SET ca.industry="Artificial Intelligence"
ON MATCH SET ca.industry="Artificial Intelligence";
MERGE (noam)-[:WORKED_AT {role:"Founder"}]->(ca);

[graph]> /vector
Mode set to vector.
[vector]> Who was a Google employee that later founded their own company? Just give a list with bullet points: name of the person + company they started or were an early employee at. 

assistant> - ** ** – Founded **FriendFeed** (later also founded **Quip**)  
- **Lars** – Founded **weav.io**