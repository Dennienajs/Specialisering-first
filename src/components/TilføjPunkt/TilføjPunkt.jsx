import React, { useState, useContext } from "react";
import moment from "moment";
import { firebase } from "../../firebase";
import { useValgtListeValue, AuthContext } from "../../context";

const TilføjPunkt = () => {
  const [punkt, setPunkt] = useState("");

  const { valgtListe } = useValgtListeValue();

  const { currentUser } = useContext(AuthContext);

  const tilføjPunkt = () => {
    let dato = moment().format("YYYY/MM/DD HH:mm"); // Sætter dato til dagens dato.

    if (!punkt) return;
    if (currentUser) {
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
          .then(() => {
            setPunkt("");
          })
      );
    }
    if (!currentUser && punkt) {
      return window.alert("Please login.");
    } else {
      window.alert("Something went wrong.");
    }
  };

  return (
    <div className="tilføj-punkt" data-testid="tilføj-punkt">
      <input
        type="text"
        required
        className="tilføj-punkt__input"
        value={punkt}
        onChange={e => setPunkt(e.target.value)}
        placeholder={`tilføj til ${valgtListe.toLowerCase()}`}
        onKeyPress={event => {
          if (event.key === "Enter" && punkt.length > 0) {
            tilføjPunkt();
          }
        }}
        data-testid="tilføj-punkt-input"
      />
      <button
        type="button"
        className="tilføj-punkt__submit"
        onClick={() => tilføjPunkt()}
        data-testid="tilføj-punkt-button"
      >
        Tilføj
      </button>
    </div>
  );
};

export default TilføjPunkt;
