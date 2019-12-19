import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { firebase, googleProvider } from "../../firebase";
import "./Shared-login-signup.scss";
import { Link } from "react-router-dom";
import { ThemeContext, AuthContext } from "../../context";
import { MdEmail as EmailIcon } from "react-icons/md";
import { detectMobile } from "./googleLoginHelper";

// removed {history}
const Signup = () => {
  const { theme } = React.useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);

  // callback to return a memoized version of the callback, that only changes when the dependencies has.
  // prevents unnecessary renders
  const handleSignupWithEmailAndPassword = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements; // deconstructs from the event (form below)

    // Creates user and redirects to home
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
    } catch (err) {
      // Hvis man prøvet at oprette en bruger med email, hvor emailen allerede er i brug,
      // får man "Error: The email address is already in use by another account."
      alert(err);
    }
  }, []);

  const handleLoginWithGoogle = useCallback(async event => {
    event.preventDefault();
    try {
      if (detectMobile()) {
        await firebase.auth().signInWithRedirect(googleProvider);
      } else {
        await firebase.auth().signInWithPopup(googleProvider);
      }
    } catch (err) {
      alert(err);
    }
  }, []);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="wrap" data-testid="signup">
      <form
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.color
        }}
        onSubmit={handleSignupWithEmailAndPassword}
        className="form"
        data-testid="form-input-submit"
      >
        <h3 className="form-header">REGISTER</h3>

        <div className="form-group">
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required={true}
            data-testid="form-input-email"
            aria-label="email input"
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
            aria-label="password input"
          />
        </div>
        <div className="form-group">
          <button
            className="form-button"
            type="submit"
            aria-label="Opret Bruger"
          >
            <EmailIcon />
            <p>Register with email & password</p>
          </button>
        </div>
        <div className="form-group">
          <span>OR</span>
        </div>
        <div className="form-group google">
          <button
            data-testid="google-login-button"
            className="form-button google-button"
            onClick={handleLoginWithGoogle}
            aria-label="Google login"
          >
            <img
              className="form-img google-img"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google icon"
            />
            <p>login with google</p>
          </button>
        </div>
        <div className="form-footer">
          Have an account?
          <Link
            style={{
              color: theme.color
            }}
            to="/login"
          >
            {` Log in`}
          </Link>
        </div>
      </form>
    </div>
  );
};

// history object from routing context, we get it using withRouter HOC, and
// then wraps the export withRouter
export default withRouter(Signup);
