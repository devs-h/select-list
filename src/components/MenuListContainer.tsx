import { useState } from 'react';
import { useStorage } from '../hooks/useStorage';
import MenuList from './MenuList';
import SelectMenuList from './SelectMenuList';

function MenuListContainer() {
  const [isShowSelectMenuList, setIsShowSelectMenuList] = useState(false);
  const { storage } = useStorage("menuList");

  return (
    <div className="menu-list-container">
      <div className="menu-list-container-header">
        {/* 설정 버튼 - 전체 리스트 Show/Hide */}
        <button
          type="button"
          onClick={() => setIsShowSelectMenuList(!isShowSelectMenuList)}
          >
          설정
        </button>
      </div>

      {/* 메뉴 리스트 */}
      <MenuList 
        menuList={storage}
        />

      {/* 전체 리스트 */}
      {isShowSelectMenuList && <SelectMenuList />}
    </div>
  );
}

export default MenuListContainer;