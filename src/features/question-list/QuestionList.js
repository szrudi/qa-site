import React, { useState } from "react";
import { QuestionListItem } from "./QuestionListItem";
import { useDispatch, useSelector } from "react-redux";
import { removeAll, selectQuestions } from "./questionSlice";

export function QuestionList() {
  let questionList = useSelector(selectQuestions);
  const dispatch = useDispatch();
  const [shouldSort, setSorted] = useState(false);

  const toggleSort = () => setSorted((prevState) => !prevState);
  const handleRemoveAll = () => dispatch(removeAll());

  let questionElements = <p aria-label="Info message">No questions yet! :(</p>;
  let actionButtons = <></>;
  if (questionList.length > 0) {
    let questionListToRender = questionList;
    if (shouldSort) {
      // let's not mutate the list directly
      questionListToRender = [...questionList].sort(questionAlphabeticCompare);
    }
    questionElements = questionListToRender.map((q) => (
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
      {questionElements}
      {actionButtons}
    </div>
  );
}

export const questionAlphabeticCompare = (q1, q2) => {
  if (q1.question > q2.question) {
    return 1;
  }
  if (q1.question < q2.question) {
    return -1;
  }
  return 0;
};
