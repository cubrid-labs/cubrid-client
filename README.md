# cubrid-client

<!-- BADGES:START -->
[![npm version](https://img.shields.io/npm/v/cubrid-client)](https://www.npmjs.com/package/cubrid-client)
[![node version](https://img.shields.io/node/v/cubrid-client)](https://nodejs.org)
[![ci workflow](https://github.com/cubrid-labs/cubrid-client/actions/workflows/ci.yml/badge.svg)](https://github.com/cubrid-labs/cubrid-client/actions/workflows/ci.yml)
[![license](https://img.shields.io/github/license/cubrid-labs/cubrid-client)](https://github.com/cubrid-labs/cubrid-client/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/cubrid-labs/cubrid-client)](https://github.com/cubrid-labs/cubrid-client)
<!-- BADGES:END -->


Modern TypeScript-first client for the CUBRID database.

`cubrid-client` provides a Promise-based, fully typed API for Node.js and TypeScript applications that want a cleaner experience than legacy callback-oriented drivers.

## Features

- TypeScript-first API with generic query result typing
- Promise-based `createClient()`, `query<T>()`, and `transaction()`
- Structured error classes for connection, query, and transaction failures
- ESM and CommonJS output
- Minimal runtime abstraction over `node-cubrid`
- Node.js 18+ support

## Installation

```bash
npm install cubrid-client
```

## Quick Start

```ts
import { createClient } from "cubrid-client";

const db = createClient({
  host: "localhost",
  port: 33000,
  database: "demodb",
  user: "dba",
  password: "",
});

const rows = await db.query("SELECT * FROM athlete");
await db.close();
```

## Typed Queries

```ts
import { createClient } from "cubrid-client";

type User = {
  id: number;
  name: string;
};

const db = createClient({
  host: "localhost",
  database: "demodb",
  user: "dba",
});

const users = await db.query<User>(
  "SELECT id, name FROM users WHERE active = ?",
  [true],
);
```

## Transactions

```ts
await db.transaction(async (tx) => {
  await tx.query("INSERT INTO users (name) VALUES (?)", ["Alice"]);
  await tx.query("INSERT INTO users (name) VALUES (?)", ["Bob"]);
});
```

## API

### `createClient(options)`

Creates a reusable client instance.

### `client.query<T>(sql, params?)`

Executes a SQL statement and returns an array of typed rows.

### `client.transaction(callback)`

Creates an isolated transactional connection, commits on success, and rolls back on failure.

### `client.close()`

Closes the shared connection held by the client instance.

### Error classes

- `ConnectionError`
- `QueryError`
- `TransactionError`

## Development

```bash
npm install
npm run check
```

## Project Layout

```text
src/
  client/
    create-client.ts
    client.ts
    transaction.ts
  adapters/
    base.ts
    node-cubrid.ts
  errors/
    connection-error.ts
    query-error.ts
    transaction-error.ts
  internals/
    map-error.ts
    map-result.ts
    normalize-config.ts
  types/
    client.ts
    query.ts
    result.ts
tests/
examples/
docs/
```

## Status

This repository implements the Phase 1 MVP aligned with the PRD:

- `node-cubrid` adapter wrapper
- Promise-first client API
- typed query results
- structured errors
- test coverage target above 95%

Pooling, prepared statements, and broader ecosystem integrations are planned for later milestones.
