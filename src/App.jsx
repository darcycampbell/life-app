import "./App.css";
import "../src/css/buttons.css";
import "../src/css/containers.css";
import "../src/css/item.css";
import "../src/css/text.css";
import categories from "./content/categories";
import goals from "./content/goals";
import contacts from "./content/contacts";
import ItemGrid from "./components/ItemGrid";
import { useState } from "react";

function App() {
  const [pageSelected, setPageSelected] = useState("None");
  const [habits, setHabits] = useState();

  const pages = {
    None: <h2>Open a page</h2>,
    Lifestyle: <ItemGrid content={habits} category={"habit"} />,
    Interpersonal: <ItemGrid content={contacts} />,
    Financial: <ItemGrid content={goals} />,
    External: <ItemGrid content={categories} />,
  };

  async function handleClick(event) {
    try {
      const response = await fetch("http://localhost:3001/api/test");
      if (!response.ok) {
        throw new Error("Database connection failed");
      }
      const data = await response.json();
      console.log("habits: ", data)
      setHabits(data);
    } catch (err) {}
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
      <div className="page container">{pages[pageSelected]}</div>
    </div>
  );
}

export default App;
