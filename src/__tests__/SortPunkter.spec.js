import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { SortPunkterDropdown } from "../containers/Pages/Content/SortPunkterDropdown";

beforeEach(cleanup);

describe("<SortPunkter />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("render og trykker på <SortPunkter />", () => {
      const { queryByTestId } = render(<SortPunkterDropdown sortBy setSortBy={() => jest.fn()} />);

      expect(queryByTestId("sort-by")).toBeTruthy();
      act(() => {
        fireEvent.change(queryByTestId("sort-by"));
      });
    });
  });
});
