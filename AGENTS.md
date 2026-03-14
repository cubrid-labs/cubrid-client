# AGENTS.md

## Purpose
`cubrid-client` is a TypeScript-first client library for CUBRID.

## Read First
- `README.md`
- `PRD.md`
- `CONTRIBUTING.md`
- `docs/agent-playbook.md`

## Working Rules
- Keep public TypeScript API, examples, and docs aligned.
- Preserve typed query ergonomics and transaction behavior unless intentionally redesigning the contract.
- Prefer compatibility-safe changes because this repo is library code.
- Add or update tests for any protocol or public client behavior change.

## Validation
- `npm run typecheck`
- `npm test`
- `npm run build`
- `npm run check`
