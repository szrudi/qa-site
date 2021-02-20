import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import questionReducer from "../features/question-list/questionSlice";
import { testQuestions } from "./globals";

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
