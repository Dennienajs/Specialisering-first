import React from "react";
import { FaStar } from "react-icons/fa";
// import { useListerValue, useValgtListeValue } from "../../context";

const IndividuelListe = ({ liste }) => {
  // const { lister, setLister } = useListerValue();
  // const { setValgtListe } = useValgtListeValue();

  return (
    <>
      <span className="sidebar__star">
        <FaStar />
      </span>
      <span className="sidebar__liste-navn">{liste.navn}</span>
    </>
  );
};

export default IndividuelListe;
