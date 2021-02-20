import React, { useEffect, useState } from "react";
import styles from "./QuestionForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { add, selectQuestions } from "../question-list/questionSlice";

export function QuestionForm({ questionId }) {
  const initialState = {
    question: "",
    answer: "",
  };
  const [questionDetails, setQuestionDetails] = useState(initialState);
  const questionList = useSelector(selectQuestions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (questionId !== undefined) {
      let foundQuestion = questionList.find((q) => q.id === questionId);
      if (foundQuestion) {
        setQuestionDetails(foundQuestion);
      }
    }
  }, [questionId, questionList]);

  const handleChange = (e) => {
    setQuestionDetails({
      ...questionDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(add(questionDetails));
    setQuestionDetails(initialState);
  };
  return (
    <div className={styles.questionFormElement}>
      <h2>{questionId ? "Edit" : "Create a new"} question</h2>
      <form aria-label="Question form" className={styles.questionForm}>
        <label htmlFor="question">Question</label>
        <input
          name="question"
          id="question"
          type="text"
          value={questionDetails.question}
          onChange={handleChange}
        />
        <label htmlFor="answer">Answer</label>
        <textarea
          name="answer"
          id="answer"
          rows="2"
          value={questionDetails.answer}
          onChange={handleChange}
        />
        <button onClick={handleCreate}>
          {questionId ? "Save" : "Create"} question
        </button>
      </form>
    </div>
  );
}
