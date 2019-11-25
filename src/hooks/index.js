import { useState, useEffect, useContext } from "react";
import { firebase } from "../firebase";
import { AuthContext } from "../context";
const brugerId = "1234567890"; // ALLE MINE PUNKTER. KAN SES AF ALLE BRUGERE.
// const uid = "X2sqRONqqwabYmcQUP4lxJhRL8h2"; // DENNIE UID
let uid = "";

//passing valgtListe in like a regular function.
// usePunkter giver adgang til alle puntker.
// const { punkter } = usePunkter(valgtListe); (valgtListe = listeId)

export const usePunkter = valgtListe => {
  const { currentUser } = useContext(AuthContext);
  const [punkter, setPunkter] = useState([]);
  const [arkiveretPunkter, setArkiveretPunkter] = useState([]);
  // Firebase henter indhold: punkter ud fra brugerId
  // - Real-time database, med brug af subscribe/unsubscribe
  useEffect(() => {
    if (currentUser) {
      uid = currentUser.uid;
    }
    let unsubscribe = firebase
      .firestore()
      .collection("punkter")
      .where("brugerId", "in", [brugerId, uid]); // orderBy("dato") virker ikke
    //Ikke så smart at sætte brugerId direkte i koden, men "jeg" er alligevel den eneste bruger.

    // Er der valgt en liste, henter den punkter ud fra den liste.
    unsubscribe = valgtListe
      ? unsubscribe.where("listeId", "==", valgtListe)
      : unsubscribe;

    //mapper gennem punkterne/data
    unsubscribe = unsubscribe.onSnapshot(ss => {
      const nyePunkter = ss.docs.map(punkt => ({
        id: punkt.id,
        ...punkt.data()
      }));

      // henter punkter som ikke er arkiveret.
      setPunkter(nyePunkter.filter(punkt => punkt.arkiveret !== true));

      // henter punkter som er arkiveret.
      setArkiveretPunkter(
        nyePunkter.filter(punkt => punkt.arkiveret !== false)
      );
    });

    // Vi vil unsubscribe så vi ikke tjekker på opdateringer hele tiden, men kun når "valgtListe" rammes.
    return () => unsubscribe();
  }, [valgtListe, currentUser]); //empty array = kør én gang. - [valgtListe] = kør når den ændres.

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
      .where("brugerId", "in", [brugerId, uid]) // "in" = ligesom at sige where ... OR where ... , altså indeholder hvilken som helst af værdierne i arrayet
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

/* 
Custom hooks - useLister, usePunkter:
Nedenstående vil give alle punkterne fra den valgteListe, altså med id 1.
Giver også de arkiverede punkter, hvis den har id'et.
 
const valgtListe = 1;
const { punkter, arkiveretPunkter } = usePunkter(valgtListe);

valgtListe er et listeId, som basically bare er navnet på listen, fx TODO eller IDAG
 

*/
