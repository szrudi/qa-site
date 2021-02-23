import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStates,
  quickAddQuestion,
  saveQuestion,
  selectQuestionById,
} from "./questionSlice";
import Title from "../../app/components/Title";
import { Link, useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

const QuestionForm = ({ questionId, formRef = null }) => {
  const initialFormValues = useMemo(
    () => ({
      id: null,
      question: "",
      answer: "",
      creationDate: null,
    }),
    []
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const question =
    useSelector((state) => selectQuestionById(state, questionId)) ??
    initialFormValues;
  const [questionFormData, setQuestionFormData] = useState(initialFormValues);
  const [saveDelay, setSaveDelay] = useState(true);
  const [saveQuestionStatus, setSaveQuestionStatus] = useState(
    fetchStates.initial
  );
  useEffect(() => {
    if (questionId && !question.id) {
      history.push("/");
    }
    setQuestionFormData(question);
  }, [question, questionId, history]);

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
      if (!saveDelay) {
        dispatch(quickAddQuestion(questionFormData));
      } else {
        try {
          setSaveQuestionStatus(fetchStates.loading);
          const resultAction = await dispatch(saveQuestion(questionFormData));
          unwrapResult(resultAction);
          setSaveQuestionStatus(fetchStates.initial);
        } catch (err) {
          setSaveQuestionStatus(fetchStates.failed);
          console.error("Failed to save the post: ", err.message);
          return;
        }
      }
      setQuestionFormData(initialFormValues);
      setImmediate(() => history.push("/"));
    }
  };

  return (
    <section>
      <Title tooltip={getTooltip()}>
        {questionFormData.id ? "Edit" : "Create a new"} question
      </Title>
      <form aria-label="Question form">
        <fieldset disabled={saveQuestionStatus === fetchStates.loading}>
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
          <div className="flex-row">
            <div className="flex-small">
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={canSubmit ? "" : "muted-button"}
              >
                {questionFormData.id ? "Save" : "Create"} question
              </button>
              {cancelButton(questionFormData.id)}{" "}
              {saveQuestionStatus === fetchStates.loading
                ? "wait for it..."
                : ""}
              {saveQuestionStatus === fetchStates.failed
                ? "Failed to save, please try again."
                : ""}
            </div>
            <div className="flex-small text-right one-fourth">
              <label htmlFor="slowSave" className="inline-block">
                Slooooow save?
              </label>{" "}
              <input
                type="checkbox"
                id="slowSave"
                checked={saveDelay}
                onChange={() => setSaveDelay((prev) => !prev)}
              />
            </div>
          </div>
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
