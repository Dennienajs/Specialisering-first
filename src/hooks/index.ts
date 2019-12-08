import { useState, useEffect, useContext } from "react";
import { firebase } from "../firebase";
import { AuthContext } from "../context";
// const brugerId = "1234567890"; // ALLE MINE PUNKTER. KAN SES AF ALLE BRUGERE.
// const uid = "X2sqRONqqwabYmcQUP4lxJhRL8h2"; // DENNIE UID

let uid = ""; // brugerens unikke id

// passing valgtListe in like a regular function.
// usePunkter giver adgang til alle puntker.
// const { punkter } = usePunkter(valgtListe); (valgtListe = listeId)

export const usePunkter = (valgtListe: string) => {
  const { currentUser } = useContext(AuthContext);
  const [punkter, setPunkter]: any = useState([]); // Skal være [] for tests ikke failer. TODO: FIX ANY.. (fjerne fejl på linie 50.)
  const [loadingPunkter, setLoadingPunkter] = useState(true);
  const [arkiveretPunkter] = useState([]); // arkiveret = true (line through)
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
      .where("brugerId", "==", uid); // brugerId = mit id inden authentication, vil gerne beholde indtil videre.
    // orderBy("dato") virker ikke (FIXED: manglede "firebase index")

    // Er der valgt en liste, henter den punkter ud fra den liste.
    unsubscribe = valgtListe // liste valgt i sidebaren (som ikke er "alle")
      ? unsubscribe.where("listeId", "==", valgtListe) // Viser kun fra den valgte liste
      : unsubscribe; // Ellers bare alle.

    // Mapper gennem punkterne
    // Snapshot fordi det er den data "at that point in time"
    // @ts-ignore TODO: FIX LATER
    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const nyePunkter = snapshot.docs.map(punkt => ({
        ...punkt.data(),
        id: punkt.id
      }));

      // Sætter punkter og loading done.
      setPunkter(nyePunkter);
      setLoadingPunkter(false);
    });

    // Vi vil unsubscribe så vi ikke tjekker på opdateringer hele tiden, men kun når "valgtListe" rammes.
    // @ts-ignore TODO: FIX LATER
    return () => unsubscribe();
  }, [valgtListe, currentUser]); // ListeSkift + user login/signout

  // retunerer "ikke-arkiveret" punkter + ArkiveretPunkter.
  return {
    punkter,
    arkiveretPunkter,
    loadingPunkter
  };
};

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
    setLoadingLister(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lister, currentUser]); // jeg sætter uid her for at rerender brugerens "egne lister" ved login. // TODO: REMOVE COMMENT LATER WHEN BUG FIX CONFIRMED.
  // Det er det nemmere sted at fixe det. Listerne bliver kun renderet ud fra uid og uid bliver ændret når brugeren logger ind.
  // Hvis uid ikke er her, skal man F5 siden for at få listerne frem. Dette fixes med denne ene dependency added.

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
