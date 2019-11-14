import React from "react";
import "./App.scss";
import Content from "./containers/Content/index";
import Header from "./containers/Header/index";
import { ListerProvider, ValgtListeProvider } from "./context";

export const App = () => {
  return (
    <ValgtListeProvider>
      <ListerProvider>
        <div className="App">
          <Header />
          <Content />
        </div>
      </ListerProvider>
    </ValgtListeProvider>
  );
};

/*

Online at:
https://specialisering-1st.dennienajs.now.sh/

to update:
now --prod

*/
