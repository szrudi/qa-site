import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders header", () => {
  const { getByRole } = render(<App />);

  let header = getByRole("header");
  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent(/questions.*answers/gi);
});

test("renders info message", () => {
  const { getByRole } = render(<App />);

  let infoMessage = getByRole("info-message");
  expect(infoMessage).toBeInTheDocument();
  expect(infoMessage).toHaveTextContent(/create your own questions/gi);
});
