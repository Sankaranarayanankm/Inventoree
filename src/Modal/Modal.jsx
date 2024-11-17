import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

function Backdrop({ onClose }) {
  return <div onClick={onClose} className="backdrop" />;
}

function Overlay(props) {
  return <div className="overlay">{props.children}</div>;
}

const Modal = (props) => {
  return ReactDOM.createPortal(
    <>
      <Backdrop onClose={props.onClose} />
      <Overlay>{props.children}</Overlay>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
