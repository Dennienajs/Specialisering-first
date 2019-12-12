import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "../containers/Pages/Signup";

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
        <Router>
          <Signup />
        </Router>
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
  });
});
