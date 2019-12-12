import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../../Sidebar";
import Punkter from "../../../components/Punkter";
import ButtonToggleSidebar from "./ButtonToggleSidebar";
import { ThemeContext, AuthContext } from "../../../context";
import { Link } from "react-router-dom";

export const Content = () => {
  const { currentUser } = useContext(AuthContext);
  const [visSidebar, setVisSidebar] = useState(true);
  const { theme } = useContext(ThemeContext);

  // Sjkuler sidebaren ved første render, hvis man ikke er logget ind.
  useEffect(() => {
    // evt ændre til ternary.
    if (!currentUser) {
      setVisSidebar(!visSidebar);
    }
    if (currentUser) {
      setVisSidebar(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]); // Den vil have "visSidebar" i denpendency arrayet, men det vil give et infinite loop. Logikken virker som den skal nu.

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
          data-testid="content__not-signed-in"
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
