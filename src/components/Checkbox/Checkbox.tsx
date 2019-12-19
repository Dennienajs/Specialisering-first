import React from "react";
import { checkPunktDone, sletPunkt } from "../../helpers";
import { TiTickOutline as Tick, TiDelete as Delete } from "react-icons/ti";

interface CheckboxProps {
  id: string;
  indhold: string;
  type: string;
  arkiveret: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  indhold,
  type,
  arkiveret
}) => {
  // Type = done -> line-through + update arkiveret felt i firebase = true/false.
  // Type = delete -> slet punkt fra firebase.
  const handleCheckboxClick = () => {
    switch (type) {
      case "done":
        checkPunktDone(arkiveret, id); // checkPunktDone flyttet til /helpers
        break;

      case "delete":
        sletPunkt(id); // sletPunkt flyttet til /helpers
        break;

      default:
        break;
    }
  };

  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => handleCheckboxClick()}
      onKeyDown={() => handleCheckboxClick()}
      aria-label={`Mark '${indhold}' as ${type}?`}
      role="button"
    >
      {type === "done" ? (
        <Tick className={`checkbox ${type}`} data-testid="checkbox-tick" />
      ) : type === "delete" ? (
        <Delete className={`checkbox ${type}`} data-testid="checkbox-delete" />
      ) : null}
    </div>
  );
};
