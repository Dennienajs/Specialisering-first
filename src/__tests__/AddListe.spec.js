/* eslint-disable no-unused-vars */
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import AddListe from "../components/AddListe";

import {
  ListerContext,
  ValgtListeContext,
  AuthContext,
  ThemeContext
} from "../context";

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
    it("renders <AddListe /> MED currentUser ", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const valgtListe = "someListe";
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        displayName: "user"
      };

      const { queryByTestId } = render(
        <AuthContext.Provider value={{ currentUser }}>
          <ListerContext.Provider value={{ lister }}>
            <ValgtListeContext.Provider value={{ valgtListe }}>
              <ThemeContext.Provider value={{ theme, dark, toggle }}>
                <AddListe />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("add-liste")).toBeTruthy();
    });
    // Uden currentUser = "Please login"
    it("renders <AddListe /> UDEN currentUser og clicker addListe ", () => {
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
                <AddListe defaultVis={true} />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("add-liste")).toBeTruthy();

      fireEvent.change(queryByTestId("add-liste-navn"), {
        target: {
          value: "React is fun, sometimes."
        }
      });
      expect(queryByTestId("add-liste-navn").value).toBe(
        "React is fun, sometimes."
      );
      fireEvent.click(queryByTestId("add-liste-submit"));
    });

    // tilføj, keyDown
    it("renders <AddListe /> og tilføjer en ny liste via onKeyDown", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const valgtListe = "someListe";
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        displayName: "user"
      };

      const { queryByTestId } = render(
        <AuthContext.Provider value={{ currentUser }}>
          <ListerContext.Provider value={{ lister }}>
            <ValgtListeContext.Provider value={{ valgtListe }}>
              <ThemeContext.Provider value={{ theme, dark, toggle }}>
                <AddListe defaultVis={true} />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );

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
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const valgtListe = "someListe";
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        displayName: "user"
      };
      const setLister = jest.fn();

      const { queryByTestId } = render(
        <AuthContext.Provider value={{ currentUser }}>
          <ListerContext.Provider value={{ lister, setLister }}>
            <ValgtListeContext.Provider value={{ valgtListe }}>
              <ThemeContext.Provider value={{ theme, dark, toggle }}>
                <AddListe defaultVis={true} />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );

      expect(queryByTestId("add-liste")).toBeTruthy();

      fireEvent.change(queryByTestId("add-liste-navn"), {
        target: {
          value: "React is fun, sometimes."
        }
      });
      expect(queryByTestId("add-liste-navn").value).toBe(
        "React is fun, sometimes."
      );
      fireEvent.click(queryByTestId("add-liste-submit"));
    });

    // keyPressed(Enter), tilføj
    it("renders <AddListe />, tilføjer ny liste onKeyPress Enter (if + else)", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const valgtListe = "someListe";
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        displayName: "user"
      };
      const setLister = jest.fn();

      const { queryByTestId } = render(
        <AuthContext.Provider value={{ currentUser }}>
          <ListerContext.Provider value={{ lister, setLister }}>
            <ValgtListeContext.Provider value={{ valgtListe }}>
              <ThemeContext.Provider value={{ theme, dark, toggle }}>
                <AddListe defaultVis={true} />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );

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
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const valgtListe = "someListe";
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        displayName: "user"
      };
      const setLister = jest.fn();

      const { queryByTestId } = render(
        <AuthContext.Provider value={{ currentUser }}>
          <ListerContext.Provider value={{ lister, setLister }}>
            <ValgtListeContext.Provider value={{ valgtListe }}>
              <ThemeContext.Provider value={{ theme, dark, toggle }}>
                <AddListe defaultVis={true} />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );

      expect(queryByTestId("add-liste")).toBeTruthy();
      expect(queryByTestId("add-liste-input")).toBeTruthy();

      fireEvent.click(queryByTestId("add-liste-fortryd"));
      expect(queryByTestId("add-liste")).toBeTruthy();
      expect(queryByTestId("add-liste-input")).toBeFalsy();
    });

    // keyDown cancel
    it("Luk 'Tilføj-AddListe' ved tryk på 'Fortryd' via onKeyDown ", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const valgtListe = "someListe";
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        displayName: "user"
      };
      const setLister = jest.fn();

      const { queryByTestId } = render(
        <AuthContext.Provider value={{ currentUser }}>
          <ListerContext.Provider value={{ lister, setLister }}>
            <ValgtListeContext.Provider value={{ valgtListe }}>
              <ThemeContext.Provider value={{ theme, dark, toggle }}>
                <AddListe defaultVis={true} />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );

      expect(queryByTestId("add-liste")).toBeTruthy();
      expect(queryByTestId("add-liste-input")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("add-liste-fortryd"));
      expect(queryByTestId("add-liste")).toBeTruthy();
      expect(queryByTestId("add-liste-input")).toBeFalsy();
    });

    // onClick - Luk -Tilføj
    it("'Luk 'Tilføj-AddListe' ved tryk på '-tilføj' via onClick ", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const valgtListe = "someListe";
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        displayName: "user"
      };
      const setLister = jest.fn();

      const { queryByTestId } = render(
        <AuthContext.Provider value={{ currentUser }}>
          <ListerContext.Provider value={{ lister, setLister }}>
            <ValgtListeContext.Provider value={{ valgtListe }}>
              <ThemeContext.Provider value={{ theme, dark, toggle }}>
                <AddListe defaultVis={true} />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );

      expect(queryByTestId("add-liste")).toBeTruthy();
      expect(queryByTestId("add-liste-input")).toBeTruthy();

      fireEvent.click(queryByTestId("add-liste-action"));
      expect(queryByTestId("add-liste")).toBeTruthy();
      expect(queryByTestId("add-liste-input")).toBeFalsy();
    });

    // onKeyDown - Luk -Tilføj
    it("'Luk 'Tilføj-AddListe' ved tryk på '-tilføj' via onKeyDown ", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const valgtListe = "someListe";
      const currentUser = {
        email: "user@email.com",
        updateProfile: jest.fn(),
        displayName: "user"
      };
      const setLister = jest.fn();

      const { queryByTestId } = render(
        <AuthContext.Provider value={{ currentUser }}>
          <ListerContext.Provider value={{ lister, setLister }}>
            <ValgtListeContext.Provider value={{ valgtListe }}>
              <ThemeContext.Provider value={{ theme, dark, toggle }}>
                <AddListe defaultVis={true} />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );

      expect(queryByTestId("add-liste")).toBeTruthy();
      expect(queryByTestId("add-liste-input")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("add-liste-action"));
      expect(queryByTestId("add-liste")).toBeTruthy();
      expect(queryByTestId("add-liste-input")).toBeFalsy();
    });
  });
});
