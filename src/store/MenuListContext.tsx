import { createContext } from "react";
import type { IMenuListContextProps } from "../types/menuListType";

export const MenuListContext = createContext<IMenuListContextProps>({
  data: {
    answerCount: 0,
    questionList: [],
    selectedList: [],
    answerList: [],
    // matchingTargets: [],
  },
  setData: async () => {},
  isAllStrike: false,
  loading: false,
  setRestRandomTargets: async () => {},
  removeStorage: async () => {},
});
