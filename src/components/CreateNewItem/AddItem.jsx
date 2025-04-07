import React, {useContext, useRef} from "react";
import FormTemplate from "../General/FormTemplate";
import { CategoryContext } from "../../App";
import useDatabase from "../../hooks/useDatabase";
import formContent from "../../content/formContent";

const AddItem = ({setIsOpen}) => {
  const formRef = useRef();
  const setData = useContext(CategoryContext);
  const postData = useDatabase("post");
  const fetchData = useDatabase("fetch");
  const page = localStorage.getItem("page");
  if (!page) return;
  const input = formContent[page];

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    postData(formValues, page).then(() => {
      fetchData(null, page).then((results) => {
        setData(results);
      });
    });
    setIsOpen(false)
    if (formRef.current) {
      formRef.current.reset();
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <FormTemplate defaultText={input} />
    </form>
  )
};

export default AddItem;
