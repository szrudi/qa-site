import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeQuestion } from "./questionSlice";
import styles from "./QuestionList.module.css";

const QuestionListItem = ({ questionDetails }) => {
  const dispatch = useDispatch();
  const handleRemove = () => dispatch(removeQuestion(questionDetails.id));

  return (
    <details
      role="listitem"
      id={`question-${questionDetails.id}`}
      className={styles.questionListItem}
    >
      <summary className="flex-row vertical-center">
        <span className="flex-small" aria-label="Question">
          {questionDetails.question}
        </span>
        <span className="flex-small text-right one-fourth">
          <button
            className="muted-button round-button no-margin-bottom"
            aria-label="Edit"
            onClick={null}
          >
            {actionIcons["edit"]}
          </button>{" "}
          <button
            className="muted-button round-button no-margin-bottom"
            aria-label="Remove"
            onClick={handleRemove}
          >
            {actionIcons["remove"]}
          </button>
        </span>
      </summary>
      <p aria-label="Answer">{questionDetails.answer}</p>
    </details>
  );
};

export default React.memo(QuestionListItem);

const actionIcons = {
  edit: "✏️",
  remove: "🗑",
};

export const questionDetailsShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
});
QuestionListItem.propTypes = {
  questionDetails: questionDetailsShape,
};
