import React, { useEffect, useRef, useState } from "react";
import NameInput from "./components/NameInput";
import ImageUploader from "./components/ImageUploader";

const AddHabit = () => {
  const [onOff, setOnOff] = useState(true);
  function handleChange() {
    setOnOff(!onOff);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    try {
      await fetch("http://localhost:3001/api/post", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
    } catch (err) {}
  }

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};

export default AddHabit;
