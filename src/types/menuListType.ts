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
  isAllStrike?: boolean;
  loading: boolean;
  removeStorage: () => void;
  setRestRandomTargets: (selectedItems: IItem[]) => void;
  data?: IMenuData;
  setData: (
    next: IMenuData | ((prev: IMenuData | undefined) => IMenuData)
  ) => Promise<unknown>;
}
