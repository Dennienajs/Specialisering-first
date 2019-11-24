import { firebase } from "../../firebase";
import React from "react";

const Checkbox = ({ id, indhold }) => {
  const arkiverPunkt = () => {
    firebase
      .firestore()
      .collection("punkter")
      .doc(id)
      // Herfra og ned til .update comment kan byttes.
      .delete()
      .then(() => {
        window.alert("Task completed!");
      })
      .catch(err => {
        console.error("Error completing task: ", err);
        window.alert("Ooops, something went wrong. Please try again.");
      });

    // .update({ arkiveret: true }); // Førhen opdateres denne felt bare til true.
    // Føler det er bedre at jeg sletter dem, for de ikke fylder i db.
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
