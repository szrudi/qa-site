import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";

test("renders header", () => {
  const { getByRole } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  let header = getByRole("header");
  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent(/(questions.*answers)/gi);
});
