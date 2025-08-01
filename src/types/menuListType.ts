export interface Storage {
  value: string;
}

export interface MenuData {
  answerCount: number;
  selectList: Storage[];
  questionList: Storage[];
}

export interface MenuListContextProps {
  storage: MenuData;
  setStorage: React.Dispatch<React.SetStateAction<MenuData>>;
}   