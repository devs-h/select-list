import { useEffect, useState } from "react";
import { useStorage } from "../hooks/useStorage";

function SelectMenuList({
  isShowSelectMenuList,
}: {
  isShowSelectMenuList: boolean;
}) {
  const [counter, setCounter] = useState(0);
  const { storage, setStorage, isAllStrike } = useStorage("menuList");

  useEffect(() => {
    if (isShowSelectMenuList && !isAllStrike) {
      const interval = setInterval(() => {
        setCounter((prev) => (prev + 1) % 5);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isShowSelectMenuList, isAllStrike, setCounter]);

  // random sort removed ?

  return (
    <div className='select-menu-list'>
      {counter}
      <ul className='select-menu-list-container'>
        {storage.questionList.map((list) => {
          return (
            <li key={list.value}>
              <button
                type='button'
                onClick={() => {
                  if (!isShowSelectMenuList) return;

                  const isAlreadySelected = storage.selectedList.find(
                    (item) => item.value === list.value,
                  );
                  if (isAlreadySelected) return;

                  setStorage({
                    ...storage,
                    selectedList: [...storage.selectedList, list],
                  });
                }}>
                {counter === 0 ? list.value : "?"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SelectMenuList;
