import React, { useContext } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
          <main
            data-testid="application"
            className="App"
            style={{
              backgroundColor: theme.backgroundColor,
              color: theme.color
            }}
          >
            <Router>
              <Header />
              <PrivateRoute exact={true} path="/" component={Content} />
              <Route exact={true} path="/login" component={Login} />
              <Route exact={true} path="/signup" component={Signup} />
            </Router>
          </main>
        </ValgtListeProvider>
      </ListerProvider>
    </AuthProvider>
  );
};

// ************
/*
AuthProvider giver access til "currentUser" gennem Context API
 - bliver ændret ved login/signout.

now --prod  // updates: https://specialisering-1st.dennienajs.now.sh/
npm run test -- --coverage  // Tests
*/
