import React, { createContext, useContext, useState } from "react";

interface ChildProps {
  children: React.ReactNode;
  // any other props that come into the component
}

export const ValgtListeContext = createContext(); // Ingen defaultValue provided

export const ValgtListeProvider = ({ children }: ChildProps) => {
  const [valgtListe, setValgtListe] = useState<string>(""); // "" = alle...

  return (
    <ValgtListeContext.Provider value={{ valgtListe, setValgtListe }}>
      {children}
    </ValgtListeContext.Provider>
  );
};

export const useValgtListeValue = () => useContext(ValgtListeContext);
