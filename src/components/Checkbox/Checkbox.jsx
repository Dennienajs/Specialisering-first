import { firebase } from "../../firebase";
import React from "react";

const Checkbox = ({ id, indhold }) => {
  const arkiverPunkt = () => {
    firebase
      .firestore()
      .collection("punkter")
      .doc(id)
      .update({ arkiveret: true });
  };

  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => arkiverPunkt()}
      onKeyDown={() => arkiverPunkt()}
      aria-label={`Mark ${indhold} as done?`}
      role="button"
    >
      <span className="checkbox" />
    </div>
  );
};

export default Checkbox;
