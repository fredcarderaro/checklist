import { useEffect, useRef } from "react";
import "./dialog.style.css";

export function Dialog({ isOpen, onClose }) {
  // não devemos fazer buscas no DOM dessa forma
  //const dialog = document.querySelector("dialog");

  const dialogRef = useRef(null);

  useEffect(() => {
    console.log(`Alternar modal: ${isOpen}`);
    isOpen ? openDialog() : closeDialog();
  }, [isOpen]);

  // "Show the dialog" button opens the dialog modally
  const openDialog = () => {
    dialogRef.current.showModal();
  };

  // "Close" button closes the dialog
  const closeDialog = () => {
    dialogRef.current.close();
  };

  return (
    <>
      <dialog ref={dialogRef}>
        <button autoFocus onClick={onClose}>
          Close
        </button>
        <p>This modal dialog has groovy backdrop!</p>
      </dialog>
    </>
  );
}
