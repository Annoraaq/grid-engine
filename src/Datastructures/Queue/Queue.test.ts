import { Queue } from "./Queue.js";

describe("Queue", () => {
  it("has a size", () => {
    const queue = new Queue();
    expect(queue.size()).toBe(0);
  });

  it("should enqueue elements", () => {
    const queue = new Queue();
    const data = { some: "data" };
    const data2 = { some: "data" };
    const data3 = { some: "more data" };
    queue.enqueue(data);
    queue.enqueue(data2);
    queue.enqueue(data3);
    expect(queue.size()).toBe(3);
  });

  it("should dequeue elements", () => {
    const queue = new Queue();
    const data = { some: "data" };
    const data2 = { some: "data" };
    const data3 = { some: "more data" };
    queue.enqueue(data);
    queue.enqueue(data2);
    queue.enqueue(data3);
    expect(queue.size()).toBe(3);
    expect(queue.dequeue()).toEqual(data);
    expect(queue.size()).toBe(2);
    expect(queue.dequeue()).toEqual(data2);
    expect(queue.size()).toBe(1);
    expect(queue.dequeue()).toEqual(data3);
    expect(queue.size()).toBe(0);
  });

  it("should peek elements", () => {
    const queue = new Queue();
    const data = { some: "data" };
    const data2 = { some: "data" };
    const data3 = { some: "more data" };
    queue.enqueue(data);
    queue.enqueue(data2);
    queue.enqueue(data3);
    expect(queue.peek()).toEqual(data);
    expect(queue.peek()).toEqual(data);
    expect(queue.size()).toBe(3);
    queue.dequeue();
    expect(queue.peek()).toEqual(data2);
    expect(queue.size()).toBe(2);
  });

  it("should peek all elements", () => {
    const queue = new Queue();
    const data = { some: "data" };
    const data2 = { some: "data" };
    const data3 = { some: "more data" };
    queue.enqueue(data);
    queue.enqueue(data2);
    queue.enqueue(data3);
    expect(queue.peekAll()).toEqual([data, data2, data3]);
  });

  it("should reset head if queue is empty", () => {
    const queue = new Queue();
    queue.enqueue(1);
    expect(queue.dequeue()).toEqual(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toEqual(2);
  });

  it("should peek end", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.peekEnd()).toEqual(3);
    queue.dequeue();
    expect(queue.peekEnd()).toEqual(3);
  });

  it("should clear", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.size()).toEqual(3);
    expect(queue.peekAll()).toEqual([1, 2, 3]);
    queue.clear();
    expect(queue.size()).toEqual(0);
    expect(queue.peekAll()).toEqual([]);
  });
});
