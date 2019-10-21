import React, { createContext, useContext } from "react";
import { useLister } from "../hooks";

export const ListerContext = createContext();
export const ListerProvider = ({ children }) => {
  //får dataen fra useLister hook (firebase query)
  const { lister, setLister } = useLister();

  return (
    <ListerContext.Provider value={{ lister, setLister }}>
      {children}
    </ListerContext.Provider>
  );
};

export const useListerValue = () => useContext(ListerContext);

/* 
Context giver mulighed for at pass data gennem componenttræet,
  uden at pass props hele vejen i gennem.

  Man har en Provider og en consumer:
    Provider - top level
    Consume - bottom level

    eksempel:

      const { lister } = useListerValue();

        - ville virke


 */
