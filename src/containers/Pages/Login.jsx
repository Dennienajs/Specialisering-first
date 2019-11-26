import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { firebase } from "../../firebase";
import { AuthContext, ThemeContext } from "../../context";
import "./Shared-login-signup.scss";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const { theme } = useContext(ThemeContext);
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
    <div className="wrap" data-testid="login">
      <form
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.color
        }}
        onSubmit={handleLogin}
        className="form"
        data-testid="form-input-submit"
      >
        <h3 className="form-header">LOGIN PAGE</h3>

        <div className="form-group">
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            data-testid="form-input-email"
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
            data-testid="form-input-password"
          />
        </div>
        <div className="form-group">
          <button className="form-button" type="submit">
            login
          </button>
        </div>
        <div className="form-footer">
          Ingen bruger?
          <Link
            style={{
              color: theme.color
            }}
            to="/signup"
          >{` Opret dig`}</Link>
        </div>
      </form>
    </div>
  );
};

// history object from routing context, we get it using withRouter HOC, and
// then wraps the export withRouter
export default withRouter(Login);
