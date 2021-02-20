import React from "react";
import {render, testQuestions} from "../../helpers/test-util";
import { InfoMessage } from "./InfoMessage";

test("multiple questions", () => {
  const { getByText } = render(<InfoMessage />);
  const questionCountStr = getByText(/find \d questions?/g);
  expect(questionCountStr).toBeInTheDocument();
  expect(questionCountStr).toHaveTextContent(
    ` find ${testQuestions.length} questions.`
  );
});

test("one question", () => {
  const { getByText } = render(<InfoMessage />, {
    initialState: [testQuestions[0]],
  });
  const questionCountStr = getByText(/find \d questions?/g);
  expect(questionCountStr).toBeInTheDocument();
  expect(questionCountStr).toHaveTextContent(" find 1 question.");
});

test("no questions", () => {
  const { getByText } = render(<InfoMessage />, {
    initialState: [],
  });
  const questionCountStr = getByText(/find \d questions?/g);
  expect(questionCountStr).toBeInTheDocument();
  expect(questionCountStr).toHaveTextContent(" find 0 questions.");
});
