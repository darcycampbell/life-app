import { useEffect } from "react";
import { useModal } from "../../contexts/ModalContext";
import OverlayWindow from "../General/OverlayWindow";
import LogTemplate from "../General/LogTemplate";

const ItemLog = ({ item }) => {
  const { windowOpened } = useModal();
  const shouldOpen = Boolean(windowOpened === item.id + "left");

  return (
    <div>
      {shouldOpen && (
        <OverlayWindow>
          <LogTemplate item={item} />
        </OverlayWindow>
      )}
    </div>
  );
};

export default ItemLog;
