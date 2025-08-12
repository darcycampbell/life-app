import { useRef } from "react";
import FormTemplate from "../General/FormTemplate";
import formContent from "../../content/formContent";
import { useData } from "../../contexts/DataContext";
import { useModal } from "../../contexts/ModalContext";
import { uploadData } from "../../utils/dataUtils";
import { compressImage } from "../../utils/imageUtils";

const AddItem = () => {
  const { closeModal } = useModal()
  const { page, setUpdate } = useData();
  const formRef = useRef();
  if (!page) return;
  //if the page is global information, I shouldn't have to pass this through, right?
  const input = formContent[page];

  async function handleSubmit(event) {
    event.preventDefault();
    closeModal();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    const newData = new FormData();
    newData.append("title", formValues.name);
    //const compressedImage = await compressImage(formValues.image);
    newData.append("image", formValues.image);
    newData.append("target", formValues.target);
    newData.append("category", page);
    console.log("before uploadRequest")
    await uploadData(newData);
    console.log("after uploadRequest")
    setUpdate(true);
    if (formRef.current) {
      formRef.current.reset();
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <FormTemplate defaultText={input} />
    </form>
  );
};

export default AddItem;
