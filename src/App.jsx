import "./App.css";
import "../src/css/buttons.css";
import "../src/css/containers.css";
import "../src/css/form.css";
import "../src/css/item.css";
import "../src/css/overlay.css";
import "../src/css/text.css";
import React from "react";
import { DataProvider } from "./content/DataContext";
import Main from "./components/Main/index";

function App() {
  return (
    <DataProvider>
      <Main />
    </DataProvider>
  );
}

export default App;
