import axios, { AxiosResponse, type AxiosError, type AxiosInstance, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";

import { BASE_URL, DEFAULT_HEADERS, DEFAULT_TIMEOUT_MS } from "../../config/nse.config";
import { HOME } from "./constants/nse-endpoints";
import { NSEClientError } from "./errors/NSEClientError";

export class NSEClient {
  private readonly client: AxiosInstance;
  private readonly cookies = new Map<string, string>();
  private initialized = false;
  private initializationPromise?: Promise<void>;


  private static readonly RETRYABLE_STATUS_CODES = new Set([401, 403, 429, 500, 502, 503, 504]);
  private static readonly RETRY_DELAYS_MS = [500, 1000, 2000];

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: DEFAULT_TIMEOUT_MS,
      withCredentials: true,
      headers: DEFAULT_HEADERS,
    });

    this.client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const cookieHeader = this.buildCookieHeader();
      if (cookieHeader) {
        const headers = (config.headers ?? {}) as Record<string, string>;
        headers.Cookie = cookieHeader;
        config.headers = headers as InternalAxiosRequestConfig["headers"];
      }

      return config;
    });

    this.client.interceptors.response.use(
      (response) => {
        this.captureCookies(response.headers["set-cookie"]);
        return response;
      },
      (error: AxiosError) => {
        this.captureCookies(error.response?.headers?.["set-cookie"]);
        return Promise.reject(error);
      },
    );
  }

 public async initialize(): Promise<void> {
  if (this.initialized) {
    return;
  }

  if (this.initializationPromise) {
    return this.initializationPromise;
  }

  this.initializationPromise = this.initializeInternal();

  try {
    await this.initializationPromise;
  } finally {
    this.initializationPromise = undefined;
  }
}

private async initializeInternal(): Promise<void> {
  await this.requestWithRetry(HOME, {
    validateStatus: (status) => status >= 200 && status < 400,
  });

  this.initialized = true;
}

  public async get<T>(url: string): Promise<T> {
    await this.initialize();
    try {
      const response = await this.requestWithRetry(url);
      return response.data as T;
    } catch (error) {
      throw new NSEClientError(
        `NSE request failed for ${url}: ${this.describeError(error)}`,
        url,
        this.extractStatusCode(error),
        error,
      );
    }
  }

  private async requestWithRetry<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    let lastError: unknown;

    for (let attempt = 0; attempt <= NSEClient.RETRY_DELAYS_MS.length; attempt += 1) {
      try {
        return await this.client.get(url, config);
      } catch (error) {
        lastError = error;
        const statusCode = this.extractStatusCode(error);
        const shouldRetry = this.shouldRetry(statusCode, attempt);

        if (!shouldRetry) {
          throw error;
        }

        const delayMs = NSEClient.RETRY_DELAYS_MS[attempt];
        if (delayMs === undefined) {
          throw error;
        }

        await this.delay(delayMs);
      }
    }

    throw lastError;
  }

  private shouldRetry(statusCode: number | undefined, attempt: number): boolean {
    if (statusCode === undefined) {
      return false;
    }

    if (!NSEClient.RETRYABLE_STATUS_CODES.has(statusCode)) {
      return false;
    }

    return attempt < NSEClient.RETRY_DELAYS_MS.length;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  private captureCookies(setCookieHeaders: string[] | string | undefined): void {
    if (!setCookieHeaders) {
      return;
    }

    const cookies = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];

    for (const cookie of cookies) {
      const [cookiePair] = cookie.split(";");
      if (!cookiePair) {
        continue;
      }

      const separatorIndex = cookiePair.indexOf("=");
      if (separatorIndex <= 0) {
        continue;
      }

      const name = cookiePair.slice(0, separatorIndex).trim();
      const value = cookiePair.slice(separatorIndex + 1).trim();

      if (name) {
        this.cookies.set(name, value);
      }
    }
  }

  private buildCookieHeader(): string {
    return Array.from(this.cookies.entries())
      .map(([name, value]) => `${name}=${value}`)
      .join("; ");
  }

  private extractStatusCode(error: unknown): number | undefined {
    if (axios.isAxiosError(error) && error.response?.status) {
      return error.response.status;
    }

    return undefined;
  }

  private describeError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return "Unknown error";
  }
}
