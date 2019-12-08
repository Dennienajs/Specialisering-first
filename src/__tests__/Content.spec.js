/* eslint-disable no-unused-vars */
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Content from "../containers/Pages/Content";
import {
  AuthContext,
  ThemeContext,
  ListerContext,
  ValgtListeContext
} from "../context";
import ButtonToggleSidebar from "../containers/Pages/Content/ButtonToggleSidebar";

import { PrivateRoute } from "../PrivateRoute";

beforeEach(cleanup);

describe("<Content />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("render <Content /> page MED a currentUser", () => {
      // Auth
      const currentUser = {
        email: "user@email.com",
        uid: "123"
      };
      // Lister
      const lister = [{}];
      const setLister = jest.fn();
      // ValgtListe
      const valgtListe = "someListe"; // Cannot read toLowerCase of undefined.
      const setValgtListe = jest.fn();
      // Theme
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      // IndiciduelListe

      const { queryByTestId } = render(
        <AuthContext.Provider
          value={{
            currentUser
          }}
        >
          <ListerContext.Provider
            value={{
              lister,
              setLister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                valgtListe,
                setValgtListe
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <Content />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("content")).toBeTruthy();
    });

    // !currentUser = Link til /login & /signup
    it("render <Content /> UDEN en currentUser", () => {
      // Lister
      const lister = [{}];
      const setLister = jest.fn();
      // ValgtListe
      const setValgtListe = jest.fn();
      // Theme
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      // IndiciduelListe

      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider
            value={{
              lister,
              setLister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                setValgtListe
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <Router>
                  <Content />
                </Router>
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("content")).toBeTruthy();
    });
  });
});
