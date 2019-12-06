/*
    I stedet for at "pass data down objects" hele vejen gennem,
    Med context kan vi pass down data uden at skulle i gennem hele 5-6-7 componenter i træet.
    Man har en provider og en consumer.
  https://reactjs.org/docs/hooks-reference.html#usecontext
*/

import React, { createContext, useContext, useState } from "react";

interface ChildProps {
  children: React.ReactNode;
  // any other props that come into the component
}

const initialState = {};

export const ValgtListeContext = createContext(initialState);

export const ValgtListeProvider = ({ children }: ChildProps) => {
  const [valgtListe, setValgtListe] = useState(""); // "" = alle...

  return (
    <ValgtListeContext.Provider value={{ valgtListe, setValgtListe }}>
      {children}
    </ValgtListeContext.Provider>
  );
};

export const useValgtListeValue = () => useContext(ValgtListeContext);
