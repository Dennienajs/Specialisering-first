import React, { useContext } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./containers/Header";
import Login from "./containers/Pages/Login";
import Signup from "./containers/Pages/Signup";
import { PrivateRoute } from "./PrivateRoute";
import Content from "./containers/Pages/Content";
import {
  ListerProvider,
  ValgtListeProvider,
  AuthProvider,
  ThemeContext
} from "./context";

export const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <AuthProvider>
      <ListerProvider>
        <ValgtListeProvider>
          <Router>
            <main
              data-testid="application"
              className="App"
              style={{
                backgroundColor: theme.backgroundColor,
                color: theme.color
              }}
            >
              <Header />
              <Switch>
                <PrivateRoute exact={true} path="/" component={Content} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route component={Login} />
              </Switch>
            </main>
          </Router>
        </ValgtListeProvider>
      </ListerProvider>
    </AuthProvider>
  );
};
