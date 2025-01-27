import "./App.css";
import "../src/css/buttons.css";
import "../src/css/containers.css";
import "../src/css/form.css";
import "../src/css/item.css";
import "../src/css/overlay.css";
import "../src/css/text.css";
import ItemGrid from "./components/ItemGrid";
import NavBar from "./components/NavBar";
import SiteHeader from "./components/SiteHeader";
import React, { useState, createContext } from "react";

const CategoryContext = createContext();

function App() {
  const [page, setPage] = useState(null);
  const [data, setData] = useState(null);

  return (
    <div className="app container">
      <SiteHeader />
      <NavBar setPage={setPage} setData={setData} />
      <CategoryContext.Provider value={page}>
        {" "}
        <div className="page container">
          {data && page ? (
            <ItemGrid content={data} />
          ) : (
            <h2>Open a page</h2>
          )}
        </div>
      </CategoryContext.Provider>
    </div>
  );
}

export {CategoryContext};
export default App;