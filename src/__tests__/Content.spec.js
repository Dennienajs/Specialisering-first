import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Content from "../containers/Pages/Content";
import { AuthProvider, AuthContext, ValgtListeContext } from "../context";
import { useValgtListeValue, useListerValue } from "../context";

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
  }))
}));

describe("<Content />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("renders the Content page with user", () => {
      const { queryByTestId } = render(
        <Router>
          <AuthProvider value="true">
            <Content />
          </AuthProvider>
        </Router>
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
