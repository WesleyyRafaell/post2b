import { createContext, useState } from 'react';

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <ModalContext.Provider value={{
      open,
      handleOpen,
      handleClose
    }}>
      {children}
    </ModalContext.Provider>
  )
}