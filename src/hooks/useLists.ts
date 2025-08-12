import type { IItem } from "../types/menuListType";
import { useStorage } from "./useStorage";

export const useLists = (key: string) => {
  const { storage, setStorage } = useStorage(key);

  const setSelectedMenu = (selectData: IItem) => {
    if (storage.questionList.some((item) => item.value === selectData.value)) {
      const updatedQuestionList = storage.questionList.filter(
        (item) => item.value !== selectData.value,
      );
      const updatedSelectList = [...storage.selectedList, selectData];

      const newStorage = {
        ...storage,
        questionList: updatedQuestionList,
        selectedList: updatedSelectList,
      };

      setStorage(newStorage);
      return;
    }

    if (storage.selectedList.some((item) => item.value === selectData.value)) {
      const updatedSelectList = storage.selectedList.filter(
        (item) => item.value !== selectData.value,
      );
      const updatedQuestionList = [...storage.questionList, selectData];

      const newStorage = {
        ...storage,
        questionList: updatedQuestionList,
        selectList: updatedSelectList,
      };

      setStorage(newStorage);
      return;
    }
  };

  const setQuestionList = (questionList: IItem[]) => {
    setStorage({ ...storage, questionList });
  };

  return { setSelectedMenu, setQuestionList };
};
