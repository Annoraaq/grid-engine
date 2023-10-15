/**
 * Fast queue implementation. This is necessary because using plain JS arrays as
 * queues takes O(n) for dequeueing.
 */
export declare class Queue<T> {
    private head?;
    private tail?;
    private sizeInternal;
    dequeue(): T | undefined;
    enqueue(data: T): void;
    peek(): T | undefined;
    peekAll(): T[];
    clear(): void;
    peekEnd(): T | undefined;
    size(): number;
}
