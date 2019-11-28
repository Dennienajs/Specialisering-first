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
  const [loadingPunkter, setLoadingPunkter] = useState(true);
  const [arkiveretPunkter] = useState([]); // setArkiveretPunkter fjernet - unused.
  // Firebase henter indhold: punkter ud fra brugerId
  // - Real-time database, med brug af subscribe/unsubscribe
  useEffect(() => {
    setLoadingPunkter(true);
    if (currentUser) {
      uid = currentUser.uid;
    }
    let unsubscribe = firebase
      .firestore()
      .collection("punkter")
      .orderBy("dato", "desc") // sorteret efter nyeste øverst.
      .where("brugerId", "in", [brugerId, uid]); // brugerId = mit id inden authentication, vil gerne beholde indtil videre.
    // orderBy("dato") virker ikke (FIXED: manglede "firebase index")

    // Er der valgt en liste, henter den punkter ud fra den liste.
    unsubscribe = valgtListe
      ? unsubscribe.where("listeId", "==", valgtListe)
      : unsubscribe;

    // Mapper gennem punkterne
    // Snapshot fordi det er den data "at that point in time"
    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const nyePunkter = snapshot.docs.map(punkt => ({
        id: punkt.id,
        ...punkt.data()
      }));

      // Sætter alle de nye punkter og returner dem i bunden.

      setPunkter(nyePunkter);
      setLoadingPunkter(false);
    });

    // Vi vil unsubscribe så vi ikke tjekker på opdateringer hele tiden, men kun når "valgtListe" rammes.
    return () => unsubscribe();
  }, [valgtListe, currentUser]); // ListeSkift + user login/signout

  // retunerer "ikke-arkiveret" punkter + ArkiveretPunkter.
  return { punkter, arkiveretPunkter, loadingPunkter };
};

export const useLister = () => {
  const [lister, setLister] = useState([]);

  // Fetcher fra databasen og giver et "fresh snapshot".
  useEffect(() => {
    firebase
      .firestore()
      .collection("lister")
      .where("brugerId", "in", [brugerId, uid]) // "in" = ligesom at sige where ... OR where ... , altså indeholder hvilken som helst af værdierne i arrayet
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
