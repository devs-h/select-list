import { useContext, useState } from "react";
import Confetti from "react-confetti";
import { MenuListContext } from "../store/MenuListContext";
import { MenuList } from "../components/MenuList";
import { SelectMenuList } from "../components/SelectMenuList";
import { navigate } from "../utils/navigate";
export function MenuPage() {
  const [isShowSelectMenuList, setIsShowSelectMenuList] = useState(false);
  const { isAllStrike, removeStorage } = useContext(MenuListContext);
  const handleClear = () => {
    removeStorage();
    navigate("/");
  };
  return (
    <>
      {isAllStrike && <Confetti />}
      <div className="menu-list-container">
        <div className="menu-list-container-header">
          <button type="button" className="button-reset" onClick={handleClear}>
            초기화
          </button>
          {/* 설정 버튼 - 전체 리스트 Show/Hide */}
          <button
            type="button"
            className="button-config"
            onClick={() => setIsShowSelectMenuList(!isShowSelectMenuList)}
          >
            설정
          </button>
        </div>

        {/* 메뉴 리스트 */}
        <MenuList
          isShowSelectMenuList={isShowSelectMenuList}
          // setIsAllStrike={setIsAllStrike}
        />

        {/* 전체 리스트 */}
        {isShowSelectMenuList && (
          <SelectMenuList isShowSelectMenuList={isShowSelectMenuList} />
        )}
      </div>
    </>
  );
}
