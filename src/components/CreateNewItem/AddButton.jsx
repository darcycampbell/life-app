import React from 'react'
import { useModal } from '../../contexts/ModalContext';

const AddButton = () => {
  const { isOpen, toggleModal } = useModal();

  return (
    <button
        className="add"
        onClick={() => {
          toggleModal();
        }}
      >
        {isOpen ? "x" : "+"}
      </button>
  )
}

export default AddButton