import React, { useState } from "react";
import QuestionListItem from "./QuestionListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  removeAllQuestions,
  selectQuestions,
} from "./questionSlice";

export function QuestionList() {
  const [shouldSort, setSorted] = useState(false);
  const dispatch = useDispatch();
  const questionList = useSelector(selectQuestions);

  const toggleSort = () => setSorted((prevState) => !prevState);
  const handleRemoveAll = () => dispatch(removeAllQuestions());

  let questionListContent = <p aria-label="Info message">No questions yet! :(</p>;
  let actionButtons = <></>;
  if (questionList.length > 0) {
    let questionListToRender = shouldSort
      ? [...questionList].sort(questionAlphabeticCompare)
      : questionList;
    questionListContent = questionListToRender.map((q) => (
      <QuestionListItem key={q.id} questionDetails={q} />
    ));
    actionButtons = (
      <>
        <button aria-label="Sort questions" onClick={toggleSort}>
          Sort Questions
        </button>{" "}
        <button aria-label="Remove all questions" onClick={handleRemoveAll}>
          Remove Questions
        </button>
      </>
    );
  }

  return (
    <div aria-label="Question list" role="list">
      <h2>Created questions</h2>
      {questionListContent}
      {actionButtons}
    </div>
  );
}

export const questionAlphabeticCompare = (q1, q2) =>
  q1.question.localeCompare(q2.question);
