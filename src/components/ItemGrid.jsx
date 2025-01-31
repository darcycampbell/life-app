import React, { useContext, useEffect, useRef, useState } from "react";
import Item from "./Item";
import CreateNewItem from "./CreateNewItem/index";
import useCalculator from "../hooks/useCalculator";
import { CategoryContext } from "../App";

const ItemGrid = ({ content }) => {
  const [items, setItems] = useState([]);
  const [flexGap, setFlexGap] = useState(15);
  const gapSize = { gap: `${flexGap}px` };
  const containerRef = useRef();
  const category = useContext(CategoryContext);
  const calcGap = useCalculator("calculate gap");
  const calcPercent = useCalculator("calculate percentage");

  useEffect(() => {
    if (content) {
      if (category === "external" || "financial") {
        setItems(content.sort((a, b) => b.score - a.score));
      } else {
        setItems(content.sort((a, b) => a.score - b.score));
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
  }, [setItems, content, calcGap, calcPercent]);

  return (
    <div
      className="item grid container"
      ref={containerRef}
      style={gapSize}
    >
      {items.map((item) => {
        return (
          <Item
            key={item.index}
            title={item.title}
            image={item.image}
            score={item.score}
          />
        );
      })}
      <CreateNewItem />
    </div>
  );
};

export default ItemGrid;
