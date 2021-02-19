import React from "react";
import { render } from "@testing-library/react";
import { InfoMessage } from "./InfoMessage";
import { questionList } from "../../App";

test("multiple questions", () => {
  const { getByText } = render(<InfoMessage questions={questionList} />);
  let questionCountStr = getByText(/find \d questions?/g);
  expect(questionCountStr).toBeInTheDocument();
  expect(questionCountStr).toHaveTextContent(
    ` find ${questionList.length} questions.`
  );
});

test("one question", () => {
  let oneQuestionList = [questionList[0]];
  const { getByText } = render(<InfoMessage questions={oneQuestionList} />);
  let questionCountStr = getByText(/find \d questions?/g);
  expect(questionCountStr).toBeInTheDocument();
  expect(questionCountStr).toHaveTextContent(" find 1 question.");
});

test("no questions", () => {
  const { getByText } = render(<InfoMessage questions={[]} />);
  let questionCountStr = getByText(/find \d questions?/g);
  expect(questionCountStr).toBeInTheDocument();
  expect(questionCountStr).toHaveTextContent(" find 0 questions.");
});
