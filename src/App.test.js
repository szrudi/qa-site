import React from "react";
import App from "./App";
import { renderWithQuestions } from "./helpers/test-util";
import { screen } from "@testing-library/react";

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
