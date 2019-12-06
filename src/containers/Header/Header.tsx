import React, { useContext, useEffect } from "react";
import {
  FaMoon as Moon,
  FaPlus as Plus,
  FaSignInAlt as SignIn,
  FaSignOutAlt as SignOut,
  FaSun as Sun
} from "react-icons/fa";
import { firebase } from "../../firebase";
import { Link } from "react-router-dom";
import { AuthContext, ThemeContext, useValgtListeValue } from "../../context";
import { capitalizeString } from "../../helpers";

export const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const { toggle, dark } = useContext(ThemeContext);
  const { setValgtListe }: any = useValgtListeValue(); // Ændre valgtListe til "" ved signout.

  console.log(
    currentUser
      ? currentUser.displayName
        ? currentUser.displayName
        : currentUser.email
      : "no user"
  );

  // HANDLES EMAIL VERIFICATION
  useEffect(() => {
    if (currentUser && !currentUser.emailVerified) {
      // Alert popop confirmation.
      const confirmation = window.confirm(
        "You email is not verified. Send verification email to " +
          currentUser.email
      );
      // Hvis man accepterer popop, sendes verification email.
      confirmation
        ? currentUser
            .sendEmailVerification()
            .then(() => {
              alert("Verification email sent to: " + currentUser.email);
              console.log("Verification email sent to: " + currentUser.email);
            })
            .catch((err: Error) => {
              console.error(err);
              console.log("Error sending verification email");
            })
        : console.log("currentUser: " + currentUser);
    }
  }, [currentUser]);

  // Hvis brugeren intet displayName har, får man et ud fra ens email.
  useEffect(() => {
    if (currentUser && !currentUser.displayName) {
      const emailDisplay = currentUser.email.split("@", 1);
      currentUser
        .updateProfile({
          displayName: capitalizeString(emailDisplay.toString())
        })
        .catch((err: Error) => console.error(err));
      console.log(currentUser.displayName);
    }
  }, [currentUser]);

  // Til debug og test. Tjekker om email er verified.
  const handleOnClickDisplayName = () => {
    if (currentUser && !currentUser.emailVerified) {
      console.log("email not verified");
    }
    if (currentUser && currentUser.emailVerified) {
      console.log("email is verified");
    }
    console.log(currentUser);
  };

  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <Link to="/">
            {" "}
            <img src="/images/Logo.png" alt="flueben" />
          </Link>
        </div>
        <div className="settings">
          <ul>
            <li className="settings-add">
              <button onClick={() => handleOnClickDisplayName()}>
                {currentUser
                  ? currentUser.displayName
                    ? currentUser.displayName
                    : currentUser.email
                  : "Not signed in"}
              </button>
            </li>
            <li className="settings-add">
              <button onClick={() => console.log("TODO: something..")}>
                <Plus />
              </button>
            </li>
            <li className="settings-darkmode">
              <button onClick={toggle}>{dark ? <Sun /> : <Moon />}</button>
            </li>
            <li className="auth">
              {!currentUser ? (
                <button data-testid="header-button-login">
                  <Link to="/login">
                    <SignIn />
                  </Link>
                </button>
              ) : (
                <button
                  data-testid="header-button-signout"
                  onClick={() => {
                    firebase.auth().signOut();
                    localStorage.removeItem("FBIdToken");
                    setValgtListe("");
                    console.log("Signed out");
                    console.log("FBIdToken removed");
                  }}
                >
                  <SignOut />
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
