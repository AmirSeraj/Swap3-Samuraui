import ReactDOM from "react-dom/client";
import "./index.css";
import { DataProvider } from "./components/Context.jsx";
import React from "react";
import { Root } from "./components/Root.jsx";
// import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <DataProvider>
      {/* <App /> */}
      <Root />
     </DataProvider>
  </React.StrictMode>
);
