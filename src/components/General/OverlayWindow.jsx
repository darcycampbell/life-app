import { useModal } from "../../contexts/ModalContext";

const OverlayWindow = ({ children }) => {
  const { isOpen, closeModal } = useModal();

  function handleClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  return (
    <div
      className="overlay container"
      style={{ display: isOpen ? 'flex' : 'none' }}
      onClick={handleClick}
    >
      <div className="content container">{children}</div>
    </div>
  );
};

export default OverlayWindow;
