import { useEffect, useState } from "react";
import lists from "../assets/lists.json";
import { useStorage } from "../hooks/useStorage";

function SelectMenuList({
  isShowSelectMenuList,
  isAllStrike,
}: {
  isShowSelectMenuList: boolean;
  isAllStrike: boolean;
}) {
  const { setSelectedMenu } = useStorage("menuList");

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (isShowSelectMenuList) {
      if (isAllStrike) {
        setCounter(0);
        return;
      }

      const interval = setInterval(() => {
        setCounter((prev) => (prev + 1) % 5);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isShowSelectMenuList, isAllStrike]);

  const sortedRandomList = lists.sort(() => {
    if (counter === 0) {
      return Math.random() - 0.5;
    }
    return 0;
  });

  return (
    <div className='select-menu-list'>
      <ul className='select-menu-list-container'>
        {sortedRandomList.map((list) => {
          const selectedMenu = JSON.parse(
            localStorage.getItem("menuList") || "[]",
          );
          const isSelected = selectedMenu.some(
            (menu: { value: string; label: string }) =>
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
                  setSelectedMenu({ value: list.value, label: list.label });
                }}>
                {counter === 0 ? list.label : "?"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SelectMenuList;
