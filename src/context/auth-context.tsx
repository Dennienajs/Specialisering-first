import React, { useEffect, useState, createContext } from "react";
import { firebase } from "../firebase";

interface ChildProps {
  children: React.ReactNode;
  // any other props that come into the component
}

export const AuthContext = createContext(); // Brokker sig over ingen defaultValue

export const AuthProvider = ({ children }: ChildProps) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null); // eller null

  // Sign up to currentUser updates
  // Runs once when component AuthProvider is mounted.
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  // Sender currentUser videre, så vi kan bruge den globalt.
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
