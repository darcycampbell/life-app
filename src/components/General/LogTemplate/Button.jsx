import React from 'react'

const Button = () => {

const containerStyle = {
    textAlign: "center",
    marginTop: "16px",
  };

  const buttonStyle = {
    padding: "16px 48px",
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    color: "white",
    border: "none",
    borderRadius: "50px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    boxShadow: "0 4px 15px rgba(39, 174, 96, 0.3)",
  };

  return (
    <div style={containerStyle}> 
        <button style={buttonStyle}>Done</button>
    </div>
  )
}

export default Button