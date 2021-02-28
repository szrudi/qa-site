import React, { useEffect, useState } from "react";
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

const initialFormValues = {
  id: null,
  question: "",
  answer: "",
  creationDate: null,
};

const QuestionForm = ({ questionId, formRef = null }) => {
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
  const [cancelFetch, setFetchCancel] = useState(null);
  useEffect(() => () => cancelFetch?.(), [cancelFetch]);
  useEffect(() => {
    if (questionId && !question.id) {
      history.push("/");
    }
    setQuestionFormData(question);
  }, [question, questionId, history]);

  const handleChange = (e) => {
    setQuestionFormData({
      ...questionFormData,
      [e.target.name]: e.target.value,
    });
  };

  const canSubmit = questionFormData.answer && questionFormData.question;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSubmit) {
      try {
        await submitForm();
        setQuestionFormData(initialFormValues);
        setImmediate(() => history.push("/"));
      } catch (err) {
        if (err.isCanceled) {
          console.info("Form unmounted by the time the question was saved.");
        } else {
          setSaveQuestionStatus(fetchStates.failed);
          console.error("Failed to save the post: ", err.message);
        }
      }
    }
  };

  const isEdit = Boolean(questionFormData.id);
  return (
    <section>
      <Title tooltip="Create your shiny new questions and answer using this form below!">
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
                type="submit"
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

  async function submitForm() {
    if (!saveDelay) {
      return dispatch(quickAddQuestion(questionFormData));
    }

    setSaveQuestionStatus(fetchStates.loading);
    let cancelablePromise = makeCancelable(
      dispatch(saveQuestion(questionFormData))
    );
    setFetchCancel(() => cancelablePromise.cancel);

    const resultAction = await cancelablePromise.promise;
    setFetchCancel(null);
    unwrapResult(resultAction);
    setSaveQuestionStatus(fetchStates.initial);
  }
};

export default QuestionForm;
