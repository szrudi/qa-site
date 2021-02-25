import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeQuestion } from "./questionSlice";
import Details from "../../app/components/Details";
import { useHistory } from "react-router-dom";
import Button from "../../app/components/Button";

const QuestionListItem = ({ questionDetails, formRef = null }) => {
  const dispatch = useDispatch();
  const handleRemove = () => dispatch(removeQuestion(questionDetails.id));
  const history = useHistory();
  const handleEdit = () => {
    history.push(`/edit/${questionDetails.id}`);
    formRef?.current?.focus();
  };

  return (
    <Details
      role="listitem"
      id={`question-${questionDetails.id}`}
      className="question-row"
    >
      <summary className="flex-row vertical-center">
        <span className="flex-small" aria-label="Question">
          {questionDetails.question}
        </span>
        <span className="flex-small text-right one-fourth">
          <Button
            className="muted-button round-button no-margin-bottom"
            aria-label="Edit"
            onClick={handleEdit}
          >
            {actionIcons["edit"]}
          </Button>
          <Button
            className="muted-button round-button no-margin-bottom"
            aria-label="Remove"
            onClick={handleRemove}
          >
            {actionIcons["remove"]}
          </Button>
        </span>
      </summary>
      <p aria-label="Answer">{questionDetails.answer}</p>
    </Details>
  );
};

export default React.memo(QuestionListItem);

const actionIcons = {
  edit: "✏️",
  remove: "🗑",
};

const questionDetailsShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
});
QuestionListItem.propTypes = {
  questionDetails: questionDetailsShape,
};
