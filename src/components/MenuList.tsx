import { useEffect } from "react";
import { useStorage } from "../hooks/useStorage";
import { useMatchingTargets } from "../hooks/useMatchingTargets";
import type { IItem } from "../types/menuListType";
import { useLists } from "../hooks/useLists";

function MenuList({
  isShowSelectMenuList,
  setIsAllStrike,
}: {
  isShowSelectMenuList: boolean;
  setIsAllStrike: (isAllStrike: boolean) => void;
}) {
  const { storage } = useStorage("menuList");
  const { setSelectedMenu } = useLists("menuList");
  const { matchingTargets, setRestRandomTargets } = useMatchingTargets(storage.questionList);

  const getMatchedItemClassName = (menu: IItem, index: number) => {
    const isStrike = matchingTargets[index]?.value === menu.value;
    const isBall = matchingTargets.some((item) => item.value === menu.value);

    return isStrike ? "strike" : isBall ? "ball" : "";
  };

  const isAllStrike = storage.selectList.every((menu) => {
    const isStrike = matchingTargets.some((item) => item.value === menu.value);
    return isStrike;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRestRandomTargets(storage.selectList);
    }, 1000);

    return () => clearInterval(interval);
  }, [setRestRandomTargets, storage.selectList, matchingTargets]);

  useEffect(() => {
    if (isAllStrike) {
      setIsAllStrike(true);
    }
    if (!isAllStrike) {
      setIsAllStrike(false);
    }
  }, [isAllStrike, setIsAllStrike]);

  return (
    <>
      <span style={{ position: "absolute", top: "10px", left: "10px" }}>
        {matchingTargets.map((item) => item.value).join(", ")}
      </span>
      <ul className="menu-list">
        {storage.selectList.map((menu, index) => (
          <li
            key={menu.value}
            className={getMatchedItemClassName(menu, index)}
            onClick={() => {
              if (!isShowSelectMenuList) {
                return;
              }

              setSelectedMenu(menu);
            }}
          >
            {menu.value}
          </li>
        ))}
      </ul>
    </>
  );
}

export default MenuList;
