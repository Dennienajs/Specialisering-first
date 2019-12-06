import React from "react";
import { FaStar, FaRegTrashAlt as Trash } from "react-icons/fa";
import { firebase } from "../../firebase";
import { useListerValue, useValgtListeValue } from "../../context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const IndividuelListe = ({ liste, aktivListe, setAktivListe }) => {
  const { lister, setLister } = useListerValue(); // brugerens lister
  const { setValgtListe } = useValgtListeValue(); // hvilke punkter som vises.

  const toastSletSuccess = () => {
    toast.success(`${liste.navn} blev slettet. ❌`, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false
    });
  };

  const confirmSletListe = () => {
    const confirmation = window.confirm(
      `Er du sikker på du vil slette: '${liste.navn}'?`
    );
    if (confirmation) {
      sletListe();
    }
  };

  const sletListe = () => {
    firebase
      .firestore()
      .collection("lister")
      .doc(liste.docId)
      .delete()
      .then(() => {
        setLister([...lister]);
        setValgtListe("");
        setAktivListe("alle");
        toastSletSuccess();
      })
      .catch(err => {
        console.error("Error deleting liste: ", err);
        window.alert("Ooops, something went wrong. Please try again.");
      });
  };

  return (
    <>
      <span>
        <FaStar />
      </span>
      <span>{liste.navn}</span>
      {aktivListe === liste.listeId && (
        <span onClick={() => confirmSletListe()}>
          <Trash />
        </span>
      )}
    </>
  );
};
