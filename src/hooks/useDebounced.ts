import { useState, useEffect } from "react";

/**
 * useDebouncedValue 훅
 *
 * @template T - 디바운스할 값의 타입.
 * @param {T} value - 디바운스할 값.
 * @param {number} delay - 디바운스 지연 시간(밀리초).
 * @returns {T} - 디바운스된 값.
 */
export function useDebouncedValue<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}
