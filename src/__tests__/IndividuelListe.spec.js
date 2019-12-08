import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import {
  ListerContext,
  ValgtListeContext,
  AuthContext,
  ThemeContext
} from "../context";
import IndividuelListe from "../components/IndividuelListe";

beforeEach(cleanup);

// sletListe() mock
jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          delete: jest.fn(() => Promise.resolve("Promise resolved .."))
        }))
      }))
    }))
  }
}));

// *****************************************
// **** MANGLER CATCH-BLOCK I sletListe ****
// *****************************************

describe("<IndividuelListe />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("render <IndividuelListe />", () => {
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
      const liste = { navn: "", docId: "", listeId: "" };
      const aktivListe = "";
      const setAktivListe = jest.fn();

      const { queryByTestId } = render(
        <ListerContext.Provider value={{ lister, setLister }}>
          <ValgtListeContext.Provider value={{ setValgtListe }}>
            <ThemeContext.Provider value={{ theme, dark, toggle }}>
              <IndividuelListe
                liste={liste}
                aktivListe={aktivListe}
                setAktivListe={setAktivListe}
              />
            </ThemeContext.Provider>
          </ValgtListeContext.Provider>
        </ListerContext.Provider>
      );
      expect(queryByTestId("individuel-liste")).toBeTruthy();
    });

    // CONFIRM SLET SLET = TRUE
    it("render <IndividuelListe /> confirmer sletListe og sletter liste.", () => {
      // Auth
      const currentUser = {
        email: "user@email.com"
      };
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
      const liste = {
        navn: "someListe",
        docId: "001",
        listeId: "25" // Skal være === aktivListe
      };
      const aktivListe = "25"; // Skal være === listeId
      const setAktivListe = jest.fn();
      // confirmSletListe
      window.confirm = jest.fn().mockImplementation(() => true);

      const { queryByTestId } = render(
        <AuthContext.Provider value={{ currentUser }}>
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
                <IndividuelListe
                  liste={liste}
                  aktivListe={aktivListe}
                  setAktivListe={setAktivListe}
                />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("individuel-liste-delete")).toBeTruthy();
      fireEvent.click(queryByTestId("individuel-liste-delete"));
    });

    // CONFIRM SLETLISTE = FALSE
    it("render <IndividuelListe /> fortryder sletListe.", () => {
      // Auth
      const currentUser = {
        email: "user@email.com"
      };
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
      const liste = {
        navn: "someListe",
        docId: "001",
        listeId: "25" // Skal være === aktivListe
      };
      const aktivListe = "25"; // Skal være === listeId
      const setAktivListe = jest.fn();
      // confirmSletListe
      window.confirm = jest.fn().mockImplementation(() => false); // CONFIRM = FALSE

      const { queryByTestId } = render(
        <AuthContext.Provider value={{ currentUser }}>
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
                <IndividuelListe
                  liste={liste}
                  aktivListe={aktivListe}
                  setAktivListe={setAktivListe}
                />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("individuel-liste-delete")).toBeTruthy();
      fireEvent.click(queryByTestId("individuel-liste-delete"));
    });
  });
});
