// Importerer og eksporterer contexten her i index ->
// så vi bare kan import via "named import" from ./context.

import {
  ListerContext,
  ListerProvider,
  useListerValue
} from "./lister-context";

import {
  ValgtListeContext,
  ValgtListeProvider,
  useValgtListeValue
} from "./valgt-liste-context";

export {
  ListerContext,
  ListerProvider,
  useListerValue,
  ValgtListeContext,
  ValgtListeProvider,
  useValgtListeValue
};

/*
    For man kan bruge dette, skal man HUSKE AT WRAPPE APPLIKATIONEN med provideren!
        - se app.jsx

        export const App = () => {
            return (
                <ValgtListeProvider>           <-- provider
                    <ListerProvider>           <-- provider
                        <div className="App">
                            <Header />
                            <Content />
                        </div>
                    </ListerProvider>           <-- provider
                </ValgtListeProvider>           <-- provider
            );
        };


*/
