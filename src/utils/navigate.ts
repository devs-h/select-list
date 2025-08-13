/** 페이지 이동 (hash 기반) */
export function navigate(to: string) {
  const next = to.startsWith("/") ? `#${to}` : `#/${to}`;
  if (window.location.hash !== next) window.location.hash = next;
}
