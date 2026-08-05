import { useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [stored, setStored] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T): void => {
    try {
      setStored(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      //
    }
  };

  return [stored, setValue];
}
