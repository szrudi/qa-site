import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestion,
  selectQuestionById,
} from "./questionSlice";

const QuestionForm = ({ questionId }) => {
  const question = useSelector((state) =>
    selectQuestionById(state, questionId)
  );
  const initialFormValues = question ?? {
    id: null,
    question: "",
    answer: "",
  };
  const [questionFormData, setQuestionFormData] = useState(initialFormValues);
  const dispatch = useDispatch();
  const canSubmit = questionFormData.answer && questionFormData.question;

  const handleChange = (e) => {
    setQuestionFormData({
      ...questionFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (canSubmit) {
      dispatch(addQuestion(questionFormData));
      setQuestionFormData(initialFormValues);
    }
  };
  return (
    <section>
      <h2>{questionFormData.id ? "Edit" : "Create a new"} question</h2>
      <form aria-label="Question form">
        <label htmlFor="question">Question</label>
        <input
          name="question"
          id="question"
          type="text"
          value={questionFormData.question}
          onChange={handleChange}
        />
        <label htmlFor="answer">Answer</label>
        <textarea
          name="answer"
          id="answer"
          rows="2"
          value={questionFormData.answer}
          onChange={handleChange}
        />
        <button
          onClick={handleCreate}
          disabled={!canSubmit}
          className={canSubmit ? "" : "muted-button"}
        >
          {questionFormData.id ? "Save" : "Create"} question
        </button>
      </form>
    </section>
  );
};

export default QuestionForm;
