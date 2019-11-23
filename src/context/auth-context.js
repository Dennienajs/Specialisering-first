import React, { useEffect, useState } from "react";
import { firebase } from "../firebase";
// Import auth() function ** Skal laves først **
// https://www.youtube.com/watch?v=unr4s3jd9qA
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

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
