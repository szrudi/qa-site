import React from "react";
import styles from "./InfoMessage.module.css";
import PropTypes from "prop-types";

export function InfoMessage({ questions }) {
  const questionsNumber = questions.length;
  return (
    <div className={styles.infoMessage} role="info-message">
      Here you can find {questionsNumber} question
      {questionsNumber === 1 ? "" : "s"}. Feel free to create your own
      questions.
    </div>
  );
}

InfoMessage.propTypes = {
  questions: PropTypes.array.isRequired,
}
