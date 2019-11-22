/* eslint-disable no-unused-vars */
import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  queryHelpers
} from "@testing-library/react";
import AddListe from "../components/AddListe";
import { useValgtListeValue, useListerValue } from "../context";

// Context mock - useValgtListeValue, useListerValue
// Samme mock fra Punkter.spec.js
jest.mock("../context", () => ({
  useValgtListeValue: jest.fn(),
  useListerValue: jest.fn(() => ({
    lister: [
      {
        navn: "001",
        listeId: "1",
        brugerId: "jlIFXIwyAL3tzHMtzRbw"
      },
      {
        navn: "002",
        listeId: "2",
        brugerId: "jlIFXIwyAL3tzHMtzRbw"
      },
      {
        navn: "003",
        listeId: "3",
        brugerId: "jlIFXIwyAL3tzHMtzRbw"
      },
      {
        navn: "004",
        listeId: "4",
        brugerId: "jlIFXIwyAL3tzHMtzRbw"
      },
      {
        navn: "005",
        listeId: "5",
        brugerId: "jlIFXIwyAL3tzHMtzRbw"
      }
    ],
    setLister: jest.fn()
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

describe("<AddListe />", () => {
  describe("Success", () => {
    it("renders <AddListe />", () => {
      const { queryByTestId } = render(<AddListe defaultVis />);
      expect(queryByTestId("add-liste")).toBeTruthy();
    });

    it("renders <AddListe /> og tilføjer en ny liste via onKeyDown", () => {
      const { queryByTestId } = render(<AddListe defaultVis />);
      expect(queryByTestId("add-liste")).toBeTruthy();

      fireEvent.change(queryByTestId("add-liste-navn"), {
        target: {
          value: "React is fun, sometimes."
        }
      });
      expect(queryByTestId("add-liste-navn").value).toBe(
        "React is fun, sometimes."
      );
      fireEvent.keyDown(queryByTestId("add-liste-submit"));
    });
    // Præcis samme som ovenstående, bare med click i stedet for keyDown.
    it("renders <AddListe /> og tilføjer en ny liste via onClick", () => {
      const { queryByTestId, debug } = render(<AddListe defaultVis />);
      expect(queryByTestId("add-liste")).toBeTruthy();

      fireEvent.change(queryByTestId("add-liste-navn"), {
        target: {
          value: "React is fun, sometimes."
        }
      });
      expect(queryByTestId("add-liste-navn").value).toBe(
        "React is fun, sometimes."
      );
      debug();
      fireEvent.click(queryByTestId("add-liste-submit"));
    });

    // keyPressed(Enter)
    it("renders <AddListe />, tilføjer ny liste onKeyPress Enter (if + else)", () => {
      const { queryByTestId } = render(<AddListe defaultVis />);
      expect(queryByTestId("add-liste")).toBeTruthy();

      fireEvent.change(queryByTestId("add-liste-navn"), {
        target: {
          value: "React is fun, sometimes."
        }
      });
      expect(queryByTestId("add-liste-navn").value).toBe(
        "React is fun, sometimes."
      );
      // if Enter
      fireEvent.keyPress(queryByTestId("add-liste-navn"), {
        key: "Enter",
        code: 13,
        charCode: 13
      });
      // else (!enter)
      fireEvent.keyPress(queryByTestId("add-liste-navn"), {
        key: "0",
        code: 48, // 48 = "0"
        charCode: 48 // 48 = "0"
      });
    });

    //onClick cancel
    it("Luk 'Tilføj-AddListe' ved tryk på 'Fortryd' via onClick ", () => {
      const { queryByTestId, getByText } = render(<AddListe defaultVis />);
      expect(queryByTestId("add-liste")).toBeTruthy();
      expect(queryByTestId("add-liste-input")).toBeTruthy();

      fireEvent.click(getByText("Fortryd"));
      expect(queryByTestId("add-liste")).toBeTruthy();
      expect(queryByTestId("add-liste-input")).toBeFalsy();
    });

    // keyDown cancel
    it("Luk 'Tilføj-AddListe' ved tryk på 'Fortryd' via onKeyDown ", () => {
      const { queryByTestId, getByText } = render(<AddListe defaultVis />);
      expect(queryByTestId("add-liste")).toBeTruthy();
      expect(queryByTestId("add-liste-input")).toBeTruthy();

      fireEvent.keyDown(getByText("Fortryd"));
      expect(queryByTestId("add-liste")).toBeTruthy();
      expect(queryByTestId("add-liste-input")).toBeFalsy();
    });

    // onClick - Luk -Tilføj
    it("'Luk 'Tilføj-AddListe' ved tryk på '-tilføj' via onClick ", () => {
      const { queryByTestId, getByText } = render(<AddListe defaultVis />);
      expect(queryByTestId("add-liste")).toBeTruthy();
      expect(queryByTestId("add-liste-input")).toBeTruthy();

      fireEvent.click(queryByTestId("add-liste-action"));
      expect(queryByTestId("add-liste")).toBeTruthy();
      expect(queryByTestId("add-liste-input")).toBeFalsy();
    });

    // onKeyDown - Luk -Tilføj
    it("'Luk 'Tilføj-AddListe' ved tryk på '-tilføj' via onKeyDown ", () => {
      const { queryByTestId, getByText } = render(<AddListe defaultVis />);
      expect(queryByTestId("add-liste")).toBeTruthy();
      expect(queryByTestId("add-liste-input")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("add-liste-action"));
      expect(queryByTestId("add-liste")).toBeTruthy();
      expect(queryByTestId("add-liste-input")).toBeFalsy();
    });
  });
});
