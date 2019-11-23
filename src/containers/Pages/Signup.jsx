import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { firebase } from "../../firebase";
import "./Shared-login-signup.scss";
import { Link } from "react-router-dom";

const Signup = ({ history }) => {
  // callback to return a memoized version of the callback, that only changes when the dependencies has.
  // prevents unnecessary renders
  const handleSignup = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements; // deconstructs from the event (form below)

      // Creates user and redirects to home
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (err) {
        alert(err);
      }
    },
    [history]
  );

  return (
    <div className="wrap">
      <form onSubmit={handleSignup} className="form">
        <h3 className="form-header">SIGNUP PAGE</h3>

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
            OPRET
          </button>
        </div>
        <div className="form-footer">
          Allerede bruger?
          <Link to="/login">{` Log in`}</Link>
        </div>
      </form>
    </div>
  );
};

// history object from routing context, we get it using withRouter HOC, and
// then wraps the export withRouter
export default withRouter(Signup);
