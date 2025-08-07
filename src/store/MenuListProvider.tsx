import { useState } from "react";
import type { ReactNode } from "react";
import type { IMenuData } from "../types/menuListType";
import { MenuListContext } from "./MenuListContext";

export const MenuListProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<IMenuData>({
    answerCount: 0,
    selectList: [],
    questionList: [],
    matchingTargets: [],
  });

  return (
    <MenuListContext.Provider value={{ data, setData }}>
      <div className="test-code">
        <hr />
        <p>정답 갯수: {data.answerCount}</p>
        <p>문제 리스트: {data.questionList.map((item) => item.value)}</p>
        <hr />
      </div>
      {children}
    </MenuListContext.Provider>
  );
};