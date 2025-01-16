import React, { useEffect, useRef, useState } from "react";
import NameInput from "../Comps/NameInput";
import ImageUploader from "../Comps/ImageUploader";

const AddHabit = () => {
  const [onOff, setOnOff] = useState(true);

  function handleChange() {
    setOnOff(!onOff)
  }

  return (
    <form>
      <NameInput name={"What do you want to improve? "} />
      <ImageUploader />
      <div>
        <label for="target">Aim to do </label>
        <input type="text" name="target" id="target" required />
        <p>times each {onOff ? "day" : "week"}</p>
      </div>
      <label class="switch">
        <input type="checkbox" onChange={handleChange} />
        <span class="slider"></span>
      </label>
      <div>
        <input type="submit" value="Add" />
      </div>
    </form>
  );
};

export default AddHabit;
