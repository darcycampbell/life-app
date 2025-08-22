import React from 'react'

const Heading = ({value}) => {
  const containerStyle = {
    textAlign: "center",
    marginBottom: "32px",
    paddingBottom: "16px",
    borderBottom: "2px solid #e1e8ed",
  };

  const titleStyle = {
    fontSize: "40px",
    fontWeight: "700",
    color: "#2c3e50",
    margin: "0",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    letterSpacing: "-0.02em",
  };
  return (
    <div style={containerStyle}>
        <h2 style={titleStyle}>{value}</h2>
    </div>
  )
}

export default Heading