/* eslint-disable no-unused-vars */
import React from "react";
import { render, cleanup } from "@testing-library/react";
import Punkter from "../components/Punkter";
import { useValgtListeValue, useListerValue } from "../context";

// Context mock - useValgtListeValue, useListerValue
jest.mock("../context", () => ({
  useValgtListeValue: jest.fn(),
  useListerValue: jest.fn(() => ({
    Lister: [
      {
        navn: "001",
        listeId: "1",
        brugerId: "jlIFXIwyAL3tzHMtzRbw",
        docId: "wakeup"
      },
      {
        navn: "002",
        listeId: "2",
        brugerId: "jlIFXIwyAL3tzHMtzRbw",
        docId: "stress"
      },
      {
        navn: "003",
        listeId: "3",
        brugerId: "jlIFXIwyAL3tzHMtzRbw",
        docId: "remember"
      },
      {
        navn: "004",
        listeId: "4",
        brugerId: "jlIFXIwyAL3tzHMtzRbw",
        docId: "this"
      },
      {
        navn: "005",
        listeId: "5",
        brugerId: "jlIFXIwyAL3tzHMtzRbw",
        docId: "NF"
      }
    ]
  }))
}));

// Hooks mocks - usePunkter
jest.mock("../hooks", () => ({
  usePunkter: () => ({
    punkter: [
      {
        id: "mx2taaXpF38vYqMGbVtY",
        arkiveret: false,
        dato: "21/07/2019",
        listeId: "1",
        punkt: "Learn some Jest testing or die tryin'",
        userId: "1234567890"
      }
    ]
  })
}));

// MOCK END *****

beforeEach(cleanup);

// TEST START *****
describe("<Punkter />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
});

// Alle punkter
it("render ALLE punkter", () => {
  useValgtListeValue.mockImplementation(() => ({
    setvalgtListe: jest.fn(() => "Alle"),
    valgtListe: "ALLE" // "" = "ALLE"
  }));

  const { queryByTestId } = render(<Punkter />);
  expect(queryByTestId("punkter")).toBeTruthy();
  expect(queryByTestId("liste-navn").textContent).toBe("ALLE");
});

// Idag punkter (for at ramme 100 coverage.)
it("render idag punkter", () => {
  useValgtListeValue.mockImplementation(() => ({
    setvalgtListe: jest.fn(() => "Idag"),
    valgtListe: "IDAG" // "" = "ALLE"
  }));

  const { queryByTestId } = render(<Punkter />);
  expect(queryByTestId("punkter")).toBeTruthy();
  expect(queryByTestId("liste-navn").textContent).toBe("IDAG");
});
