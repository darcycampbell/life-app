import React from "react";
import NameInput from "./NameInput";
import ImageUploader from "./ImageUploader";
import TargetStatement from "./TargetStatement";
import DoneButton from "./DoneButton";

const FormTemplate = ({ defaultText, formData }) => {
  let nameInputValue = "";
  let imageUploaderValue = null;
  let targetStatementValue = "";
  if (formData) {
    nameInputValue = formData.name;
    imageUploaderValue = formData.image;
    targetStatementValue = formData.target;
  }
  return (
    <div>
      <NameInput name={defaultText[0]} value={nameInputValue} />
      <ImageUploader value={imageUploaderValue} />
      <TargetStatement
        text1={defaultText[1]}
        text2={defaultText[2]}
        value={targetStatementValue}
      />
      <DoneButton />
    </div>
  );
};

export default FormTemplate;
