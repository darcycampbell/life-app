import React from "react";
import { useData } from "../../contexts/DataContext";

const NavBar = () => {
  const { setPage, setUpdate } = useData()
  
  function handleClick(event) {
    const buttonText = event.target.innerHTML.toLowerCase()
    setPage(buttonText)
    setUpdate(true)
  }

  //highlight button based on "page" value
  return (
    <div className="nav buttons container">
      <button onClick={handleClick}>Lifestyle</button>
      <button onClick={handleClick}>Interpersonal</button>
      <button onClick={handleClick}>Financial</button>
      <button onClick={handleClick}>External</button>
    </div>
  );
};

export default NavBar;
