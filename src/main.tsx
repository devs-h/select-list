import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { UiProvider } from "./store/UiProvider.tsx";
import { MenuListProvider } from "./store/MenuListProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UiProvider startVisible autoHideOnStart autoHideDelayMs={1200}>
      <MenuListProvider>
        <App />
      </MenuListProvider>
    </UiProvider>
  </StrictMode>
);
