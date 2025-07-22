import lists from '../assets/lists.json';

function SelectMenuList() {
  return (
    <div className="select-menu-list">
      <ul className="select-menu-list-container">
        {lists.map((list) => (
          <li key={list.value}>{list.label}</li>
        ))}
      </ul>
    </div>
  );
}

export default SelectMenuList;