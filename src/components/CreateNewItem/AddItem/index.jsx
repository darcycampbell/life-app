import React, {useContext, useRef} from "react";
import AddHabit from "./AddHabit";
import AddContact from "./AddContact";
import AddGoal from "./AddGoal";
import AddTask from "./AddTask";
import { CategoryContext } from "../../../App";
import useDatabase from "../../../hooks/useDatabase";

const AddItem = ({setIsOpen}) => {
  const formRef = useRef();
  const setData = useContext(CategoryContext);
  const postData = useDatabase("post");
  const fetchData = useDatabase("fetch");
  const page = localStorage.getItem("page");
  if (!page) return;

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    postData(formValues, page).then(() => {
      fetchData(page).then(results => {
        console.log("this is the new data: ", results)
        setData(results);
      })
    });
    setIsOpen(false)
    if (formRef.current) {
      formRef.current.reset();
    }
  }

  let child;
  switch (page) {
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
    <form ref={formRef} onSubmit={handleSubmit}>
      {child}
    </form>
  )
};

export default AddItem;
