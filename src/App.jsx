import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ListerProvider, ValgtListeProvider } from "./context";
import Header from "./containers/Header/index";
import Login from "./containers/Pages/Login";
import Signup from "./containers/Pages/Signup";
import { AuthProvider } from "./context";
import PrivateRoute from "./PrivateRoute";
import Content from "./containers/Pages/Content";

export const App = () => {
  return (
    <ValgtListeProvider>
      <ListerProvider>
        <AuthProvider>
          <main className="App" data-testid="application">
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
