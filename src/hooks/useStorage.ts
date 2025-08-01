import { createContext, useContext } from "react";
import type { MenuListContextProps, Storage } from "../types/menuListType";

export const MenuListContext = createContext<MenuListContextProps>({
  storage: {answerCount: 0, questionList: [{ value: "main_news" }], selectList: []},
  setStorage: () => {},
});

export const useStorage = (key: string) => {
  const { storage, setStorage } = useContext(MenuListContext);

  const setSelectedMenu = (selectData: { value: string }) => {

    if (storage.questionList.some((item) => item.value === selectData.value)) {
      const updatedQuestionList = storage.questionList.filter(item => item.value !== selectData.value);
      const updatedSelectList = [...storage.selectList, selectData];
  
      const newStorage = {
        ...storage,
        questionList: updatedQuestionList,
        selectList: updatedSelectList,
      };
  
      setStorage(newStorage);
      localStorage.setItem(key, JSON.stringify(newStorage));
      return;
    }
  
    if (storage.selectList.some((item) => item.value === selectData.value)) {
      const updatedSelectList = storage.selectList.filter(item => item.value !== selectData.value);
      const updatedQuestionList = [...storage.questionList, selectData];
  
      const newStorage = {
        ...storage,
        questionList: updatedQuestionList,
        selectList: updatedSelectList,
      };
  
      setStorage(newStorage);
      localStorage.setItem(key, JSON.stringify(newStorage));
      return;
    }
  };

  const setQuestionList = (questionList: Storage[]) => {
    setStorage({...storage, questionList});
    localStorage.setItem(key, JSON.stringify({...storage, questionList}));
  };

  return { storage, setSelectedMenu, setQuestionList };
};
