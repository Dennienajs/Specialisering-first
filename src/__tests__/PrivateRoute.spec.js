import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { PrivateRoute } from "../PrivateRoute";
import Content from "../containers/Pages/Content";
import { AuthContext, ValgtListeContext, ListerContext } from "../context";

beforeEach(cleanup);

describe("<PrivateRoute />", () => {
  describe("Success", () => {
    // Render faktisk <Content /> via <PrivateRoute />
    it("render <PrivateRoute component={Content} /> MED en currentUser", () => {
      const currentUser = {
        email: "user@email.com",
        uid: "001"
      };
      // Lister
      const lister = [{}];
      const setLister = jest.fn();
      // ValgtListe
      const valgtListe = "someListe";
      const setValgtListe = jest.fn();

      const { queryByTestId } = render(
        <ListerContext.Provider
          value={{
            lister,
            setLister
          }}
        >
          <ValgtListeContext.Provider
            value={{
              setValgtListe,
              valgtListe
            }}
          >
            <AuthContext.Provider
              value={{
                currentUser
              }}
            >
              <Router>
                <PrivateRoute component={Content} />
              </Router>
            </AuthContext.Provider>
          </ValgtListeContext.Provider>
        </ListerContext.Provider>
      );
      // data-testid="content" findes i <Content />
      expect(queryByTestId("content")).toBeTruthy();
    });

    //
    //

    // Rammer <Redirect to={"/login"} />
    it("render <PrivateRoute /> UDEN en currentUser", () => {
      const { queryByTestId } = render(
        <Router>
          <PrivateRoute />
        </Router>
      );
      expect(queryByTestId("private-route")).toBeFalsy(); // Reciever null
    });
  });
});
