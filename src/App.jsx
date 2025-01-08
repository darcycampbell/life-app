import "./App.css";
import "../src/css/buttons.css";
import "../src/css/containers.css";
import "../src/css/text.css";
import { useState } from "react";

function App() {
  const [pageSelected, setPageSelected] = useState("None");
  const pages = {
    "None": <h2>Open a page</h2>,
    "Lifestyle": <h2>Lifestyle</h2>,
    "Interpersonal": <h2>Interpersonal</h2>,
    "Financial": <h2>Financial</h2>,
    "External": <h2>External</h2>
  }

  function handleClick(event) {
    setPageSelected(event.target.innerHTML)
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
        <div className="sub">
          {pages[pageSelected]}
        </div>
      </div>
    </div>
  );
}

export default App;
