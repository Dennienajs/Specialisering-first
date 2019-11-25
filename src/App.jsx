import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./containers/Header/index";
import Login from "./containers/Pages/Login";
import Signup from "./containers/Pages/Signup";
import PrivateRoute from "./PrivateRoute";
import Content from "./containers/Pages/Content";
import {
  ListerProvider,
  ValgtListeProvider,
  AuthProvider,
  ThemeContext
} from "./context";

export const App = () => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <ValgtListeProvider>
      <ListerProvider>
        <AuthProvider>
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
              <PrivateRoute exact path="/" component={Content} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
            </Router>
          </main>
        </AuthProvider>
      </ListerProvider>
    </ValgtListeProvider>
  );
};

// ************
/*
AuthProvider giver access til "currentUser" gennem Context API
 - 

now --prod  // updates: https://specialisering-1st.dennienajs.now.sh/
npm run test -- --coverage  // Tests
*/
