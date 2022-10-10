import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { AuthContextProvider } from "./context/AuthContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
