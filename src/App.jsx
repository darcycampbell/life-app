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
import React, { useState, createContext, useEffect } from "react";
import useDatabase from "./hooks/useDatabase";

//remove context
const CategoryContext = createContext();

function App() {
  const fetchData = useDatabase("fetch");
  const page = localStorage.getItem("page");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (page) {
      fetchData(null, page).then(data => {
        console.log("this is data: ", data)
        setData(data)
      });
    }
  }, [page])

  return (
    <div className="app container">
      <SiteHeader />
      <NavBar setData={setData} />
      <CategoryContext.Provider value={setData}>
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