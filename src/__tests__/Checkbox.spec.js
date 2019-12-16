import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Checkbox from "../components/Checkbox";
import { act } from "react-dom/test-utils";
import { AuthContext } from "../context";
// To run: npm run test -- --coverage
// Jest testing with react-testing-library
// Vi har ikke haft om testing i React før, så jeg starter ud med meget simple tests.
// Der er ikke fokus på hvad der bliver testet, men læringsprocessen bag.
beforeEach(cleanup); // Cleans the DOM

jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn(() => Promise.resolve("Promise resolved ..")),
          delete: jest.fn(() => Promise.resolve("Promise resolved .."))
        }))
      }))
    }))
  }
}));

describe("<Checkbox />", () => {
  describe("Success", () => {
    it("renders <Checkbox />", () => {
      const { queryByTestId } = render(
        <Checkbox id="1" indhold="'Make great testing!'" />
      );
      expect(queryByTestId("checkbox-action")).toBeTruthy(); // data-testid="checkbox-action"
    });

    // onClick, DONE (line-through)
    it("renders <Checkbox /> type=done and accepts an onClick", () => {
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        displayName: "user"
      };
      const { queryByTestId } = render(
        <AuthContext.Provider
          value={{
            currentUser
          }}
        >
          <Checkbox
            id="1"
            indhold="'Make great testing!'"
            type="done"
            arkiveret="false"
          />
        </AuthContext.Provider>
      );
      expect(queryByTestId("checkbox-action")).toBeTruthy();
      act(() => {
        fireEvent.click(queryByTestId("checkbox-action"));
      });
      expect(queryByTestId("checkbox-tick")).toBeTruthy();
    });

    // onKeyDown DONE (line-through)
    it("renders <Checkbox /> type=done and accepts an onKeyDown", () => {
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        displayName: "user"
      };
      const { queryByTestId } = render(
        <AuthContext.Provider
          value={{
            currentUser
          }}
        >
          <Checkbox
            id="1"
            indhold="'Make great testing!'"
            type="done"
            arkiveret="false"
          />
        </AuthContext.Provider>
      );
      expect(queryByTestId("checkbox-action")).toBeTruthy();
      act(() => {
        fireEvent.keyDown(queryByTestId("checkbox-action"));
      });
      expect(queryByTestId("checkbox-tick")).toBeTruthy();
    });

    // onClick DELETE (line-through)
    it("renders <Checkbox /> type=delete and accepts an onClick", () => {
      window.confirm = jest.fn().mockImplementation(() => true);
      window.alert = jest.fn().mockImplementation();
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        displayName: "user"
      };
      const { queryByTestId } = render(
        <AuthContext.Provider
          value={{
            currentUser
          }}
        >
          <Checkbox
            id="1"
            indhold="'Make great testing!'"
            type="delete"
            arkiveret="false"
          />
        </AuthContext.Provider>
      );
      expect(queryByTestId("checkbox-action")).toBeTruthy();
      act(() => {
        fireEvent.click(queryByTestId("checkbox-action"));
      });
      expect(queryByTestId("checkbox-delete")).toBeTruthy();
      expect(queryByTestId("checkbox-tick")).toBeFalsy();
    });

    // onKeyDown DELETE (line-through)
    it("renders <Checkbox /> type=delete and accepts an onKeyDown", () => {
      window.confirm = jest.fn().mockImplementation(() => true);
      window.alert = jest.fn().mockImplementation();
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        displayName: "user"
      };
      const { queryByTestId } = render(
        <AuthContext.Provider
          value={{
            currentUser
          }}
        >
          <Checkbox
            id="1"
            indhold="'Make great testing!'"
            type="delete"
            arkiveret="false"
          />
        </AuthContext.Provider>
      );
      act(() => {
        fireEvent.keyDown(queryByTestId("checkbox-action"));
      });
      expect(queryByTestId("checkbox-action")).toBeTruthy();
    });

    // onKeyDown DELETE (line-through)
    it("renders <Checkbox /> type=somethingElse and accepts an onClick", () => {
      console.log = jest.fn().mockImplementation();
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        displayName: "user"
      };
      const { queryByTestId } = render(
        <AuthContext.Provider
          value={{
            currentUser
          }}
        >
          <Checkbox
            id="1"
            indhold="'Make great testing!'"
            type="somethingElse"
            arkiveret="false"
          />
        </AuthContext.Provider>
      );
      act(() => {
        fireEvent.click(queryByTestId("checkbox-action"));
      });
      expect(queryByTestId("checkbox-delete")).toBeFalsy();
      expect(queryByTestId("checkbox-tick")).toBeFalsy();
    });

    // onKeyDown DELETE (line-through)
    it("renders <Checkbox /> type=somethingElse and accepts an onKeyDown", () => {
      console.log = jest.fn().mockImplementation();
      window.alert = jest.fn().mockImplementation();
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        displayName: "user"
      };
      const { queryByTestId } = render(
        <AuthContext.Provider
          value={{
            currentUser
          }}
        >
          <Checkbox
            id="1"
            indhold="'Make great testing!'"
            type="somethingElse"
            arkiveret="false"
          />
        </AuthContext.Provider>
      );
      act(() => {
        fireEvent.keyDown(queryByTestId("checkbox-action"));
      });
      expect(queryByTestId("checkbox-delete")).toBeFalsy();
      expect(queryByTestId("checkbox-tick")).toBeFalsy();
    });
  });
});
