import React, { useState } from "react";
import Sidebar from "../../Sidebar";
import Punkter from "../../../components/Punkter";
import ButtonToggleSidebar from "./ButtonToggleSidebar";
import { ThemeContext } from "../../../context/";

const Content = () => {
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

      <Punkter visSidebar={visSidebar} />
    </section>
  );
};

export default Content;
