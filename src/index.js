// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom"; // ✅
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>  // 🔴 Temporarily disable for routing issues
    <HashRouter >

      <App />
    </HashRouter>
  // </React.StrictMode>
);

reportWebVitals();
