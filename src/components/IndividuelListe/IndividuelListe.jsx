import React from "react";
import { FaStar } from "react-icons/fa";
// import { useListerValue, useValgtListeValue } from "../../context";

const IndividuelListe = ({ liste }) => {
  // const { lister, setLister } = useListerValue();
  // const { setValgtListe } = useValgtListeValue();

  return (
    <div className="individuel-liste-sidebar">
      <span className="individuel-liste-sidebar__star">
        <FaStar />
      </span>
      <span className="individuel-liste-sidebar__liste-navn">{liste.navn}</span>
    </div>
  );
};

export default IndividuelListe;
