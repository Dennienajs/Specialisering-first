import React, { useState } from "react";
import moment from "moment";
import { firebase } from "../../firebase";
import { useValgtListeValue } from "../../context";

const TilføjPunkt = () => {
  const [punkt, setPunkt] = useState("");

  const { valgtListe } = useValgtListeValue();

  const tilføjPunkt = () => {
    let dato = moment().format("YYYY/MM/DD HH:mm"); // Sætter dato til dagens dato.

    return (
      punkt &&
      firebase
        .firestore()
        .collection("punkter")
        .add({
          arkiveret: false,
          brugerId: "1234567890", // eneste bruger.
          dato, //dato:dato
          listeId: valgtListe,
          punkt // punkt:punkt
        })
        .then(() => {
          setPunkt("");
        })
    );
  };

  return (
    <div className="tilføj-punkt" data-testid="tilføj-punkt">
      <input
        type="text"
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
