import React, { useEffect, useRef } from "react";

const Item = ({ title, image, score }) => {
  const progressCircle = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const circumference = 2 * Math.PI * 95;
    if (progressCircle.current) {
      const style = progressCircle.current.style;
      style.strokeDasharray = circumference;
      style.strokeDashoffset = circumference - score * circumference;
/*       if (today && svgRef.current) {
        svgRef.current.classList.add("complete");
      } */
    }
  }, [progressCircle, score]);

  return (
    <div className="main item">
      <div className="circular container">
        <img src={image} alt="placeholder" />
        <svg ref={svgRef}>
          <circle ref={progressCircle} />
        </svg>
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default Item;
