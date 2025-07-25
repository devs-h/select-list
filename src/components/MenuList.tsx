import { useContext } from "react";
import { MenuListContext, useStorage } from "../hooks/useStorage";

function MenuList() {
  const { storage } = useContext(MenuListContext);
  const { setSelectedMenu } = useStorage("menuList");
  
  // 메뉴 리스트 최소 5개 칸 생성
  const itemsToRender = [
    ...storage,
    ...Array.from({ length: Math.max(5 - storage.length, 0) }, (_, index) => ({ value: `empty-${index}`, label: '' }))
  ];

  return (
    <ul className="menu-list">
      {itemsToRender.map((menu) => (
        <li key={menu.value} onClick={() => {
          if (menu.label) {
            setSelectedMenu({ value: menu.value, label: menu.label });
          }
        }}>{menu.label}</li>
      ))}
    </ul>
  );
}

export default MenuList;