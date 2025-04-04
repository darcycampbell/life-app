import React, { useRef, useState } from "react";
import NameInput from "./components/NameInput";
import ImageUploader from "./components/ImageUploader";

const AddTask = () => {
  const [displayInfo, setDisplayInfo] = useState(false);
  const [importanceValue, setImportanceValue] = useState();
  const [urgencyValue, setUrgencyValue] = useState();
  
  const importanceRef = useRef();
  const urgencyRef = useRef();

  function handleClick() {
    setDisplayInfo(!displayInfo);
    setImportanceValue(
      importanceRef.current.value === "" ? "0" : importanceRef.current.value
    );
    setUrgencyValue(
      urgencyRef.current.value === "" ? "0" : urgencyRef.current.value
    );
  }

  return (
    <div>
      <NameInput name={"What do you need to do? "} />
      <ImageUploader />
      <div>
        <label for="target">Importance </label>
        <input
          type="text"
          name="target"
          id="target"
          ref={importanceRef}
          required
        />
        <button type="button" onClick={handleClick}>
          ?
        </button>
        <p style={displayInfo ? { display: "block" } : { display: "none" }}>
          Score starts at {importanceValue}
        </p>
      </div>
      <div>
        <label for="target">Urgency </label>
        <input
          type="text"
          name="target"
          id="target"
          ref={urgencyRef}
          required
        />
        <button type="button" onClick={handleClick}>
          ?
        </button>
        <p style={displayInfo ? { display: "block" } : { display: "none" }}>
          Score doubles every {urgencyValue} days
        </p>
      </div>
      <div>
        <input type="submit" value="Add" />
      </div>
    </div>
  );
};

export default AddTask;
