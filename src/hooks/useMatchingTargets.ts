import { useState, useRef, useContext } from "react";
import type { Storage, MenuData } from "../types/menuListType";
import { MenuListContext } from "./useStorage";

const generateUniqueRandomIndexes = (
  storage: MenuData,
  length: number,
  excludeIndexes: number[] = []
): number[] => {
  const availableIndexes = storage.selectList
    .map((_, idx) => idx)
    .filter((idx) => !excludeIndexes.includes(idx));

  const result = new Set<number>();
  while (result.size < length && availableIndexes.length > 0) {
    const randomIdx = Math.floor(Math.random() * availableIndexes.length);
    result.add(availableIndexes[randomIdx]);
    availableIndexes.splice(randomIdx, 1); // 중복 제거
  }

  return Array.from(result);
};

const getMatchItems = (storage: MenuData, length: number, excludeItems: Storage[] = []) => {
  const excludeNames = excludeItems.map((item) => item.value); // value 기준 중복 방지

  const excludeIndexes = storage.selectList
    .map((item, idx) => excludeNames.includes(item.value) ? idx : -1)
    .filter((idx) => idx !== -1);

  const randomIndexes = generateUniqueRandomIndexes(storage, length, excludeIndexes);
  return randomIndexes.map((idx) => storage.selectList[idx]);
};

export const useMatchingTargets = ({ length }: { length: number }) => {
  const { storage } = useContext(MenuListContext);
  const initialTargets = useRef<Array<Storage>>(getMatchItems(storage, length));
  const [targets, setTargets] = useState<Array<Storage>>(
    initialTargets.current
  );

  const setMatchingTargets = (newLength: number) => {
    setTargets(getMatchItems(storage, newLength));
  };

  const setRandomFromIndex = (startIndex: number) => {
    const fixedItems = targets.slice(0, startIndex); // 고정된 앞부분
    const newRandomItems = getMatchItems(
      storage,
      targets.length - startIndex,
      fixedItems
    ); // 중복 피해서 뒤만 랜덤

    setTargets([...fixedItems, ...newRandomItems]);
  };

  return { matchingTargets: targets, setMatchingTargets, setRandomFromIndex };
};
