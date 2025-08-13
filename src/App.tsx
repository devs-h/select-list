import "../src/assets/App.css";
import MenuListContainer from "./components/MenuListContainer";
import { InputPopup } from "./components/InputPopup";
import { MenuListProvider } from "./store/MenuListProvider";
import { useContext } from "react";
import { MenuListContext } from "./store/MenuListContext";
import { useDebouncedValue } from "./hooks/useDebounced";

function SelectMenuList() {
  const { data, loading } = useContext(MenuListContext);
  const debouncedLoading = useDebouncedValue(loading, 1000);
  return (
    <>
      {data?.answerCount ? <MenuListContainer /> : <InputPopup />}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#000",
          opacity: debouncedLoading ? 1 : 0,
          transition: "1s",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <span style={{ margin: "auto" }}>로딩중</span>
      </div>
    </>
  );
}

function App() {
  return (
    <MenuListProvider>
      <SelectMenuList />
    </MenuListProvider>
  );
}

export default App;
