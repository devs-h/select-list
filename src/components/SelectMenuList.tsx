import { useEffect, useState } from "react";
import { useStorage } from "../hooks/useStorage";

function SelectMenuList({
  isShowSelectMenuList,
  isAllStrike,
}: {
  isShowSelectMenuList: boolean;
  isAllStrike: boolean;
}) {
  const { storage, setStorage } = useStorage("menuList");

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (isShowSelectMenuList) {
      if (isAllStrike) {
        setCounter(0);
        setStorage({
          ...storage,
          questionList: storage.questionList,
        });
        return;
      }

      const interval = setInterval(() => {
        setCounter((prev) => (prev + 1) % 5);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isShowSelectMenuList, isAllStrike, setStorage]);

  return (
    <div className='select-menu-list'>
      <ul className='select-menu-list-container'>
        {storage.questionList.map((list) => {
          return (
            <li key={list.value}>
              <button
                type='button'
                onClick={() => {
                  if (!isShowSelectMenuList) {
                    return;
                  }
                  setStorage({
                    ...storage,
                    selectList: [...storage.selectList, list],
                  });
                }}>{counter === 0 ? list.value : "?"}</button>
            </li>
          );
        })}
        {/* {sortedRandomList.map((list) => {
          const isSelected = storage.questionList.some(
            (menu: { value: string }) =>
              menu.value === list.value,
          );
          return isSelected ? null : (
            <li key={list.value}>
              <button
                type='button'
                className={isSelected ? "active" : ""}
                onClick={() => {
                  if (!isShowSelectMenuList) {
                    return;
                  }
                  setSelectedMenu({ value: list.value });
                }}>
                {counter === 0 ? list.value : "?"}
              </button>
            </li>
          );
        })} */}
      </ul>
    </div>
  );
}

export default SelectMenuList;
