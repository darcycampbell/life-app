import React from 'react'

const AddButton = ({isOpen, setIsOpen}) => {
  return (
    <button
        className="add"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? "x" : "+"}
      </button>
  )
}

export default AddButton