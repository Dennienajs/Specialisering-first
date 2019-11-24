import React, { useState } from "react";
import Sidebar from "../../Sidebar";
import Punkter from "../../../components/Punkter";

const Content = () => {
  const [visSidebar, setVisSidebar] = useState(true);

  return (
    <section className="content">
      <div className="content__toggle-sidebar">
        <label className="switch">
          <input
            type="checkbox"
            value={visSidebar}
            onClick={() => setVisSidebar(!visSidebar)}
            checked={visSidebar}
          />
          <span className="slider"></span>
        </label>
      </div>
      {visSidebar ? <Sidebar /> : null}
      <Punkter visSidebar={visSidebar} setVisSidebar={setVisSidebar} />
    </section>
  );
};

export default Content;
