import { firebase } from "../firebase";
import uuid from "uuid";
import moment from "moment";

// Overvej hvis der kommer mange functioner at smide
// dem ud i hver sin fil og importere til index filen.
// ***************************************************
// ***************************************************
// *********** IKKE TESTET ENDNU.*********************
// ***************************************************
// ***************************************************

// SLETPUNKT (Checkbox component)
export const sletPunkt = id => {
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
};

// ADDLISTE (AddListe)
export const addListe = ({ listeNavn, currentUser }) => {
  const listeId = uuid();
  firebase
    .firestore()
    .collection("lister")
    .add({
      listeId,
      navn: listeNavn,
      brugerId: currentUser.uid
    });
  /* Skal blive i addListe filen.
    .then(() => {
      setLister([...lister]);
      setListeNavn("");
      setVis(false);
    });
    */
};

// TILFØJ PUNKT (TilføjPunkt)
export const tilføjPunkt = ({ punkt, currentUser, valgtListe }) => {
  let dato = moment().format("YYYY/MM/DD HH:mm"); // Sætter dato til dagens dato.

  return (
    punkt &&
    firebase
      .firestore()
      .collection("punkter")
      .add({
        arkiveret: false,
        brugerId: currentUser.uid,
        dato, //dato:dato
        listeId: valgtListe,
        punkt // punkt:punkt
      })
    /* skal blive i filen.
            .then(() => {
                setPunkt("");
            })
            */
  );
};

export const arkiverPunktTrue = id => {
  id &&
    firebase
      .firestore()
      .collection("punkter")
      .doc(id)
      .update({
        arkiveret: true
      })
      .catch(err => {
        console.error("Error: ", err);
        window.alert("Ooops, something went wrong. Please try again.");
      });
};

export const arkiverPunktFalse = id => {
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
