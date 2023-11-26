import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
// order
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./index.css";
import { store } from "./store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="top-center" />
  </Provider>
);
