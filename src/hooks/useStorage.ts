import { useContext } from "react";
import type { IMenuData } from "../types/menuListType";
import { MenuListContext } from "../store/MenuListContext";

export const useStorage = (key: string) => {
  const { data, setData } = useContext(MenuListContext);

  const setStorage = (data: IMenuData) => {
    setData(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  return { storage: data, setStorage };
};
