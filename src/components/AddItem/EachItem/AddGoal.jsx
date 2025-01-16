import React, { useState } from 'react'
import NameInput from "../Comps/NameInput";
import ImageUploader from "../Comps/ImageUploader";

const AddGoal = () => {
    const [displayInfo, setDisplayInfo] = useState(false)
    function handleClick() {
        setDisplayInfo(!displayInfo)
    }
  return (
    <form>
      <NameInput name={"What do you want to buy? "} />
      <ImageUploader />
      <div>
        <label for="target">How much does it cost? </label>
        <input type="text" name="target" id="target" />
      </div>
      <div>
        <label for="value">How much do you value it? </label>
        <input type="text" name="value" id="value" />
        <button type='button' onClick={handleClick}>?</button>
        <p style={displayInfo ? {display: "block"} : {display: "none"}}>Choosing a number between 1 and 100 makes evaluation easier.</p>
      </div>
      <div>
        <input type="submit" value="Add" />
      </div>
    </form>
  )
}

export default AddGoal