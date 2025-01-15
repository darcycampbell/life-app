import React, { useEffect, useRef, useState } from "react";
import MainItem from "./MainItem";
import OverlayWindow from "./Misc/OverlayWindow";
import AddItem from "./AddItem";
import usePercentCalculator from "../hooks/usePercentCalculator";

const ItemGrid = ({content}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mainItems, setMainItems] = useState([]);
  const [flexGap, setFlexGap] = useState(15);
  const containerRef = useRef();
  const calc = usePercentCalculator()

  useEffect(() => {
    if (content) {
      setMainItems(content.sort((a, b) => calc(a) - calc(b)));
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
  }, [setMainItems, content, calc]);

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
      {mainItems.map((item) => {
        return (
          <MainItem key={item.index} name={item.name} image={item.image} percent={calc(item)} today={item.today} />
        );
      })}
      <OverlayWindow isOpen={isOpen} setIsOpen={setIsOpen}>
        <AddItem type={content[0].type} />
      </OverlayWindow>
      <button className="add" onClick={() => {setIsOpen(!isOpen)}}>{isOpen ? "x" : "+"}</button>
    </div>
  );
};

export default ItemGrid;
