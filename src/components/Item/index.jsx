import ItemForm from "./ItemForm";
import ItemObject from "./ItemObject";
import ItemLog from "./ItemLog";

const Item = ({ item }) => {
  //should I make a context for item?
  return (
    <div>
      <ItemObject item={item} />
      <ItemForm item={item} />
      <ItemLog item={item} />
    </div>
  );
};

export default Item;
