import React from "react";
import { fireEvent, render, testQuestions } from "../../helpers/test-util";
import { questionAlphabeticCompare, QuestionList } from "./QuestionList";
import { QuestionListItem } from "./QuestionListItem";

test("zero questions in list", () => {
  const { getByText } = render(<QuestionList />, {
    initialState: [],
  });
  const questionElement = getByText(/no questions/i);
  expect(questionElement).toBeInTheDocument();
});

test("first question found in list", () => {
  const { getByText } = render(<QuestionList />);
  const firstQuestion = testQuestions[0];
  const questionElement = getByText(firstQuestion.question);
  expect(questionElement).toBeInTheDocument();
});

test("answer toggles on click in list", async () => {
  const { getByText } = render(<QuestionList />);
  const firstQuestion = testQuestions[0];
  const answerElement = getByText(firstQuestion.answer);
  expect(answerElement).not.toBeVisible();

  const questionElement = getByText(firstQuestion.question);
  fireEvent.click(questionElement);
  expect(answerElement).toBeVisible();
});

test("list has sort button", () => {
  const { getByRole } = render(<QuestionList />);
  const sortButton = getByRole("sort-button");
  expect(sortButton).toBeInTheDocument();
});

test("sort button toggles sort", () => {
  const { getByRole, getAllByRole } = render(<QuestionList />);
  let sortedQuestions = [...testQuestions];
  sortedQuestions.sort(questionAlphabeticCompare);
  sortedQuestions = sortedQuestions.map((q) => `question-${q.id}`);

  const sortButton = getByRole("sort-button");
  fireEvent.click(sortButton);

  const listItems = getAllByRole("qa-item");
  const foundItemIds = listItems.map((li) => li.getAttribute("id"));
  expect(foundItemIds).toEqual(sortedQuestions);
});

test("list has remove all button", () => {
  const { getByRole } = render(<QuestionList />);
  const removeAllButton = getByRole("remove-all-button");
  expect(removeAllButton).toBeInTheDocument();
});

test("question has edit button", () => {
  const { getByRole } = render(
    <QuestionListItem questionDetails={testQuestions[0]} />
  );
  const sortButton = getByRole("edit-button");
  expect(sortButton).toBeInTheDocument();
});

test("question has remove button", () => {
  const { getByRole } = render(
    <QuestionListItem questionDetails={testQuestions[0]} />
  );
  const sortButton = getByRole("remove-button");
  expect(sortButton).toBeInTheDocument();
});

