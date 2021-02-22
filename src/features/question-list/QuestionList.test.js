import React from "react";
import { createTestStore, renderWithQuestions } from "../../helpers/test-util";
import { questionAlphabeticCompare, QuestionList } from "./QuestionList";
import { Provider } from "react-redux";
import { fireEvent, screen, within } from "@testing-library/react";
import { testQuestions } from "../../helpers/globals";

test("zero questions in list", () => {
  const store = createTestStore([]);
  renderWithQuestions(<QuestionList />, { store });
  const questionElement = screen.getByText(/no questions/i);
  expect(questionElement).toBeInTheDocument();

  const sortButton = screen.queryByLabelText("Sort questions");
  expect(sortButton).not.toBeInTheDocument();
  const removeAllButton = screen.queryByLabelText("Remove all questions");
  expect(removeAllButton).not.toBeInTheDocument();
});

test("first question found in list", () => {
  renderWithQuestions(<QuestionList />);
  const [firstQuestion] = testQuestions;
  const questionElement = screen.getByText(firstQuestion.question);
  expect(questionElement).toBeInTheDocument();
});

test("answer toggles on click in list", () => {
  renderWithQuestions(<QuestionList />);
  const [firstItem] = screen.getAllByRole("listitem");
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

test("remove all button removes all questions", () => {
  const store = createTestStore();
  const { rerender } = renderWithQuestions(<QuestionList />, { store });
  let listItems = screen.queryAllByRole("listitem");
  expect(listItems).not.toHaveLength(0);

  const removeAllButton = screen.getByLabelText("Remove all questions");
  expect(removeAllButton).toBeInTheDocument();

  fireEvent.click(removeAllButton);

  rerender(
    <Provider store={store}>
      <QuestionList />
    </Provider>
  );
  listItems = screen.queryAllByRole("listitem");
  expect(listItems).toHaveLength(0);
});

test("question has edit button", () => {
  const store = createTestStore();
  renderWithQuestions(<QuestionList />, { store });
  const [firstItem] = screen.getAllByRole("listitem");

  const editButton = within(firstItem).getByLabelText("Edit");
  expect(editButton).toBeInTheDocument();
});

test("question has working remove button", () => {
  const store = createTestStore();
  const [firstQuestion] = testQuestions;
  const { rerender } = renderWithQuestions(<QuestionList />, { store });

  const [firstItem] = screen.getAllByRole("listitem");

  const removeButton = within(firstItem).getByLabelText("Remove");
  expect(removeButton).toBeInTheDocument();

  fireEvent.click(removeButton);
  rerender(
    <Provider store={store}>
      <QuestionList />
    </Provider>
  );

  const itemAfterRemove = screen.queryByText(firstQuestion.question);
  expect(itemAfterRemove).toBeNull();
});
