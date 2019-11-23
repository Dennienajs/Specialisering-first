import React, { useContext } from "react";
import { FaRegMoon, FaPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { firebase } from "../../firebase";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser ? "true" : "no user");
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
              <button>{currentUser ? currentUser.email : null}</button>
            </li>
            <li className="settings-add">
              <button>
                <FaPlus />
              </button>
            </li>
            <li className="settings-darkmode">
              <button>
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
                    console.log("Sign out");
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
