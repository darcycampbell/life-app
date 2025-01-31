import React, { useState } from "react";
import { Upload } from "lucide-react";

const ImageUploader = () => {
  const [preview, setPreview] = useState(null);

  function handleUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
/*   return (
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
  ); */
  return (
    <div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          id="image"
          name="image"
          // disabled={loading}
        />
        <label
          htmlFor="image"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
            />
          ) : (
            <Upload />
          )}
          <span>
            {/* loading ? 'Uploading...' : */ 'Click to upload image'}
          </span>
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
