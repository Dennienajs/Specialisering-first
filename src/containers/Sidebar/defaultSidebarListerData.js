import React from "react";
import { FaRegListAlt, FaCalendarDay, FaCalendarWeek } from "react-icons/fa";

//
// DEFAULT LISTER I SIDEBAREN
//

export const defaultSidebarLister = [
  {
    navn: "All",
    listeId: "",
    icon: <FaRegListAlt />
  },
  {
    navn: "Today",
    listeId: "Today",
    icon: <FaCalendarDay />
  },
  {
    navn: "Last 7 Days",
    listeId: "Last 7 Days",
    icon: <FaCalendarWeek />
  }
];
