import ItemForm from "./ItemForm";
import ItemObject from "./ItemObject";

const Item = ({ item }) => {
  return (
    <div>
      <ItemObject item={item} />
      <ItemForm item={item} />
    </div>
  );
};

export default Item;
