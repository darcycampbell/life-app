import { useRef, useState } from "react";
import FormTemplate from "../General/FormTemplate";
import formContent from "../../content/formContent";
import { useData } from "../../contexts/DataContext";
import { useModal } from "../../contexts/ModalContext";
import { uploadData } from "../../utils/dataUtils";
import { compressImage } from "../../utils/imageUtils";
import { getBlob } from "../../utils/imageUtils";
import { isValidNumber } from "../../utils/numbUtils";

const AddItem = () => {
  const [message, setMessage] = useState(null);
  const { closeModal } = useModal();
  const { page, setUpdate } = useData();
  const formRef = useRef();
  if (!page) return;
  //if the page is global information, I shouldn't have to pass this through, right?
  const input = formContent[page];

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    const blob = await getBlob(formValues);
    const hasContent =
      formValues.name && blob && isValidNumber(formValues.target);
    if (hasContent) {
      closeModal();
      const newData = new FormData();
      newData.append("title", formValues.name);
      newData.append("image", blob);
      newData.append("target", formValues.target);
      newData.append("category", page);
      for (let [key, value] of newData.entries()) {
        console.log("FormData entry:", key, value);
      }
      await uploadData(newData);
      setUpdate(true);
      //what is this?
      if (formRef.current) {
        formRef.current.reset();
      }
    } else {
      if (message && message != "Please try again.") {
        setMessage("Please try again.");
      } else if (formValues.target && !isValidNumber(formValues.target)) {
        setMessage("The target field requires a numeral.");
      } else {
        setMessage("Please fill in all fields before submitting.");
      }
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <FormTemplate defaultText={input} formMessage={message} />
    </form>
  );
};

export default AddItem;
