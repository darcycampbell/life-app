import React from "react";

const NameInput = ({name, value}) => {
  return (
    <div className="name">
      <label for="name">{name}</label>
      <input type="text" name="name" placeholder={value} id="name" autoComplete="off" />
    </div>
  );
};

export default NameInput;
