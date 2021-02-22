import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { testQuestions } from "./globals";
import { defaultStoreOptions } from "../app/store";

export const createTestStore = (initialQuestions = testQuestions) =>
  configureStore({
    ...defaultStoreOptions,
    preloadedState: {
      questions: {
        list: initialQuestions,
      },
    },
  });

function renderWithQuestions(
  ui,
  { store = createTestStore(), ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export { renderWithQuestions };
