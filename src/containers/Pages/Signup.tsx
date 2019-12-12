import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { firebase } from "../../firebase";
import "./Shared-login-signup.scss";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context";

// removed {history}
const Signup = () => {
  const { theme } = React.useContext(ThemeContext);
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
        // history.push("/");
      } catch (err) {
        // Hvis man prøvet at oprette en bruger med email, hvor emailen allerede er i brug,
        // får man "Error: The email address is already in use by another account."
        alert(err);
      }
    },
    [] // removed history
  );

  return (
    <div className="wrap" data-testid="signup">
      <form
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.color
        }}
        onSubmit={handleSignup}
        className="form"
        data-testid="form-input-submit"
      >
        <h3 className="form-header">SIGNUP PAGE</h3>

        <div className="form-group">
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required={true}
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
            required={true}
            data-testid="form-input-password"
          />
        </div>
        <div className="form-group">
          <button
            className="form-button"
            type="submit"
            aria-label="Opret Bruger"
          >
            OPRET BRUGER
          </button>
        </div>
        <div className="form-footer">
          Allerede bruger?
          <Link
            style={{
              color: theme.color
            }}
            to="/login"
          >
            {` Log in`}{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

// history object from routing context, we get it using withRouter HOC, and
// then wraps the export withRouter
export default withRouter(Signup);
