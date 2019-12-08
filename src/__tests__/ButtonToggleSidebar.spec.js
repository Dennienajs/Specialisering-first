import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import ButtonToggleSidebar from "../containers/Pages/Content/ButtonToggleSidebar";

beforeEach(cleanup);

describe("<ButtonToggleSidebar />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("render og trykker på <ButtonToggleSidebar />", () => {
      const { queryByTestId } = render(
        <ButtonToggleSidebar
          visSidebar={true}
          setVisSidebar={() => jest.fn()}
        />
      );

      expect(queryByTestId("toggle-sidebar")).toBeTruthy();
      // Toggler sidebaren via onClick
      fireEvent.click(queryByTestId("toggle-sidebar"));
    });
  });
});
