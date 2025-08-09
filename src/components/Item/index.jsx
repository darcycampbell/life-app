import React, { useState } from "react";
import ItemForm from "./ItemForm";
import ItemObject from "./ItemObject";

const Item = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <ItemObject item={item} setIsOpen={setIsOpen} />
      <ItemForm item={item} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Item;
