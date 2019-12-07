import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../containers/Header";
import { AuthContext, ValgtListeContext, ThemeContext } from "../context";

beforeEach(cleanup); // Cleans - Unmounts React trees that were mounted with render.

// BEGGE TESTS VIRKER.
// BÅDE MED AUTHCONTEXT & VALGTLISTECONTEXT.

// Headeren bruger "currentUser" til at render en Login / Signout knap alt efter currentUser true/false

// ***************************************************************
// NOTE - Ja, det er meget kode, men vil gerne have 100% coverage*
// ***************************************************************

describe("<Header />", () => {
  describe("Success", () => {
    // ingen user + login click
    it("render <Header /> UDEN en currentUser, Darkmode enabled, og clicker login", () => {
      const dark = false;
      const { queryByTestId } = render(
        <Router>
          <AuthContext.Provider value={{}}>
            <ValgtListeContext.Provider value="">
              <ThemeContext.Provider value={{ dark }}>
                <Header />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </AuthContext.Provider>
        </Router>
      );
      expect(queryByTestId("header")).toBeTruthy(); // Render header.
      expect(queryByTestId("header-button-login")).toBeTruthy(); // Login true = ingen user
      fireEvent.click(queryByTestId("header-button-login"));

      // Expect button login to have been clicked.... ???
    });

    //
    //
    it("render <Header /> MED en currentUser og clicker signout", () => {
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        displayName: "user"
      };
      const setValgtListe = jest.fn();

      const { queryByTestId } = render(
        <Router>
          <AuthContext.Provider value={{ currentUser }}>
            <ValgtListeContext.Provider value={{ setValgtListe }}>
              <Header />
            </ValgtListeContext.Provider>
          </AuthContext.Provider>
        </Router>
      );
      expect(queryByTestId("header")).toBeTruthy();
      expect(queryByTestId("header-button-login")).toBeFalsy();
      expect(queryByTestId("header-button-signout")).toBeTruthy();

      // Clicks signout (setValgtListe("") bliver kaldt.)
      fireEvent.click(queryByTestId("header-button-signout"));
    });

    //
    // handleOnClickDisplayName + emailVerified: true
    it("render <Header /> MED en currentUser MED verifiedEmail:true og clicker handleOnClickDisplayName", () => {
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        emailVerified: true
      };
      const setValgtListe = jest.fn();

      const { queryByTestId } = render(
        <Router>
          <AuthContext.Provider value={{ currentUser }}>
            <ValgtListeContext.Provider value={{ setValgtListe }}>
              <Header />
            </ValgtListeContext.Provider>
          </AuthContext.Provider>
        </Router>
      );
      expect(queryByTestId("header")).toBeTruthy();
      expect(queryByTestId("header-button-login")).toBeFalsy();
      expect(queryByTestId("header-button-signout")).toBeTruthy();

      fireEvent.click(queryByTestId("handle-click-display-name"));
    });

    //
    // handleOnClickDisplayName + emailVerified: false
    it("render <Header /> MED en currentUser MED verifiedEmail:false og clicker handleOnClickDisplayName", () => {
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        emailVerified: false
      };
      const setValgtListe = jest.fn();

      const { queryByTestId } = render(
        <Router>
          <AuthContext.Provider value={{ currentUser }}>
            <ValgtListeContext.Provider value={{ setValgtListe }}>
              <Header />
            </ValgtListeContext.Provider>
          </AuthContext.Provider>
        </Router>
      );
      expect(queryByTestId("header")).toBeTruthy();
      expect(queryByTestId("header-button-login")).toBeFalsy();
      expect(queryByTestId("header-button-signout")).toBeTruthy();

      fireEvent.click(queryByTestId("handle-click-display-name"));
    });

    //
    // handleOnClickDisplayName + emailVerified: false + click Plus-icon
    it("render <Header /> UDEN en currentUser og clicker header-plus (Plus-icon)", () => {
      const setValgtListe = jest.fn();

      const { queryByTestId } = render(
        <Router>
          <AuthContext.Provider value={{}}>
            <ValgtListeContext.Provider value={{ setValgtListe }}>
              <Header />
            </ValgtListeContext.Provider>
          </AuthContext.Provider>
        </Router>
      );
      expect(queryByTestId("header")).toBeTruthy();
      fireEvent.click(queryByTestId("header-plus"));
    });

    //
    // Send email confirmation (resolve promise)
    it("render <Header /> UDEN en currentUser, sender emailConfirmation", () => {
      const setValgtListe = jest.fn();
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        emailVerified: false,
        sendEmailVerification: jest.fn(() =>
          Promise.resolve("Promise resolved ..")
        )
      };

      window.confirm = jest.fn().mockImplementation(() => true);

      const { queryByTestId } = render(
        <Router>
          <AuthContext.Provider value={{ currentUser }}>
            <ValgtListeContext.Provider value={{ setValgtListe }}>
              <Header />
            </ValgtListeContext.Provider>
          </AuthContext.Provider>
        </Router>
      );
      expect(queryByTestId("header")).toBeTruthy();
    });

    //
    // Catch email confirmation (reject promise)
    it("render <Header /> UDEN en currentUser, catcher emailConfirmation", () => {
      const setValgtListe = jest.fn();
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        emailVerified: false,
        sendEmailVerification: jest.fn(() =>
          Promise.reject("Promise rejected ..")
        )
      };

      window.confirm = jest.fn().mockImplementation(() => true);

      const { queryByTestId } = render(
        <Router>
          <AuthContext.Provider value={{ currentUser }}>
            <ValgtListeContext.Provider value={{ setValgtListe }}>
              <Header />
            </ValgtListeContext.Provider>
          </AuthContext.Provider>
        </Router>
      );
      expect(queryByTestId("header")).toBeTruthy();
    });
  });
});
