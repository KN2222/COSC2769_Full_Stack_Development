import React, { createContext, useContext, useState } from "react";
import { useModal } from "../hooks/modal";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const { showModal, openModal, closeModal } = useModal();

  return (
    <ModalContext.Provider
      value={{
        showModal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
