import { useEffect, useState } from "react";
import NameInput from "./NameInput";
import ImageUploader from "./ImageUploader";
import TargetStatement from "./TargetStatement";
import FormButton from "./FormButton";
import FormMessage from "./FormMessage";

const FormTemplate = ({ defaultText, formData, formMessage }) => {
  const [nameValue, setNameValue] = useState("");
  const [imageValue, setImageValue] = useState(null);
  const [targetValue, setTargetValue] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (formData) {
      setNameValue(formData.title);
      setImageValue(formData.image);
      setTargetValue(formData.target);
      setShowDelete(true);
    }
    if (formMessage) {
      setShowMessage(true);
    }
  }, [formData, formMessage]);

  return (
    <div>
       <NameInput name={defaultText[0]} value={nameValue} />
      <ImageUploader value={imageValue} />
      <TargetStatement
        text1={defaultText[1]}
        text2={defaultText[2]}
        value={targetValue}
      />
      <FormButton value={"done"} />
      {showDelete && <FormButton value={"delete"} />}
      {showMessage && <FormMessage value={formMessage} /> }
    </div>
  );
};

export default FormTemplate;
