import React from "react";
import { FaRegMoon, FaPlus } from "react-icons/fa";

const Header = () => {
  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/images/Logo.png" alt="flueben" />
        </div>
        <div className="settings">
          <ul>
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
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
