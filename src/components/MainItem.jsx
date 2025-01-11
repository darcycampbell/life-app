import React, { useEffect, useRef } from "react";

const MainItem = ({ completed, itemName }) => {
  const progressCircle = useRef(null);
  const svgRef = useRef(null);
  const percentageComplete = completed;

  useEffect(() => {
    const circumference = 2 * Math.PI * 95;
    if (progressCircle.current) {
      progressCircle.current.style.strokeDasharray = circumference;
      progressCircle.current.style.strokeDashoffset =
        circumference - percentageComplete * circumference;
      if (percentageComplete >= 1 && svgRef.current) {
        svgRef.current.classList.add("complete");
      }
    }
  }, [progressCircle, percentageComplete]);

  return (
    <div className="main item">
      <div className="circular container">
        <img src="https://picsum.photos/200" alt="placeholder" />
        <svg ref={svgRef}>
          <circle ref={progressCircle} />
        </svg>
      </div>
      <h3>{itemName}</h3>
    </div>
  );
};

export default MainItem;
