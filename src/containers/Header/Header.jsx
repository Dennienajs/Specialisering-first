import React, { useContext, useEffect } from "react";
import { FaRegMoon, FaPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { firebase } from "../../firebase";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
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
      let confirmation = window.confirm(
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
            .catch(err => {
              console.error(err);
              console.log("Error sending verification email");
            })
        : console.log("currentUser: " + currentUser);
    }
  }, [currentUser]);

  // Hvis brugeren intet displayName har, får man et ud fra ens email.
  useEffect(() => {
    const getProfileData = () => {
      if (currentUser && !currentUser.displayName) {
        let emailDisplay = currentUser.email.split("@", 1);
        currentUser
          .updateProfile({
            displayName: emailDisplay.toString()
          })
          .catch(err => console.error(err));
        console.log(currentUser.displayName);
      }
    };
  }, [currentUser]);

  // Til debug og test. Tjekker om email er verified.
  const handleOnClickDisplayName = () => {
    if (currentUser && !currentUser.emailVerified) {
      console.log("email not verified");
    }
    if (currentUser && currentUser.emailVerified) {
      console.log("email is verified");
    }
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
                <FaPlus />
              </button>
            </li>
            <li className="settings-darkmode">
              <button onClick={() => console.log("TODO: darkmode")}>
                <FaRegMoon />
              </button>
            </li>
            <li className="auth">
              {!currentUser ? (
                <button data-testid="header-button-login">
                  <Link to="/login">
                    <FaSignInAlt />
                  </Link>
                </button>
              ) : (
                <button
                  data-testid="header-button-signout"
                  onClick={() => {
                    firebase.auth().signOut();
                    localStorage.removeItem("FBIdToken");
                    console.log("Signed out");
                    console.log("FBIdToken removed");
                  }}
                >
                  <FaSignOutAlt />
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
