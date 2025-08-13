import { useDebouncedValue } from "../hooks/useDebounced";

export function Splash({ visible }: { visible?: boolean }) {
  const debouncedVisible = useDebouncedValue(visible, 1000);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        opacity: debouncedVisible ? 1 : 0,
        transition: "1s",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      <span style={{ margin: "auto" }}>로딩중</span>
    </div>
  );
}
