import { useEffect, useRef } from "react";
import "./dialog.style.css";
import { IconClose } from "../icons";

export function Dialog({ isOpen, onClose, children }) {
  // não devemos fazer buscas no DOM dessa forma
  //const dialog = document.querySelector("dialog");

  const dialogRef = useRef(null);

  useEffect(() => {
    isOpen ? openDialog() : closeDialog();
  }, [isOpen]);

  // Efeito para tratar fechamento do modal pelo ESC
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.addEventListener("close", onClose);
    return () => {
      dialog?.removeEventListener("close", onClose);
    };
  }, [onClose]);

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
      <dialog ref={dialogRef} className="dialog">
        <div className="btn-close-wrapper">
          <button autoFocus onClick={onClose} className="btn-close">
            <IconClose />
          </button>
        </div>
        <div className="body">{children}</div>
      </dialog>
    </>
  );
}
