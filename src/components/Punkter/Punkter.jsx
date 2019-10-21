/* eslint-disable react/jsx-pascal-case */ //Pascal case ved TilføjPunkt ???
import React, { useEffect } from "react";
import Checkbox from "../Checkbox/index";
import { usePunkter } from "../../hooks";
import TilføjPunkt from "../TilføjPunkt";
import { samletPunkter } from "../../constants";
import {
  getListeNavn,
  getSamletListeNavn,
  samletPunkterFundet
} from "../../helpers";
import { useValgtListeValue, useListerValue } from "../../context";

const Punkter = () => {
  const { valgtListe } = useValgtListeValue();
  const { lister } = useListerValue();

  // i usePunkter("SØGE-ID") - kan man insætte fx 1 for at vise alle puntker med listeId = 1.
  // tomme ("") - vil vise punkter ligegyldigt id. (stadig kun !arkiveret)
  const { punkter } = usePunkter(valgtListe); // viser alle punkter med "listeId = "1"...
  const { arkiveretPunkter } = usePunkter(valgtListe);

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
            <span>{punkt.punkt} </span>
            <span>- (id="{punkt.listeId}")</span>
          </li>
        ))}
      </ul>
      <TilføjPunkt />
    </div>
  );
};
export default Punkter;
