import React, { useRef } from "react";
import FormTemplate from "../General/FormTemplate";
import useDatabase from "../../hooks/useDatabase";
import formContent from "../../content/formContent";
import { useData } from "../../content/DataContext";

const AddItem = ({ setIsOpen }) => {
  const { refreshData } = useData();
  const formRef = useRef();
  const postData = useDatabase("post");
  const page = localStorage.getItem("page");
  if (!page) return;
  //if the page is global information, I shouldn't have to pass this through, right?
  const input = formContent[page];

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    //I wonder if there is a way to handle this through useData
    postData(formValues, page);
    refreshData(page);
    if (formRef.current) {
      formRef.current.reset();
    }
    setIsOpen(false);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <FormTemplate defaultText={input} />
    </form>
  );
};

export default AddItem;
