import React, { createContext, useContext, ReactChildren } from "react";
import { useLister } from "../hooks";

const initialState = {};

export const ListerContext = createContext(initialState);

interface ChildProps {
  children: React.ReactNode;
  // any other props that come into the component
}

export const ListerProvider = ({ children }: ChildProps) => {
  // får dataen fra useLister hook (firebase query)
  const { lister, setLister, loadingLister, setLoadingLister } = useLister();

  return (
    <ListerContext.Provider
      value={{ lister, setLister, loadingLister, setLoadingLister }}
    >
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
