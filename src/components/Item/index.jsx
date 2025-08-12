import ItemForm from "./ItemForm";
import ItemObject from "./ItemObject";
import { ModalProvider } from "../../contexts/ModalContext";

const Item = ({ item }) => {
  return (
    <ModalProvider>
      <ItemObject item={item} />
      <ItemForm item={item} />
    </ModalProvider>
  );
};

export default Item;
