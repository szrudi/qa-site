import React from "react";
import PropTypes from "prop-types";

export function QuestionListItem({ questionDetails }) {
  return (
    <details role="listitem" id={`question-${questionDetails.id}`}>
      <summary aria-label="Question">
          {questionDetails.question}
          <button aria-label="Edit">Edit</button>
          <button aria-label="Remove">X</button>
      </summary>
      <p aria-label="Answer">{questionDetails.answer}</p>
    </details>
  );
}

export const questionDetailsShape = PropTypes.shape({
    id: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
});
QuestionListItem.propTypes = {
  questionDetails: questionDetailsShape,
};
