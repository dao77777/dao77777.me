import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "github-markdown-css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Store } from "./store";

ReactDOM.render(
  <Store>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Store>,
  document.getElementById("root")
);
