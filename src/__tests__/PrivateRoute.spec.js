import React from "react";
import PrivateRoute from "../PrivateRoute";
import { render, cleanup, fireEvent } from "@testing-library/react";

import { BrowserRouter as Router, Route } from "react-router-dom";

it("render  PrivateRoute", () => {
  const { queryByTestId } = render(
    <Router>
      <PrivateRoute />
    </Router>
  );
  expect(queryByTestId("private-route")).toBeTruthy();
});

// Fik aldrig denne til at virke.
// Hvad skal jeg expect?
