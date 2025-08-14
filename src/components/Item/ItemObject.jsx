import React, { useEffect, useRef } from "react";
import { useData } from "../../contexts/DataContext";
import { useModal } from "../../contexts/ModalContext";
import { getSelectItemQuery } from "../../utils/queryUtils";

const ItemObject = ({ item }) => {
  const progressCircle = useRef(null);
  const svgRef = useRef(null);
  const { openModal } = useModal();
  const { page } = useData();

  useEffect(() => {
    const circumference = 2 * Math.PI * 95;
    if (progressCircle.current) {
      const style = progressCircle.current.style;
      style.strokeDasharray = circumference;
      style.strokeDashoffset = circumference - item.score * circumference;
      /*       if (today && svgRef.current) {
            svgRef.current.classList.add("complete");
          } */
    }
  }, [progressCircle, item]);

  function handleRightClick(event) {
    event.preventDefault();
    openModal(item.id);
  }

  return (
    <div className="main item" onContextMenu={handleRightClick}>
      <div className="circular container">
        <img src={item.image} alt="user image" />
        <svg ref={svgRef}>
          <circle ref={progressCircle} />
        </svg>
      </div>
      <h3>{item.title}</h3>
    </div>
  );
};

export default ItemObject;
