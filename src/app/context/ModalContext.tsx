'use client';

import { createContext, useState, ReactNode, useContext } from 'react';

type Modaltype = 'contact' | null;

const ModalContext = createContext<{
  modal: Modaltype;
  openModal: (type: Modaltype) => void;
  closeModal: () => void;
}>({
  modal: null,
  openModal: () => {},
  closeModal: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<Modaltype>(null);

  const openModal = (type: Modaltype) => setModal(type);
  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
