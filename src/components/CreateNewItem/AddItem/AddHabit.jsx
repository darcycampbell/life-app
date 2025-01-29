import React, { useState } from "react";
//import { Upload } from "lucide-react";
import NameInput from "./components/NameInput";
import ImageUploader from "./components/ImageUploader";

const AddHabit = () => {
  const [loading, setLoading] = useState(false);

  const [onOff, setOnOff] = useState(true);
  function handleChange() {
    setOnOff(!onOff);
  }

  //Make this a hook?
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    const newData = new FormData();
    newData.append("title", formValues.name);
    newData.append("image", formValues.filename);
    newData.append("target", formValues.target);
    newData.append("category", "lifestyle");

    try {
      setLoading(true);

      //I guess this needs a response to check if the upload was successful
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: newData,
      });

      const data = await response.json();
      if (!data.success) throw new Error("Upload failed");

      console.log("Upload successful:", data);
    } catch (error) {
      console.error("Upload error:", error);
      console.log(error)
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
