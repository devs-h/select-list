import { useState } from 'react';
import MenuList from './MenuList';
import SelectMenuList from './SelectMenuList';
import { MenuListProvider } from '../store/MenuListContext';
    
function MenuListContainer() {
  const [isShowSelectMenuList, setIsShowSelectMenuList] = useState(false);

  return (
    <MenuListProvider>
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
        <MenuList />

        {/* 전체 리스트 */}
        {isShowSelectMenuList && <SelectMenuList />}
      </div>
    </MenuListProvider>
  );
}

export default MenuListContainer;