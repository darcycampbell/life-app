import React, { useState } from "react";
//import { Upload } from "lucide-react";
import NameInput from "./components/NameInput";
import ImageUploader from "./components/ImageUploader";

const AddHabit = () => {
  const [onOff, setOnOff] = useState(true);

  function handleChange() {
    setOnOff(!onOff);
  }
 
  return (
    <div>
      <NameInput name={"What do you want to improve? "} />
      <ImageUploader />
      <div>
        <label for="target">Aim to do </label>
        <input type="text" name="target" id="target" required />
        <p>times each {onOff ? "day" : "week"}</p>
      </div>
      <div>
        <label for="checkbox"></label>
        <input type="checkbox" name="checkbox" onChange={handleChange} />
      </div>
      <div>
        <input type="submit" value="Add" />
      </div>
    </div>
  );
};

export default AddHabit;
