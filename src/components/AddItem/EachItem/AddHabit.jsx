import React, { useEffect, useRef, useState } from "react";
import NameInput from "../Comps/NameInput";
import ImageUploader from "../Comps/ImageUploader";

const AddHabit = () => {
  const [onOff, setOnOff] = useState(true);

  async function checkConnection() {
    try {
      const response = await fetch('http://localhost:3001/api/test');
      if (!response.ok) {
        throw new Error('Database connection failed');
      }
      const data = await response.json();
      console.log(data)
    } catch (err) {
    }
  };

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
        <input type="submit" value="Add" onClick={checkConnection} />
      </div>
    </form>
  );
};

export default AddHabit;
