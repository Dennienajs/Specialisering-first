/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import TilføjPunkt from "../components/TilføjPunkt";

import {
  ListerContext,
  ListerProvider,
  useListerValue,
  ValgtListeContext,
  ValgtListeProvider,
  useValgtListeValue,
  AuthProvider,
  AuthContext,
  ThemeProvider,
  ThemeContext
} from "../context";

// Context mock - useValgtListeValue, useListerValue
// Samme mock fra Punkter.spec.js
jest.mock("../context", () => ({
  useValgtListeValue: jest.fn(),
  useListerValue: jest.fn(() => ({
    lister: [
      {
        navn: "001",
        listeId: "1",
        brugerId: "1234567890"
      },
      {
        navn: "002",
        listeId: "2",
        brugerId: "1234567890"
      }
    ],
    setLister: jest.fn(),
    AuthContext: jest.fn(() => ""),
    ThemeContext: jest.fn(() => ""),
    ListerContext: jest.fn(() => ""),
    ValgtListeContext: jest.fn(() => "")
  }))
}));

// Samme mock som fra Punkter.spec.js
jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve("Promise resolved .."))
      }))
    }))
  }
}));

beforeEach(cleanup);

describe("<TilføjPunkt />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    // Render Component
    it("renders <TilføjPunkt />", () => {
      const currentUserMock = true;
      const valgtListeMock = "";

      const { queryByTestId } = render(
        const { queryByTestId } = render(
          <ValgtListeContext.Provider value="">
            <ListerContext.Provider value={[]}>
              <AuthContext.Provider value={{ currentUserMock }}>
                <ThemeContext.Provider
                  value={{ theme: "", dark: "", toggle: "" }}
                >
                  <TilføjPunkt/>
                </ThemeContext.Provider>
              </AuthContext.Provider>
            </ListerContext.Provider>
          </ValgtListeContext.Provider>



        
      );
      expect(queryByTestId("tilføj-punkt")).toBeTruthy(); // data-testid="tilføj-punkt"
    });

    //
    //
    //
    //
    it.skip("renders <TilføjPunkt /> og tilføjer et punkt til 'Todo'.", () => {
      // Mocks valgtListe (listen i sidebaren, fx Todo)
      // useValgtListeValue.mockImplementation(() => ({
      //   valgtListe: "Todo"
      // }));
      const theme = {};
      const dark = true;
      const toggle = jest.fn(() => ({}));
      const { queryByTestId } = render(
        <AuthContext.Provider value={true}>
          <ValgtListeContext.Provider value="1">
            <ThemeContext.Provider value={{ theme, dark, toggle }}>
              <TilføjPunkt />
            </ThemeContext.Provider>
          </ValgtListeContext.Provider>
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
      fireEvent.click(queryByTestId("tilføj-punkt-button"));
      // HVORDAN EXPECTER JEG HER ???
      // expect input = "" (fordi den resettes ved submit) ELLER expect toHaveBeenClicked-something

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
