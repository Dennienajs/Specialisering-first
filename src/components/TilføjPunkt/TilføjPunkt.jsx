import React, { useState } from "react";
import moment from "moment";
import { firebase } from "../../firebase";
import { useValgtListeValue } from "../../context";

const TilføjPunkt = () => {
  const [punkt, setPunkt] = useState("");

  const { valgtListe } = useValgtListeValue();

  const tilføjPunkt = () => {
    // const valgtListe = "ALLE";
    let dato = moment().format("DD/MM/YYYY LT"); // Sætter dato til dagens dato.

    return (
      punkt &&
      firebase
        .firestore()
        .collection("punkter")
        .add({
          arkiveret: false,
          brugerId: "1234567890",
          dato: dato,
          listeId: valgtListe,
          punkt
        })
        .then(() => {
          setPunkt("");
        })
    );
  };

  const keyPressed = event => {
    if (event.key === "Enter" && punkt.length > 0) {
      tilføjPunkt();
    }
  };

  return (
    <div className="tilføj-punkt">
      <input
        type="text"
        className="tilføj-punkt__input"
        value={punkt}
        onChange={e => setPunkt(e.target.value)}
        placeholder={`tilføj til ${valgtListe.toLowerCase()}`}
        onKeyPress={keyPressed}
      />
      <button
        type="button"
        className="tilføj-punkt__submit"
        onClick={() => tilføjPunkt()}
      >
        Tilføj
      </button>
    </div>
  );
};

export default TilføjPunkt;
