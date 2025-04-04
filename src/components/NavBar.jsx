import React from "react";
import useDatabase from "../hooks/useDatabase";

const NavBar = ({ setData }) => {
  const fetchData = useDatabase("fetch");
  
  function handleClick(event) {
    const buttonText = event.target.innerHTML.toLowerCase()
    fetchData(buttonText).then(data => {
      setData(data);
    });
    localStorage.setItem("page", buttonText);
  }

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
