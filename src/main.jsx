import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/amiri/arabic-400.css";
import "@fontsource/amiri/arabic-700.css";
import "./index.css";
import App from "./App.jsx";

// Enforce light theme strictly across all pages
if (typeof window !== "undefined") {
  document.documentElement.classList.remove("dark");
  localStorage.removeItem("al-hikmah-theme");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
