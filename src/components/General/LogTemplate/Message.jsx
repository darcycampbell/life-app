import { useEffect, useState } from "react";
import { useData } from "../../../contexts/DataContext";

const Message = () => {
const containerStyle = {
    textAlign: "center",
    marginBottom: "24px",
  };

  const textStyle = {
    fontSize: "18px",
    color: "#5a6c7d",
    margin: "0",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  const [message, setMessage] = useState(null);
  const { page } = useData();

  useEffect(() => {
    const messages = {
      lifestyle: "Left to do",
      interpersonal: "Days since last contact",
      financial: "Left to save",
      external: "Attempts left",
    };

    setMessage(messages[page] || "");
  }, [page]);

  return (
    <div style={containerStyle}>
      <p style={textStyle}>{message}</p>
    </div>
  );
};

export default Message;
