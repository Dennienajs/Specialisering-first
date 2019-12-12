/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import TilføjPunkt from "../components/TilføjPunkt";

import {
  ListerContext,
  ValgtListeContext,
  AuthContext,
  ThemeContext
} from "../context";
import { act } from "react-dom/test-utils";

beforeEach(cleanup);

// NOTE: HVORDAN RAMMER JEG CATCH MED MOCKEN? Jeg kan sagtens ramme én af resolve/reject,
// men ikke dem begge når mocken er sat her? Kan ændre forneden, men ikke ramme begge samtidigt i to forskellige tests???
// MOCK "tilføjPunkt" - firebase query, add punkt.
jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve("Promise resolved .."))
      }))
    }))
  }
}));

describe("<TilføjPunkt />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    // Render Component
    it("renders <TilføjPunkt />", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const valgtListe = "someListe";
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider value={{ lister }}>
            <ValgtListeContext.Provider value={{ valgtListe }}>
              <ThemeContext.Provider value={{ theme, dark, toggle }}>
                <TilføjPunkt />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("tilføj-punkt")).toBeTruthy(); // data-testid="tilføj-punkt"
    });

    // Uden currentUser, clicker tilføj uden punkt (fejl)
    it("renders <TilføjPunkt /> UDEN en currentUser og clicker tilføj-punkt-button UDEN punkt", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const valgtListe = "someListe";

      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider value={{ lister }}>
            <ValgtListeContext.Provider value={{ valgtListe }}>
              <ThemeContext.Provider value={{ theme, dark, toggle }}>
                <TilføjPunkt />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("tilføj-punkt")).toBeTruthy();
      act(() => {
        fireEvent.click(queryByTestId("tilføj-punkt-button"));
      });
    });

    // Uden currentUser, tilføjer punkt (fejl)
    it("renders <TilføjPunkt /> UDEN en currentUser og clicker tilføj-punkt-button MED punkt", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const valgtListe = "someListe";
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider
            value={{
              lister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                valgtListe
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <TilføjPunkt />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("tilføj-punkt")).toBeTruthy();

      // Ændrer staten i input feltet (skriver noget...)
      act(() => {
        fireEvent.change(queryByTestId("tilføj-punkt-input"), {
          target: {
            value: "nyt punkt" // Input har ændret sig
          }
        });
      });
      expect(queryByTestId("tilføj-punkt-input").value).toBe("nyt punkt"); // data-testid="tilføj-punkt-input"
      act(() => {
        fireEvent.click(queryByTestId("tilføj-punkt-button"));
      });
    });

    // Med currentUser, tilføjer punkt via enter og resolver promise (firebase mock i toppen.)
    it("renders <TilføjPunkt /> MED en currentUser og tilføjer punkt med Enter-key", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const valgtListe = "someListe";
      const currentUser = {
        email: "user@email.com"
        // updateProfile: jest.fn(),
        // emailVerified: true,
      };
      const { queryByTestId } = render(
        <AuthContext.Provider
          value={{
            currentUser
          }}
        >
          <ListerContext.Provider
            value={{
              lister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                valgtListe
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <TilføjPunkt />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );

      // Ændrer staten i input feltet (skriver noget...)
      fireEvent.change(queryByTestId("tilføj-punkt-input"), {
        target: {
          value: "nyt punkt" // Input har ændret sig
        }
      });
      expect(queryByTestId("tilføj-punkt-input").value).toBe("nyt punkt"); // data-testid="tilføj-punkt-input"

      // Clicker på tilføj knappen (virker)
      fireEvent.click(queryByTestId("tilføj-punkt-button")); //CLICK
      fireEvent.keyDown(queryByTestId("tilføj-punkt-button")); // KEYDOWN

      // Enter keyPress submit
      fireEvent.keyPress(queryByTestId("tilføj-punkt-input"), {
        key: "Enter",
        code: 13,
        charCode: 13
      });

      // else path på keyDown (!Enter)
      fireEvent.keyPress(queryByTestId("tilføj-punkt-input"), {
        key: "0",
        code: 48, // 48 = "0"
        charCode: 48 // 48 = "0"
      });
    });
  });
});
