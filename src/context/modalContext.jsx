import React, { createContext, useState } from "react";

export const modalContext = createContext({
  show: false,
  showButton: true,
  showButtonHandler: () => {},
  hideButtonHandler: () => {},
  showHandler: () => {},
  hideHandler: () => {},
});

export default function ModalContext(props) {
  const [show, setShow] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const showHandler = () => setShow(true);
  const hideHandler = () => setShow(false);
  const hideButtonHandler = () => setShowButton(false);
  const showButtonHandler = () => setShowButton(true);
  const defaultValue = {
    show,
    showButton,
    showHandler,
    hideHandler,
    showButtonHandler,
    hideButtonHandler,
  };
  return (
    <modalContext.Provider value={defaultValue}>
      {props.children}
    </modalContext.Provider>
  );
}
