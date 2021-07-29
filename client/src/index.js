import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

document.title = "USCIS Case Status Notifier";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
