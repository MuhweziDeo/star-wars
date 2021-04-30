import React from 'react';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled} from 'baseui';
import {Button} from 'baseui/button';

const engine = new Styletron();
const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});


function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
        <Button onClick={() => alert("click")}>Hello</Button>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
