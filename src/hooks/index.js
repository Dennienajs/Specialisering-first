import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { samletPunkterFundet } from "../helpers"; //Constanter = Alle, i dag, 7, Arkiveret.
import moment from "moment"; // står for IDAG-datohåndtering.

//passing valgtListe in like a regular function.
export const usePunkter = valgtListe => {
  const [punkter, setPunkter] = useState([]);
  const [arkiveretPunkter, setArkiveretPunkter] = useState([]);

  // Firebase henter indhold: punkter ud fra brugerId
  // - Real-time database, med brug af subscribe/unsubscribe
  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("punkter")
      .where("brugerId", "==", "1234567890");
    //Ikke så smart at sætte brugerId direkte i koden, men "jeg" er alligevel den eneste bruger.

    // Er valgtListe OG !samletPunkterFundet -- Altså gå gennem alle punkter og check dato.
    // Ved første checker den om der er punkter fra dagens dato, altså i dag.
    // Hvis en liste er valgt, checker den derudfra, ellers kan man vælge IDAG eller ALLE, hvorfra den vælger dem.
    unsubscribe =
      valgtListe && !samletPunkterFundet(valgtListe)
        ? (unsubscribe = unsubscribe.where("listeId", "==", valgtListe))
        : valgtListe === "IDAG"
        ? (unsubscribe = unsubscribe.where(
            "dato",
            "==",
            moment().format("DD/MM/YYYY")
          ))
        : valgtListe === "ALLE" || valgtListe === 0
        ? (unsubscribe = unsubscribe.where("dato", "==", ""))
        : unsubscribe;

    //mapper gennem punkterne/data
    unsubscribe = unsubscribe.onSnapshot(ss => {
      const nyePunkter = ss.docs.map(punkt => ({
        id: punkt.id,
        ...punkt.data()
      }));

      //Henter punkter ud fra de KOMMENDE SYV DAGE, som ikke er arkiveret.
      setPunkter(
        valgtListe === "KOMMENDE_7_DAGE"
          ? nyePunkter.filter(
              punkt =>
                moment(punkt.dato, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                punkt.arkiveret !== true
            )
          : nyePunkter.filter(punkt => punkt.arkiveret !== true)
      );

      // Gemmer alle arkiveret punkter.
      setArkiveretPunkter(
        nyePunkter.filter(punkt => punkt.arkiveret !== false)
      );
    });

    // Vi vil unsubscribe så vi ikke tjekker på opdateringer hele tiden, men kun når "valgtListe" rammes.
    return () => unsubscribe();
  }, [valgtListe]); //empty array = kør én gang. - [valgtListe] = kør når den ændres.

  // retunerer "ikke-arkiveret" punkter + ArkiveretPunkter.
  return { punkter, arkiveretPunkter };
};

export const useLister = () => {
  const [lister, setLister] = useState([]);

  // Fetcher fra databasen og giver et "fresh snapshot".
  useEffect(() => {
    firebase
      .firestore()
      .collection("lister")
      .where("brugerId", "==", "1234567890")
      .orderBy("listeId")
      .get()
      .then(snapshot => {
        const alleLister = snapshot.docs.map(liste => ({
          ...liste.data(),
          docId: liste.id
        }));

        // Hvis ikke man har dette inden i IF-statement og checker på om den har ændret sig,
        // tror programmet bare at lister har ændret sig, og man har lavet et uendeligt loop.
        if (JSON.stringify(alleLister) !== JSON.stringify(lister)) {
          setLister(alleLister);
        }
      });
  }, [lister]);

  return { lister, setLister };
};

// Custom hooks - useLister, usePunkter.
// Nedenstående vil give alle punkterne fra den valgteListe, altså med id 1.
// Giver også de arkiverede punkter, hvis den har id'et.
// **
// const valgtListe = 1;
// const { punkter, arkiveretPunkter } = usePunkter(valgtListe);
// **
