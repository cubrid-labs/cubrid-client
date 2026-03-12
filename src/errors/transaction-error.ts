export class TransactionError extends Error {
  override name = "TransactionError";

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}
