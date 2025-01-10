import React, { useEffect, useRef } from "react";

const MainItem = () => {
  const widthRef = useRef(null);
  const progressCircle = useRef(null);
  const svgRef = useRef(null);
  const percentageComplete = 1;

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
  }, [widthRef, progressCircle]);

  return (
    <div className="main item">
      <div className="circular container" ref={widthRef}>
        <img src="https://picsum.photos/200" alt="placeholder" />
        <svg ref={svgRef}>
          <circle ref={progressCircle} />
        </svg>
      </div>
      <h3>Name</h3>
    </div>
  );
};

export default MainItem;
