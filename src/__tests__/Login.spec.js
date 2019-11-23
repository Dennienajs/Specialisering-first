import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../containers/Pages/Login";
import { AuthProvider } from "../context";

beforeEach(cleanup);

describe("<Login />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Kan ikke få den til at ramme history.push("/");
  describe("Success", () => {
    it("renders the login page uden en user, udfylder felterne og logger ind.", () => {
      const currentUser = false;
      const { queryByTestId } = render(
        <Router>
          <AuthProvider value={currentUser}>
            <Login />
          </AuthProvider>
        </Router>
      );

      expect(queryByTestId("login")).toBeTruthy();

      // Ændrer email input felt
      fireEvent.change(queryByTestId("form-input-email"), {
        target: {
          value: "login@email.com"
        }
      });
      expect(queryByTestId("form-input-email").value).toBe("login@email.com");

      // Ændrer password input felt
      fireEvent.change(queryByTestId("form-input-password"), {
        target: {
          value: "123456"
        }
      });
      expect(queryByTestId("form-input-password").value).toBe("123456");

      // Submitter formen
      fireEvent.submit(queryByTestId("form-input-submit"));
    });

    // Med en user ***Kan ikke få den til at ramme currentUser = true (Redirect to="/")
    it("renders the login page MED en user", () => {
      const { currentUser } = {
        name: "123",
        email: "123@mail.com"
      };
      const { queryByTestId } = render(
        <Router>
          <AuthProvider value={currentUser}>
            <Login />
          </AuthProvider>
        </Router>
      );
      expect(queryByTestId("login")).toBeTruthy();
    });
  });
});
