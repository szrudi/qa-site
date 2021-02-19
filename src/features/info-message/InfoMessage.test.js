import React from "react";
import { render } from "@testing-library/react";
import { InfoMessage } from "./InfoMessage";
import { addHours } from "date-fns";

test("two questions", () => {
  const { getByText } = render(<InfoMessage questions={questionList} />);
  let questionCountStr = getByText(/find \d questions?/g);
  expect(questionCountStr).toBeInTheDocument();
  expect(questionCountStr).toHaveTextContent(" find 2 questions.");
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

const questionList = [
  {
    id: 1,
    creationDate: addHours(new Date(), -2),
    question: "How to add question?",
    answer: "Just use the form below!",
  },

  {
    id: 2,
    creationDate: addHours(new Date(), -1),
    question: "Can I add my own question?",
    answer: "Yeah, sure you can! :)",
  },
];
