import React from "react";

interface ButtonToggleSidebarProps {
  visSidebar: boolean;
  setVisSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonToggleSidebar: React.FC<ButtonToggleSidebarProps> = ({
  visSidebar,
  setVisSidebar
}) => {
  return (
    <div className="content__toggle-sidebar">
      <label className="switch">
        <input
          data-testid="toggle-sidebar"
          type="checkbox"
          checked={visSidebar}
          onChange={() => setVisSidebar(!visSidebar)}
          aria-label="vis/skjul sidebar"
        />
        <span className="slider" />
      </label>
    </div>
  );
};

// NOTE: CHANGED value TO checked - TEST IF STILL WORKING AS INTENDED. (change due to typescript error)

export default ButtonToggleSidebar;
