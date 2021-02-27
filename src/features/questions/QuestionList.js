import React, { useEffect, useState } from "react";
import QuestionListItem from "./QuestionListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestions,
  fetchStates,
  removeAllQuestions,
  resetStatus,
  selectQuestions,
} from "./questionSlice";
import Title from "../../app/components/Title";
import Button from "../../app/components/Button";

const QuestionList = ({ formRef = null }) => {
  const [shouldSort, setSorted] = useState(false);
  const dispatch = useDispatch();
  const questionList = useSelector(selectQuestions);
  const questionsStatus = useSelector((state) => state.questions.status);
  const errorMessage = useSelector((state) => state.questions.error);
  const retryInSeconds = 3;

  useEffect(() => {
    if (fetchStates.initial === questionsStatus) {
      dispatch(fetchQuestions());
    } else if (fetchStates.failed === questionsStatus) {
      setTimeout(() => dispatch(resetStatus()), retryInSeconds * 1000);
    }
  }, [questionsStatus, dispatch]);

  const toggleSort = () => setSorted((prevState) => !prevState);
  const handleRemoveAll = () => dispatch(removeAllQuestions());

  let questionListContent;
  let actionButtons = <></>;
  if (questionList.length === 0 || fetchStates.initial === questionsStatus) {
    let message = "Loading questions... Please stand by.";
    if (
      fetchStates.succeeded === questionsStatus &&
      questionList.length === 0
    ) {
      message = "No questions yet! :(";
    } else if (fetchStates.failed === questionsStatus) {
      message = `${errorMessage} Retrying in ${retryInSeconds} seconds.`;
    }
    questionListContent = <p aria-label="Info message">{message}</p>;
  } else {
    let questionListToRender = shouldSort
      ? [...questionList].sort((q1, q2) =>
          q1.question.localeCompare(q2.question)
        )
      : questionList;

    questionListContent = questionListToRender.map((question) => (
      <QuestionListItem
        key={question.id}
        questionDetails={question}
        formRef={formRef}
      />
    ));
    actionButtons = (
      <>
        <Button aria-label="Sort questions" onClick={toggleSort}>
          Sort Questions
        </Button>
        <Button aria-label="Remove all questions" onClick={handleRemoveAll}>
          Remove Questions
        </Button>
      </>
    );
  }

  return (
    <section aria-label="Question list" role="list">
      <Title tooltip="You can find the created questions and their answers right here!">
        Created questions
      </Title>
      {questionListContent}
      {actionButtons}
    </section>
  );
};

export default QuestionList;
