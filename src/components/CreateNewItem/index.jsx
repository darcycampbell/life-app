import OverlayWindow from "../General/OverlayWindow";
import AddItem from "./AddItem";
import AddButton from "./AddButton";
import { ModalProvider } from "../../contexts/ModalContext";

const CreateNewItem = () => {
  return (
    <ModalProvider>
      <div>
        <OverlayWindow>
          <AddItem />
        </OverlayWindow>
        <AddButton />
      </div>
    </ModalProvider>
  );
};

export default CreateNewItem;
