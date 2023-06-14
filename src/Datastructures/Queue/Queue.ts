class Node<T> {
  next?: Node<T>;
  prev?: Node<T>;

  constructor(public data: T) {}
}

/**
 * Fast queue implementation. This is necessary because using plain JS arrays as
 * queues takes O(n) for dequeueing.
 */
export class Queue<T> {
  private head?: Node<T>;
  private tail?: Node<T>;
  private sizeInternal = 0;

  dequeue(): T | undefined {
    if (this.tail === undefined) return undefined;

    this.sizeInternal--;

    const tailData = this.tail.data;
    if (this.tail.prev === undefined) {
      this.tail = undefined;
      this.head = undefined;
      return tailData;
    }

    this.tail.prev.next = undefined;
    this.tail = this.tail.prev;
    return tailData;
  }

  enqueue(data: T): void {
    this.sizeInternal++;

    if (this.head === undefined) {
      this.head = new Node(data);
      this.tail = this.head;
      return;
    }

    const newNode = new Node(data);
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
  }

  peek(): T | undefined {
    return this.tail ? this.tail.data : undefined;
  }

  peekAll(): T[] {
    const arr: T[] = [];
    let current = this.tail;
    while (current) {
      arr.push(current.data);
      current = current.prev;
    }

    return arr;
  }

  clear(): void {
    this.head = undefined;
    this.tail = undefined;
    this.sizeInternal = 0;
  }

  peekEnd(): T | undefined {
    return this.head?.data;
  }

  size(): number {
    return this.sizeInternal;
  }
}
