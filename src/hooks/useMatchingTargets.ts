import { useState, useRef } from "react";
import type { Storage } from "../types/menuListType";
import list from "../assets/lists.json";

const generateUniqueRandomIndexes = (
  length: number,
  excludeIndexes: number[] = []
): number[] => {
  const availableIndexes = list
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

const getMatchItems = (length: number, excludeItems: Storage[] = []) => {
  const excludeNames = excludeItems.map((item) => item.value); // value 기준 중복 방지

  const excludeIndexes = list
    .map((item, idx) => (excludeNames.includes(item.value) ? idx : -1))
    .filter((idx) => idx !== -1);

  const randomIndexes = generateUniqueRandomIndexes(length, excludeIndexes);
  return randomIndexes.map((idx) => list[idx]);
};

export const useMatchingTargets = ({ length }: { length: number }) => {
  const initialTargets = useRef<Array<Storage>>(getMatchItems(length));
  const [targets, setTargets] = useState<Array<Storage>>(
    initialTargets.current
  );

  const setMatchingTargets = (newLength: number) => {
    setTargets(getMatchItems(newLength));
  };

  const setRandomFromIndex = (startIndex: number) => {
    const fixedItems = targets.slice(0, startIndex); // 고정된 앞부분
    const newRandomItems = getMatchItems(
      targets.length - startIndex,
      fixedItems
    ); // 중복 피해서 뒤만 랜덤

    setTargets([...fixedItems, ...newRandomItems]);
  };

  return { matchingTargets: targets, setMatchingTargets, setRandomFromIndex };
};
