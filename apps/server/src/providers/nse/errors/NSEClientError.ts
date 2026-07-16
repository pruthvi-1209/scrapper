export class NSEClientError extends Error {
  public readonly endpoint: string;
  public readonly statusCode?: number;
  public readonly originalError?: unknown;

  constructor(message: string, endpoint: string, statusCode?: number, originalError?: unknown) {
    super(message);
    this.name = "NSEClientError";
    this.endpoint = endpoint;
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}
