import { useEffect, useState } from "react";

/** 현재 hash(# 뒤 경로)를 '/menu' 같은 형태로 반환 */
const getHashPath = (): string => {
  const raw = window.location.hash.replace(/^#/, "");
  return raw ? (raw.startsWith("/") ? raw : `/${raw}`) : "/";
};

/** hash 경로를 구독하는 훅 */
export function useHashPath() {
  const [path, setPath] = useState<string>(getHashPath());
  useEffect(() => {
    const onChange = () => setPath(getHashPath());
    window.addEventListener("hashchange", onChange);
    // 첫 진입 시 hash 없는 경우 기본 '/'
    if (!window.location.hash) window.location.hash = "#/";
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return path;
}
