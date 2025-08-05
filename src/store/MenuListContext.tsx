import { useState } from "react";
import type { ReactNode } from "react";
import { MenuListContext } from "../hooks/useStorage";
import type { MenuData } from "../types/menuListType";
import InputPopup from "../components/InputPopup";

export const MenuListProvider = ({ children }: { children: ReactNode }) => {
  const [storage, setStorage] = useState<MenuData>(() => {
    const value = localStorage.getItem("menuList");
    if (value) {
      const parsedValue = JSON.parse(value);
      if (Array.isArray(parsedValue?.questionList)) {
        return parsedValue;
      }
    }
    return { answerCount: 0, selectList: [], questionList: [] };
  });

  return (
    <>
      {storage.answerCount === 0 ? (
        <InputPopup setStorage={setStorage} />
      ) : (
        <MenuListContext.Provider value={{ storage, setStorage }}>
          <div className="test-code">
            <hr />
            <p>정답 갯수: {storage.answerCount}</p>
            <p>문제 리스트: {storage.questionList.map((item) => item.value)}</p>
            <hr />
          </div>
          {children}
        </MenuListContext.Provider>
      )}
    </>
  );
};