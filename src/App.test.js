import React from "react";
import App from "./App";
import { renderWithQuestions } from "./helpers/test-util";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { testQuestions } from "./helpers/globals";

test("renders header", () => {
  renderWithQuestions(<App />);
  const header = screen.getByLabelText("Page header");
  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent(/questions.*answers/gi);
});

test("renders info message", () => {
  renderWithQuestions(<App />);
  const infoMessage = screen.getByLabelText("App info message");
  expect(infoMessage).toBeInTheDocument();
  expect(infoMessage).toHaveTextContent(/create your own questions/gi);
});

test("renders QuestionList", () => {
  renderWithQuestions(<App />);
  const questionList = screen.getByLabelText("Question list");
  expect(questionList).toBeInTheDocument();
});

test("renders QuestionForm", () => {
  renderWithQuestions(<App />);
  const questionForm = screen.getByLabelText("Question form");
  expect(questionForm).toBeInTheDocument();
});

test("can add question to list", async () => {
  renderWithQuestions(<App />);

  const questionList = screen.getByRole("list");
  const listItems = within(questionList).getAllByRole("listitem");
  expect(listItems).toHaveLength(testQuestions.length);

  const createForm = screen.getByRole("form");
  const questionInput = within(createForm).getByLabelText("Question");
  const answerInput = within(createForm).getByLabelText("Answer");
  const saveButton = within(createForm).getByText("Create question");
  const testQuestion = "My test question";
  const testAnswer = "And this is my test answer";

  fireEvent.change(questionInput, { target: { value: testQuestion } });
  fireEvent.change(answerInput, { target: { value: testAnswer } });
  fireEvent.click(saveButton);

  const itemsAfterCreate = await waitFor(
    () => {
      const itemsAfterCreate = screen.getAllByRole("listitem");
      expect(itemsAfterCreate).toHaveLength(testQuestions.length + 1);
      return itemsAfterCreate;
    },
    { timeout: 3000 }
  );

  const lastQuestion = itemsAfterCreate.pop();
  expect(lastQuestion).toHaveTextContent(testQuestion);
  expect(lastQuestion).toHaveTextContent(testAnswer);
});
