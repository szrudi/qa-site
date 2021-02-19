import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { QuestionList } from "./QuestionList";
import { questionList } from "../../App";
import { QuestionListItem } from "./QuestionListItem";

test("zero questions in list", () => {
  const { getByText } = render(<QuestionList questions={[]} />);
  let questionElement = getByText(/no questions/i);
  expect(questionElement).toBeInTheDocument();
});

test("first question found in list", () => {
  const { getByText } = render(<QuestionList questions={questionList} />);
  let firstQuestion = questionList[0];
  let questionElement = getByText(firstQuestion.question);
  expect(questionElement).toBeInTheDocument();
});

test("answer toggles on click in list", async () => {
  const { getByText } = render(<QuestionList questions={questionList} />);
  let firstQuestion = questionList[0];
  let answerElement = getByText(firstQuestion.answer);
  expect(answerElement).not.toBeVisible();

  let questionElement = getByText(firstQuestion.question);
  fireEvent.click(questionElement);
  expect(answerElement).toBeVisible();
});

test("list has sort button", () => {
  const { getByRole } = render(<QuestionList questions={questionList} />);
  let sortButton = getByRole("sort-button");
  expect(sortButton).toBeInTheDocument();
});

test("list has remove all button", () => {
  const { getByRole } = render(<QuestionList questions={questionList} />);
  let removeAllButton = getByRole("remove-all-button");
  expect(removeAllButton).toBeInTheDocument();
});

test("question has edit button", () => {
  const { getByRole } = render(
    <QuestionListItem questionDetails={questionList[0]} />
  );
  let sortButton = getByRole("edit-button");
  expect(sortButton).toBeInTheDocument();
});

test("question has remove button", () => {
  const { getByRole } = render(
    <QuestionListItem questionDetails={questionList[0]} />
  );
  let sortButton = getByRole("remove-button");
  expect(sortButton).toBeInTheDocument();
});

