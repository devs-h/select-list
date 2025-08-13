import { useContext, useEffect, useState } from "react";
import { MenuListContext } from "../store/MenuListContext";

function SelectMenuList({
  isShowSelectMenuList,
}: {
  isShowSelectMenuList: boolean;
}) {
  const [counter, setCounter] = useState(0);
  const { data, setData, isAllStrike } = useContext(MenuListContext);

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
    <div className="select-menu-list">
      {counter}
      <ul className="select-menu-list-container">
        {data?.questionList.map((list) => {
          return (
            <li key={list.value}>
              <button
                type="button"
                onClick={() => {
                  if (!isShowSelectMenuList) return;

                  const isAlreadySelected = data?.selectedList.find(
                    (item) => item.value === list.value
                  );
                  if (isAlreadySelected) return;

                  setData({
                    ...data,
                    selectedList: [...(data?.selectedList ?? []), list],
                  });
                }}
              >
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
