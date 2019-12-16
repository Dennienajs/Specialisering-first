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
      console.error = jest.fn().mockImplementation();
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
      // man ryger kun igennem til Content når man er logged ind.
      expect(queryByTestId("content")).toBeTruthy();
    });

    //
    //

    // Rammer <Redirect to={"/login"} />
    it("render <PrivateRoute component={Content} /> UDEN en currentUser og viser IKKE Content.", () => {
      const { queryByTestId } = render(
        <Router>
          <AuthContext.Provider value={{}}>
            <Router>
              <PrivateRoute component={Content} />
            </Router>
          </AuthContext.Provider>
        </Router>
      );
      // render ikke content
      expect(queryByTestId("content")).toBeFalsy();
    });
  });
});
