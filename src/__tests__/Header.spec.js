import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../containers/Header";
import { AuthContext, AuthProvider } from "../context";

beforeEach(cleanup);

// Headeren bruger "currentUser" til at render en Login / Signout knap alt efter currentUser true/false

describe("<Header />", () => {
  describe("Success", () => {
    it("render header MED en currentUser", () => {
      const { queryByTestId } = render(
        <Router>
          <AuthContext.Provider value="true">
            <Header />
          </AuthContext.Provider>
        </Router>
      );
      expect(queryByTestId("header")).toBeTruthy();
      expect(queryByTestId("header-button-login")).toBeFalsy();
      expect(queryByTestId("header-button-signout")).toBeTruthy();

      // Sign out click
      fireEvent.click(queryByTestId("header-button-signout"));
    });

    describe("Success", () => {
      it("render header UDEN en currentUser", () => {
        const currentUser = false;
        const { queryByTestId } = render(
          <Router>
            <AuthProvider value={true}>
              <Header />
            </AuthProvider>
          </Router>
        );
        expect(queryByTestId("header")).toBeTruthy();
        expect(queryByTestId("header-button-login")).toBeTruthy();
        expect(queryByTestId("header-button-signout")).toBeFalsy();

        // Login click
        fireEvent.click(queryByTestId("header-button-login"));
      });
    });
  });
});
