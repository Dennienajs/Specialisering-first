/* eslint-disable react/jsx-pascal-case */
// @ts-nocheck
import React, { useEffect, useContext } from "react";
import moment from "moment";
import { usePunkter } from "../../hooks";
import { ThemeContext, AuthContext, useValgtListeValue } from "../../context";
import { capitalizeString } from "../../helpers";
import TilføjPunkt from "../TilføjPunkt";
import Checkbox from "../Checkbox";
import LinearProgress from "@material-ui/core/LinearProgress"; // Loading

interface PunkterProps {
  visSidebar: boolean;
}
interface PunktProps {
  id: string;
  punkt: string;
  arkiveret: boolean;
  dato: string;
  listeId: string;
}

export const Punkter: React.FC<PunkterProps> = ({ visSidebar }) => {
  // @ts-ignore TODO: FIX LATER ***
  const { valgtListe } = useValgtListeValue();
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);
  const { punkter, loadingPunkter } = usePunkter(valgtListe); // Henter alle punkter ud fra listeId (valgtListe). hent alle punktervalgtListe = "".
  let listeNavn = valgtListe; // let fordi den ændres ved liste skift.

  // DOCUMENT TITLE: displayName, listeNavn, punkter.length
  useEffect(() => {
    document.title = `${
      currentUser
        ? currentUser.displayName
          ? currentUser.displayName
          : currentUser
        : null
    }: ${capitalizeString(listeNavn.toLowerCase())} ${
      punkter.length > 0 ? `(${punkter.length})` : ""
    }`;
  }, [listeNavn, currentUser, punkter]);

  return (
    <div
      className="punkter"
      data-testid="punkter"
      style={
        { backgroundColor: theme.backgroundColor, color: theme.color } &&
        visSidebar
          ? {
              marginLeft: "139px" // Sidebar toggle = ryk punkterne så de fylder det hele.
            }
          : {
              marginLeft: "20px",
              marginRight: "20px"
            }
      }
    >
      <div className="punkter-overskrift">
        <h2 data-testid="liste-navn">
          {listeNavn === "" ? (listeNavn = "All") : listeNavn}
        </h2>
      </div>
      <ul className="punkter__liste">
        {loadingPunkter ? (
          <LinearProgress />
        ) : (
          punkter.map((punkt: PunktProps) => (
            // mapper i gennem punkterne - identifier for hver enkelt punkt.
            <div className="punkter__liste-container" key={punkt.id}>
              <Checkbox
                id={punkt.id}
                indhold={punkt.punkt}
                type={"delete"}
                arkiveret={punkt.arkiveret}
              />
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
                  {listeNavn === "All" ||
                  listeNavn === "Today" ||
                  listeNavn === "Last 7 Days"
                    ? " @" + punkt.listeId
                    : ""}
                </span>
              </li>
            </div>
          ))
        )}
      </ul>
      <TilføjPunkt />
    </div>
  );
};
