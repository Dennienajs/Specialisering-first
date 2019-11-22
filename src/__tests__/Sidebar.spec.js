/* eslint-disable no-unused-vars */
import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  queryByText,
  getByText
} from "@testing-library/react";
import Sidebar from "../containers/Sidebar";
import { useValgtListeValue, useListerValue } from "../context";

// Context mock - useValgtListeValue, useListerValue
// Samme mock fra Punkter.spec.js
jest.mock("../context", () => ({
  useValgtListeValue: jest.fn(() => ({
    setValgtListe: jest.fn(() => "")
  })),
  useListerValue: jest.fn(() => ({
    setListe: jest.fn(),
    lister: [
      {
        navn: "001",
        listeId: "1",
        brugerId: "1234567890"
      }
    ]
  }))
}));

beforeEach(cleanup);

// Nedenstående indeholder en masse tests som NÆSTEN er ens, men som SKAL testes for at få 100% coverage.
// De er basically bare copy-pasted og ændret ~7 fields

describe("<Sidebar />", () => {
  describe("Success", () => {
    it("renders the <Sidebar />", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();
    });

    // ***** COPY-PASTE START *****

    // ALLE
    it("skifter den aktive liste til ALLE ('alle')", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();
      fireEvent.click(queryByTestId("alle-action"));
      fireEvent.keyDown(queryByTestId("alle-action"));

      expect(
        queryByTestId("alle").classList.contains("aktivListe")
      ).toBeTruthy();
      expect(
        queryByTestId("idag").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("denneUge").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("todo").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("bugs").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("indkøb").classList.contains("aktivListe")
      ).toBeFalsy();
    });

    // I DAG
    it("skifter den aktive liste til IDAG ('idag')", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();
      fireEvent.click(queryByTestId("idag-action"));
      fireEvent.keyDown(queryByTestId("idag-action"));

      expect(
        queryByTestId("alle").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("idag").classList.contains("aktivListe")
      ).toBeTruthy();
      expect(
        queryByTestId("denneUge").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("todo").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("bugs").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("indkøb").classList.contains("aktivListe")
      ).toBeFalsy();
    });

    // DENNEUGE
    it("skifter den aktive liste til DENNEUGE ('denneUge')", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();
      fireEvent.click(queryByTestId("denneUge-action"));
      fireEvent.keyDown(queryByTestId("denneUge-action"));

      expect(
        queryByTestId("alle").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("idag").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("denneUge").classList.contains("aktivListe")
      ).toBeTruthy();
      expect(
        queryByTestId("todo").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("bugs").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("indkøb").classList.contains("aktivListe")
      ).toBeFalsy();
    });

    // TODO
    it("skifter den aktive liste til TODO ('todo')", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();
      fireEvent.click(queryByTestId("todo-action"));
      fireEvent.keyDown(queryByTestId("todo-action"));

      expect(
        queryByTestId("alle").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("idag").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("denneUge").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("todo").classList.contains("aktivListe")
      ).toBeTruthy();
      expect(
        queryByTestId("bugs").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("indkøb").classList.contains("aktivListe")
      ).toBeFalsy();
    });

    // BUGS
    it("skifter den aktive liste til BUGS ('bugs')", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();
      fireEvent.click(queryByTestId("bugs-action"));
      fireEvent.keyDown(queryByTestId("bugs-action"));

      expect(
        queryByTestId("alle").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("idag").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("denneUge").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("todo").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("bugs").classList.contains("aktivListe")
      ).toBeTruthy();
      expect(
        queryByTestId("indkøb").classList.contains("aktivListe")
      ).toBeFalsy();
    });

    // BUGS
    it("skifter den aktive liste til INDKØB ('indkøb')", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();
      fireEvent.click(queryByTestId("indkøb-action"));
      fireEvent.keyDown(queryByTestId("indkøb-action"));

      expect(
        queryByTestId("alle").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("idag").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("denneUge").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("todo").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("bugs").classList.contains("aktivListe")
      ).toBeFalsy();
      expect(
        queryByTestId("indkøb").classList.contains("aktivListe")
      ).toBeTruthy();
    });

    // ***** COPY-PASTE END *****

    it("Open and close sidebar 'egne lister' with onClick", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();

      // Åben Lister
      fireEvent.click(queryByTestId("sidebar-egne-lister"));
      expect(queryByTestId("add-liste")).toBeTruthy();

      // close igen
      fireEvent.click(queryByTestId("sidebar-egne-lister"));
      expect(queryByTestId("add-liste")).toBeFalsy();
    });

    it("Open and close sidebar 'egne lister' with onKeyPress", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();

      // Åben Lister
      fireEvent.keyDown(queryByTestId("sidebar-egne-lister"));
      expect(queryByTestId("add-liste")).toBeTruthy();

      // close igen
      fireEvent.keyDown(queryByTestId("sidebar-egne-lister"));
      expect(queryByTestId("add-liste")).toBeFalsy();
    });
  });
});
