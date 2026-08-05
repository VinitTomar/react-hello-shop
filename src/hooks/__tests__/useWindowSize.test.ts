import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useWindowSize } from "../useWindowSize";

describe("useWindowSize tests", () => {
  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  it("should return current window dimensions on mount", () => {
    const {
      result: {
        current: { width, height },
      },
    } = renderHook(() => useWindowSize());

    expect(width).toBe(1024);
    expect(height).toBe(768);
  });

  it("updates when the window is resized", () => {
    const { result } = renderHook(() => useWindowSize());
    act(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 375,
      });
      Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 812,
      });
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current.width).toBe(375);
    expect(result.current.height).toBe(812);
  });
});
