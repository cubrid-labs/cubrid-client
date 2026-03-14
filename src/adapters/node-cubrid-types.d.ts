/**
 * Minimal type declaration for the node-cubrid package.
 * Used only by the legacy NodeCubridAdapter.
 */
declare module "node-cubrid" {
  interface RawConnection {
    connect(): Promise<void>;
    queryAllAsObjects:
      | ((sql: string, params?: readonly unknown[]) => Promise<Record<string, unknown>[]>)
      | undefined;
    queryAll: ((sql: string, params?: readonly unknown[]) => Promise<unknown>) | undefined;
    execute: ((sql: string, params?: readonly unknown[]) => Promise<unknown>) | undefined;
    setAutoCommitMode(enabled: boolean): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    end(): Promise<void>;
  }

  interface Driver {
    createConnection(config: {
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
      connectionTimeout?: number;
      maxConnectionRetryCount?: number;
      logger?: unknown;
    }): RawConnection;
  }

  const driver: Driver;
  export = driver;
}
