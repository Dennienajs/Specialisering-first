/* eslint-disable no-unused-vars */
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Sidebar from "../containers/Sidebar";

import {
  ListerContext,
  ValgtListeContext,
  AuthContext,
  ThemeContext
} from "../context";

beforeEach(cleanup);

// Nedenstående indeholder en masse tests som NÆSTEN er ens, men som SKAL testes for at få 100% coverage.
// De er basically bare copy-pasted og ændret ~7 fields

describe("<Sidebar />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("render <Sidebar />", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider value={{ lister }}>
            <ValgtListeContext.Provider value="">
              <ThemeContext.Provider value={{ theme, dark, toggle }}>
                <Sidebar />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("sidebar")).toBeTruthy();
    });

    // ***** COPY-PASTE START *****

    // ALLE
    it("skifter den aktive liste til ALLE ('alle')", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const setValgtListe = jest.fn(); // fireEvent.click "alle-action"
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider
            value={{
              lister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                setValgtListe
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <Sidebar />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("sidebar")).toBeTruthy();
      expect(queryByTestId("alle")).toBeTruthy();
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
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const setValgtListe = jest.fn(); // fireEvent.click "alle-action"
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider
            value={{
              lister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                setValgtListe
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <Sidebar />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
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
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const setValgtListe = jest.fn(); // fireEvent.click "alle-action"
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider
            value={{
              lister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                setValgtListe
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <Sidebar />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
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
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const setValgtListe = jest.fn(); // fireEvent.click "alle-action"
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider
            value={{
              lister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                setValgtListe
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <Sidebar />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
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
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const setValgtListe = jest.fn(); // fireEvent.click "alle-action"
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider
            value={{
              lister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                setValgtListe
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <Sidebar />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
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
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const setValgtListe = jest.fn(); // fireEvent.click "alle-action"
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider
            value={{
              lister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                setValgtListe
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <Sidebar />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
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

    it("Open and close sidebar 'sidebar-toggle-egne-lister' with onClick", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const setValgtListe = jest.fn(); // fireEvent.click "alle-action"
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider
            value={{
              lister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                setValgtListe
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <Sidebar />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("sidebar")).toBeTruthy();

      // Åben Lister
      fireEvent.click(queryByTestId("sidebar-toggle-egne-lister"));
      // close igen
      fireEvent.click(queryByTestId("sidebar-toggle-egne-lister"));
    });

    //
    //
    //

    it("Open and close sidebar 'sidebar-toggle-egne-lister' with onKeyPress", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const setValgtListe = jest.fn(); // fireEvent.click "alle-action"
      const visLister = true;
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider
            value={{
              lister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                setValgtListe,
                visLister
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <Sidebar />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("sidebar")).toBeTruthy();

      // Åben Lister
      fireEvent.keyDown(queryByTestId("sidebar-toggle-egne-lister"));
      // close igen
      fireEvent.keyDown(queryByTestId("sidebar-toggle-egne-lister"));
    });

    //
    //
    //
    //

    it("Select egne-lister with onClick && onKeyDown", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const setValgtListe = jest.fn(); // fireEvent.click "alle-action"
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider
            value={{
              lister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                setValgtListe
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <Sidebar />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("sidebar")).toBeTruthy();

      // Select egen liste som aktiv.
      expect(queryByTestId("sidebar-egne-lister")).toBeTruthy();
      fireEvent.click(queryByTestId("sidebar-egne-lister"));
      fireEvent.keyDown(queryByTestId("sidebar-egne-lister"));
    });
    //
    //
    //
    //

    it("Render <Sidebar /> MED en currentUser - viser <AddListe />", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const setValgtListe = jest.fn(); // fireEvent.click "alle-action"
      const currentUser = {
        email: "user@email.com"
        // updateProfile: jest.fn(),
        // emailVerified: true,
      };
      const { queryByTestId } = render(
        <AuthContext.Provider value={{ currentUser }}>
          <ListerContext.Provider
            value={{
              lister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                setValgtListe
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <Sidebar />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("sidebar")).toBeTruthy();
      expect(queryByTestId("add-liste")).toBeTruthy();
    });
  });
});
