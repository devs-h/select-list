import { useState } from "react";
import MenuList from "./MenuList";
import SelectMenuList from "./SelectMenuList";
import { MenuListProvider } from "../store/MenuListContext";
import Confetti from "react-confetti";

function MenuListContainer() {
  const [isShowSelectMenuList, setIsShowSelectMenuList] = useState(false);

  const [isAllStrike, setIsAllStrike] = useState(false);

  return (
    <MenuListProvider>
      {isAllStrike && <Confetti />}
      <div className='menu-list-container'>
        <div className='menu-list-container-header'>
          {/* 설정 버튼 - 전체 리스트 Show/Hide */}
          <button
            type='button'
            className='button-config'
            onClick={() => setIsShowSelectMenuList(!isShowSelectMenuList)}>
            설정
          </button>
        </div>

        {/* 메뉴 리스트 */}
        <MenuList
          isShowSelectMenuList={isShowSelectMenuList}
          setIsAllStrike={setIsAllStrike}
        />

        {/* 전체 리스트 */}
        {isShowSelectMenuList && (
          <SelectMenuList
            isShowSelectMenuList={isShowSelectMenuList}
            isAllStrike={isAllStrike}
          />
        )}
      </div>
    </MenuListProvider>
  );
}

export default MenuListContainer;
