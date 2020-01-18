import React from "react";
import { FaStar, FaRegTrashAlt as Trash } from "react-icons/fa";
import { firebase } from "../../firebase";
import { useListerValue, useValgtListeValue } from "../../context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IndividuelListeProps {
  liste: { navn: string; docId: string; listeId: string };
  aktivListe: string;
  setAktivListe: React.Dispatch<React.SetStateAction<string>>;
}

export const IndividuelListe: React.FC<IndividuelListeProps> = ({
  liste,
  aktivListe,
  setAktivListe
}) => {
  // @ts-ignore TODO: FIX LATER ***
  const { lister, setLister } = useListerValue(); // brugerens lister
  // @ts-ignore TODO: FIX LATER ***
  const { setValgtListe } = useValgtListeValue(); // hvilke punkter som vises.

  const toastSletSuccess = () => {
    toast.success(`${liste.navn} deleted ❌`, {
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
      `You are about to delete list: '${liste.navn}'?`
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
      .catch((err: Error) => {
        console.error("Error deleting liste: ", err);
        window.alert("Ooops, something went wrong. Please try again.");
      });
  };

  return (
    <>
      <span>
        <FaStar />
      </span>
      <span data-testid="individuel-liste">{liste.navn}</span>
      {aktivListe === liste.listeId && (
        <span
          data-testid="individuel-liste-delete"
          onClick={() => confirmSletListe()}
          aria-label="Delete List"
        >
          <Trash />
        </span>
      )}
    </>
  );
};
