import { firebase } from "../../firebase";
import React from "react";
import {
  arkiverPunktFalse,
  arkiverPunktTrue,
  checkPunktDone,
  sletPunkt
} from "../../helpers";
import { TiTickOutline as Tick, TiDelete as Delete } from "react-icons/ti";

const Checkbox = ({ id, indhold, type, arkiveret }) => {
  // Type = done -> line-through + update arkiveret felt i firebase = true/false.
  // Type = delete -> slet punkt fra firebase.

  //Kunne også laves i en switch for readability, men jeg elsker ternary operators.
  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() =>
        type === "done"
          ? checkPunktDone(arkiveret, id)
          : type === "delete"
          ? sletPunkt(id)
          : console.log("fejl")
      }
      onKeyDown={() =>
        type === "done"
          ? checkPunktDone(arkiveret, id)
          : type === "delete"
          ? sletPunkt(id)
          : console.log("fejl")
      }
      aria-label={`Mark ${indhold} as done?`}
      role="button"
    >
      {type === "done" ? (
        <Tick className={`checkbox ${type}`} />
      ) : type === "delete" ? (
        <Delete className={`checkbox ${type}`} />
      ) : null}
    </div>
  );
};

export default Checkbox;
