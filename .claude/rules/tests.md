---
paths:
  - "**/*.test.ts"
  - "**/*.spec.ts"
---
# Test conventions
- Vitest. Arrange-Act-Assert. One behavior per test.
- Mock the Anthropic client and MCP calls; never hit paid APIs in unit tests.
- For retrieval, assert on recall@k / precision@k against a fixed labeled set.