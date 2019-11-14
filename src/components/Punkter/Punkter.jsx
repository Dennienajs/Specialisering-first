/* eslint-disable react/jsx-pascal-case */ //Pascal case ved TilføjPunkt ???
import React, { useEffect } from "react";
import Checkbox from "../Checkbox/index";
import moment from "moment";
import { usePunkter } from "../../hooks";
import TilføjPunkt from "../TilføjPunkt";
import { useValgtListeValue } from "../../context";

const Punkter = () => {
  const { valgtListe } = useValgtListeValue();

  // const { lister } = useListerValue();
  // const { arkiveretPunkter } = usePunkter(valgtListe);

  // i usePunkter("SØGE-ID") - kan man insætte fx 1 for at vise alle puntker med listeId = 1.
  // tomme ("") - vil vise punkter ligegyldigt id. (stadig kun !arkiveret)
  const { punkter } = usePunkter(valgtListe); // viser alle punkter med "listeId = "1"...

  let listeNavn = valgtListe;

  // Sætter document title = ud fra markeret liste.
  useEffect(() => {
    document.title = `${listeNavn}`;
  });
  return (
    <div className="punkter" data-testid="punkter">
      <h2 data-testid="liste-navn">
        {listeNavn === "" ? (listeNavn = "ALLE") : listeNavn}
      </h2>
      <ul className="punkter__liste">
        {punkter.map(punkt => (
          // mapper i gennem punkterne - identifier for hver enkelt punkt.
          <li key={`${punkt.id}`}>
            <Checkbox id={punkt.id} indhold={punkt.punkt} />
            <span className="punkt-punkt">{punkt.punkt} </span>
            <span className="punkt-dato">
              ~ {moment([punkt.dato], "YYYY/MM/DD HH:mm").fromNow()}
              {listeNavn === "ALLE" ? " @" + punkt.listeId : ""}
            </span>
          </li>
        ))}
      </ul>
      <TilføjPunkt />
    </div>
  );
};
export default Punkter;
