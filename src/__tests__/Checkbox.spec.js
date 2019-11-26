import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Checkbox from "../components/Checkbox";
// To run: npm run test -- --coverage
// Jest testing with react-testing-library
// Vi har ikke haft om testing i React før, så jeg starter ud med meget simple tests.
// Der er ikke fokus på hvad der bliver testet, men læringsprocessen bag.
beforeEach(cleanup); // Cleans the DOM

// UPDATED TO 100% COVERAGE 26-11-2019, 13:00.

describe("<Checkbox />", () => {
  describe("Success", () => {
    it("renders the task checkbox", () => {
      const { queryByTestId } = render(
        <Checkbox id="1" indhold="'Make great testing!'" />
      );
      expect(queryByTestId("checkbox-action")).toBeTruthy(); // data-testid="checkbox-action"
    });

    // onClick, DONE (line-through)
    it("renders checkbox type=done and accepts an onClick", () => {
      const { queryByTestId } = render(
        <Checkbox
          id="1"
          indhold="'Make great testing!'"
          type="done"
          arkiveret="false"
        />
      );
      expect(queryByTestId("checkbox-action")).toBeTruthy();
      fireEvent.click(queryByTestId("checkbox-action"));
      expect(queryByTestId("checkbox-tick")).toBeTruthy();
    });

    // onKeyDown DONE (line-through)
    it("renders checkbox type=done and accepts an onKeyDown", () => {
      const { queryByTestId } = render(
        <Checkbox
          id="1"
          indhold="'Make great testing!'"
          type="done"
          arkiveret="false"
        />
      );
      expect(queryByTestId("checkbox-action")).toBeTruthy();
      fireEvent.keyDown(queryByTestId("checkbox-action"));
      expect(queryByTestId("checkbox-tick")).toBeTruthy();
    });

    // onClick DELETE (line-through)
    it("renders checkbox type=delete and accepts an onClick", () => {
      const { queryByTestId } = render(
        <Checkbox
          id="1"
          indhold="'Make great testing!'"
          type="delete"
          arkiveret="false"
        />
      );
      expect(queryByTestId("checkbox-action")).toBeTruthy();
      fireEvent.click(queryByTestId("checkbox-action"));
      expect(queryByTestId("checkbox-delete")).toBeTruthy();
      expect(queryByTestId("checkbox-tick")).toBeFalsy();
    });

    // onKeyDown DELETE (line-through)
    it("renders checkbox type=delete and accepts an onKeyDown", () => {
      const { queryByTestId } = render(
        <Checkbox
          id="1"
          indhold="'Make great testing!'"
          type="delete"
          arkiveret="false"
        />
      );
      fireEvent.keyDown(queryByTestId("checkbox-action"));
      expect(queryByTestId("checkbox-action")).toBeTruthy();
    });

    // onKeyDown DELETE (line-through)
    it("renders checkbox type=somethingElse and accepts an onClick", () => {
      const { queryByTestId } = render(
        <Checkbox
          id="1"
          indhold="'Make great testing!'"
          type="somethingElse"
          arkiveret="false"
        />
      );
      fireEvent.click(queryByTestId("checkbox-action"));
      expect(queryByTestId("checkbox-delete")).toBeFalsy();
      expect(queryByTestId("checkbox-tick")).toBeFalsy();
    });

    // onKeyDown DELETE (line-through)
    it("renders checkbox type=somethingElse and accepts an onKeyDown", () => {
      const { queryByTestId } = render(
        <Checkbox
          id="1"
          indhold="'Make great testing!'"
          type="somethingElse"
          arkiveret="false"
        />
      );
      fireEvent.keyDown(queryByTestId("checkbox-action"));
      expect(queryByTestId("checkbox-delete")).toBeFalsy();
      expect(queryByTestId("checkbox-tick")).toBeFalsy();
    });
  });
});
