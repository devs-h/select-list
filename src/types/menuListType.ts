export interface IItem {
  value: string;
  matched: boolean;
}

export interface IMenuData {
  answerCount: number;
  selectedList: IItem[];
  questionList: IItem[];
  answerList: IItem[];
  // matchingTargets: IItem[];
}

export interface IMenuListContextProps {
  data: IMenuData;
  setData: React.Dispatch<React.SetStateAction<IMenuData>>;
}
