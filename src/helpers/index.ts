import { firebase } from "../firebase";

// 06-12-2019 - removed unused + migrated to typescript.

// ***************************************************
// **Nedenstående er testet og i brug i Punkter.jsx **
// ***************************************************
// ***************************************************
// *********** TESTET OG I BRUG **********************
// ***************************************************
// ***************************************************

// SLETPUNKT (Checkbox component)
export const sletPunkt = (id: string) => {
  let confirmation = window.confirm(
    "Er du sikker på du vil fjerne dette punkt?"
  );
  confirmation &&
    firebase
      .firestore()
      .collection("punkter")
      .doc(id)
      // Herfra og ned til .update comment kan byttes.
      .delete()
      // .then(() => {
      //   window.alert("Task completed and deleted!");
      // })
      .catch((err: Error) => {
        console.error("Error deleting task: ", err);
        window.alert("Ooops, something went wrong. Please try again.");
      });
};

// Bruges i Checkbox.
export const checkPunktDone = (arkiveret: boolean, id: string) => {
  !arkiveret ? arkiverPunktTrue(id) : arkiverPunktFalse(id);
};

// Bruges til "line-through" ved click på punkt.
export const arkiverPunktTrue = (id: string) => {
  id &&
    firebase
      .firestore()
      .collection("punkter")
      .doc(id)
      .update({
        arkiveret: true
      })
      .catch((err: Error) => {
        console.error("Error: ", err);
        window.alert("Ooops, something went wrong. Please try again.");
      });
};

// Bruges til !"line-through" ved click på punkt.
export const arkiverPunktFalse = (id: string) => {
  id &&
    firebase
      .firestore()
      .collection("punkter")
      .doc(id)
      .update({
        arkiveret: false
      })
      .catch(err => {
        console.error("Error: ", err);
        window.alert("Ooops, something went wrong. Please try again.");
      });
};

export const capitalizeString = (capString: string) => {
  return capString.charAt(0).toUpperCase() + capString.slice(1);
};
