import React from "react";
import { render } from "@testing-library/react";
import { QuestionForm } from "./QuestionForm";
import { questionList } from "../../App";

test("create form without id", () => {
  const { getByText, getByRole } = render(<QuestionForm />);

  let title = getByText(/create.*new.*question/i);
  expect(title).toBeInTheDocument();

  let saveButton = getByText("Create question");
  expect(saveButton).toBeInTheDocument();

  const questionForm = getByRole("question-form");
  expect(questionForm).toHaveFormValues({
    question: "",
    answer: "",
  });
});

test("edit form with id", () => {
  const firstQuestion = questionList[0];
  const { getByText, getByRole } = render(
    <QuestionForm questionId={firstQuestion.id} />
  );
  let title = getByText(/edit.*question/i);
  expect(title).toBeInTheDocument();

  let saveButton = getByText("Save question");
  expect(saveButton).toBeInTheDocument();

  const questionForm = getByRole("question-form");
  expect(questionForm).toHaveFormValues({
    question: firstQuestion.question,
    answer: firstQuestion.answer,
  });
});
