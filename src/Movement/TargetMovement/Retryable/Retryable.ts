export class Retryable {
  private retries = 0;
  private elapsed = 0;
  constructor(
    private backoffMs: number,
    private maxRetries: number,
    private onFinished: () => any
  ) {}

  retry(elapsed: number, fn: () => any): void {
    if (this.shouldRetry()) {
      this.elapsed += elapsed;
      if (this.elapsed >= this.backoffMs) {
        this.elapsed = 0;
        this.retries++;
        fn();
      }
    } else {
      this.onFinished();
    }
  }

  reset(): void {
    this.retries = 0;
    this.elapsed = 0;
  }

  getMaxRetries(): number {
    return this.maxRetries;
  }

  getBackoffMs(): number {
    return this.backoffMs;
  }

  private shouldRetry(): boolean {
    return this.maxRetries === -1 || this.retries < this.maxRetries;
  }
}
