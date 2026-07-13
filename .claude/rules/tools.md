---
paths:
  - "src/tools/**"
  - "servers/**"
---
# Tool & MCP conventions
- Every tool has a Zod input schema AND a description that states purpose, input
  format, an example query, and when to use it vs a similar tool.
- Return STRUCTURED errors: { isError: true, errorCategory:
  "transient"|"validation"|"business"|"permission", isRetryable: boolean, message }.
- Never return a generic "operation failed". The agent needs the category to decide
  whether to retry.
- Keep each subagent's tool set minimal — do not add tools outside its role.