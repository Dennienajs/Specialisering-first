import React, { useState, useContext } from "react";
import {
  FaRegListAlt,
  FaCalendarDay,
  FaCalendarAlt,
  FaTasks,
  FaBug,
  FaShoppingBasket,
  FaLongArrowAltDown
} from "react-icons/fa";
import IndividuelListe from "../../components/IndividuelListe";
import AddListe from "../../components/AddListe";
import {
  useValgtListeValue,
  useListerValue,
  ThemeContext
} from "../../context";

const Sidebar = () => {
  const { setValgtListe } = useValgtListeValue(); // Hvilken liste/punkter der vises til brugeren
  const [aktivListe, setAktivListe] = useState("alle"); // Markerer og viser liste
  const [visLister, setVisLister] = useState(true); // Toggle egne lister
  const { theme } = useContext(ThemeContext); // darkmode
  const { lister } = useListerValue(); // brugerens lister

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
        <li
          data-testid="alle"
          className={aktivListe === "alle" ? "aktivListe" : undefined}
        >
          <div
            data-testid="alle-action"
            role="button"
            onClick={() => {
              setAktivListe("alle"); //Den som skal "markeres"
              setValgtListe(""); //punkterne med dette "id" skal vises. 1=id 1, ""=alle
            }}
            onKeyDown={() => {
              setAktivListe("alle");
              setValgtListe("");
            }}
          >
            <span>
              <FaRegListAlt />
            </span>
            <span>Alle</span>
          </div>
        </li>

        <li
          data-testid="idag"
          className={aktivListe === "idag" ? "aktivListe" : undefined}
        >
          <div
            data-testid="idag-action"
            role="button"
            onClick={() => {
              setAktivListe("idag");
              setValgtListe("IDAG");
            }}
            onKeyDown={() => {
              setAktivListe("idag");
              setValgtListe("IDAG");
            }}
          >
            <span>
              <FaCalendarDay />
            </span>
            <span>I dag</span>
          </div>
        </li>

        <li
          data-testid="denneUge"
          className={aktivListe === "denneUge" ? "aktivListe" : undefined}
        >
          <div
            data-testid="denneUge-action"
            role="button"
            onClick={() => {
              setAktivListe("denneUge");
              setValgtListe("DENNEUGE");
            }}
            onKeyDown={() => {
              setAktivListe("denneUge");
              setValgtListe("DENNEUGE");
            }}
          >
            <span>
              <FaCalendarAlt />
            </span>
            <span>Denne uge</span>
          </div>
        </li>

        <li
          data-testid="todo"
          className={aktivListe === "todo" ? "aktivListe" : undefined}
        >
          <div
            data-testid="todo-action"
            role="button"
            onClick={() => {
              setAktivListe("todo");
              setValgtListe("TODO");
            }}
            onKeyDown={() => {
              setAktivListe("todo");
              setValgtListe("TODO");
            }}
          >
            <span>
              <FaTasks />
            </span>
            <span>Todo</span>
          </div>
        </li>

        <li
          data-testid="bugs"
          className={aktivListe === "bugs" ? "aktivListe" : undefined}
        >
          <div
            data-testid="bugs-action"
            role="button"
            onClick={() => {
              setAktivListe("bugs");
              setValgtListe("BUGS");
            }}
            onKeyDown={() => {
              setAktivListe("bugs");
              setValgtListe("BUGS");
            }}
          >
            <span>
              <FaBug />
            </span>
            <span>Bugs</span>
          </div>
        </li>

        <li
          data-testid="indkøb"
          className={aktivListe === "indkøb" ? "aktivListe" : undefined}
        >
          <div
            data-testid="indkøb-action"
            role="button"
            onClick={() => {
              setAktivListe("indkøb");
              setValgtListe("INDKØB");
            }}
            onKeyDown={() => {
              setAktivListe("indkøb");
              setValgtListe("INDKØB");
            }}
          >
            <span>
              <FaShoppingBasket />
            </span>
            <span>Indkøb</span>
          </div>
        </li>

        {/**** TOGGLE EGNE LISTER KNAP ****/}
        <li>
          <div
            data-testid="sidebar-egne-lister"
            className="sidebar__liste-vis"
            role="button"
            tabIndex={0}
            onClick={() => setVisLister(!visLister)}
            onKeyDown={() => setVisLister(!visLister)}
          >
            <span>
              <FaLongArrowAltDown
                className={!visLister ? "skjult" : undefined}
              />
            </span>
            <h2>Lister</h2>
          </div>
        </li>
      </ul>

      {/** RENDER EGNE LISTER I SIDEBAREN **/}
      <ul className="sidebar_liste">
        {visLister &&
          lister &&
          lister.map(liste => (
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
                role="button"
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
          ))}
      </ul>

      {/** RENDER ADDLISTE I SIDEBAREN**/}
      <AddListe />
    </div>
  );
};
export default Sidebar;
