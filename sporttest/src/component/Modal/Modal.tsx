import React from "react";
import styles from "./Modal.module.css";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<Props> = ({ onClose, children, title }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
