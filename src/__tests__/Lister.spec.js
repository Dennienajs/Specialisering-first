// import React from "react";
// import { render, cleanup, fireEvent } from "@testing-library/react";
// // eslint-disable-next-line no-unused-vars
// import { useValgtListeValue, useListerValue } from "../context";
// import Lister from "../components/Lister";

// beforeEach(cleanup); // Cleans the DOM

// // Context Mock
// jest.mock("../context", () => ({
//   useValgtListeValue: jest.fn(() => ({
//     setValgtListe: jest.fn(() => "")
//   })),
//   useListerValue: jest.fn(() => ({
//     lister: [
//       {
//         name: "123",
//         listeId: "1",
//         userId: "1234567890",
//         docId: "dennie"
//       }
//     ]
//   }))
// }));

// describe("<Lister />", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("Success", () => {
//     it("render listerne", () => {
//       const { queryByTestId } = render(<Lister />);
//       expect(queryByTestId("lister-action")).toBeTruthy();
//     });

//     // aktivListe onClick
//     it("render listerne og vælger en aktivListe med onclick", () => {
//       // const { queryByTestId, debug } = render(<Lister aktivValue="1" />); // debug er fucking nyttigt!
//       const { queryByTestId } = render(<Lister aktivValue="1" />);
//       expect(queryByTestId("lister-action")).toBeTruthy();

//       // Når man trykker på en liste i sidebaren, bliver denne liste den aktive
//       fireEvent.click(queryByTestId("lister-action"));
//       //   debug(); // Debug her er fucking nyttigt..
//       expect(
//         queryByTestId("lister-action-parent").classList.contains("aktivListe")
//       ).toBeTruthy();
//     });

//     // Ingen aktivListe onKeyDown
//     it("render listerne uden aktivValue", () => {
//       const { queryByTestId } = render(<Lister activeValue="1" />);
//       expect(queryByTestId("lister-action")).toBeTruthy();

//       fireEvent.keyDown(queryByTestId("lister-action"));

//       expect(
//         queryByTestId("lister-action-parent").classList.contains(
//           "sidebar__liste"
//         )
//       ).toBeTruthy();
//     });
//   });
// });
