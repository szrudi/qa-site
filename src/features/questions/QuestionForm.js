import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, fetchStates, selectQuestionById } from "./questionSlice";
import Title from "../../app/components/Title";
import { Link, useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

const QuestionForm = ({ questionId, formRef = null }) => {
  const initialFormValues = {
    id: null,
    question: "",
    answer: "",
    creationDate: null,
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const [questionFormData, setQuestionFormData] = useState(initialFormValues);
  const [addQuestionStatus, setAddQuestionStatus] = useState(
    fetchStates.initial
  );
  const question = useSelector((state) =>
    selectQuestionById(state, questionId)
  );
  useEffect(() => question && setQuestionFormData(question), [question]);

  const canSubmit = questionFormData.answer && questionFormData.question;

  const handleChange = (e) => {
    setQuestionFormData({
      ...questionFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSubmit) {
      try {
        setAddQuestionStatus(fetchStates.loading);
        const resultAction = await dispatch(addQuestion(questionFormData));
        unwrapResult(resultAction);
        setAddQuestionStatus(fetchStates.initial);
        setQuestionFormData(initialFormValues);
        setImmediate(() => history.push("/"));
      } catch (err) {
        setAddQuestionStatus(fetchStates.failed);
        console.error("Failed to save the post: ", err.message);
      }
    }
  };

  return (
    <section>
      <Title tooltip={getTooltip()}>
        {questionFormData.id ? "Edit" : "Create a new"} question
      </Title>
      <form aria-label="Question form">
        <fieldset disabled={addQuestionStatus === fetchStates.loading}>
          <label htmlFor="question">Question</label>
          <input
            ref={formRef}
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
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={canSubmit ? "" : "muted-button"}
          >
            {questionFormData.id ? "Save" : "Create"} question
          </button>
          {cancelButton(questionFormData.id)}{" "}
          {addQuestionStatus === fetchStates.loading ? "wait for it..." : ""}
          {addQuestionStatus === fetchStates.failed
            ? "Failed to save, please try again."
            : ""}
        </fieldset>
      </form>
    </section>
  );
};

function cancelButton(questionId) {
  return questionId ? (
    <>
      {" "}
      <Link to="/">
        <button className="muted-button">Cancel</button>
      </Link>
    </>
  ) : null;
}

function getTooltip() {
  return "Create your shiny new questions and answer using this form below!";
}

export default QuestionForm;
