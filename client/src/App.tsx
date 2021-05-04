import React, { createContext } from 'react';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, DarkTheme} from 'baseui';
import { ProgressBar } from "baseui/progress-bar";

import Router from './router';
import {useSelector} from "react-redux";
import {RootState} from "./store";
import './index.css';

const engine = new Styletron();

export type ContextType = {
  theme: string;
  setTheme(theme: string):  void;
}
export const GlobalContext = createContext<ContextType>({theme: "light", setTheme: () => {}})

function App() {
  const { loading } = useSelector((state:RootState) => state.loading);
  const[theme, setTheme] = React.useState("light");
  return (
    <StyletronProvider value={engine}>
   <GlobalContext.Provider value={{theme, setTheme}} >
   <BaseProvider theme={theme === "light" ? LightTheme : DarkTheme}>
        {loading &&  <ProgressBar infinite/>}
        <Router/>
      </BaseProvider>
   </GlobalContext.Provider>
    </StyletronProvider>
  );
}

export default App;
