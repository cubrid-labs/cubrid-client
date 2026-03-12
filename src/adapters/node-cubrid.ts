import { mapError } from "../internals/map-error.js";
import { mapResult } from "../internals/map-result.js";
import type { DriverAdapter } from "./base.js";
import type { ClientConfig } from "../types/client.js";
import type { QueryParams } from "../types/query.js";
import type { QueryResultRow } from "../types/result.js";

export interface NodeCubridRawConnection {
  connect(): Promise<void>;
  queryAllAsObjects:
    | ((
    sql: string,
    params?: readonly unknown[],
  ) => Promise<QueryResultRow[]>)
    | undefined;
  queryAll:
    | ((sql: string, params?: readonly unknown[]) => Promise<unknown>)
    | undefined;
  setAutoCommitMode(enabled: boolean): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  end(): Promise<void>;
}

export interface NodeCubridDriver {
  createConnection(config: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    connectionTimeout?: number | undefined;
    maxConnectionRetryCount?: number | undefined;
    logger?: unknown;
  }): NodeCubridRawConnection;
}

export type NodeCubridDriverLoader = () => Promise<NodeCubridDriver>;

async function loadNodeCubridDriver(): Promise<NodeCubridDriver> {
  const module = await import("node-cubrid");
  return (module.default ?? module) as NodeCubridDriver;
}

export class NodeCubridAdapter implements DriverAdapter {
  private rawConnection: NodeCubridRawConnection | undefined;

  constructor(
    private readonly config: ClientConfig,
    private readonly driverLoader: NodeCubridDriverLoader = loadNodeCubridDriver,
  ) {}

  async connect(): Promise<void> {
    const connection = await this.getConnection();

    try {
      await connection.connect();
    } catch (error) {
      throw mapError("connection", error, "Failed to connect to CUBRID.");
    }
  }

  async query<T extends QueryResultRow = QueryResultRow>(
    sql: string,
    params?: QueryParams,
  ): Promise<T[]> {
    const connection = await this.getConnection();

    try {
      await connection.connect();

      if (typeof connection.queryAllAsObjects === "function") {
        return (await connection.queryAllAsObjects(sql, params)) as T[];
      }

      if (typeof connection.queryAll === "function") {
        const result = await connection.queryAll(sql, params);
        return mapResult(result) as T[];
      }

      return [];
    } catch (error) {
      throw mapError("query", error, "Failed to execute CUBRID query.");
    }
  }

  async beginTransaction(): Promise<void> {
    const connection = await this.getConnection();

    try {
      await connection.connect();
      await connection.setAutoCommitMode(false);
    } catch (error) {
      throw mapError("transaction", error, "Failed to start transaction.");
    }
  }

  async commit(): Promise<void> {
    const connection = await this.getConnection();

    try {
      await connection.commit();
    } catch (error) {
      throw mapError("transaction", error, "Failed to commit transaction.");
    }
  }

  async rollback(): Promise<void> {
    const connection = await this.getConnection();

    try {
      await connection.rollback();
    } catch (error) {
      throw mapError("transaction", error, "Failed to roll back transaction.");
    }
  }

  async close(): Promise<void> {
    if (!this.rawConnection) {
      return;
    }

    try {
      await this.rawConnection.end();
      this.rawConnection = undefined;
    } catch (error) {
      throw mapError("connection", error, "Failed to close CUBRID connection.");
    }
  }

  private async getConnection(): Promise<NodeCubridRawConnection> {
    if (this.rawConnection) {
      return this.rawConnection;
    }

    const driver = await this.driverLoader();
    this.rawConnection = driver.createConnection(this.config);
    return this.rawConnection;
  }
}
