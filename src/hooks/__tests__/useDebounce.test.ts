import { renderHook, act } from "@testing-library/react";

import { describe, beforeEach, afterEach, expect, it, vi } from "vitest";
import { useDebounce } from "../useDebounce";

describe("userDebounce testing", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("should not update before the delay elapses", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "hello" } },
    );

    rerender({ value: "world" });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe("hello");
  });

  it("should updates after teh delay elapses", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "hello" } },
    );

    rerender({ value: "world" });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("world");
  });

  it("should reset time on rapid value changes", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "a" } },
    );

    rerender({ value: "ab" });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ value: "abc" });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe("abc");
  });
});
