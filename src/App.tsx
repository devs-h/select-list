import '../src/assets/App.css'
import MenuListContainer from './components/MenuListContainer'
import { useStorage } from './hooks/useStorage';

import InputPopup from './components/InputPopup';
import { MenuListProvider } from './store/MenuListProvider';

function SelectMenuList() {
  const { storage } = useStorage("menuList");

  return (
    <>
      {storage.answerCount === 0 ? <InputPopup /> : <MenuListContainer />}
    </>
  )
}

function App() {
  return (
    <MenuListProvider>
      <SelectMenuList />
    </MenuListProvider>
  )
}

export default App
