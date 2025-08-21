import { useEffect, useState } from "react";
import OverlayWindow from "../General/OverlayWindow";
import FormTemplate from "../General/FormTemplate";
import { useData } from "../../contexts/DataContext";
import dataTables from "../../content/dataTables";
import formContent from "../../content/formContent";
import { useModal } from "../../contexts/ModalContext";
import { getDeleteItemQuery } from "../../utils/queryUtils";
import { queryDatabase, uploadData } from "../../utils/dataUtils";
import { getCroppedImage } from "../../utils/imageUtils";

const ItemForm = ({ item }) => {
  //const [formData, setFormData] = useState(null);
  const [input, setInput] = useState(["", "", ""]);
  const [itemType, setItemType] = useState(null);
  const { page, setUpdate } = useData();
  const { closeModal, windowOpened } = useModal();
  const shouldOpen = Boolean(windowOpened === item.id);

  useEffect(() => {
    if (page) {
      setItemType(dataTables[page].slice(0, -1));
      setInput(formContent[page]);
    }
  }, [page]);

  async function getBlob(values) {
    const preview = values.preview;
    const imageDimensions = JSON.parse(values.imageDimensions);
    const imageTransform = JSON.parse(values.imageTransform);

    const blob = await getCroppedImage(
      preview,
      imageDimensions,
      imageTransform
    );

    return blob;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    closeModal();
    const buttonValue = event.nativeEvent.submitter.value;
    if (page) {
      if (buttonValue === "delete") {
        const query = getDeleteItemQuery([page, item.id]);
        await queryDatabase(query);
        setUpdate(true);
      } else if (buttonValue === "done") {
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData);
        const hasContent =
          formValues.name || formValues.newImage || formValues.target;
        console.log("new image? ", formValues.newImage)
          if (hasContent) {
          const newData = new FormData();
          newData.append("title", formValues.name);
          const blob = await getBlob(formValues);
          newData.append("image", blob);
          newData.append("target", formValues.target);
          newData.append("category", page);
          newData.append("id", item.id);
          await uploadData(newData);
          setUpdate(true);
        }

        /* console.log(
          "this is form values: ",
          formValues,
          "; these are item values: ",
          item
        );
        if (formRef.current) {
      formRef.current.reset();
    }
        let array = [];
        if (formValues.name != "") {
        }
        const query = editItemQuery([page, item.id, array]); */
      }
    }
  }

  function handleEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  return (
    <div>
      {shouldOpen && (
        <OverlayWindow>
          <form onSubmit={handleSubmit} onKeyDown={handleEnter}>
            <FormTemplate
              defaultText={[`Edit ${itemType}`, input[1], input[2]]}
              formData={item}
            />
          </form>
        </OverlayWindow>
      )}
    </div>
  );
};

export default ItemForm;
