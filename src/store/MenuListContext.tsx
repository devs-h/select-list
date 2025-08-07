import { createContext } from "react";
import type { IMenuListContextProps } from "../types/menuListType";

export const MenuListContext = createContext<IMenuListContextProps>({
  data: {
    answerCount: 0,
    questionList: [
      {
        value: "main_news",
        matched: false,
      },
    ],
    selectList: [],
    matchingTargets: [],
  },
  setData: () => {},
});
