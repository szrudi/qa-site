import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStates,
  quickAddQuestion,
  saveQuestion,
  selectQuestionById,
} from "./questionSlice";
import Title from "../../app/components/Title";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import CancelButton from "../../app/components/CancelButton";
import Button from "../../app/components/Button";
import { makeCancelable } from "../../helpers/globals";

const statusMessages = {
  [fetchStates.loading]: " wait for it...",
  [fetchStates.failed]: " Failed to save, please try again.",
};

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
  const [fetchPromise, setFetchPromise] = useState(null);
  useEffect(() => () => fetchPromise?.cancel?.(), [fetchPromise]);
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
          let cancelable = makeCancelable(dispatch(saveQuestion(questionFormData)));
          setFetchPromise(cancelable);

          const resultAction = await cancelable.promise;
          setFetchPromise(null);
          unwrapResult(resultAction);
          setSaveQuestionStatus(fetchStates.initial);
        } catch (err) {
          if (!err.isCanceled) {
            setSaveQuestionStatus(fetchStates.failed);
            console.error("Failed to save the post: ", err.message);
          } else {
            console.info("Form unmounted by the time the question was saved.");
          }
          return;
        }
      }
      setQuestionFormData(initialFormValues);
      setImmediate(() => history.push("/"));
    }
  };

  const isEdit = Boolean(questionFormData.id);
  return (
    <section>
      <Title
        tooltip={
          "Create your shiny new questions and answer using this form below!"
        }
      >
        {isEdit ? "Edit" : "Create a new"} question
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
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={canSubmit ? "" : "muted-button"}
              >
                {isEdit ? "Save" : "Create"} question
              </Button>
              {isEdit && <CancelButton />}
              {statusMessages[saveQuestionStatus] ?? null}
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

export default QuestionForm;
