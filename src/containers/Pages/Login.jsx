import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { firebase } from "../../firebase";
import { AuthContext } from "../../context";
import "./Shared-login-signup.scss";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  // callback to return a memoized version of the callback, that only changes when the dependencies has.
  // prevents unnecessary renders
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements; // deconstructs from the event (form below)

      // Logs in the user and redirects to home
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (err) {
        alert(err);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="wrap">
      <form onSubmit={handleLogin} className="form">
        <h3 className="form-header">LOGIN PAGE</h3>

        <div className="form-group">
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group">
          <button className="form-button" type="submit">
            login
          </button>
        </div>
        <div className="form-footer">
          Ingen bruger?
          <Link to="/signup">{` Opret dig`}</Link>
        </div>
      </form>
    </div>
  );
};

// history object from routing context, we get it using withRouter HOC, and
// then wraps the export withRouter
export default withRouter(Login);
