import React from "react";
import "./index.css"

const OverlayWindow = ({ isOpen, setIsOpen, children }) => {
  const displaySetting = [{ display: "none" }, { display: "flex" }];

  function handleClick(event) {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  }

  return (
    <div
      className="overlay container"
      style={isOpen ? displaySetting[1] : displaySetting[0]}
      onClick={handleClick}
    >
      <div className="content container">{children}</div>
    </div>
  );
};

export default OverlayWindow;
