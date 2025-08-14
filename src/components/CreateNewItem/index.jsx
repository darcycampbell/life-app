import OverlayWindow from "../General/OverlayWindow";
import AddItem from "./AddItem";
import AddButton from "./AddButton";
import { useModal } from "../../contexts/ModalContext";

const CreateNewItem = () => {
  const { windowOpened } = useModal();
  const shouldOpen = Boolean(windowOpened === "add");
  return (
    <div>
      {shouldOpen && (
        <OverlayWindow>
          <AddItem />
        </OverlayWindow>
      )}
      <AddButton />
    </div>
  );
};

export default CreateNewItem;
