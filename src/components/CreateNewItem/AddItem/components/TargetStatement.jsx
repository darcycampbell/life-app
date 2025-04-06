import React from "react";

const TargetStatement = ({ text1, text2 }) => {
  return (
    <div className="statement">
      <label for="target">
        {text1}
        <span>
          <input type="text" name="target" id="target" required />
        </span>
        {text2}
      </label>
    </div>
  );
};

export default TargetStatement;
