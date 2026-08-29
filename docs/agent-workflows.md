# Agent workflows

The lead schedules the shared role DAG and mutating workers use isolated
worktrees. Compose owns standalone startup and browser tooling:

```bash
docker compose -f compose.standalone.yaml up -d --build
docker compose -f compose.standalone.yaml run --rm --no-deps -T chrome-devtools-mcp
```

Use Chrome DevTools MCP for actual sign-in/protected navigation, DOM, focus,
console, failed requests, and responsive evidence. CDP is container-local and
the browser profile is disposable.
