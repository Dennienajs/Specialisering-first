import React, { useState, useContext, KeyboardEvent } from "react";
import uuid from "uuid";
import { firebase } from "../../firebase";
import { useListerValue, AuthContext } from "../../context";
import { FaPlus, FaMinus } from "react-icons/fa";

export const AddListe = ({ defaultVis = false }) => {
  const [vis, setVis] = useState(defaultVis);
  const [listeNavn, setListeNavn] = useState("");
  const { lister, setLister } = useListerValue();
  const { currentUser } = useContext(AuthContext);

  const addListe = () => {
    currentUser
      ? firebase
          .firestore()
          .collection("lister")
          .add({
            listeId: uuid(),
            navn: listeNavn,
            brugerId: currentUser.uid
          })
          .then(() => {
            setLister([...lister]);
            setListeNavn("");
            setVis(false);
          })
      : window.alert("Please login.");
  };

  // Tilføj via enter
  const keyPressed = (event: KeyboardEvent) => {
    if (event.key === "Enter" && listeNavn.length > 0) {
      addListe();
    }
  };

  return (
    <div className="add-liste" data-testid="add-liste">
      {vis && (
        <div className="add-liste__input" data-testid="add-liste-input">
          <input
            value={listeNavn}
            onChange={e => setListeNavn(e.target.value)}
            type="text"
            className="add-liste__navn"
            data-testid="add-liste-navn"
            placeholder="Liste Navn"
            onKeyPress={keyPressed}
          />
          <button
            className="add-liste__submit"
            data-testid="add-liste-submit"
            type="button"
            onClick={() => addListe()}
          >
            Tilføj
          </button>
          <span
            className="add-liste__fortryd"
            data-testid="add-liste-fortryd"
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
        data-testid="add-liste--vis"
        className="add-liste__vis"
        onClick={() => setVis(!vis)}
        onKeyDown={() => setVis(!vis)}
        role="button"
        tabIndex={0}
      >
        <span className="add-liste__vis-plus">
          {vis ? <FaMinus /> : <FaPlus />}
        </span>
        <span className="add-liste__vis-setVis" data-testid="add-liste-action">
          Tilføj
        </span>
      </div>
    </div>
  );
};
