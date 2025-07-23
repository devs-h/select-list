export interface Storage {
  value: string;
  label: string;
}

export interface MenuListContextProps {
  storage: Storage[];
  setStorage: React.Dispatch<React.SetStateAction<Storage[]>>;
}