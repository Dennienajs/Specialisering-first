//@ts-nocheck TODO FIX
import { useState, useEffect, useContext } from "react";
import { firebase } from "../firebase";
import { AuthContext } from "../context";
import { findDefaultListeMatch } from "../helpers";
import { PunktProps } from "../types";
import moment from "moment";
let uid = ""; // brugerens unikke id

export const usePunkter = (valgtListe: string, sortBy: string) => {
  const { currentUser } = useContext(AuthContext);
  const [punkter, setPunkter] = useState<PunktProps>([]); // Skal være [] for tests ikke failer. TODO: FIX ANY.. (fjerne fejl på linie 50.)
  const [loadingPunkter, setLoadingPunkter] = useState(true);

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
      .where("brugerId", "==", uid); // firebase.User.uid

    // Er der valgt en valgtListe, henter den punkter ud fra den liste.
    // Der er fx ikke en valgtListe i "ALLE", derfor skal det i en if-statement.
    if (valgtListe && !findDefaultListeMatch(valgtListe)) {
      unsubscribe = unsubscribe.where("listeId", "==", valgtListe);
    }

    // Mapper gennem punkterne
    // Snapshot fordi det er den data "at that point in time"
    // @ts-ignore TODO: FIX LATER
    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const nyePunkter = snapshot.docs.map((punkt: PunktProps) => ({
        ...punkt.data(), // tager punkets data
        id: punkt.id
      }));

      const now = moment(); // date time now til sammenligning af punkt.dato
      //  ADDED WITHIN LAST 24 HOURS
      const punkterByListe =
        valgtListe === "Today"
          ? nyePunkter.filter(punkt => now.diff(punkt.dato, "hours") <= 24)
          : // ADDED WITHIN LAST 7 DAYS
          valgtListe === "Last 7 Days"
          ? nyePunkter.filter(punkt => now.diff(punkt.dato, "hours") <= 168)
          : // ALL
            nyePunkter;

      console.log(sortBy);
      // Sorts by SortedPunkter component.
      const punkterSortedBy =
        sortBy === "Active"
          ? punkterByListe.filter(punkt => !punkt.arkiveret) // Active
          : sortBy === "Done"
          ? punkterByListe.filter(punkt => punkt.arkiveret) // Done
          : punkterByListe; // All

      console.log("punkterSortedBy");
      console.log(punkterSortedBy);

      setPunkter(punkterSortedBy);
      setLoadingPunkter(false);
    });
    // - unsubscribe.onSnapshot - er en listener for querySnapshot event.
    // - man canceler listeneren ved at kalde functionen "unsubscribe()", som kalder .onSnapshot til at starte med.,
    // - dette er altså vores "cleanup" function i denne useEffect. Ved at cleanup undgår vi at introducere memory leaks.
    // - vi subscriber altså til usePunkter og lytter på punkterne i databasen.
    // - vi vil unsubscribe så vi ikke tjekker på opdateringer hele tiden, men kun når "valgtListe" eller "currentUser" rammes.
    // @ts-ignore TODO: FIX LATER
    return () => unsubscribe();
  }, [valgtListe, currentUser, sortBy]); // ListeSkift + user login/signout = rerun all this

  // retunerer punkter og loadingPunkter -staten
  return { punkter, loadingPunkter };

  // Eksempel: giver alle punkterne fra "Huskeliste" + loading staten
  // const valgtListe = "Huskeliste"
  // const { punkter, loadingPunkter } = usePunkter(valgtListe)
};

//

export const useLister = () => {
  const [lister, setLister]: any = useState([]); // TODO: fix any ??? (fjerne fejl på linie 91 )
  const [loadingLister, setLoadingLister] = useState(true);
  const { currentUser } = useContext(AuthContext);

  // Fetcher fra databasen og giver et "fresh snapshot".
  useEffect(() => {
    setLoadingLister(true);
    if (currentUser) {
      uid = currentUser.uid;
    }
    firebase
      .firestore()
      .collection("lister")
      .where("brugerId", "==", uid) // "in" = ligesom at sige where ... OR where ... , altså indeholder hvilken som helst af værdierne i arrayet
      .get() // kan også returnere cached data eller faile hvis offline.
      .then(snapshot => {
        const alleLister = snapshot.docs.map(liste => ({
          // docs = An array of all the documents in the QuerySnapshot.
          ...liste.data(),
          docId: liste.id
        }));

        // Hvis ikke man har dette inden i IF-statement og checker på om den har ændret sig,
        // tror programmet bare at lister har ændret sig, og man har lavet et uendeligt loop.
        if (JSON.stringify(alleLister) !== JSON.stringify(lister)) {
          setLister(alleLister);
        }
      })
      .catch((err: Error) => {
        switch (err.message) {
          case "Quota exceeded.":
            return console.error("Firebase error caught: 'quota exceeded'");

          default:
            console.error("default ERROR: " + err);
            console.log("message " + err.message);
            console.log("name " + err.name);
            console.log("stack " + err.stack);
        }
      });
    setLoadingLister(false);
  }, [lister, currentUser]);

  return { lister, setLister, loadingLister, setLoadingLister };
};

/* 
Custom hooks - useLister, usePunkter:
Nedenstående vil give alle punkterne fra den valgteListe, altså med id 1.
Giver også de arkiverede punkter, hvis den har id'et.
 
const valgtListe = 1;
const { punkter, arkiveretPunkter } = usePunkter(valgtListe);

valgtListe er et listeId, som basically bare er navnet på listen, fx TODO eller IDAG
 

*/
