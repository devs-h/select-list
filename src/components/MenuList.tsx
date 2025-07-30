import { useContext, useEffect } from "react";
import { MenuListContext, useStorage } from "../hooks/useStorage";
import { useMatchingTargets } from "../hooks/useMatchingTargets";
import type { Storage } from "../types/menuListType";

function MenuList({
  isShowSelectMenuList,
  setIsAllStrike,
}: {
  isShowSelectMenuList: boolean;
  setIsAllStrike: (isAllStrike: boolean) => void;
}) {
  const { storage } = useContext(MenuListContext);
  const { setSelectedMenu } = useStorage("menuList");
  const { matchingTargets, setRandomFromIndex } = useMatchingTargets({
    length: 5,
  });

  // 메뉴 리스트 최소 5개 칸 생성
  const itemsToRender = [
    ...storage,
    ...Array.from({ length: Math.max(5 - storage.length, 0) }, (_, index) => ({
      value: `empty-${index}`,
      label: "",
    })),
  ];

  const getMatchedItemClassName = (menu: Storage, index: number) => {
    const isStrike = matchingTargets[index]?.value === menu.value;
    const isBall = matchingTargets.some((item) => item.value === menu.value);

    return isStrike ? "strike" : isBall ? "ball" : "";
  };

  const isAllStrike = itemsToRender.every((menu) => {
    const isStrike = matchingTargets.some((item) => item.value === menu.value);
    return isStrike;
  });

  useEffect(() => {
    const getConsecutiveStrikeIndex = (
      items: Storage[],
      targets: Storage[]
    ): number => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].value !== targets[i]?.value) {
          return i;
        }
      }
      return items.length; // 전부 맞은 경우
    };
    const interval = setInterval(() => {
      const inputCnt = JSON.parse(localStorage.getItem("menuList") ?? "[]");
      const index = getConsecutiveStrikeIndex(itemsToRender, matchingTargets);
      if (index === itemsToRender.length) return;
      setRandomFromIndex(Math.max(index, inputCnt.length));
    }, 1000);

    return () => clearInterval(interval);
  }, [setRandomFromIndex, itemsToRender, matchingTargets]);
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
        {matchingTargets.map((item) => item.label).join(", ")}
      </span>
      <ul className="menu-list">
        {itemsToRender.map((menu, index) => (
          <li
            key={menu.value}
            className={getMatchedItemClassName(menu, index)}
            onClick={() => {
              if (!isShowSelectMenuList) {
                return;
              }

              if (menu.label) {
                setSelectedMenu({ value: menu.value, label: menu.label });
              }
            }}
          >
            {menu.label}
          </li>
        ))}
      </ul>
    </>
  );
}

export default MenuList;
