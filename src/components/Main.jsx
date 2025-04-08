import React, { useEffect } from "react";
import SiteHeader from "./SiteHeader";
import NavBar from "./NavBar";
import ItemGrid from "./ItemGrid";
import { useData } from "../content/DataContext";

const Main = () => {
  const { data, refreshData } = useData();
  const page = localStorage.getItem("page");

  useEffect(() => {
    if (page) {
      refreshData(page);
    }
  }, [page, refreshData]);

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
