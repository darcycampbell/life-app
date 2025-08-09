import React, { useEffect, useState } from "react";
import OverlayWindow from "../General/OverlayWindow";
import FormTemplate from "../General/FormTemplate";
import { useData } from "../../content/DataContext";
import useQuery from "../../hooks/useQuery";
import dataTables from "../../content/dataTables";
import formContent from "../../content/formContent";

const ItemForm = ({ item, isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState(null);
  const [input, setInput] = useState(["", "", ""]);
  const [itemType, setItemType] = useState(null);
  const {page} = useData()
  const getQuery = useQuery()

  useEffect(() => {
    if (page) {
      setItemType(dataTables[page].slice(0, -1));
      setInput(formContent[page]);
    }
  }, [page]);

  function handleSubmit(event) {
    event.preventDefault();
    setIsOpen(false);
    const buttonValue = event.nativeEvent.submitter.value;
    if (page) {
      if (buttonValue === "delete") {
        const query = getQuery("delete_item", [page, item.index]);
        //getData("database", query)
      } else if (buttonValue === "done") {
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData);
        //console.log("this is form values: ", formValues)
      }
    }
  }

  return (
    <div>
      <OverlayWindow isOpen={isOpen} setIsOpen={setIsOpen}>
        <form onSubmit={handleSubmit}>
          <FormTemplate
            defaultText={[`Edit ${itemType}`, input[1], input[2]]}
            formData={formData}
          />
        </form>
      </OverlayWindow>
    </div>
  );
};

export default ItemForm;
