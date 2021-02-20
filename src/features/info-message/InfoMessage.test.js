import React from "react";
import { renderWithQuestions} from "../../helpers/test-util";
import { InfoMessage } from "./InfoMessage";
import { screen } from "@testing-library/react";
import {testQuestions} from "../../helpers/globals";

test("no questions", () => {
  renderWithQuestions(<InfoMessage />, {
    initialState: [],
  });
  const questionCountStr = screen.getByText(/find \d questions?/g);
  expect(questionCountStr).toBeInTheDocument();
  expect(questionCountStr).toHaveTextContent(" find 0 questions.");
});

test("one question", () => {
  renderWithQuestions(<InfoMessage />, {
    initialState: [testQuestions[0]],
  });
  const questionCountStr = screen.getByText(/find \d questions?/g);
  expect(questionCountStr).toBeInTheDocument();
  expect(questionCountStr).toHaveTextContent(" find 1 question.");
});

test("multiple questions", () => {
  renderWithQuestions(<InfoMessage />);
  const questionCountStr = screen.getByText(/find \d questions?/g);
  expect(questionCountStr).toBeInTheDocument();
  expect(questionCountStr).toHaveTextContent(
      ` find ${testQuestions.length} questions.`
  );
});
