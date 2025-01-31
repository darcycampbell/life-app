import React, { useContext } from "react";
import AddHabit from "./AddHabit";
import AddContact from "./AddContact";
import AddGoal from "./AddGoal";
import AddTask from "./AddTask";
import { CategoryContext } from "../../../App";
import useDatabase from "../../../hooks/useDatabase";

const AddItem = () => {
  const category = useContext(CategoryContext);
  const fetchWith = useDatabase();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    fetchWith(formValues, category)
  }

  if (!category) return;
  let child;
  switch (category) {
    case "lifestyle":
      child = <AddHabit />;
      break;
    case "interpersonal":
      child = <AddContact />;
      break;
    case "financial":
      child = <AddGoal />;
      break;
    case "external":
      child = <AddTask />;
      break;
    default:
      child = <div>No category found</div>
      break;
  }

  return (
    <form onSubmit={handleSubmit}>
      {child}
    </form>
  )
};

export default AddItem;
