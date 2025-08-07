import { useState } from "react";
import MenuList from "./MenuList";
import SelectMenuList from "./SelectMenuList";
import Confetti from "react-confetti";

function MenuListContainer() {
  const [isShowSelectMenuList, setIsShowSelectMenuList] = useState(false);
  const [isAllStrike, setIsAllStrike] = useState(false);

  return (
    <>
      {isAllStrike && <Confetti />}
      <div className='menu-list-container'>
        <div className='menu-list-container-header'>
          <button
            type='button'
            className='button-reset'
            onClick={() => {
              localStorage.removeItem("menuList");
            }}>
            초기화
          </button>
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
    </>
  );
}

export default MenuListContainer;
