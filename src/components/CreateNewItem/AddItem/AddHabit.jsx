import React, { useState } from "react";
//import { Upload } from "lucide-react";
import NameInput from "./components/NameInput";
import ImageUploader from "./components/ImageUploader";
import TargetStatement from "./components/TargetStatement";
import DoneButton from "./components/DoneButton";

const AddHabit = () => {
 
  return (
    <div>
      <NameInput name={"What do you want to improve? "} />
      <ImageUploader />
      <TargetStatement text1={"I aim to do this habit "} text2={" times each day"} />
      <DoneButton />
    </div>
  );
};

export default AddHabit;
