import React from "react";

const NavBar = ({ setPage, setData }) => {
    
  async function handleClick(event) {
    const buttonText = event.target.innerHTML.toLowerCase();
    let responseJSON;
    try {
      const response = await fetch("http://localhost:3001/database", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ buttonPressed: buttonText }),
      });
      if (!response.ok) {
        throw new Error("Database connection failed");
      }
      responseJSON = await response.json();
    } catch (err) {}
    setPage(buttonText);
    setData(responseJSON);
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
