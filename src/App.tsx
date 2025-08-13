// App.tsx
import "../src/assets/App.css";
import { MainPage } from "./pages/MainPage";
import { MenuPage } from "./pages/MenuPage";
import { useHashPath } from "./hooks/useHashPath";
/** 라우트 테이블 */

function App() {
  const path = useHashPath();
  switch (path) {
    case "/":
      return <MainPage />;
    case "/menu":
      return <MenuPage />;
    default:
      return <div style={{ padding: 24 }}>404 Not Found: {path}</div>;
  }
}

export default App;
