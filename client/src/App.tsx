import React from 'react';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';
import { ProgressBar } from "baseui/progress-bar";

import Router from './router';
import {useSelector} from "react-redux";
import {RootState} from "./store";

const engine = new Styletron();

function App() {
  const { loading } = useSelector((state:RootState) => state.loading);
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        {loading &&  <ProgressBar infinite/>}
        <Router/>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
