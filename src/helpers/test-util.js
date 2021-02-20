import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore, nanoid } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import questionReducer from "../features/question-list/questionSlice";
import { addHours } from "date-fns";

export const testQuestions = [
  {
    id: nanoid(),
    creationDate: addHours(new Date(), -2).toJSON(),
    question: "How to add question?",
    answer: "Just use the form below!",
  },
  {
    id: nanoid(),
    creationDate: addHours(new Date(), -1).toJSON(),
    question: "Can I add my own question?",
    answer: "Yeah, sure you can! :)",
  },
  {
    id: nanoid(),
    creationDate: addHours(new Date(), -100).toJSON(),
    question: "Is this an older question?",
    answer: "Yep, it was asked 100 hours ago.",
  },
  {
    id: nanoid(),
    creationDate: addHours(new Date(), -5).toJSON(),
    question: "A question to be sorted first?",
    answer:
      "Your are right, this question is here to jump to the front when you hit the Sort button.",
  },
];

function renderWithQuestions(
  ui,
  {
    initialState = testQuestions,
    store = configureStore({
      reducer: questionReducer,
      preloadedState: { questions: { value: initialState } },
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export { renderWithQuestions };
