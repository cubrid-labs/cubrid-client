# PRD - @cubrid/client

## Overview

`@cubrid/client` is a modern TypeScript client library for the CUBRID database.

The goal of this project is to provide a developer-friendly, fully typed, and modern API for interacting with CUBRID from Node.js and TypeScript applications.

This library aims to provide an experience similar to modern database clients such as:

- `pg`
- `mysql2`
- `@clickhouse/client`
- `@prisma/client`

Key principles:

- TypeScript-first API
- Promise-based interface
- Strong typing using generics
- Minimal dependencies
- High performance

## Problem Statement

Although CUBRID provides a Node.js driver (`node-cubrid`), it has several limitations:

- Not designed for modern TypeScript usage
- Missing official TypeScript typings
- Callback-based API
- Limited ecosystem integration

Modern Node.js developers expect:

- Promise-based APIs
- Fully typed query results
- ESM compatibility
- Clean connection management

This project addresses those gaps.

## Goals

Primary goals:

- Provide a modern TypeScript client for CUBRID
- Offer a simple query interface
- Support typed query results
- Enable easy integration with Node.js frameworks
- Maintain minimal runtime overhead

Secondary goals:

- Good developer experience
- ESM + CommonJS compatibility
- Connection pooling
- Clear documentation

## Non Goals

Out of scope for v1:

- ORM functionality
- Query builder
- Migration tooling
- Schema management

These may be implemented as separate projects.

## Target Users

- Node.js developers
- TypeScript backend developers
- API developers
- Developers building services using CUBRID

## Core Concepts

### Client

Represents a connection interface to the database.

### Query

Executes SQL and returns typed results.

### Transaction

Allows multiple operations to run atomically.

## API Design

### Import

```ts
import { createClient } from "@cubrid/client";
```

### Create Client

```ts
const db = createClient({
  host: "localhost",
  port: 33000,
  database: "demodb",
  user: "dba",
  password: "",
});
```

### Basic Query

```ts
const rows = await db.query("SELECT * FROM users");
```

### Typed Query

```ts
type User = {
  id: number;
  name: string;
};

const users = await db.query<User>(
  "SELECT id, name FROM users",
);
```

### Insert Example

```ts
await db.query(
  "INSERT INTO users (name) VALUES (?)",
  ["Alice"],
);
```

### Transaction Example

```ts
await db.transaction(async (tx) => {
  await tx.query("INSERT INTO users (name) VALUES (?)", ["Alice"]);
  await tx.query("INSERT INTO users (name) VALUES (?)", ["Bob"]);
});
```

## Configuration

### ClientOptions

- `host: string`
- `port?: number`
- `database: string`
- `user: string`
- `password?: string`

## API Surface

- `createClient(options)`
- `query(sql, params?)`
- `transaction(callback)`
- `close()`

## Architecture

Suggested project structure:

```text
src
  client.ts
  connection.ts
  query.ts
  transaction.ts
  types.ts

tests

examples

docs
```

## Packaging

Published on npm as `@cubrid/client`

Install:

```bash
npm install @cubrid/client
```

## Compatibility

Node.js 18+

Supported modules:

- ESM
- CommonJS

## Example Usage

```ts
import { createClient } from "@cubrid/client";

const db = createClient({
  host: "localhost",
  database: "demodb",
  user: "dba",
});

const rows = await db.query("SELECT * FROM athlete");

console.log(rows);
```

## Roadmap

### v0.1

- basic client
- query execution
- connection management

### v0.2

- transactions
- prepared statements

### v0.3

- connection pooling

### v1.0

- stable API
- production readiness

## License

MIT
