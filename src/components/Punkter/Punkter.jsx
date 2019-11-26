/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useContext } from "react";
import moment from "moment";
import { usePunkter } from "../../hooks";
import { ThemeContext, AuthContext, useValgtListeValue } from "../../context/";
import { capitalizeString } from "../../helpers";
import TilføjPunkt from "../TilføjPunkt";
import Checkbox from "../Checkbox";

const Punkter = ({ visSidebar }) => {
  const { valgtListe } = useValgtListeValue();
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);
  // i usePunkter("SØGE-ID") - kan man insætte fx 1 for at vise alle puntker med listeId = 1.
  // tomme ("") - vil vise punkter ligegyldigt id.
  const { punkter } = usePunkter(valgtListe); // viser alle punkter med "listeId = "1"...

  let listeNavn = valgtListe;

  // Sætter document title = ud fra markeret liste.
  useEffect(() => {
    document.title = `${
      currentUser
        ? currentUser.displayName
          ? currentUser.displayName
          : currentUser
        : null
    }: ${capitalizeString(listeNavn.toLowerCase())}`;
  }, [listeNavn, currentUser]);

  return (
    <div
      className="punkter"
      data-testid="punkter"
      style={
        visSidebar
          ? {
              marginLeft: "139px",
              backgroundColor: theme.backgroundColor,
              color: theme.color
            }
          : {
              marginLeft: "20px",
              marginRight: "20px",
              backgroundColor: theme.backgroundColor,
              color: theme.color
            }
      }
    >
      <div className="punkter-overskrift">
        <h2 data-testid="liste-navn">
          {listeNavn === "" ? (listeNavn = "ALLE") : listeNavn}
        </h2>
      </div>
      <ul className="punkter__liste">
        {punkter.map(punkt => (
          // mapper i gennem punkterne - identifier for hver enkelt punkt.
          <div className="punkter__liste-container" key={punkt.id}>
            <Checkbox id={punkt.id} indhold={punkt.punkt} type={"delete"} />
            <Checkbox
              id={punkt.id}
              indhold={punkt.punkt}
              type={"done"}
              arkiveret={punkt.arkiveret}
            />
            <li
              className="punkter__liste-container-li"
              style={
                punkt.arkiveret
                  ? {
                      textDecoration: "line-through",
                      backgroundColor: theme.backgroundColor,
                      color: theme.color
                    }
                  : {
                      backgroundColor: theme.backgroundColor,
                      color: theme.color
                    }
              }
            >
              <span className="punkt-punkt">{punkt.punkt}</span>
              <span className="punkt-dato">
                ~ {moment([punkt.dato], "YYYY/MM/DD HH:mm").fromNow()}
                {listeNavn === "ALLE" ? " @" + punkt.listeId : ""}
              </span>
            </li>
          </div>
        ))}
      </ul>
      <TilføjPunkt />
    </div>
  );
};
export default Punkter;
