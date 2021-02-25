import React from "react";
import { renderWithQuestions } from "../../helpers/test-util";
import QuestionForm from "./QuestionForm";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { testQuestions } from "../../helpers/globals";

test("create form without id", () => {
  renderWithQuestions(<QuestionForm />);

  const title = screen.getByText(/create.*new.*question/i);
  expect(title).toBeInTheDocument();

  const saveButton = screen.getByText("Create question");
  expect(saveButton).toBeInTheDocument();

  const cancelButton = screen.queryByText("Cancel");
  expect(cancelButton).not.toBeInTheDocument();

  const questionForm = screen.getByLabelText("Question form");
  expect(questionForm).toHaveFormValues({
    question: "",
    answer: "",
  });
});

test("edit form with id", () => {
  const [firstQuestion] = testQuestions;
  renderWithQuestions(<QuestionForm questionId={firstQuestion.id} />);
  const title = screen.getByText(/edit.*question/i);
  expect(title).toBeInTheDocument();

  const saveButton = screen.getByText("Save question");
  expect(saveButton).toBeInTheDocument();

  const cancelButton = screen.getByText("Cancel");
  expect(cancelButton).toBeInTheDocument();

  const questionForm = screen.getByLabelText("Question form");
  expect(questionForm).toHaveFormValues({
    question: firstQuestion.question,
    answer: firstQuestion.answer,
  });
});

test("create form with wrong id", () => {
  renderWithQuestions(<QuestionForm questionId={"wrong-id"} />);
  const title = screen.getByText(/create.*new.*question/i);
  expect(title).toBeInTheDocument();

  const saveButton = screen.getByText("Create question");
  expect(saveButton).toBeInTheDocument();

  const questionForm = screen.getByLabelText("Question form");
  expect(questionForm).toHaveFormValues({
    question: "",
    answer: "",
  });
});

test("can change inputs", () => {
  renderWithQuestions(<QuestionForm />);
  const createForm = screen.getByRole("form");
  const questionInput = within(createForm).getByLabelText("Question");
  const answerInput = within(createForm).getByLabelText("Answer");
  const testQuestion = "My test question";
  const testAnswer = "And this is my test answer";

  fireEvent.change(questionInput, { target: { value: testQuestion } });
  fireEvent.change(answerInput, { target: { value: testAnswer } });

  expect(createForm).toHaveFormValues({
    question: testQuestion,
    answer: testAnswer,
  });
});

test("inputs cleared after save", async () => {
  renderWithQuestions(<QuestionForm />);
  const createForm = screen.getByRole("form");
  const saveButton = within(createForm).getByText("Create question");
  const questionInput = within(createForm).getByLabelText("Question");
  const answerInput = within(createForm).getByLabelText("Answer");
  fireEvent.change(questionInput, { target: { value: "My test question" } });
  fireEvent.change(answerInput, {
    target: { value: "And this is my test answer" },
  });

  fireEvent.click(saveButton);

  await waitFor(
    () => {
      const createForm = screen.getByRole("form");
      expect(createForm).toHaveFormValues({
        question: "",
        answer: "",
      });
    },
    { timeout: 2000 }
  );
});
