import React, { useEffect, useRef, useState } from "react";
import MainItem from "./MainItem";
import items from "../content/items";

const ItemGrid = () => {
  const [mainItems, setMainItems] = useState([]);
  const [flexGap, setFlexGap] = useState(15);
  const containerRef = useRef();

  useEffect(() => {
    if (items) {
      setMainItems(items.sort((a, b) => a.number - b.number));
    }

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        calcNumOfColumns(entry.contentRect.width);
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [setMainItems]);

  function calcNumOfColumns(containterWidth) {
    let idealColumns;
    for (let columns = 10; columns > 0; columns--) {
      const widthOfItems = columns * 200 + (columns - 1) * 15;
      if (widthOfItems <= containterWidth) {
        idealColumns = columns;
        break;
      }
    }
    const leftoverSpace = containterWidth - idealColumns * 200;
    const idealGap = leftoverSpace / (idealColumns - 1);
    setFlexGap(idealGap);
  }

  return (
    <div
      className="item grid container"
      ref={containerRef}
      style={{ gap: `${flexGap}px` }}
    >
      {mainItems.map((item, index) => {
        return (
          <MainItem key={index} completed={item.number} itemName={item.name} />
        );
      })}
    </div>
  );
};

export default ItemGrid;
