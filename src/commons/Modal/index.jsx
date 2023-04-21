import { Modal } from "@mui/material";
import React from "react";
import styles from "./myModal.module.scss";
export default function MyModal({ children, handleClose, open }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.bodyModal}>{children}</div>
    </Modal>
  );
}
