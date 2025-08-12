import React, { useEffect } from "react";
import SiteHeader from "./SiteHeader";
import NavBar from "./NavBar";
import ItemGrid from "./ItemGrid";
import { useData } from "../../contexts/DataContext";

const Main = () => {
  const { data, page, update, setUpdate, refreshData } = useData();

  useEffect(() => {
    if (page && update) {
      console.log("refreshData is triggered!!!!")
      refreshData();
      setUpdate(false);
    }
  }, [page, update]);

  return (
    <div className="app container">
      <SiteHeader />
      <NavBar />
      <div className="page container">
        {data && page ? <ItemGrid /> : <h2>Open a page</h2>}
      </div>
    </div>
  );
};

export default Main;
