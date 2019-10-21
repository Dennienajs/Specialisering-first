import { samletPunkter } from "../constants"; // Lister (Alle, I dag, 7, Arkiveret)

// Liste-navn er h2'en (overskriften) over punkterne. fx Alle, i dag, osv...
// helpers som giver en true/false værdi tilbage, som kan bruges.
export const getListeNavn = (lister, listeId) => {
  lister.find(liste => liste.listeId === listeId);
};

export const getSamletListeNavn = (lister, key) => {
  lister.find(liste => liste.key === key);
};

// bruger bare constanterne
export const samletPunkterFundet = valgtListe => {
  samletPunkter.find(punkt => punkt.key === valgtListe);
};
