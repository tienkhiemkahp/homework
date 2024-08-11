import ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
const root = document.querySelector("#root");
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);