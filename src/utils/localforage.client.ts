// src/storage/localforage.client.ts
import localforage from "localforage";

let ready = false;

/**
 * @description localForage를 IndexedDB 전용으로 초기화하고,
 * 일부 환경에서 발생하는 silent failure를 방지하기 위해 간단한 self-test를 수행합니다.
 */
export async function initLocalForage() {
  if (ready) return true;

  // 드라이버를 INDEXEDDB로만 고정
  await localforage.setDriver(localforage.INDEXEDDB);

  localforage.config({
    name: "app",
    storeName: "app_store", // 영문 소문자 + _ 권장
    version: 1.0,
    description: "App persistent storage (IndexedDB via localForage)",
  });

  try {
    await localforage.ready();

    // ✅ 셀프 테스트 (일부 브라우저/프라이빗 모드에서 set/get이 막히는 경우가 있어 선제 확인)
    const k = "__lf_selftest__";
    const v = String(Date.now());
    await localforage.setItem(k, v);
    const r = await localforage.getItem<string>(k);
    await localforage.removeItem(k);
    if (r !== v) throw new Error("LocalForage self-test failed");

    ready = true;
    return true;
  } catch (e) {
    console.warn("[localforage] init failed:", e);
    return false;
  }
}

export { localforage };
// src/hooks/useStorage.ts
