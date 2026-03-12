export class QueryError extends Error {
  override name = "QueryError";

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}
