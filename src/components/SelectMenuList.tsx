import lists from '../assets/lists.json';
import { useStorage } from '../hooks/useStorage';

function SelectMenuList() {
  const { setSelectedMenu } = useStorage("menuList");

  return (
    <div className="select-menu-list">
      <ul className="select-menu-list-container">
        {lists.map((list) => {
          const selectedMenu = JSON.parse(localStorage.getItem("menuList") || "[]");
          const isSelected = selectedMenu.some((menu: { value: string; label: string }) => menu.value === list.value);
          return (<li key={list.value}>
            <button type="button" className={isSelected ? 'active' : ''}
              onClick={() => setSelectedMenu({ value: list.value, label: list.label })}
              >
              {list.label}
            </button>
          </li>);
        })}
      </ul>
    </div>
  );
}

export default SelectMenuList;