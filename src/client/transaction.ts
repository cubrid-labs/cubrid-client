import { mapError } from "../internals/map-error.js";
import type { ConnectionLike, TransactionClient } from "../types/client.js";
import type { QueryParams } from "../types/query.js";
import type { QueryResultRow } from "../types/result.js";

export class CubridTransaction implements TransactionClient {
  constructor(private readonly connection: ConnectionLike) {}

  async query<T extends QueryResultRow = QueryResultRow>(
    sql: string,
    params?: QueryParams,
  ): Promise<T[]> {
    try {
      return await this.connection.query<T>(sql, params);
    } catch (error) {
      throw mapError("transaction", error, "Transaction query failed.");
    }
  }

  commit(): Promise<void> {
    return this.connection.commit();
  }

  rollback(): Promise<void> {
    return this.connection.rollback();
  }
}
