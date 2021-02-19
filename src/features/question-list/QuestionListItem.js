import React from "react";
import PropTypes from "prop-types";

export function QuestionListItem({ questionDetails }) {
  return (
    <details>
      <summary>
          {questionDetails.question}
          <button role="edit-button">Edit</button>
          <button role="remove-button">X</button>
      </summary>
      <p>{questionDetails.answer}</p>
    </details>
  );
}

export const questionDetailsShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    creationDate: PropTypes.instanceOf(Date).isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
});
QuestionListItem.propTypes = {
  questionDetails: questionDetailsShape,
};