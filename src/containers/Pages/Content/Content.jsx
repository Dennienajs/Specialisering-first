import React, { useState, useContext } from "react";
import Sidebar from "../../Sidebar";
import Punkter from "../../../components/Punkter";
import ButtonToggleSidebar from "./ButtonToggleSidebar";
import { ThemeContext, AuthContext } from "../../../context/";
import { Link } from "react-router-dom";

const Content = () => {
  const { currentUser } = useContext(AuthContext);
  const [visSidebar, setVisSidebar] = useState(true);
  const { theme } = React.useContext(ThemeContext);
  return (
    <section
      data-testid="content"
      className="content"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.color
      }}
    >
      <ButtonToggleSidebar
        visSidebar={visSidebar}
        setVisSidebar={setVisSidebar}
      />

      {visSidebar ? <Sidebar /> : null}
      {currentUser ? (
        <Punkter visSidebar={visSidebar} />
      ) : (
        <div
          className="content__not-signed-in"
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.color
          }}
        >
          <p>Du skal logge ind for at kunne se punkter.</p>
          <p>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Opret</Link>
          </p>
        </div>
      )}
    </section>
  );
};

export default Content;
