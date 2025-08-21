import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowOpened, setWindowOpened] = useState(null);

  const openModal = (window) => {
    setIsOpen(true);
    setWindowOpened(window);
  };
  const closeModal = () => {
    setIsOpen(false);
    setWindowOpened(null);
  };

  const value = {
    isOpen,
    windowOpened,
    openModal,
    closeModal
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
