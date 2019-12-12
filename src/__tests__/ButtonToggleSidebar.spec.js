import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ButtonToggleSidebar from "../containers/Pages/Content/ButtonToggleSidebar";
import { act } from "react-dom/test-utils";

beforeEach(cleanup);

describe("<ButtonToggleSidebar />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("render og trykker på <ButtonToggleSidebar />", () => {
      const { queryByTestId } = render(
        <ButtonToggleSidebar visSidebar setVisSidebar={() => jest.fn()} />
      );

      // ButtonToggleSidebar er rendered
      expect(queryByTestId("toggle-sidebar")).toBeTruthy();
      // Toggler sidebaren via onClick
      act(() => {
        fireEvent.click(queryByTestId("toggle-sidebar"));
      });
    });
  });
});
