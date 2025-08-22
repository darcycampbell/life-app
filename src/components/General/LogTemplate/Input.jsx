import { useEffect, useState } from "react";
import { useData } from "../../../contexts/DataContext";
import { pageConfigs } from "../../../content/pageInputConfigs";

const Input = () => {
  const { page } = useData();
  const defaultConfig = {
    showButton1: false,
    showButton2: false,
    showInput: false,
    titleButton1: "",
    titleButton2: "",
    placeholderInput: "",
    highlightButton1: false,
    highlightButton2: false,
  };
  const [config, setConfig] = useState(defaultConfig);

  const containerStyle = {
    marginBottom: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "center",
  };

  const buttonsContainerStyle = {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const buttonStyle = {
    padding: "12px 24px",
    border: "2px solid #bdc3c7",
    background: "white",
    color: "#34495e",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "0.02em",
  };

  const highlightedButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
    color: "white",
    border: "2px solid #0056b3",
    boxShadow: "0 0 20px rgba(0, 123, 255, 0.4)",
  };

  const textareaStyle = {
    maxWidth: "400px",
    minHeight: "35px",
    maxHeight: "35px",
    padding: "16px",
    border: "2px solid #e1e8ed",
    borderRadius: "8px",
    fontSize: "16px",
    fontFamily: "inherit",
    resize: "vertical",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    background: "rgba(255, 255, 255, 0.9)",
    outline: "none",
  };

  useEffect(() => {
    const newConfig = pageConfigs[page] || defaultConfig;
    setConfig(newConfig);
  }, [page]);

  return (
    <div style={containerStyle}>
      <div style={buttonsContainerStyle}>
        {config.showButton1 && (
          <button
            style={
              config.highlightButton1 ? highlightedButtonStyle : buttonStyle
            }
          >
            {config.titleButton1}
          </button>
        )}
        {config.showButton2 && (
          <button
            style={
              config.highlightButton2 ? highlightedButtonStyle : buttonStyle
            }
          >
            {config.titleButton2}
          </button>
        )}
        {config.showInput && (
          <textarea
            style={textareaStyle}
            placeholder={config.placeholderInput}
          ></textarea>
        )}
      </div>
    </div>
  );
};

export default Input;
