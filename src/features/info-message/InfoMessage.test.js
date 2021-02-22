import React from "react";
import { createTestStore, renderWithQuestions } from "../../helpers/test-util";
import { InfoMessage } from "./InfoMessage";
import { screen } from "@testing-library/react";
import { testQuestions } from "../../helpers/globals";

test("no questions", () => {
  const store = createTestStore([]);
  renderWithQuestions(<InfoMessage />, { store });
  const questionCountStr = screen.getByText(/find \d questions?/g);
  expect(questionCountStr).toBeInTheDocument();
  expect(questionCountStr).toHaveTextContent(" find 0 questions.");
});

test("one question", () => {
  const [firstQuestion] = testQuestions;
  const store = createTestStore([firstQuestion]);
  renderWithQuestions(<InfoMessage />, { store });
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
