import "./App.css";
import "../src/css/buttons.css";
import "../src/css/containers.css";
import "../src/css/item.css";
import "../src/css/text.css";
import habits from "./content/habits";
import categories from "./content/categories";
import goals from "./content/goals";
import contacts from "./content/contacts";
import ItemGrid from "./components/ItemGrid";
import { useState } from "react";

function App() {
  const [pageSelected, setPageSelected] = useState("None");
  const pages = {
    None: <h2>Open a page</h2>,
    Lifestyle: <ItemGrid content={habits} />,
    Interpersonal: <ItemGrid content={contacts} />,
    Financial: <ItemGrid content={goals} />,
    External: <ItemGrid content={categories} />,
  };

  function handleClick(event) {
    setPageSelected(event.target.innerHTML);
  }

  return (
    <div className="app container">
      <div className="header container">
        <h1>LIFE</h1>
      </div>
      <div className="nav buttons container">
        <button onClick={handleClick}>Lifestyle</button>
        <button onClick={handleClick}>Interpersonal</button>
        <button onClick={handleClick}>Financial</button>
        <button onClick={handleClick}>External</button>
      </div>
      <div className="page container">
        {pages[pageSelected]}
      </div>
    </div>
  );
}

export default App;
