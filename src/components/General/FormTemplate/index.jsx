import React, { useEffect, useState } from "react";
import NameInput from "./NameInput";
import ImageUploader from "./ImageUploader";
import TargetStatement from "./TargetStatement";
import FormButton from "./FormButton";

const FormTemplate = ({ defaultText, formData }) => {
  const [nameValue, setNameValue] = useState("");
  const [imageValue, setImageValue] = useState(null);
  const [targetValue, setTargetValue] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (formData) {
      setNameValue(formData.name);
      setImageValue(formData.image);
      setTargetValue(formData.target);
      setShowDelete(true);
    }
  }, [formData]);

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
    </div>
  );
};

export default FormTemplate;
