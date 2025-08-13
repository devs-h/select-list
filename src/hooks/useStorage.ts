import { useCallback, useEffect, useRef, useState } from "react";
import { initLocalForage } from "../utils/localforage.client";
import localforage from "localforage";
import type { STORAGE_KEY } from "../contants/storage";

export interface UseStorageOptions<T> {
  /** 초기 로드 시 값이 없으면 이 값으로 초기화 (optional) */
  initialValue?: T;
  /** 값이 바뀔 때마다 호출되는 콜백 (optional) */
  onChange?: (value: T | undefined) => void;
}

export interface UseStorageResult<T> {
  /** 현재 메모리 값 (IndexedDB 반영 완료 전일 수 있음) */
  value: T | undefined;
  /** 로딩 여부 (초기 로딩/초기화 중) */
  loading: boolean;
  /** 에러 */
  error: unknown;
  /** 값 설정: setState와 동일하게 함수/직접 값을 모두 지원 */
  setStorage: (next: T | ((prev: T | undefined) => T)) => Promise<void>;
  /** 키의 값을 제거하고 value를 undefined로 변경 */
  removeStorage: () => Promise<void>;
  /** initialValue로 되돌리고 저장 */
  resetStorage: () => Promise<void>;
  /** 즉시 최신 값을 가져오기 (비동기) */
  refetch: () => Promise<T | undefined>;
}

/**
 * @description localForage(IndexedDB)를 사용하는 제네릭 스토리지 훅
 * @example
 * const { value, setStorage, loading } = useStorage<MenuList>('menuList', { initialValue: { ... } });
 */
export function useStorage<T = unknown>(
  key: STORAGE_KEY,
  options?: UseStorageOptions<T>
): UseStorageResult<T> {
  const strKey = `storage-${key}`;
  const { initialValue, onChange } = options || {};
  const [value, setValue] = useState<T | undefined>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const mountedRef = useRef(true);

  // 초기 로드
  useEffect(() => {
    mountedRef.current = true;

    (async () => {
      const ok = await initLocalForage();
      if (!ok) {
        setError(new Error("IndexedDB not available"));
        setLoading(false);
        return;
      }

      try {
        const stored = await localforage.getItem<T>(strKey);
        if (stored === null || stored === undefined) {
          // 저장된 값이 없고 initialValue가 있으면 초기화
          if (initialValue !== undefined) {
            await localforage.setItem<T>(strKey, initialValue);
            setValue(initialValue);
            onChange?.(initialValue);
          } else {
            setValue(undefined);
            onChange?.(undefined);
          }
        } else {
          setValue(stored);
          onChange?.(stored);
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      mountedRef.current = false;
    };
    // strKey가 바뀌면 새로 로딩
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strKey]);

  const setStorage = useCallback(
    async (next: T | ((prev: T | undefined) => T)) => {
      try {
        const resolved =
          typeof next === "function"
            ? (next as (prev: T | undefined) => T)(value)
            : next;

        // 메모리 값 먼저 갱신(낙관적 UI)
        if (mountedRef.current) setValue(resolved);

        await localforage.setItem<T>(strKey, resolved);
        onChange?.(resolved);
      } catch (e) {
        setError(e);
        // 실패 시 값을 되돌리는 로직이 필요하면 여기서 처리 가능
      }
    },
    [strKey, onChange, value]
  );

  const removeStorage = useCallback(async () => {
    try {
      await localforage.removeItem(strKey);
      if (mountedRef.current) setValue(undefined);
      onChange?.(undefined);
    } catch (e) {
      setError(e);
    }
  }, [strKey, onChange]);

  const resetStorage = useCallback(async () => {
    if (initialValue === undefined) {
      // 초기값이 없다면 remove로 처리
      await removeStorage();
      return;
    }
    await setStorage(initialValue);
  }, [initialValue, removeStorage, setStorage]);

  const refetch = useCallback(async () => {
    try {
      const latest = await localforage.getItem<T>(strKey);
      if (mountedRef.current) setValue(latest ?? undefined);
      onChange?.(latest ?? undefined);
      return latest ?? undefined;
    } catch (e) {
      setError(e);
      return value;
    }
  }, [strKey, onChange, value]);

  return {
    value,
    loading,
    error,
    setStorage,
    removeStorage,
    resetStorage,
    refetch,
  };
}
