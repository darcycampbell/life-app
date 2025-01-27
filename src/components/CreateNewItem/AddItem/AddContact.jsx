import React from 'react'
import NameInput from "./components/NameInput";
import ImageUploader from "./components/ImageUploader";

const AddContact = () => {
  return (
    <form>
      <NameInput name={"Who do you want to stay in touch with? "} />
      <ImageUploader />
      <div>
        <label for="target">Aim to talk with them every </label>
        <input type="text" name="target" id="target" required />
        <p>days</p>
      </div>
      <div>
        <input type="submit" value="Add" />
      </div>
    </form>
  )
}

export default AddContact