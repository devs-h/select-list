import { createContext, useContext } from "react";
import type { MenuListContextProps } from "../types/menuListType";

export const MenuListContext = createContext<MenuListContextProps>({
  storage: [{ value: "main_news", label: "주요뉴스" }],
  setStorage: () => {},
});

export const useStorage = (key: string) => {
  const { storage, setStorage } = useContext(MenuListContext);

  const setSelectedMenu = (selectData: { value: string; label: string }) => {
    if (storage.some((item) => item.value === selectData.value)) {
      const newStorage = storage.filter(
        (item) => item.value !== selectData.value,
      );
      setStorage(newStorage);
      localStorage.setItem(key, JSON.stringify(newStorage));
      return;
    }

    const newStorage = [...storage, selectData];
    setStorage(newStorage);
    localStorage.setItem(key, JSON.stringify(newStorage));
  };

  return { storage, setSelectedMenu };
};
