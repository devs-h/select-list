import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { UiContext } from "./UiContext";
import { Splash } from "../components/Splash";

/** UiProvider 설정값 */
export interface UiProviderProps {
  children: ReactNode;
  /** 앱 시작 시 Splash를 보이게 시작할지 (기본: false) */
  startVisible?: boolean;
  /** 시작 시 자동으로 숨길지 (기본: true) */
  autoHideOnStart?: boolean;
  /** 자동 하이드 지연 시간(ms) – startVisible & autoHideOnStart일 때 적용 (기본: 800ms) */
  autoHideDelayMs?: number;
}

/**
 * UI 전역 상태 관리 Provider
 *
 * - Splash 자동 하이드 지원
 * - 시작 시 Splash 표시 여부/지연 시간 옵션화
 * - 임의 시점에 show/hide 제어 가능(타이머 포함)
 */
export const UiProvider = ({
  children,
  startVisible = false,
  autoHideOnStart = true,
  autoHideDelayMs = 800,
}: UiProviderProps) => {
  const [loading, setLoading] = useState<boolean>(startVisible);
  const timerRef = useRef<number | null>(null);

  /** 타이머 정리 */
  const clearTimer = () => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  /**
   * Splash를 표시. durationMs를 주면 지정 시간 뒤 자동으로 hide.
   * @param durationMs 자동 하이드 지연 시간(ms)
   */
  const showLoading = useCallback((durationMs?: number) => {
    clearTimer();
    setLoading(true);
    if (typeof durationMs === "number") {
      timerRef.current = window.setTimeout(() => {
        setLoading(false);
        timerRef.current = null;
      }, durationMs);
    }
  }, []);

  /** Splash를 즉시 숨김 */
  const hideLoading = useCallback(() => {
    clearTimer();
    setLoading(false);
  }, []);

  // 최초 마운트 시: startVisible + autoHideOnStart면 autoHideDelayMs 후 자동 hide
  useEffect(() => {
    if (startVisible && autoHideOnStart) {
      showLoading(autoHideDelayMs);
    }
    return clearTimer; // 언마운트 시 타이머 정리
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 최초 1회

  const value = useMemo(
    () => ({
      loading,
      setLoading, // 필요하면 직접 제어
      showLoading, // 타이머 포함 표시
      hideLoading, // 즉시 숨김
    }),
    [hideLoading, loading, showLoading]
  );

  return (
    <UiContext.Provider value={value}>
      {children}
      <Splash visible={loading} />
    </UiContext.Provider>
  );
};
