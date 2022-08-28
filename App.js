import {StatusBar} from 'expo-status-bar';
import {StyleSheet, SafeAreaView} from 'react-native';

import List from './components/List';

const App = () => {
  return (
      <SafeAreaView style={styles.container}>
        <List />
        <StatusBar style="auto" />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
});

export default App;
