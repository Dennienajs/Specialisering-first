import React from "react";
import {
  FaRegListAlt,
  FaCalendarDay,
  FaCalendarAlt,
  FaTasks,
  FaBug,
  FaShoppingBasket
} from "react-icons/fa";

// DETTE ER MINE DEFAULT SIDEBAR LISTER, SOM ALLE BRUGERE HAR.
// Før havde jeg det i én lang kører i sidebaren, men har nu refactored det til en .map
// som mapper over disse lister.
// Sidebar.spec.js blev omskrevet fra over 600 linjer til 200 linjers test kode.
// Det er også nemmere at tilpasse default lister i fremtiden nu.

export const defaultSidebarLister = [
  { navn: "alle", listeId: "", displayNavn: "Alle", icon: <FaRegListAlt /> },
  {
    navn: "idag",
    listeId: "IDAG",
    displayNavn: "I dag",
    icon: <FaCalendarDay />
  },
  {
    navn: "denneUge",
    listeId: "DENNEUGE",
    displayNavn: "Denne Uge",
    icon: <FaCalendarAlt />
  },
  {
    navn: "todo",
    listeId: "TODO",
    displayNavn: "Todo",
    icon: <FaTasks />
  },
  {
    navn: "bugs",
    listeId: "BUGS",
    displayNavn: "Bugs",
    icon: <FaBug />
  },
  {
    navn: "indkøb",
    listeId: "INDKØB",
    displayNavn: "Indkøb",
    icon: <FaShoppingBasket />
  }
];
