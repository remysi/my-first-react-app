import {StatusBar} from 'expo-status-bar';
import {MainProvider} from './context/MainContext';
import Navigator from './navigators/Navigator';

const App = () => {
  return (
    // <> </> Tämä on React fragment.
    // Ilman React fragmenttia tulisi error.
    <>
      <MainProvider>
        <Navigator></Navigator>
      </MainProvider>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
