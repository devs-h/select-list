import { useContext, useMemo } from "react";
import type { IItem, IMenuData } from "../types/menuListType";
import { MenuListContext } from "../store/MenuListContext";
const KEY = "menuList";
export const useMenuListStorage = () => {
  const { data, setData } = useContext(MenuListContext);

  const setStorage = (data: IMenuData) => {
    localStorage.setItem(KEY, JSON.stringify(data));
    setData(data);
  };

  const isAllStrike = useMemo(() => {
    const isAllStrike = data?.answerList.every((item, idx) => {
      return item.value === data.selectedList[idx]?.value;
    });
    return isAllStrike;
  }, [data]);

  const getMatchItems = (items: IItem[], selectList: IItem[] = []) => {
    const result = new Set<IItem>(selectList);

    while (result.size < items.length) {
      const randomIdx = Math.floor(Math.random() * items.length);
      result.add(items[randomIdx]);
    }

    return Array.from(result);
  };
  const setRestRandomTargets = (selectedItems: IItem[]) => {
    if (!data) return;

    const newRandomItems = getMatchItems(data.questionList, selectedItems);
    setData({
      ...data,
      questionList: newRandomItems,
    });
  };

  return {
    storage: data,
    setStorage,
    setRestRandomTargets,
    resetStorage: () => {
      localStorage.removeItem(KEY);
      setData({
        answerCount: 0,
        questionList: [],
        selectedList: [],
        answerList: [],
      });
    },
    isAllStrike,
  };
};
