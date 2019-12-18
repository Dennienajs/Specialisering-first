import React, { useState, useContext } from "react";
import uuid from "uuid";
import { firebase } from "../../firebase";
import { useListerValue, AuthContext } from "../../context";
import { FaPlus, FaMinus } from "react-icons/fa";

export const AddListe = ({ defaultVis = false }) => {
  const [vis, setVis] = useState(defaultVis);
  const [listeNavn, setListeNavn] = useState("");
  // @ts-ignore TODO: FIX LATER ***
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
  const keyPressed = (event: React.KeyboardEvent<HTMLElement>): void => {
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
            aria-label="Tilføj listenavn"
          />
          <button
            className="add-liste__submit"
            data-testid="add-liste-submit"
            type="button"
            aria-label="Add Liste"
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
        aria-label="vis/skjul Add Liste"
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
