import { useState } from "react";
import type { ReactNode } from "react";
import { MenuListContext } from "../hooks/useStorage";
import type { Storage } from "../types/menuListType";

export const MenuListProvider = ({ children }: { children: ReactNode }) => {
  const [storage, setStorage] = useState<Storage[]>(() => {
    const value = localStorage.getItem("menuList");
    return value ? JSON.parse(value) : [{ value: "main_news", label: "주요뉴스" }];
  });

  return (
    <MenuListContext.Provider value={{ storage, setStorage }}>
      {children}
    </MenuListContext.Provider>
  );
};