/*
    I stedet for at "pass data down objects" hele vejen gennem,
    Med context kan vi pass down data uden at skulle i gennem hele 5-6-7 componenter i træet.
    Man har en provider og en consumer.
  https://reactjs.org/docs/hooks-reference.html#usecontext
*/

import React, { createContext, useContext, useState } from "react";

export const ValgtListeContext = createContext();
export const ValgtListeProvider = ({ children }) => {
  const [valgtListe, setValgtListe] = useState(""); // "" = alle...

  return (
    <ValgtListeContext.Provider value={{ valgtListe, setValgtListe }}>
      {children}
    </ValgtListeContext.Provider>
  );
};

export const useValgtListeValue = () => useContext(ValgtListeContext);
