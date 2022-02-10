import React from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const Modal = () => {
  const onClick = () => {
    toast.success("Hi", {
      autoClose: 3000,
    });
  };
  return (
    <>
      {toast.success("Direct", {
        autoClose: 3000,
      })}
      <button onClick={onClick}>Click</button>
      <ToastContainer />
    </>
  );
};

export default Modal;