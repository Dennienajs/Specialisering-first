/* eslint-disable no-unused-vars */
import React from "react";
import { render, cleanup } from "@testing-library/react";
import Punkter from "../components/Punkter";
import {
  ListerContext,
  ValgtListeContext,
  AuthContext,
  ThemeContext
} from "../context";

// Hooks mocks - usePunkter
jest.mock("../hooks", () => ({
  usePunkter: () => ({
    punkter: [
      {
        // kan sagtens udkommenteres
        id: "mx2taaXpF38vYqMGbVtY",
        arkiveret: true,
        dato: "21/07/2019",
        listeId: "1",
        punkt: "Learn some Jest testing or die tryin'",
        userId: "1234567890"
      }
    ],
    // loadingPunkter: Math.random() > 0.5 ? true : false
    loadingPunkter: false
  })
}));

beforeEach(cleanup);

describe("<Punkter />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
});

// punkter + currentUser.displayName=true
it("render <Punkter /> MED currentUser MED displayName", () => {
  const theme = {};
  const dark = true;
  const toggle = jest.fn();
  const lister = [{}];
  const valgtListe = "IDAG";
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
            <Punkter />
          </ThemeContext.Provider>
        </ValgtListeContext.Provider>
      </ListerContext.Provider>
    </AuthContext.Provider>
  );
  expect(queryByTestId("tilføj-punkt")).toBeTruthy();
  expect(queryByTestId("punkter")).toBeTruthy();
  expect(queryByTestId("liste-navn").textContent).toBe("IDAG"); // const valgtListe = "IDAG";
});

// punkter + currentUser.displayName=false
it("render <Punkter /> MED currentUser UDEN displayName", () => {
  const theme = {};
  const dark = true;
  const toggle = jest.fn();
  const lister = [{}];
  const valgtListe = "IDAG";
  const currentUser = {
    email: "user@email.com",
    updateProfile: jest.fn()
  };

  const { queryByTestId } = render(
    <AuthContext.Provider value={{ currentUser }}>
      <ListerContext.Provider value={{ lister }}>
        <ValgtListeContext.Provider value={{ valgtListe }}>
          <ThemeContext.Provider value={{ theme, dark, toggle }}>
            <Punkter />
          </ThemeContext.Provider>
        </ValgtListeContext.Provider>
      </ListerContext.Provider>
    </AuthContext.Provider>
  );
  expect(queryByTestId("tilføj-punkt")).toBeTruthy();
  expect(queryByTestId("punkter")).toBeTruthy();
  expect(queryByTestId("liste-navn").textContent).toBe("IDAG"); // const valgtListe = "IDAG";
});

// punkter + currentUser.displayName=true
it("render <Punkter /> UDEN currentUser", () => {
  const theme = {};
  const dark = true;
  const toggle = jest.fn();
  const lister = [{}];
  const valgtListe = "IDAG";

  const { queryByTestId } = render(
    <AuthContext.Provider value={{}}>
      <ListerContext.Provider value={{ lister }}>
        <ValgtListeContext.Provider value={{ valgtListe }}>
          <ThemeContext.Provider value={{ theme, dark, toggle }}>
            <Punkter />
          </ThemeContext.Provider>
        </ValgtListeContext.Provider>
      </ListerContext.Provider>
    </AuthContext.Provider>
  );
  expect(queryByTestId("tilføj-punkt")).toBeTruthy();
  expect(queryByTestId("punkter")).toBeTruthy();
  expect(queryByTestId("liste-navn").textContent).toBe("IDAG"); // const valgtListe = "IDAG";
});

// Alle ("") punkter
it("render <Punkter /> listeNavn '' (alle punkter) ", () => {
  const theme = {};
  const dark = true;
  const toggle = jest.fn();
  const lister = [{}];
  const valgtListe = ""; // = ALLE

  const { queryByTestId } = render(
    <AuthContext.Provider value={{}}>
      <ListerContext.Provider value={{ lister }}>
        <ValgtListeContext.Provider value={{ valgtListe }}>
          <ThemeContext.Provider value={{ theme, dark, toggle }}>
            <Punkter />
          </ThemeContext.Provider>
        </ValgtListeContext.Provider>
      </ListerContext.Provider>
    </AuthContext.Provider>
  );
  expect(queryByTestId("tilføj-punkt")).toBeTruthy();
  expect(queryByTestId("punkter")).toBeTruthy();
  expect(queryByTestId("liste-navn").textContent).toBe("ALLE"); // const valgtListe = "ALLE";
});
