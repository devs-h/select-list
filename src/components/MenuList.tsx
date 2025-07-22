function MenuList({ menuList }: { menuList: { value: string, label: string }[] }) {
  
  // 메뉴 리스트 최소 5개 칸 생성
  const itemsToRender = [
    ...menuList,
    ...Array.from({ length: Math.max(5 - menuList.length, 0) }, (_, index) => ({ value: `empty-${index}`, label: '' }))
  ];

  return (
    <ul className="menu-list">
      {itemsToRender.map((menu) => (
        <li key={menu.value}>{menu.label}</li>
      ))}
    </ul>
  );
}

export default MenuList;