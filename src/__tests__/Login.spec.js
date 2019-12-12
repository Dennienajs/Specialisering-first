import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../containers/Pages/Login";
import { AuthContext } from "../context";
import { act } from "react-dom/test-utils";

beforeEach(cleanup);

jest.mock("../firebase", () => ({
  firebase: {
    auth: jest.fn(() => ({
      signInWithEmailAndPassword: jest.fn(() =>
        Promise.reject("Promise rejected ..")
      ),
      signInWithPopup: jest.fn(() => Promise.reject("Promise rejected .."))
    }))
  }
}));

describe("<Login />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("render <Login /> page UDEN en currentUser, udfylder felterne og logger ind.", () => {
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <Router>
            <Login />
          </Router>
        </AuthContext.Provider>
      );

      expect(queryByTestId("login")).toBeTruthy();

      // Ændrer email input felt
      act(() => {
        fireEvent.change(queryByTestId("form-input-email"), {
          target: {
            value: "login@email.com"
          }
        });
      });
      expect(queryByTestId("form-input-email").value).toBe("login@email.com");

      // Ændrer password input felt
      act(() => {
        fireEvent.change(queryByTestId("form-input-password"), {
          target: {
            value: "123456"
          }
        });
      });
      expect(queryByTestId("form-input-password").value).toBe("123456");

      // Submitter formen
      act(() => {
        fireEvent.submit(queryByTestId("form-input-submit"));
      });
    });

    // Med en user ***Kan ikke få den til at ramme currentUser = true (Redirect to="/")
    it("render <Login /> page MED en currentUser", () => {
      const currentUser = {
        name: "123",
        email: "123@mail.com"
      };
      const { queryByTestId } = render(
        <Router>
          <AuthContext.Provider value={{ currentUser }}>
            <Login />
          </AuthContext.Provider>
        </Router>
      );
      // Redirects to "/" if(currentUser)
      expect(queryByTestId("login")).toBeNull();
    });

    it("render <Login /> og trykker 'login med google', Promise rejected", () => {
      const currentUser = null;
      const { queryByTestId } = render(
        <AuthContext.Provider value={{ currentUser }}>
          <Router>
            <Login />
          </Router>
        </AuthContext.Provider>
      );

      expect(queryByTestId("google-login-button")).toBeTruthy();
      act(() => {
        fireEvent.click(queryByTestId("google-login-button"));
      });
    });
  });
});
