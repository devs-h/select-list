import lists from '../assets/lists.json';
import { useStorage } from '../hooks/useStorage';

function SelectMenuList() {
  const { setSelectedMenu } = useStorage("menuList");

  return (
    <div className="select-menu-list">
      <ul className="select-menu-list-container">
        {lists.map((list) => (
          <li key={list.value}>
            <button type="button"
              onClick={() => setSelectedMenu({ value: list.value, label: list.label })}
              >
              {list.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectMenuList;