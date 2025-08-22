import Heading from "./Heading";
import Message from "./Message";
import Display from "./Display";
import Input from "./Input";
import Button from "./Button";

const LogTemplate = ({ item }) => {

const containerStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "32px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', sans-serif",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    minHeight: "500px",
  };

  return (
    <div>
      <Heading value={item.title} />
      <Message />
      <Display />
      <Input />
      <Button />
    </div>
  );
};

export default LogTemplate;
