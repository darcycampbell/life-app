import React, { useRef } from "react";
import FormTemplate from "../General/FormTemplate";
import formContent from "../../content/formContent";
import { useData } from "../../content/DataContext";
//import useDatabase from "../../hooks/useDatabase";
import { useModal } from "../../contexts/ModalContext";

const AddItem = () => {
  //const { getData } = useDatabase();
  const { closeModal } = useModal()
  const { page, refreshData } = useData();
  const formRef = useRef();
  if (!page) return;
  //if the page is global information, I shouldn't have to pass this through, right?
  const input = formContent[page];

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    const newData = new FormData();
    newData.append("title", formValues.name);
    newData.append("image", formValues.image);
    newData.append("target", formValues.target);
    newData.append("category", page);
    //I wonder if there is a way to handle this through useData
    //Add a loading
    //getData("upload", newData);
    //refreshData();
    if (formRef.current) {
      formRef.current.reset();
    }
    closeModal();
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <FormTemplate defaultText={input} />
    </form>
  );
};

export default AddItem;
