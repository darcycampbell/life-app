import React, { useState } from "react";

const ImageUploader = () => {
  const [imagePath, setImagePath] = useState();
  function handleChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePath(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        id="myFile"
        name="filename"
        onChange={handleChange}
      />

      <img src={imagePath} alt="user" />
    </div>
  );
};

export default ImageUploader;
