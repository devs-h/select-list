import { useContext, useEffect } from "react";

import type { IItem } from "../types/menuListType";
import { MenuListContext } from "../store/MenuListContext";

export function MenuList({
  isShowSelectMenuList,
}: {
  isShowSelectMenuList: boolean;
}) {
  const { data, setData, setRestRandomTargets, isAllStrike } =
    useContext(MenuListContext);

  const getMatchedItemClassName = (menu: IItem, index: number) => {
    const isStrike = data?.answerList[index]?.value === menu.value;
    const isBall = data?.answerList.some((item) => item.value === menu.value);

    return isStrike ? "strike" : isBall ? "ball" : "";
  };

  useEffect(() => {
    if (isAllStrike || !data?.selectedList) return;

    const interval = setInterval(() => {
      setRestRandomTargets(data?.selectedList);
    }, 1000);

    return () => clearInterval(interval);
  }, [setRestRandomTargets, data?.selectedList, isAllStrike]);

  return (
    <>
      <span style={{ position: "absolute", top: "10px", left: "10px" }}>
        {data?.answerList.map((item) => item.value).join(", ")}
      </span>
      <ul className="menu-list">
        {data?.selectedList.map((menu, index) => (
          <li
            key={menu.value}
            className={getMatchedItemClassName(menu, index)}
            onClick={() => {
              if (!isShowSelectMenuList) return;

              setData({
                ...data,
                selectedList: data?.selectedList.filter(
                  (item) => item.value !== menu.value
                ),
              });
            }}
          >
            {menu.value}
          </li>
        ))}
      </ul>
    </>
  );
}
