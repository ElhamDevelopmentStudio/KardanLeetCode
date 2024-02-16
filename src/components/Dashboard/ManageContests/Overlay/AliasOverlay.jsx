import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./AliasOverlay.module.css";

const AliasOverlay = ({ onClose, onSubmit }) => {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = () => {
    onSubmit(newUsername, newPassword);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.overlayContent}>
        <FontAwesomeIcon
          icon={faTimes}
          className={styles.closeOverlay}
          onClick={onClose}
        />
        <h2 className={styles.title}>Enter Alias Credentials</h2>
        <div className={styles.inputs}>
          <label htmlFor="newUsername" className={styles.inputLabel}>
            Username:
          </label>
          <input
            id="newUsername"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className={styles.inputField}
            autoComplete="new-password"
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="newPassword" className={styles.inputLabel}>
            Password:
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.inputField}
            autoComplete="new-password"
          />
        </div>

        <button onClick={handleSubmit} className={styles.overlaySubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AliasOverlay;
