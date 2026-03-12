declare module "node-cubrid" {
  export interface NodeCubridRawConnection {
    connect(): Promise<void>;
    queryAllAsObjects:
      | ((
          sql: string,
          params?: readonly unknown[],
        ) => Promise<Record<string, unknown>[]>)
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
      connectionTimeout?: number;
      maxConnectionRetryCount?: number;
      logger?: unknown;
    }): NodeCubridRawConnection;
  }

  const driver: NodeCubridDriver;
  export = driver;
}
