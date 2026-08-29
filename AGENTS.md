# Munda repository contract

Read this file before work. This repository is independently versioned and
owns its standalone Munda application. Compose is authoritative for startup,
builds, and browser inspection. Use the disposable Compose Chrome DevTools
MCP; do not require host Node, browsers, or DevTools. The parent repository
owns integration and must not be changed from this repository.

Use the shared roles `repo-scout`, `frontend-ui`, `persistence-data`,
`compose-runtime`, `browser-acceptance`, `test-verifier`,
`integration-reviewer`, and `docs-maintainer`; provider files are adapters.
