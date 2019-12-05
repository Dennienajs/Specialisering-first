/* eslint-disable no-unused-vars */
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Content } from "../containers/Pages/Content";
import {
  ListerContext,
  ListerProvider,
  useListerValue,
  ValgtListeContext,
  ValgtListeProvider,
  useValgtListeValue,
  AuthProvider,
  AuthContext,
  ThemeProvider,
  ThemeContext
} from "../context";

import PrivateRoute from "../PrivateRoute";

beforeEach(cleanup);

jest.mock("../context", () => ({
  useValgtListeValue: jest.fn(() => ({
    setValgtListe: jest.fn(() => "")
  })),
  useListerValue: jest.fn(() => ({
    lister: [
      {
        name: "123",
        listeId: "1",
        userId: "1234567890",
        docId: "dennie"
      }
    ]
  })),
  AuthContext: jest.fn(() => ""),
  ThemeContext: jest.fn(() => ""),
  ListerContext: jest.fn(() => ""),
  ValgtListeContext: jest.fn(() => "")
}));

describe("<Content />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const currentUserMock = true;
  const valgtListeMock = "";

  describe("Success", () => {
    // ERROR:
    /*Invariant Violation: Element type is invalid: expected a string
     (for built-in components) or a class/function (for composite components) but got: 
     undefined. You likely forgot to export your component from the file it's defined in, 
     or you might have mixed up default and named imports.
     */
    it("renders the Content page with user", () => {
      const { queryByTestId } = render(
        <ValgtListeContext.Provider value="">
          <ListerContext.Provider value={[]}>
            <AuthContext.Provider value={{ currentUserMock }}>
              <ThemeContext.Provider
                value={{ theme: "", dark: "", toggle: "" }}
              >
                <Router>
                  <Content />
                </Router>
              </ThemeContext.Provider>
            </AuthContext.Provider>
          </ListerContext.Provider>
        </ValgtListeContext.Provider>
      );
      expect(queryByTestId("content")).toBeTruthy();
    });

    it("renders the Content page without user", () => {
      const { queryByTestId } = render(
        <Router>
          <AuthProvider value="false">
            <Content />
          </AuthProvider>
        </Router>
      );
      expect(queryByTestId("content")).toBeTruthy();
    });
  });
});
