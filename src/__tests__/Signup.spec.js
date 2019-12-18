import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "../containers/Pages/Signup";
import { AuthContext } from "../context";
import { act } from "react-dom/test-utils";

beforeEach(cleanup);

jest.mock("../firebase", () => ({
  firebase: {
    auth: jest.fn(() => ({
      createUserWithEmailAndPassword: jest.fn(
        () => Promise.reject("Promise rejected ..") // rammer catchen
      )
    }))
  }
}));

describe("<Signup />", () => {
  describe("Success", () => {
    it("renders <Signup /> page UDEN currentUser, udfylder felterne og trykker submit", () => {
      window.alert = jest.fn().mockImplementation();

      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <Router>
            <Signup />
          </Router>
        </AuthContext.Provider>
      );
      expect(queryByTestId("signup")).toBeTruthy();

      // Ændrer email input felt
      fireEvent.change(queryByTestId("form-input-email"), {
        target: {
          value: "signup@email.com"
        }
      });
      expect(queryByTestId("form-input-email").value).toBe("signup@email.com");

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
    it("render <Signup /> page MED en currentUser", () => {
      const currentUser = {
        name: "123",
        email: "123@mail.com"
      };
      const { queryByTestId } = render(
        <Router>
          <AuthContext.Provider value={{ currentUser }}>
            <Signup />
          </AuthContext.Provider>
        </Router>
      );
      // Redirects to "/" if(currentUser)
      expect(queryByTestId("signup")).toBeNull();
    });

    it("render <Signup /> og trykker 'login med google', Promise rejected", () => {
      const currentUser = null;
      window.alert = jest.fn(); // så vi ikke får error'en i consolen
      const { queryByTestId } = render(
        <AuthContext.Provider value={{ currentUser }}>
          <Router>
            <Signup />
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
