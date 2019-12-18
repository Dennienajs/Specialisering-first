import React, { useState, useContext } from "react";
import { FiChevronsDown } from "react-icons/fi";
import IndividuelListe from "../../components/IndividuelListe";
import AddListe from "../../components/AddListe";
import {
  useValgtListeValue,
  ThemeContext,
  AuthContext,
  useListerValue
} from "../../context";
import { defaultSidebarLister } from "./defaultSidebarListerData";

export const Sidebar = () => {
  // @ts-ignore TODO: FIX LATER ***
  const { setValgtListe } = useValgtListeValue(); // Hvilken liste/punkter der vises til brugeren
  const [aktivListe, setAktivListe] = useState("All"); // Markerer og viser liste
  const [visLister, setVisLister] = useState(true); // Toggle egne lister
  const { theme } = useContext(ThemeContext); // darkmode
  const { currentUser } = useContext(AuthContext); // authentication/user info
  // @ts-ignore TODO: FIX LATER ***
  const { lister } = useListerValue(); // brugerens egne lister

  interface ListeProps {
    navn: string;
    listeId: string;
    docId: string;
  }

  return (
    <div
      className="sidebar"
      data-testid="sidebar"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.color
      }}
    >
      <ul className="sidebar_liste">
        {defaultSidebarLister.map(liste => (
          <li
            key={liste.listeId}
            data-testid={liste.navn}
            className={aktivListe === liste.navn ? "aktivListe" : undefined}
          >
            <div
              aria-label={`Vis punkter under ${liste.navn}`}
              data-testid={`${liste.navn}-action`}
              role="button"
              onClick={() => {
                setAktivListe(liste.navn); // Den som skal "markeres"
                setValgtListe(liste.listeId); // punkterne med dette "id" skal vises. 1=id 1, ""=alle
              }}
              onKeyDown={() => {
                setAktivListe(liste.navn);
                setValgtListe(liste.listeId);
              }}
            >
              <span>{liste.icon}</span>
              <span>{liste.navn}</span>
            </div>
          </li>
        ))}

        {/**** TOGGLE EGNE LISTER KNAP ****/}
        <li>
          <div
            aria-label="Vis/skjul egne lister"
            data-testid="sidebar-toggle-egne-lister"
            className="sidebar__liste-vis"
            role="button"
            tabIndex={0}
            onClick={() => setVisLister(!visLister)}
            onKeyDown={() => setVisLister(!visLister)}
          >
            <span>
              <FiChevronsDown className={!visLister ? "skjult" : undefined} />
            </span>
            <h3>Personal Lists</h3>
          </div>
        </li>
      </ul>

      <ul className="sidebar_liste">
        {visLister
          ? lister.map((liste: ListeProps) => (
              <li
                key={liste.listeId}
                style={{
                  backgroundColor: theme.backgroundColor,
                  color: theme.color
                }}
                className={
                  aktivListe === liste.listeId ? "aktivListe" : undefined
                }
              >
                <div
                  aria-label={`Vis punkter under ${liste.navn}`}
                  data-testid="sidebar-egne-lister"
                  className="sidebar_liste__individuel-liste"
                  role="button"
                  onClick={() => {
                    setAktivListe(liste.listeId);
                    setValgtListe(liste.navn);
                  }}
                  onKeyDown={() => {
                    setAktivListe(liste.listeId);
                    setValgtListe(liste.navn);
                  }}
                >
                  <IndividuelListe
                    liste={liste}
                    aktivListe={aktivListe}
                    setAktivListe={setAktivListe}
                  />
                </div>
              </li>
            ))
          : null}
        {currentUser && visLister && <AddListe data-testid="add-liste" />}
      </ul>
    </div>
  );
};
