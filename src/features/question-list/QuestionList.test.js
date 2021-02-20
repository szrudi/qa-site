import React from "react";
import { renderWithQuestions, testQuestions } from "../../helpers/test-util";
import { questionAlphabeticCompare, QuestionList } from "./QuestionList";
import { QuestionListItem } from "./QuestionListItem";
import { reset } from "./questionSlice";
import { Provider } from "react-redux";
import store from "../../app/store";
import {fireEvent, screen, within} from "@testing-library/react";

test("zero questions in list", () => {
  renderWithQuestions(<QuestionList />, { initialState: [] });
  const questionElement = screen.getByText(/no questions/i);
  expect(questionElement).toBeInTheDocument();
});

test("first question found in list", () => {
  renderWithQuestions(<QuestionList />);
  const firstQuestion = testQuestions[0];
  const questionElement = screen.getByText(firstQuestion.question);
  expect(questionElement).toBeInTheDocument();
});

test("answer toggles on click in list", async () => {
  renderWithQuestions(<QuestionList />);
  const listItems = screen.getAllByRole('listitem')
  const firstItem = listItems[0];
  const questionElement = within(firstItem).getByLabelText("Question");
  const answerElement = within(firstItem).getByLabelText("Answer");
  expect(answerElement).not.toBeVisible();

  fireEvent.click(questionElement);
  expect(answerElement).toBeVisible();
});

test("sort button toggles sort", () => {
  renderWithQuestions(<QuestionList />);
  const [unsortedIds, sortedIds] = [
    testQuestions,
    [...testQuestions].sort(questionAlphabeticCompare),
  ].map((list) => list.map((q) => `question-${q.id}`));

  const listItems = screen.getAllByRole("listitem");
  const itemIds = listItems.map((li) => li.getAttribute("id"));
  expect(itemIds).toEqual(unsortedIds);

  const sortButton = screen.getByLabelText("Sort questions");
  expect(sortButton).toBeInTheDocument();
  fireEvent.click(sortButton);

  const listItemsAfterSort = screen.getAllByRole("listitem");
  const itemIdsSorted = listItemsAfterSort.map((li) => li.getAttribute("id"));
  expect(itemIdsSorted).toEqual(sortedIds);
});

test("list has remove all button", () => {
  const { getByRole } = render(<QuestionList />);
  const removeAllButton = getByRole("remove-all-button");
  expect(removeAllButton).toBeInTheDocument();
});

test("question has edit button", () => {
  renderWithQuestions(<QuestionListItem questionDetails={testQuestions[0]} />);
  const editButton = screen.getByLabelText("Edit");
  expect(editButton).toBeInTheDocument();
});

test("question has remove button", () => {
  renderWithQuestions(<QuestionListItem questionDetails={testQuestions[0]} />);
  const removeButton = screen.getByLabelText("Remove");
  expect(removeButton).toBeInTheDocument();
});

