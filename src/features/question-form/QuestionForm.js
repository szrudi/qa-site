import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, selectQuestions } from "../question-list/questionSlice";

export function QuestionForm({ questionId }) {
  const initialState = {
    id: null,
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
    <div>
      <h2>{questionDetails.id ? "Edit" : "Create a new"} question</h2>
      <form aria-label="Question form">
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
          {questionDetails.id ? "Save" : "Create"} question
        </button>
      </form>
    </div>
  );
}
