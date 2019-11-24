import React, { useState } from "react";
import {
  FaRegListAlt,
  FaCalendarDay,
  FaCalendarAlt,
  FaTasks,
  FaBug,
  FaShoppingBasket,
  FaLongArrowAltDown
} from "react-icons/fa";

import "./Sidebar.scss";

import { useValgtListeValue } from "../../context";
import Lister from "../../components/Lister";
import AddListe from "../../components/AddListe";

const Sidebar = () => {
  const { setValgtListe } = useValgtListeValue(); //
  const [aktivListe, setAktivListe] = useState("alle"); // Markerer ..
  const [visLister, setVisLister] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
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
      </ul>
      <div
        data-testid="sidebar-egne-lister"
        className="sidebar__liste-vis"
        role="button"
        tabIndex={0}
        onClick={() => setVisLister(!visLister)}
        onKeyDown={() => setVisLister(!visLister)}
      >
        <span>
          <FaLongArrowAltDown className={!visLister ? "skjult" : undefined} />
        </span>
        <h2>Lister</h2>
      </div>

      <ul className="sidebar__lister">{visLister && <Lister />}</ul>

      {visLister && <AddListe />}
    </div>
  );
};
export default Sidebar;
