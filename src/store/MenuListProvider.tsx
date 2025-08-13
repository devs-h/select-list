import { useMemo, type ReactNode } from "react";
import type { IItem, IMenuData } from "../types/menuListType";
import { MenuListContext } from "./MenuListContext";
import { useStorage } from "../hooks/useStorage";
import { STORAGE_KEY } from "../contants/storage";

export const MenuListProvider = ({ children }: { children: ReactNode }) => {
  const {
    value: data,
    setStorage: setData,
    removeStorage,
    loading,
  } = useStorage<IMenuData>(STORAGE_KEY.menuList);
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
  return (
    <MenuListContext.Provider
      value={{
        data,
        setData,
        isAllStrike,
        loading,
        setRestRandomTargets,
        removeStorage,
      }}
    >
      <div className="test-code">
        <hr />
        <p>정답 갯수: {data?.answerCount}</p>
        <p>문제 리스트: {data?.questionList.map((item) => item.value)}</p>
        <hr />
      </div>
      {children}
    </MenuListContext.Provider>
  );
};
