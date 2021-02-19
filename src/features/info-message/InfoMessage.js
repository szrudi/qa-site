import React from "react";
import styles from "./InfoMessage.module.css";

export function InfoMessage() {
    return (
        <div className={styles.infoMessage} role="info-message">
            Here you can find 0 questions. Feel free to create your own questions.
        </div>
    );
}