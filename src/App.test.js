import React from "react";
import App from "./App";
import { render } from "./helpers/test-util";

test("renders header", () => {
  const { getByRole } = render(<App />);
  const header = getByRole("header");
  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent(/questions.*answers/gi);
});

test("renders info message", () => {
  const { getByRole } = render(<App />);
  const infoMessage = getByRole("info-message");
  expect(infoMessage).toBeInTheDocument();
  expect(infoMessage).toHaveTextContent(/create your own questions/gi);
});

test("renders QuestionList", () => {
  const { getByRole } = render(<App />);
  const questionList = getByRole("question-list");
  expect(questionList).toBeInTheDocument();
});

test("renders QuestionForm", () => {
  const { getByRole } = render(<App />);
  const questionForm = getByRole("question-form");
  expect(questionForm).toBeInTheDocument();
});
