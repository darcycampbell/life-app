import React, { useEffect, useRef, useState } from "react";
import OverlayWindow from "./General/OverlayWindow";
import FormTemplate from "./General/FormTemplate";
import formContent from "../content/formContent";
import dataTables from "../content/dataTables";
import useDatabase from "../hooks/useDatabase";

const Item = ({ index, title, image, score }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(["", "", ""]);
  const [formData, setFormData] = useState(null);
  const [itemType, setItemType] = useState(null);
  const progressCircle = useRef(null);
  const svgRef = useRef(null);
  const fetchData = useDatabase("fetch");
  const deleteData = useDatabase("delete");
  const page = localStorage.getItem("page");

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

  function handleRightClick(event) {
    event.preventDefault();
    setIsOpen(true);
    if (page) {
      setItemType(dataTables[page].slice(0, -1));
      setInput(formContent[page]);
      fetchData(page, index).then((data) => {
        const item = data[0];
        const object = {
          name: item.title,
          image: item.image,
          target: item.target,
        };
        setFormData(object);
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsOpen(false);
    const buttonValue = event.nativeEvent.submitter.value;
    if (page) {
      if (buttonValue === "delete") {
        deleteData(page, index);
      } else if (buttonValue === "done") {
        // Handle done action
      }
    }
  }

  return (
    <div>
      <div className="main item" onContextMenu={handleRightClick}>
        <div className="circular container">
          <img src={image} alt="placeholder" />
          <svg ref={svgRef}>
            <circle ref={progressCircle} />
          </svg>
        </div>
        <h3>{title}</h3>
      </div>
      <OverlayWindow isOpen={isOpen} setIsOpen={setIsOpen}>
        <form onSubmit={handleSubmit}>
          <FormTemplate
            defaultText={[`Edit ${itemType}`, input[1], input[2]]}
            formData={formData}
          />
        </form>
      </OverlayWindow>
    </div>
  );
};

export default Item;
