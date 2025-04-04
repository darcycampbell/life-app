import React, { useState } from "react";
import OverlayWindow from "./OverlayWindow";
import AddItem from "./AddItem/index";
import AddButton from "./AddButton";

const CreateNewItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <OverlayWindow isOpen={isOpen} setIsOpen={setIsOpen}>
        <AddItem setIsOpen={setIsOpen} />
      </OverlayWindow>
      <AddButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default CreateNewItem;
