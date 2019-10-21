import React, { useState } from "react";
import { useValgtListeValue, useListerValue } from "../../context";
import IndividuelListe from "../IndividuelListe";

const Lister = ({ aktivValue = null }) => {
  const [aktivListe, setAktivListe] = useState(); // Overskriften - over punkterne.
  const { setValgtListe } = useValgtListeValue();
  const { lister } = useListerValue(aktivValue);

  return lister.map(liste => (
    <div
      className="lister"
      role="button"
      tabIndex={0}
      onClick={() => {
        setAktivListe(liste.listeId);
        setValgtListe(liste.navn);
      }}
      onKeyDown={() => {
        setAktivListe(liste.navn);
        setValgtListe(liste.listeId);
      }}
    >
      <li
        key={liste.listeId}
        className={
          aktivListe === liste.listeId
            ? "aktivListe sidebar__liste"
            : "sidebar__liste"
        }
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            setAktivListe(liste.listeId);
            setValgtListe(liste.navn);
          }}
          onKeyDown={() => {
            setAktivListe(liste.navn);
            setValgtListe(liste.listeId);
          }}
        >
          <IndividuelListe liste={liste} />
        </div>
      </li>
    </div>
  ));
};

export default Lister;
