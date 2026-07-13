# MCP servers — staged rollout

`.mcp.json` is intentionally EMPTY until the phase that needs each server.

## Why
Claude Code starts every configured MCP server when a session opens. A server whose
binary does not exist yet (or whose required `${VAR}` is unset with no default) fails
at startup, so you get a broken-server error on every single session. Configuring a
server before it exists is noise, not preparation.

## Phase 2 — add the PubMed server
Once `servers/pubmed` is built and compiled, add:

```json
{
  "mcpServers": {
    "pubmed": {
      "command": "node",
      "args": ["servers/pubmed/dist/index.js"],
      "env": {
        "PUBMED_API_KEY": "${PUBMED_API_KEY:-}",
        "PUBMED_TOOL_EMAIL": "${PUBMED_TOOL_EMAIL:-}"
      }
    }
  }
}
```

Note the `${VAR:-}` default syntax: Claude Code fails fast when a referenced variable
is unset AND has no default. The `:-` makes the key optional (PubMed E-utilities work
without a key at 3 req/sec; a key raises the limit to 10 req/sec).

## Phase 3 — add Supabase

```json
"supabase": {
  "command": "npx",
  "args": ["-y", "@supabase/mcp-server-supabase@latest"],
  "env": { "SUPABASE_ACCESS_TOKEN": "${SUPABASE_ACCESS_TOKEN}" }
}
```

## Scope reminder (CCAR-F D2.4)
- `.mcp.json` (this file's sibling) = PROJECT scope, committed, shared with the team.
- `~/.claude.json` = USER scope, personal, never version-controlled.
- Narrower scope wins on name conflicts: local > project > user.
- Never commit a secret. Always `${ENV_VAR}` expansion.
