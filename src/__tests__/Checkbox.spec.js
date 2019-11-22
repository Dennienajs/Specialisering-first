import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Checkbox from "../components/Checkbox";

// To run: npm run test -- --coverage

// Jest testing with react-testing-library
// Vi har ikke haft om testing i React før, så jeg starter ud med meget simple tests.
// Der er ikke fokus på hvad der bliver testet, men læringsprocessen bag.

beforeEach(cleanup); // Cleans the DOM

// Mocks firebase med fake functions og alle functionerne som bruges i firebase.js filen.
// Vi skal bruge firebase i testen, men vil ikke at den kalder til den rigtige db.
jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn()
        }))
      }))
    }))
  }
}));

describe("<Checkbox />", () => {
  describe("Success", () => {
    it("renders the task checkbox", () => {
      const { queryByTestId } = render(
        <Checkbox id="1" indhold="'Make great testing!'" />
      );
      expect(queryByTestId("checkbox-action")).toBeTruthy(); // data-testid="checkbox-action"
    });

    // onClick
    it("renders the punkter checkbox and accepts an onClick", () => {
      const { queryByTestId } = render(
        <Checkbox id="1" indhold="'Make great testing!'" />
      );
      expect(queryByTestId("checkbox-action")).toBeTruthy();
      fireEvent.click(queryByTestId("checkbox-action"));
    });

    // onKeyDown
    it("renders the punkter checkbox and accepts an onKeyDown", () => {
      const { queryByTestId } = render(
        <Checkbox id="1" indhold="'Make great testing!'" />
      );
      fireEvent.keyDown(queryByTestId("checkbox-action"));
      expect(queryByTestId("checkbox-action")).toBeTruthy();
    });
  });
});
