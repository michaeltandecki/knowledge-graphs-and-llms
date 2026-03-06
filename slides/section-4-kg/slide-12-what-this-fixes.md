## What This Fixes

Better consistency, memory, and disambiguation — when graph quality is good.

- Same entity everywhere: `Apple#Company` is not `apple#Fruit`
- Cross-session consistency: answers read from persistent graph memory
- Fewer factual guesses on questions covered by retrieved graph facts

Note:
- Scope honesty: this improves covered facts; it does not solve all hallucinations.
- "You may be correct — but you are blind." — Kay Iversen (user-provided excerpt).
