import React, { useState } from "react";
import uuid from "uuid";
import { firebase } from "../../firebase";
import { useListerValue } from "../../context";
import { FaPlus, FaMinus } from "react-icons/fa";

const AddListe = ({ defaultVis = false }) => {
  const [vis, setVis] = useState(defaultVis);
  const [listeNavn, setListeNavn] = useState("");

  const { lister, setLister } = useListerValue();
  const listeId = uuid();

  const addListe = () =>
    listeNavn &&
    firebase
      .firestore()
      .collection("lister")
      .add({ listeId, navn: listeNavn, brugerId: "1234567890" })
      .then(() => {
        setLister([...lister]);
        setListeNavn("");
        setVis(false);
      });

  //Tilføj via enter
  const keyPressed = event => {
    if (event.key === "Enter" && listeNavn.length > 0) {
      addListe();
    }
  };

  return (
    <div className="add-liste">
      {vis && (
        <div className="add-liste__input">
          <input
            value={listeNavn}
            onChange={e => setListeNavn(e.target.value)}
            type="text"
            className="add-liste__navn"
            placeholder="Navn på listen"
            onKeyPress={keyPressed}
          />
          <button
            className="add-liste__submit"
            type="button"
            onClick={() => addListe()}
          >
            Tilføj
          </button>
          <span
            className="add-liste__fortryd"
            onClick={() => setVis(false)}
            onKeyDown={() => setVis(false)}
            role="button"
            tabIndex={0}
          >
            Fortryd
          </span>
        </div>
      )}
      <div
        onClick={() => setVis(!vis)}
        onKeyDown={() => setVis(!vis)}
        role="button"
        tabIndex={0}
      >
        <span className="add-liste__plus">
          {vis ? <FaMinus /> : <FaPlus />}
        </span>
        <span className="add-liste__setVis">Tilføj</span>
      </div>
    </div>
  );
};

export default AddListe;
