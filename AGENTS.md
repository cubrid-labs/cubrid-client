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

## Development Workflow (cubrid-labs org standard)

All non-trivial work across cubrid-labs repositories MUST follow this 5-phase cycle:

1. **Oracle Design Review** — Consult Oracle before implementation to validate architecture, API surface, and approach. Raise concerns early.
2. **Implementation** — Build the feature/fix with tests. Follow existing codebase patterns.
3. **Documentation Update** — Update ALL affected docs (README, CHANGELOG, ROADMAP, API docs, SUPPORT_MATRIX, PRD, etc.) in the same PR or as an immediate follow-up. Code without doc updates is incomplete.
4. **Integration Test against real CUBRID** — Run the feature/fix against a live CUBRID instance via the repo's Docker setup or CI integration matrix. Mock-only validation is INSUFFICIENT. No release may proceed until the relevant integration jobs are green for the target CUBRID/runtime versions.
5. **Oracle Post-Implementation Review** — Consult Oracle to review the completed work for correctness, edge cases, integration coverage, and consistency before merging.

Skipping any phase requires explicit justification recorded in the PR description. Trivial changes (typos, single-line fixes, doc-only edits) may skip phases 1, 4, and 5. Phase 4 is NEVER skippable for any change that touches runtime code paths, including changes that "only" add a new module, a new code path, or a new dependency.

## Validation
- `npm run typecheck`
- `npm test`
- `npm run build`
- `npm run check`

## Project Context — Performance Loop System

> This repo is a **supporting track** (nice-to-have) for the Performance Loop.
> Board: [CUBRID Ecosystem Roadmap](https://github.com/orgs/cubrid-labs/projects/2)

### Role

cubrid-client already benchmarks **faster than MySQL** in TypeScript.
The narrative is "already fast, now production-ready" — resilience, not speed.

### Related Issues

| Issue | Phase | Priority |
|-------|-------|----------|
| #14 Implement reconnect, retry, and health check | R4 | Nice-to-Have |
