import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@unocss/reset/normalize.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
