import { useEffect } from "react";
import { useStorage } from "../hooks/useStorage";

import type { IItem } from "../types/menuListType";

function MenuList({ isShowSelectMenuList }: { isShowSelectMenuList: boolean }) {
  const { storage, setStorage, isAllStrike, setRestRandomTargets } =
    useStorage("menuList");

  const getMatchedItemClassName = (menu: IItem, index: number) => {
    const isStrike = storage.answerList[index]?.value === menu.value;
    const isBall = storage.answerList.some((item) => item.value === menu.value);

    return isStrike ? "strike" : isBall ? "ball" : "";
  };

  useEffect(() => {
    if (isAllStrike) return;

    const interval = setInterval(() => {
      setRestRandomTargets(storage.selectedList);
    }, 1000);

    return () => clearInterval(interval);
  }, [setRestRandomTargets, storage.selectedList, isAllStrike]);

  return (
    <>
      <span style={{ position: "absolute", top: "10px", left: "10px" }}>
        {storage.answerList.map((item) => item.value).join(", ")}
      </span>
      <ul className='menu-list'>
        {storage.selectedList.map((menu, index) => (
          <li
            key={menu.value}
            className={getMatchedItemClassName(menu, index)}
            onClick={() => {
              if (!isShowSelectMenuList) return;

              setStorage({
                ...storage,
                selectedList: storage.selectedList.filter(
                  (item) => item.value !== menu.value,
                ),
              });
            }}>
            {menu.value}
          </li>
        ))}
      </ul>
    </>
  );
}

export default MenuList;
