import React, { useEffect, useRef } from "react";
import useQuery from "../../hooks/useQuery";
import { useData } from "../../content/DataContext";
import { useModal } from "../../contexts/ModalContext";

const ItemObject = ({ item }) => {
  const progressCircle = useRef(null);
  const svgRef = useRef(null);
  const { openModal } = useModal();
  const { page } = useData();
  const getQuery = useQuery();

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
    openModal();
    if (page) {
      const query = getQuery("item", [page, item.index]);
      /* getData("database", query).then((data) => {
            const item = data[0];
            const object = {
              name: item.title,
              image: item.image,
              target: item.target,
            };
            setFormData(object);
          }); */
    }
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
