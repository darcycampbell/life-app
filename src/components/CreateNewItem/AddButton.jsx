import { useModal } from '../../contexts/ModalContext';

const AddButton = () => {
  const { isOpen, closeModal, openModal } = useModal();
  
  return (
    <button
        className="add"
        onClick={() => {
          if (isOpen) {
            closeModal()
          } else {
            openModal("add")
          }
        }}
      >
        {isOpen ? "x" : "+"}
      </button>
  )
}

export default AddButton