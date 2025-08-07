import { useState } from "react";
import type { IItem } from "../types/menuListType";

const getMatchItems = (items: IItem[], selectList: IItem[] = []) => {
  const result = new Set<IItem>(selectList);

  while (result.size < items.length) {
    const randomIdx = Math.floor(Math.random() * items.length);
    result.add(items[randomIdx]);
  }

  return Array.from(result);
};

export const useMatchingTargets = (items: IItem[]) => {
  const [targets, setTargets] = useState<Array<IItem>>(getMatchItems(items));

  const setRestRandomTargets = (selectedItems: IItem[]) => {
    const newRandomItems = getMatchItems(items, selectedItems);
    setTargets(newRandomItems);
  };

  return { matchingTargets: targets, setRestRandomTargets };
};
