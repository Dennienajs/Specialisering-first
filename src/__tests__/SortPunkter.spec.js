import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { SortPunkter } from "../components/SortPunkter";

beforeEach(cleanup);

describe("<SortPunkter />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("render og trykker på <SortPunkter />", () => {
      const { queryByTestId } = render(
        <SortPunkter sortBy setSortBy={() => jest.fn()} />
      );

      // ButtonToggleSidebar er rendered
      //   expect(queryByTestId("toggle-sidebar")).toBeTruthy();
      expect(queryByTestId("sort-by")).toBeTruthy();
      // Toggler sidebaren via onClick
      act(() => {
        // fireEvent.click(queryByTestId("toggle-sidebar"));
        fireEvent.change(queryByTestId("sort-by"));
      });
    });
  });
});
