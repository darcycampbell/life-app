import React from "react";
import NameInput from "./components/NameInput";
import ImageUploader from "./components/ImageUploader";
import TargetStatement from "./components/TargetStatement";
import DoneButton from "./components/DoneButton";

const AddContact = () => {
  return (
    <div>
      <NameInput name={"Who do you want to stay in touch with? "} />
      <ImageUploader />
      <TargetStatement
        text1={"I want to talk to this person every "}
        text2={" days"}
      />
      <DoneButton />
    </div>
  );
};

export default AddContact;
