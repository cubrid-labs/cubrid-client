export class ConnectionError extends Error {
  override name = "ConnectionError";

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}
