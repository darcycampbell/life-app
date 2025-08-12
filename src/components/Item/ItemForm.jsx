import { useEffect, useState } from "react";
import OverlayWindow from "../General/OverlayWindow";
import FormTemplate from "../General/FormTemplate";
import { useData } from "../../contexts/DataContext";
import dataTables from "../../content/dataTables";
import formContent from "../../content/formContent";
import { useModal } from "../../contexts/ModalContext";
import { getDeleteItemQuery } from "../../utils/queryUtils";
import { queryDatabase } from "../../utils/dataUtils";

const ItemForm = ({ item }) => {
  //const [formData, setFormData] = useState(null);
  const [input, setInput] = useState(["", "", ""]);
  const [itemType, setItemType] = useState(null);
  const { page, setUpdate } = useData();
  const { closeModal } = useModal();

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
        console.log("this is form values: ", formValues)
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
      <OverlayWindow>
        <form onSubmit={handleSubmit} onKeyDown={handleEnter}>
          <FormTemplate
            defaultText={[`Edit ${itemType}`, input[1], input[2]]}
            formData={item}
          />
        </form>
      </OverlayWindow>
    </div>
  );
};

export default ItemForm;
