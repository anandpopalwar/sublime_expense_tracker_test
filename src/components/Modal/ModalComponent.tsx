import "./Modal.css";
import React, { useEffect } from "react";
import { CloseIcon } from "../../helpers/Icons.jsx";

const ModalComponent = ({
  children,
  header,
  onClose,
}: {
  children: React.ReactNode;
  header: string;
  onClose: () => void;
}) => {
  const onEscClick = (e: any) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    document.addEventListener("keyup", onEscClick, { signal });

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div className="modal_parent_container">
      <div className="modal_main_container">
        <div className="header_container">
          {header}
          <div onClick={onClose}>
            <CloseIcon />
          </div>
        </div>
        <div className="content_container">{children}</div>
      </div>
    </div>
  );
};

export default ModalComponent;
 