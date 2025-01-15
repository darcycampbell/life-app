import React from "react";
import "./index.css"
import AddHabit from "./EachItem/AddHabit";
import AddContact from "./EachItem/AddContact";
import AddGoal from "./EachItem/AddGoal";
import AddTask from "./EachItem/AddTask";

const AddItem = ({ type }) => {
  if (!type) return;
  switch (type) {
    case "habit":
      return <AddHabit />;
    case "contact":
      return <AddContact />;
    case "goal":
      return <AddGoal />;
    case "category":
      return <AddTask />;
    default:
      return;
  }
};

export default AddItem;
