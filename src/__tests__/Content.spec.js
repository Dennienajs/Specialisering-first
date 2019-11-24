import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Content from "../containers/Pages/Content";
import { AuthProvider, AuthContext, ValgtListeContext } from "../context";
import { useValgtListeValue, useListerValue } from "../context";

beforeEach(cleanup);

jest.mock("../context", () => ({
  useValgtListeValue: jest.fn(() => ({
    setValgtListe: jest.fn(() => "")
  })),
  useListerValue: jest.fn(() => ({
    lister: [
      {
        name: "123",
        listeId: "1",
        userId: "1234567890",
        docId: "dennie"
      }
    ]
  }))
}));

describe("<Content />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("renders the Content page", () => {
      const currentUser = true;
      const { queryByTestId } = render(
        <Router>
          <AuthProvider value={currentUser}>
            <Content />
          </AuthProvider>
        </Router>
      );
      expect(queryByTestId("content")).toBeTruthy();
    });
  });

  // Kan ikke få den til at ramme history.push("/");
  //   describe("Success", () => {
  //     it("renders the Content page", () => {
  //       const currentUser = true;
  //       const setValgtListe = "";
  //       const { queryByTestId } = render(
  //         <ValgtListeContext.Provider value={{"123"}}>
  //           <ListerProvider value="1">
  //             <AuthContext.Provider value={currentUser}>
  //               <Router>
  //                 <Content />
  //               </Router>
  //             </AuthContext.Provider>
  //           </ListerProvider>
  //         </ValgtListeContext.Provider>
  //       );

  //       expect(queryByTestId("content")).toBeTruthy();
  //     });
  //   });
});
