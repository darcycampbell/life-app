import React, { useState } from "react";
import OverlayWindow from "../General/OverlayWindow";
import AddItem from "./AddItem";
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
