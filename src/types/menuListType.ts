export interface IItem {
  value: string;
  matched: boolean;
}

export interface IMenuData {
  answerCount: number;
  selectList: IItem[];
  questionList: IItem[];
  matchingTargets: IItem[];
}

export interface IMenuListContextProps {
  data: IMenuData;
  setData: React.Dispatch<React.SetStateAction<IMenuData>>;
}