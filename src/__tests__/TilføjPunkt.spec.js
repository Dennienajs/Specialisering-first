/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import { useValgtListeValue } from "../context";
import TilføjPunkt from "../components/TilføjPunkt";

beforeEach(cleanup); // Cleans the DOM

// Content Mock
jest.mock("../context", () => ({
  useValgtListeValue: jest.fn(() => ({ valgtListe: "1" })) // Vigtigt at valgtListe: = "string" - number giver fejl.
}));

// Mocks firebase med fake functions og alle functionerne som bruges i firebase.js filen.
// Vi skal bruge firebase i testen, men vil ikke at den kalder til den rigtige db.
jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        // add returns a promise
        add: jest.fn(() => Promise.resolve("Never mock firebase"))
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
    it("renders the <TilføjPunkt />", () => {
      const { queryByTestId } = render(<TilføjPunkt />);
      expect(queryByTestId("tilføj-punkt")).toBeTruthy(); // data-testid="tilføj-punkt"
    });

    //
    it("renders <TilføjPunkt /> og tilføjer et punkt til 'Todo'.", () => {
      // Mocks valgtListe (listen i sidebaren, fx Todo)
      useValgtListeValue.mockImplementation(() => ({
        valgtListe: "Todo"
      }));
      const { queryByTestId } = render(<TilføjPunkt />);

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

      // simulerer "Enter"-press submit i input feltet (virker)
      fireEvent.keyPress(queryByTestId("tilføj-punkt-input"), {
        key: "Enter",
        code: 13,
        charCode: 13
      });
      // HVORDAN EXPECTER JEG HER ???
      // expect input = "" (fordi den resettes ved submit)
    });
  });
});
