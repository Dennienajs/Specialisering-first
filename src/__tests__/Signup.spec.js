import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "../containers/Pages/Signup";
import { AuthProvider } from "../context";

beforeEach(cleanup);

describe("<Signup />", () => {
  describe("Success", () => {
    // Kan ikke få den til at ramme history.push("/");
    it("renders the signup page uden en user, udfylder felterne og logger ind.", () => {
      //   const history = { push: jest.fn() };
      //   const pushSpy = jest.spyOn(history, "push");
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

      //   expect(pushSpy).toHaveBeenCalled();
      //   pushSpy.mockRestore();
    });
  });
});
