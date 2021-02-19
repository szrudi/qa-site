import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { QuestionList } from "./QuestionList";
import { questionList } from "../../App";

test("first question found", () => {
  const { getByText } = render(<QuestionList questions={questionList} />);
  let firstQuestion = questionList[0];
  let questionElement = getByText(firstQuestion.question);
  expect(questionElement).toBeInTheDocument();
});

test("first answer hidden", async () => {
  const { getByText } = render(<QuestionList questions={questionList} />);
  let firstQuestion = questionList[0];
  let answerElement = getByText(firstQuestion.answer);
  expect(answerElement).not.toBeVisible();

  let questionElement = getByText(firstQuestion.question);
  fireEvent.click(questionElement);
  expect(answerElement).toBeVisible();
});
