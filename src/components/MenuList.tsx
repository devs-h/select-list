import { useContext } from "react";
import { MenuListContext, useStorage } from "../hooks/useStorage";
import { useMatchingTargets } from "../hooks/useMatchingTargets";
import type { Storage } from "../types/menuListType";

function MenuList() {
  const { storage } = useContext(MenuListContext);
  const { setSelectedMenu } = useStorage("menuList");
  const { matchingTargets } = useMatchingTargets({ length: 5 });
  console.log(matchingTargets);

  // 메뉴 리스트 최소 5개 칸 생성
  const itemsToRender = [
    ...storage,
    ...Array.from({ length: Math.max(5 - storage.length, 0) }, (_, index) => ({ value: `empty-${index}`, label: '' }))
  ];

  const getMatchedItemClassName = (menu: Storage, index: number) => {
    const isStrike = matchingTargets[index]?.value === menu.value;
    const isBall = matchingTargets.some((item) => item.value === menu.value);

    return isStrike ? 'strike' : isBall ? 'ball' : '';
  };

  return (
    <ul className="menu-list">
      {itemsToRender.map((menu, index) => (
        <li
          key={menu.value}
          className={getMatchedItemClassName(menu, index)}
          onClick={() => {
            if (menu.label) {
              setSelectedMenu({ value: menu.value, label: menu.label });
            }
          }
        }>{menu.label}</li>
      ))}
    </ul>
  );
}

export default MenuList;