import React, { useState } from "react";
import Sidebar from "../../Sidebar";
import Punkter from "../../../components/Punkter";
import ButtonToggleSidebar from "./ButtonToggleSidebar";

const Content = () => {
  const [visSidebar, setVisSidebar] = useState(true);
  // console.log("darkmode content: " + darkMode);
  // className = { darkMode? "content darkmode": "content" }
  return (
    <section data-testid="content">
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
