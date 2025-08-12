import { useEffect, useRef, useState } from "react";
import Item from "../Item";
import CreateNewItem from "../CreateNewItem/index";
import { calcGap } from "../../utils/calcUtils";
import { useData } from "../../contexts/DataContext";

const ItemGrid = () => {
  const [items, setItems] = useState([]);
  const [flexGap, setFlexGap] = useState(15);
  const containerRef = useRef();
  const { data, page } = useData()
  const gapSize = { gap: `${flexGap}px` };

  useEffect(() => {
    if (data && page) {
      if (page === "external" || page === "financial") {
        setItems(data.sort((a, b) => b.score - a.score));
      } else {
        setItems(data.sort((a, b) => a.score - b.score));
      }
    }
    const container = containerRef.current;
    if (!container) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setFlexGap(calcGap(entry.contentRect.width));
      }
    });
    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    };
  }, [setItems, data, calcGap, page]);

  return (
    <div
      className="item grid container"
      ref={containerRef}
      style={gapSize}
    >
      {items.map((item) => {
        return (
          <Item
            key={item.id}
            item={item}
          />
        );
      })}
      <CreateNewItem />
    </div>
  );
};

export default ItemGrid;
