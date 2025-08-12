import { useContext } from "react";
import type { IItem, IMenuData } from "../types/menuListType";
import { MenuListContext } from "../store/MenuListContext";

export const useStorage = (key: string) => {
  const { data, setData } = useContext(MenuListContext);

  const setStorage = (data: IMenuData) => {
    localStorage.setItem(key, JSON.stringify(data));
    setData(data);
  };

  const determineIsAllStrike = () => {
    const isAllStrike = data.answerList.every((item, idx) => {
      return item.value === data.selectedList[idx]?.value;
    });
    return isAllStrike;
  };

  const getMatchItems = (items: IItem[], selectList: IItem[] = []) => {
    const result = new Set<IItem>(selectList);

    while (result.size < items.length) {
      const randomIdx = Math.floor(Math.random() * items.length);
      result.add(items[randomIdx]);
    }

    return Array.from(result);
  };
  const setRestRandomTargets = (selectedItems: IItem[]) => {
    const newRandomItems = getMatchItems(data.questionList, selectedItems);
    setData({
      ...data,
      questionList: newRandomItems,
    });
  };

  return {
    storage: {
      ...data,
    },
    setStorage,
    setRestRandomTargets,
    resetStorage: () => {
      localStorage.removeItem(key);
      setData({
        answerCount: 0,
        questionList: [],
        selectedList: [],
        answerList: [],
      });
    },
    isAllStrike: determineIsAllStrike(),
  };
};
