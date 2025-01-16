import React from "react";

const NameInput = ({name}) => {
  return (
    <div>
      <label for="name">{name}</label>
      <input type="text" name="name" id="name" required />
    </div>
  );
};

export default NameInput;
