import React, { useEffect, useRef, useState } from "react";

const AddHabit = () => {
  const [onOff, setOnOff] = useState(true);

  function handleChange() {
    setOnOff(!onOff)
  }

  return (
    <form>
      <div>
        <label for="name">Name your habit </label>
        <input type="text" name="name" id="name" required />
      </div>
      <p>UPLOAD IMAGE</p>
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
