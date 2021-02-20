import React from "react";
import App from "./App";
import { renderWithQuestions } from "./helpers/test-util";
import { fireEvent, screen, within } from "@testing-library/react";
import store from "./app/store";
import { reset } from "./features/question-list/questionSlice";
import { testQuestions } from "./helpers/globals";
import { Provider } from "react-redux";

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

test("can add question to list", () => {
  store.dispatch(reset(testQuestions));
  const { rerender } = renderWithQuestions(<App />, { store });

  const questionList = screen.getByRole("list");
  const listItems = within(questionList).getAllByRole("listitem");
  expect(listItems).toHaveLength(testQuestions.length);

  const createForm = screen.getByRole("form");
  const questionInput = within(createForm).getByLabelText("Question");
  const answerInput = within(createForm).getByLabelText("Answer");
  const saveButton = within(createForm).getByText("Create question");
  const testQuestion = "My test question";
  const testAnswer = "And this is my test answer";

  fireEvent.change(questionInput, { target: { value: testQuestion } })
  fireEvent.change(answerInput, { target: { value: testAnswer } })
  fireEvent.click(saveButton);
  rerender(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const itemsAfterCreate = within(questionList).queryAllByRole("listitem");
  expect(itemsAfterCreate).toHaveLength(testQuestions.length + 1);

  const lastQuestion = itemsAfterCreate.pop();
  expect(lastQuestion).toHaveTextContent(testQuestion);
  expect(lastQuestion).toHaveTextContent(testAnswer);
});

