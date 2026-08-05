import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useLocalStorage } from "../useLocalStorage";

describe("useLocalStorage test", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return the initial value when nothing is stored", () => {
    const {
      result: {
        current: [value],
      },
    } = renderHook(() => useLocalStorage("key", 42));
    expect(value).toBe(42);
  });

  it("should persist a new value to the localstorage", () => {
    const { result } = renderHook(() => useLocalStorage("key", 42));

    act(() => {
      result.current[1](99);
    });

    expect(result.current[0]).toBe(99);
    expect(localStorage.getItem("key")).toBe("99");
  });

  it("should reads a pre-existing value from localstorage on mount", () => {
    localStorage.setItem("key", JSON.stringify("saved"));

    const { result } = renderHook(() => {
      return useLocalStorage("key", "default");
    });

    expect(result.current[0]).toBe("saved");
  });

  it("should work with array values", () => {
    const { result } = renderHook(() => {
      return useLocalStorage<string[]>("list", []);
    });

    act(() => {
      result.current[1](["a", "b"]);
    });

    expect(result.current[0]).toEqual(["a", "b"]);
    expect(localStorage.getItem("list")).toBe(JSON.stringify(["a", "b"]));
  });
});
