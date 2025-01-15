import React, { useState } from 'react'

const AddGoal = () => {
    const [displayInfo, setDisplayInfo] = useState(false)
    function handleClick() {
        setDisplayInfo(!displayInfo)
    }
  return (
    <form>
      <div>
        <label for="name">What do you want? </label>
        <input type="text" name="name" id="name" />
      </div>
      <p>UPLOAD IMAGE</p>
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