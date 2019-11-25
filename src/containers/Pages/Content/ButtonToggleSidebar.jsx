import React from "react";

const ButtonToggleSidebar = ({ visSidebar, setVisSidebar }) => {
  return (
    <div className="content__toggle-sidebar">
      <label className="switch">
        <input
          type="checkbox"
          value={visSidebar}
          onClick={() => setVisSidebar(!visSidebar)}
          defaultChecked={visSidebar}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ButtonToggleSidebar;
