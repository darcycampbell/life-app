import React, { useState, useRef, useEffect } from "react";
//import { Upload } from "lucide-react";

const ImageUploader = ({ value }) => {
  const imageURL = "/square-no-background-upload.png";
  const [preview, setPreview] = useState(imageURL);
  const inputRef = useRef();

  useEffect(() => {
    if (value) {
      setPreview(value);
    }
  }, [value])

  function handleClick(event) {
    event.preventDefault()
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  function handleUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(imageURL)
    }
  }

  return (
    <div className="upload">
      <img src={preview} alt="Preview" />
      <button type="button" onClick={handleClick}>Upload image</button>
      <input
        type="file"
        accept="image/*"
        id="image"
        onChange={handleUpload}
        name="image"
        style={{display: "none"}}
        ref={inputRef}
      />
    </div>
  );
};

export default ImageUploader;
