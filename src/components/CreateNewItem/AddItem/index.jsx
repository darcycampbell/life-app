import React, { useContext } from "react";
import AddHabit from "./AddHabit";
import AddContact from "./AddContact";
import AddGoal from "./AddGoal";
import AddTask from "./AddTask";
import { CategoryContext } from "../../../App";

const AddItem = () => {
const category = useContext(CategoryContext);
  if (!category) return;
  switch (category) {
    case "lifestyle":
      return <AddHabit />;
    case "interpersonal":
      return <AddContact />;
    case "financial":
      return <AddGoal />;
    case "external":
      return <AddTask />;
    default:
      return;
  }
};

export default AddItem;
