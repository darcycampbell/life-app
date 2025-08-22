import { useEffect, useState } from "react";
import OverlayWindow from "../General/OverlayWindow";
import FormTemplate from "../General/FormTemplate";
import { useData } from "../../contexts/DataContext";
import dataTables from "../../content/dataTables";
import formContent from "../../content/formContent";
import { useModal } from "../../contexts/ModalContext";
import { getDeleteItemQuery } from "../../utils/queryUtils";
import { queryDatabase, uploadData } from "../../utils/dataUtils";
import { getBlob } from "../../utils/imageUtils";
import { isValidNumber } from "../../utils/numbUtils";

const ItemForm = ({ item }) => {
  const [input, setInput] = useState(["", "", ""]);
  const [itemType, setItemType] = useState(null);
  const { page, setUpdate } = useData();
  const { closeModal, windowOpened } = useModal();
  const shouldOpen = Boolean(windowOpened === item.id + "right");

  useEffect(() => {
    if (page) {
      setItemType(dataTables[page].slice(0, -1));
      setInput(formContent[page]);
    }
  }, [page]);

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
        const newData = new FormData();
        if (formValues.name.trim() != "") {
          newData.append("title", formValues.name);
        }
        if (formValues.newImage) {
          const blob = await getBlob(formValues);
          newData.append("image", blob);
        }
        if (isValidNumber(formValues.target)) {
          newData.append("target", formValues.target);
        }
        if (Array.from(newData.entries()).length > 0) {
          newData.append("category", page);
          newData.append("id", item.id);
          await uploadData(newData);
          setUpdate(true);
        }
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
