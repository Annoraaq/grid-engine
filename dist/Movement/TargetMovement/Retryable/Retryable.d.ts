export declare class Retryable {
    private backoffMs;
    private maxRetries;
    private onFinished;
    private retries;
    private elapsed;
    constructor(backoffMs: number, maxRetries: number, onFinished: () => any);
    retry(elapsed: number, fn: () => any): void;
    reset(): void;
    getMaxRetries(): number;
    private shouldRetry;
}
