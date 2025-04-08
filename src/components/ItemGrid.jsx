import React, { useEffect, useRef, useState } from "react";
import Item from "./Item";
import CreateNewItem from "./CreateNewItem/index";
import useCalculator from "../hooks/useCalculator";
import { useData } from "../content/DataContext";

const ItemGrid = () => {
  const { data } = useData()
  const calcGap = useCalculator("calculate gap");
  const [items, setItems] = useState([]);
  const [flexGap, setFlexGap] = useState(15);
  const gapSize = { gap: `${flexGap}px` };
  const containerRef = useRef();
  const page = localStorage.getItem("page");

  useEffect(() => {
    const content = data;
    console.log("this is content: ", content)
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
            index={item.id}
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
