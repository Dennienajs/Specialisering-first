import React from "react";
import { FaStar } from "react-icons/fa";

const IndividuelListe = ({ liste }) => {
  return (
    <>
      <span>
        <FaStar />
      </span>
      <span>{liste.navn}</span>
    </>
  );
};

export default IndividuelListe;
