import { useRef } from "react";
import "./dialog.style.css";

export function Dialog() {
  const dialogRef = useRef(null);

  //const dialog = document.querySelector("dialog");

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
        <button autoFocus onClick={closeDialog}>
          Close
        </button>
        <p>This modal dialog has groovy backdrop!</p>
      </dialog>
      <button onClick={openDialog}>Show the dialog</button>
    </>
  );
}
