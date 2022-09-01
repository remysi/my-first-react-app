import {StatusBar} from 'expo-status-bar';
import Navigator from './navigators/Navigator';

const App = () => {
  return (

        // <> </> Tämä on React fragment.
        // Ilman React fragmenttia tulisi error.
        <>
          <Navigator></Navigator>
          <StatusBar style="auto" />
        </>
  );
};

export default App;
