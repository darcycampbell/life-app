import React, { useEffect, useRef } from "react";

const MainItem = ({ name, image, percent, today }) => {
  const progressCircle = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const circumference = 2 * Math.PI * 95;
    if (progressCircle.current) {
      const style = progressCircle.current.style;
      style.strokeDasharray = circumference;
      style.strokeDashoffset = circumference - percent * circumference;
      if (today && svgRef.current) {
        svgRef.current.classList.add("complete");
      }
    }
  }, [progressCircle, percent, today]);

  return (
    <div className="main item">
      <div className="circular container">
        <img src={image} alt="placeholder" />
        <svg ref={svgRef}>
          <circle ref={progressCircle} />
        </svg>
      </div>
      <h3>{name}</h3>
    </div>
  );
};

export default MainItem;
