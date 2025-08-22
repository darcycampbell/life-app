import React from "react";

const Display = () => {

    const containerStyle = {
    textAlign: "center",
    marginBottom: "32px",
    padding: "32px",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
  };

  const numberStyle = {
    fontSize: "64px",
    fontWeight: "800",
    color: "#3498db",
    margin: "0",
    textShadow: "0 2px 8px rgba(52, 152, 219, 0.3)",
    lineHeight: "1",
  };
  return (
    <div style={containerStyle}>
      <h3 style={numberStyle}>{"5"}</h3>
      {/* <div>
        <p>Habits: Display today's total</p>
        <p>Contacts: Days since last contact</p>
        <p>Goals: Display total saved</p>
        <p>Tasks: Display total attempts</p>
      </div> */}
    </div>
  );
};

export default Display;
