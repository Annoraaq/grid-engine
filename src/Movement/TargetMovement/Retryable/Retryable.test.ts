import { Retryable } from "./Retryable.js";
describe("Retry", () => {
  let retry: Retryable;

  it("should retry after backoff", () => {
    const onFinished = jest.fn();
    const retryFn = jest.fn();
    retry = new Retryable(200, -1, onFinished);

    retry.retry(100, retryFn);
    expect(retryFn).not.toHaveBeenCalled();

    retry.retry(100, retryFn);
    expect(retryFn).toHaveBeenCalled();
  });

  it("should limit retries", () => {
    const onFinished = jest.fn();
    const retryFn = jest.fn();
    retry = new Retryable(200, 2, onFinished);

    retry.retry(200, retryFn);
    expect(retryFn).toHaveBeenCalledTimes(1);

    retry.retry(200, retryFn);
    expect(retryFn).toHaveBeenCalledTimes(2);

    retry.retry(200, retryFn);
    expect(retryFn).toHaveBeenCalledTimes(2);
    expect(onFinished).toHaveBeenCalled();
  });

  it("should not limit retries if maxRetries -1", () => {
    const onFinished = jest.fn();
    const retryFn = jest.fn();
    retry = new Retryable(200, -1, onFinished);

    retry.retry(200, retryFn);
    expect(retryFn).toHaveBeenCalledTimes(1);

    retry.retry(200, retryFn);
    expect(retryFn).toHaveBeenCalledTimes(2);
    expect(onFinished).not.toHaveBeenCalled();
  });

  it("should reset", () => {
    const onFinished = jest.fn();
    const retryFn = jest.fn();
    retry = new Retryable(200, 2, onFinished);

    retry.retry(200, retryFn);
    retry.retry(200, retryFn);
    retry.retry(200, retryFn);
    retryFn.mockReset();
    onFinished.mockReset();

    retry.reset();

    retry.retry(200, retryFn);
    expect(retryFn).toHaveBeenCalledTimes(1);
    expect(onFinished).not.toHaveBeenCalled();
  });
});
