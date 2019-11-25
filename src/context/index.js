// Importerer og eksporterer contexten her i index ->
// så vi bare kan import via "named import" from ./context.

import {
  ListerContext,
  ListerProvider,
  useListerValue
} from "./lister-context";

import {
  ValgtListeContext,
  ValgtListeProvider,
  useValgtListeValue
} from "./valgt-liste-context";

import { AuthProvider, AuthContext } from "./auth-context";

import { ThemeProvider, ThemeContext } from "./darkmode-theme-context";

export {
  ListerContext,
  ListerProvider,
  useListerValue,
  ValgtListeContext,
  ValgtListeProvider,
  useValgtListeValue,
  AuthProvider,
  AuthContext,
  ThemeProvider,
  ThemeContext
};

// NOTE: husk at wrappe application med Provideren.
// Se Index.jsx / App.jsx.
